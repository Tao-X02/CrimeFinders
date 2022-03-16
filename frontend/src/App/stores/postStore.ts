import { makeAutoObservable, runInAction } from 'mobx';
import agent from "../api/agent";
import { Post, Submit1 } from "../models/post";
import { v4 as uuid } from 'uuid';

export default class PostStore {
    // Class variables
    postRegistry = new Map<string, Post>();
    selectedPost: Post | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;
    mobileOpen = false;
    submit1: Submit1 | undefined = undefined;

    constructor() {
        makeAutoObservable(this)
    }

    // Sort posts by date
    get postsByDate() {
        return Array.from(this.postRegistry.values()).sort((a, b) => 
            Date.parse(b.date) - Date.parse(a.date)); // reverse order
    }

    // Load posts from agent
    loadPosts = async () => {
        try {
            const posts = await agent.Posts.list();
            posts.forEach((post : Post) => {
                this.setPost(post);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    // Load post by id from agent
    loadPost = async (id: string) => {
        // Check if post already exists in mapped registry
        if (this.getPost(id)) {
            runInAction(() => {
                this.selectedPost = this.getPost(id);
            })
            return this.getPost(id);
        } else {
            this.loadingInitial = true;
            try {
                let post = await agent.Posts.details(id);
                this.setPost(post);
                runInAction(() => {
                    this.selectedPost = post;
                })
                this.setLoadingInitial(false);
                return post;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    // Create post from form input
    createPost = async(post: Post) => {
        this.loading = true;
        try {
            await agent.Posts.create(post);
            runInAction(() => {
                this.postRegistry.set(post.id, post);
                this.selectedPost = post;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    // Delete post
    deletePost = async (id: string) => {
        this.loading = true;
        try {
            await agent.Posts.delete(id);
            runInAction(() => {
                this.postRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    // Getter for post in registry
    private getPost = (id: string) => {
        return this.postRegistry.get(id);
    }

    // Setter for post in registry
    private setPost = (post: Post | undefined) => {
        // Make sure post is not undefined
        if (post) {
            post.date = post.date.split('T')[0];
            this.postRegistry.set(post.id, post);
        }
    }

    // Update loading initial boolean
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    // Update mobile open boolean
    handleDrawerToggle = () => {
        this.mobileOpen == true
         ? this.mobileOpen = false
         : this.mobileOpen = true
    }

    selectPost = (id: string) => {
        this.selectedPost = this.postRegistry.get(id);
    }

    // Temporarily store info from submission form 1
    setSubmission1 = (submission: Submit1) => {
        this.submit1 = submission;
    }
}