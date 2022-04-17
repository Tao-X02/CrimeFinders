import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { LoginForm, SignupForm, User } from "../models/user";
import { v4 as uuid } from 'uuid';

export default class UserStore {
    user: User | null = null;
    token: string | null = null;
    email: string | null = null;
    loginLoad = false;

    constructor() {
        makeAutoObservable(this)
    }

    // Check if user exists
    get isLogggedIn() {
        return !!this.user;
    }

    // Login user
    login = async (formValues: LoginForm) => {
        try {
            const user = await agent.Users.login(formValues);
            this.setToken(user.token);
            this.setEmail(formValues.email);
            this.setUserName(user.userName);
            runInAction(() => {
                this.user = user;
            })
            console.log(user);
        } catch (error) {
            throw error;
        }
    }

    // Signup user
    signup = async (formValues: SignupForm) => {
        let newId = uuid();
        let submitForm = {
            userName: `${formValues.firstName}.${formValues.lastName}.${newId.slice(0, 5)}`,
            screeName: `Anonymous.${newId.slice(0, 5)}`,
            email: formValues.email,
            password: formValues.password
        }

        try {
            const user = await agent.Users.register(submitForm);
            this.setToken(user.token);
            this.setEmail(formValues.email);
            this.setUserName(submitForm.userName);
            runInAction(() => {
                this.user = user;
            })
            console.log(user);
        } catch (error) {
            throw error;
        }
    }

    // Current user
    current = async (email: any) => {
        try {
            const user = await agent.Users.current(email);
            runInAction(() => {
                this.user = user;
            })
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // Logout
    logout = () => {
        this.setToken(null);
        window.localStorage.removeItem('jwt');
    }

    setToken = (token: string | null) => {
        if (token) window.localStorage.setItem("jwt", token);
        this.token = token;
    }

    setEmail = (email: string | null) => {
        if (email) window.localStorage.setItem("email", email);
        this.email = email;
    }

    setUserName = (name: string | null) => {
        if (name) window.localStorage.setItem("name", name);
    }

    setLoginLoad = () => {
        this.loginLoad = true;
    }
}