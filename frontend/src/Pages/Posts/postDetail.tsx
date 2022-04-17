import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, Grid, Toolbar, Typography } from '@mui/material';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import agent from '../../App/api/agent';
import { Photo } from '../../App/models/photo';
import { Post } from '../../App/models/post';
import { Profile } from '../../App/models/user';
import { useStore } from '../../App/stores/store';
import LoadingComponent from '../../Components/loadingComponent';
import NavBar from '../../Components/navBar';
import SideBar from '../../Components/sideBar';
import CircularProgress from '@mui/material/CircularProgress';

const drawerWidth = 300;

export default observer(function PostDetails() {
    const {postStore} = useStore();
    const {selectedPost: post, loadPost, loadingInitial, deletePost, setLoading} = postStore;
    const {id} = useParams<{id: string}>();

    const [curEmail, setCurEmail] = useState("");
    const [ joined, setJoined ] = useState(false);

    // Match results
    const [matches, setMatches] = useState<Post[]>([]);
    const [textMatches, setTextMatches] = useState<Post[]>([]);
    const [loadingResults, setLoadingResults] = useState(false);
    const [found, setFound] = useState(true);
    const [checked, setChecked] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        // Check if current user has joined search
        const findMembers = (email: string | null) => {
            if (email !== null) {
                let inputJson = {
                    email: email
                }

                agent.Users.current(inputJson).then(res => {
                    let match = post?.members?.filter((member: Profile) => member.userName === res.userName);
                    if (match !== undefined && match.length > 0) setJoined(true);
                })
            }
        }
        // Check current email from local storage
        const getEmail = () => {
            let email = window.localStorage.getItem("email");
            if (email != null) {
                setCurEmail(email);
                findMembers(email);
            }
        }
        getEmail();
    }, [post?.members])

    useEffect(() => {
        if (id) loadPost(id);
    }, [id, loadPost])

    const deletePhotos = async (id: string) => {
        setLoading(true);
        let post = await agent.Posts.details(id);
        if (post.photos && post.photos.length > 0) {
            post.photos.forEach(async (photo: Photo) => {
                await agent.Photos.delete(photo.id);
            })
        }
    }

    // Delete post
    const handleDelete = async () => {
        setLoading(true);
        if (id) {
            await deletePhotos(id);
            setTimeout(() => {
                deletePost(id);
                navigate(`/dashboard`, { replace: true });
            }, 1000);
        }
    }

    // Join search for current user
    const handlejoin = async () => {
        console.log("Join search");
        let email = window.localStorage.getItem("email");
        if (email !== null && post !== undefined) {
            let params = {
                id: post.id,
                email: email
            }
            await agent.Posts.join(params);
        }
    }

    // Load posts to update post registry
    useEffect(() => {
        postStore.loadPosts();
    }, [postStore])

    // Check for match results from flask server
    const runMatches = () => {
        setLoadingResults(true);
        let matchedPhotos : Photo[] = [];
        let matchedWords : Post[] = [];

        // Run through matched photos
        if (post && post.photos && post?.photos.length > 0) {
            axios.post("http://localhost:8000/matches", {
                post_id: post.id
            })
            .then(res => {
                matchedPhotos = res.data.faces;
                matchedWords = res.data.texts;
                setTextMatches(matchedWords);

                console.log(matchedPhotos)
                if (matchedPhotos.length === 0) {
                    setFound(false);
                    setLoadingResults(false);
                }
                else {
                    // Filter through post list
                    let posts = postStore.postsByDate.filter(curPost => {
                        if (curPost.id === post.id) {
                            return false;
                        }

                        // Check for identical photo IDs
                        else if (curPost.photos && curPost.photos.length > 0) {
                            for (const photo of matchedPhotos) {
                                if (photo.id === curPost.photos[0].id) return true;
                            }
                        }
                        return false;
                    });
                    console.log(posts);
                    setMatches(posts);
                    setLoadingResults(false);
                }
                setChecked(true);
            })
            .catch(err => {
                console.log(err);
                setChecked(true);
                setLoadingResults(false);
            })
        }
    }

    if (loadingInitial || !post) return <LoadingComponent />

    return (
        <Box style={{ display: 'flex', backgroundColor: '#f2f3f5', minHeight: '100vh' }}>
            <NavBar />
            <SideBar />
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                style={{ marginLeft: '2%', marginBottom: '1%' }}
            >
                <Toolbar />
                <Grid container direction="row">
                    <Grid item xs={8}>
                        <Card sx={{ maxWidth: '90%', marginTop: '3%' }}>
                            {post.photos && post.photos.length > 0 ? (<CardMedia
                                component="img"
                                image={post.photos[0].url}
                                alt="Placeholder image"
                            />) : (
                                <CardMedia
                                    component="img"
                                    image="https://source.unsplash.com/random"
                                    alt="Placeholder image"
                                />
                            )}
                            <CardContent>
                                {post.description.split('\n').map((line: string, index) => (
                                    <div key={index}>
                                        {index % 2 === 1 && <br />}
                                        <Typography variant="body1" component="div">{line}</Typography>
                                    </div>
                                ))}
                            </CardContent>
                            <Divider />
                            <CardActions>
                                {curEmail === post.posterEmail && 
                                    <Button onClick={handleDelete} size="small" variant="contained" color="error">Delete</Button>}
                                <Grid container justifyContent="flex-end">
                                {curEmail === post.posterEmail ? null
                                : [joined 
                                    ? <Button variant="contained" color="error" size="small" onClick={handlejoin}>Unjoin</Button>
                                    : <Button variant="contained" color="success" size="small" onClick={handlejoin}>Join Search</Button>]
                                }
                                </Grid>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card sx={{ maxWidth: '90%', marginTop: '6%' }}>
                        {post.members?.length === 0 && <CardHeader
                            avatar={
                            <Avatar sx={{ bgcolor: '#f08529' }} aria-label="recipe">
                                T
                            </Avatar>
                            }
                            action={
                            <div>
                                <Button variant="contained" color="warning" size="small">Poster</Button>
                            </div>
                            }
                            title="Anonymous User"
                            subheader={post.date}
                        />}
                        {post.members?.map((member: Profile) => (
                            <CardHeader
                                key={member.userName}
                                avatar={
                                <Avatar sx={{ bgcolor: '#3273a8' }} aria-label="recipe">
                                    {member.screeName[0]}
                                </Avatar>
                                }
                                action={
                                <>
                                    {member.userName === post.posterName && <div>
                                        <Button variant="contained" color="warning" size="small">Poster</Button>
                                    </div>}
                                </>
                                }
                                title={member.screeName}
                                subheader={post.date}
                            />
                        ))}
                        </Card>
                        <Box style={{ marginTop: '10%' }}>
                            <Button onClick={runMatches} variant="contained" color="success" size="small">
                                Check for match with existing tips
                            </Button>
                            {loadingResults && 
                                <Grid container justifyContent="center" style={{ width: '90%', marginTop: '5%' }}>
                                    <CircularProgress style={{ alignSelf: 'center' }} color="secondary" />
                                </Grid>
                            }
                            {checked && <div style={{ marginTop: '5%' }}>
                                {found ? <Typography component="h1" variant="h6">Found {matches.length} identical face(s):</Typography>
                                    : <Typography component="h1" variant="h6">No match was found.</Typography>}
                            </div>}
                            {matches.map((match : Post, index: number) => (
                                <Card sx={{ maxWidth: '90%', marginTop: '5%' }} key={index}>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {match.city}, {match.region}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {match.location}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            {match.date}
                                        </Typography>
                                        <Typography variant="body2">
                                            {match.description.substring(0, 30).trim()}
                                            {match.description.length > 30 && "..."}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button href={`/dashboard/${match.id}`} size="small">View post</Button>
                                    </CardActions>
                                </Card>
                            ))}
                            {checked && <div style={{ marginTop: '5%' }}>
                                {textMatches.length > 0 ? <Typography component="h1" variant="h6">Similar posts:</Typography>
                                    : <Typography component="h1" variant="h6">No similar post</Typography>}
                            </div>}
                            {textMatches.slice(0, 3).map((match : Post, index: number) => (
                                <Card sx={{ maxWidth: '90%', marginTop: '5%' }} key={index}>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {match.city}, {match.region}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {match.location}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            {match.date}
                                        </Typography>
                                        <Typography variant="body2">
                                            {match.description.substring(0, 30).trim()}
                                            {match.description.length > 30 && "..."}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button href={`/dashboard/${match.id}`} size="small">View post</Button>
                                    </CardActions>
                                </Card>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
})