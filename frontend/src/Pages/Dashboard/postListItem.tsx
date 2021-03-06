import React, { useEffect, useState } from 'react';
import { Post } from '../../App/models/post';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { observer } from 'mobx-react-lite';
import agent from '../../App/api/agent';
import { Profile } from '../../App/models/user';
import { useStore } from '../../App/stores/store';
import { useNavigate } from 'react-router-dom';
import { Photo } from '../../App/models/photo';

// Define props interface
interface Props {
    post: Post,
    name: string
}

function getType(post: Post) {
    switch (post.type) {
        case "Person of Interest":
            return <Button variant="contained" color="warning" size="small">Person of Interest</Button>;
        case "Fugitive":
            return <Button variant="contained" color="success" size="small">Fugitive</Button>;
        case "Missing Person":
            return <Button variant="contained" color="error" size="small">Missing Person</Button>;
    }
}

export default observer(function PostListItem({ post, name }: Props) {
    const {postStore} = useStore();
    const {deletePost, setLoading} = postStore;

    const [curEmail, setCurEmail] = useState("");
    const [ joined, setJoined ] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        // Check if current user has joined search
        const findMembers = (email: string | null) => {
            if (name !== null) {
                let match = post.members?.filter((member: Profile) => member.userName === name);
                if (match !== undefined && match.length > 0) setJoined(true);
            }
        }
        // Check current email from local storage
        const getEmail = () => {
            let email = window.localStorage.getItem("email");
            if (email != null) {
                setCurEmail(email);
                findMembers(email);
            }
        }
        getEmail();
    }, [])

    // Join search for current user
    const handlejoin = async () => {
        console.log("Join search");
        let email = window.localStorage.getItem("email");
        if (email !== null) {
            let params = {
                id: post.id,
                email: email
            }
            await agent.Posts.join(params);
        }
    }
    
    const deletePhotos = async (id: string) => {
        setLoading(true);
        let post = await agent.Posts.details(id);
        if (post.photos && post.photos.length > 0) {
            post.photos.forEach(async (photo: Photo) => {
                await agent.Photos.delete(photo.id);
            })
        }
    }

    // Delete post
    const handleDelete = async () => {
        setLoading(true);
        if (post.id) {
            await deletePhotos(post.id);
            setTimeout(() => {
                deletePost(post.id);
                navigate(`/dashboard`, { replace: true });
            }, 1000);
        }
    }

    return (
        <Card sx={{ maxWidth: '90%', marginTop: '3%' }}>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: '#3273a8' }} aria-label="recipe">
                    {post.members !== undefined && post.members.length > 0 ? post.members[0].screeName[0] : 'A'}
                </Avatar>
                }
                action={
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    {getType(post)}
                </div>
                }
                title={`${post.members !== undefined && post.members.length > 0
                    ? post.members[0].screeName
                    : "Anonymous User"} submitted a tip`}
                subheader={post.date}
            />
            <CardContent sx={{ marginTop: '-2%' }}>
                <Typography gutterBottom variant="h5" component="div">{post.city}, {post.region}</Typography>
                <Typography gutterBottom variant="body1" component="div">{post.location}</Typography>
                <Typography variant="body2" color="text.secondary">
                    Description: {post.description.substring(0, 270).trim()}
                    {post.description.length > 270 && "... (click 'View' to read more)"}
                </Typography>
            </CardContent>
            {post.photos && post.photos.length > 0 ? (<CardMedia
                component="img"
                height="350"
                image={post.photos[0].url}
                alt="Placeholder image"
            />) : (
                <CardMedia
                    component="img"
                    height="350"
                    image="https://source.unsplash.com/random"
                    alt="Placeholder image"
                />
            )}
            <CardActions>
                <Button href={`/dashboard/${post.id}`} variant="outlined">Comments</Button>
                <Grid container justifyContent="flex-end">
                    {curEmail === post.posterEmail 
                    ? <Button onClick={handleDelete} size="small" variant="contained" color="error">Delete</Button>
                    : [joined 
                        ? <Button variant="contained" color="error" size="small" onClick={handlejoin}>Unjoin</Button>
                        : <Button variant="contained" color="success" size="small" onClick={handlejoin}>Join Search</Button>]
                    }
                </Grid>
                <Grid>
                    <Button href={`/dashboard/${post.id}`} variant="contained" color="primary" size="small">View</Button>
                </Grid>
            </CardActions>
        </Card>
    )
})