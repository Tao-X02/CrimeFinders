export interface User {
    userName: string;
    screeName: string;
    token: string;
    image?: string;
}

export interface Profile {
    userName: string;
    screeName: string;
    image?: string;
}

export interface LoginForm {
    email: string;
    password: string;
}

export interface SignupForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface register {
    userName: string;
    screeName: string;
    email: string;
    password: string;
}