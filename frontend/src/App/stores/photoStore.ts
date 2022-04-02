import { makeAutoObservable } from 'mobx';
import agent from "../api/agent";
import { PhotoPost } from '../models/photo';

export default class PhotoStore {
    constructor() {
        makeAutoObservable(this)
    }

    postPhoto = async (params: PhotoPost) => {
        try {
            const photo = agent.Photos.post(params);
            console.log(photo);
        }
        catch (err) {
            console.log(err);
        }
    }
}