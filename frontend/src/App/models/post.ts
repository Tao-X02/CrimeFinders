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
    members? : User[];
    isCancelled?: boolean;
}

export interface Submit1 {
    type: string;
    city: string;
    region: string;
    location: string;
    date: string;
}