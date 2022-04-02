import { Photo } from "./photo";
import { User } from "./user";

// Interface to define a model for post
export interface Post {
    id: string;
    type: string;
    description: string;
    city: string;
    region: string;
    location: string;
    date: string;
    posterName?: string;
    posterEmail?: string;
    members? : any[];
    photos?: any[];
    isCancelled?: boolean;
}

export interface Submit1 {
    type: string;
    city: string;
    region: string;
    location: string;
    date: string;
}

export interface JoinPost {
    id: string;
    email: string;
}