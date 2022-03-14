import PostStore from "./postStore";
import { createContext, useContext } from "react";

// Define an interface
interface Store {
    postStore: PostStore
}

// Create a new instance for each store
export const store: Store = {
    postStore: new PostStore()
}

// Create react context
export const StoreContext = createContext(store);

// Function to use store context in react
export function useStore() {
    return useContext(StoreContext);
}