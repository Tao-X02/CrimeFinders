import axios, { AxiosResponse } from 'axios';
import { Post } from '../models/post';

// Set wait time for response
const sleep = (delay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    })
}

// Default URL
axios.defaults.baseURL = 'http://localhost:5000/api';

// Axios interceptor
axios.interceptors.response.use(async (response :  AxiosResponse<any, any>) => {
    try {
        await sleep(500); // default wait 500 ms
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

// Store response data
const responseBody = <T> (response: AxiosResponse<T>) => response.data;

// Define request types
const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

// Object to store post requests
const Posts = {
    list: () => requests.get<Post[]>('/posts'),
    details: (id: string) => requests.get<Post>(`/posts/${id}`),
    create: (newPost: Post) => requests.post<void>('/posts', newPost),
    update: (newPost: Post) => requests.put<void>(`/posts/${newPost.id}`, newPost),
    delete: (id: string) => requests.del<void>(`/posts/${id}`)
}

const agent = {
    Posts
}

export default agent;