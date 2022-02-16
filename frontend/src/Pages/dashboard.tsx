import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function Dashboard() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/posts')
            .then(res => {
                setPosts(res.data);
            })
    }, [])

    return (
        <div>
            <h1>This is the dashboard page</h1>
            {posts.map((post: any) => (
                <h3>{post.city}</h3>
            ))}
        </div>
    )
}