export interface Photo {
    id: string;
    url: string;
}

export interface PhotoPost {
    file: Blob;
    postId: string;
}