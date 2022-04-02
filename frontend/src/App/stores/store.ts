import PostStore from "./postStore";
import { createContext, useContext } from "react";
import UserStore from "./userStore";
import PhotoStore from "./photoStore";

// Define an interface
interface Store {
    postStore: PostStore;
    userStore: UserStore;
    photoStore: PhotoStore;
}

// Create a new instance for each store
export const store: Store = {
    postStore: new PostStore(),
    userStore: new UserStore(),
    photoStore: new PhotoStore()
}

// Create react context
export const StoreContext = createContext(store);

// Function to use store context in react
export function useStore() {
    return useContext(StoreContext);
}