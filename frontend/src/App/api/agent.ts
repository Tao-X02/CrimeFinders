import axios, { AxiosResponse } from 'axios';
import { Photo, PhotoPost } from '../models/photo';
import { JoinPost, Post } from '../models/post';
import { LoginForm, register, User } from '../models/user';

// Set wait time for response
const sleep = (delay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    })
}

// Default URL
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

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
    postParams: <T> (url: string, body: {}, other: {}) => axios.post<T>(url, body, other).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

// Object to store post requests
const Posts = {
    list: () => requests.get<Post[]>('/posts'),
    details: (id: string) => requests.get<Post>(`/posts/${id}`),
    create: (newPost: Post) => requests.post<void>('/posts', newPost),
    update: (newPost: Post) => requests.put<void>(`/posts/${newPost.id}`, newPost),
    delete: (id: string) => requests.del<void>(`/posts/${id}`),
    join: (params: JoinPost) => requests.postParams<void>(`/posts/${params.id}/join`, {}, { params: { email: params.email } })
}

// Object to store user requests
const Users = {
    current: (email: any) => requests.post<User>('/users/current', email),
    login: (user: LoginForm) => requests.post<User>('/users/login', user),
    register: (user: register) => requests.post<User>('/users/register', user)
}

// Store photo requests
const Photos = {
    post: (params: PhotoPost) => {
        let formData = new FormData();
        formData.append('File', params.file);
        formData.append('PostId', params.postId);
        return axios.post<Photo>('photos', formData, {
            headers: { 'Content-type': 'multipart/form-data' }
        })
    },
    delete: (id: string) => requests.del<void>(`/photos/${id}`)
}

const agent = {
    Posts,
    Users,
    Photos
}

export default agent;