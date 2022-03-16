import React from 'react';
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
import { BreakfastDiningOutlined } from '@mui/icons-material';

// Define props interface
interface Props {
    post: Post
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

export default function PostListItem({ post }: Props) {
    return (
        <Card sx={{ maxWidth: '90%', marginTop: '3%' }}>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: '#f08529' }} aria-label="recipe">
                    T
                </Avatar>
                }
                action={
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    {getType(post)}
                </div>
                }
                title="Anonymous User submitted a tip"
                subheader={post.date}
            />
            <CardContent sx={{ marginTop: '-2%' }}>
                <Typography gutterBottom variant="h5" component="div">{post.city}, {post.region}</Typography>
                <Typography gutterBottom variant="body1" component="div">{post.location}</Typography>
                <Typography variant="body2" color="text.secondary">
                    Description: {post.description.substring(0, 250).trim()}
                    {post.description.length > 250 && "..."}
                </Typography>
            </CardContent>
            <CardMedia
                component="img"
                height="350"
                image="https://source.unsplash.com/random"
                alt="Placeholder image"
            />
            <CardActions>
                <Button href={`/dashboard/${post.id}`} variant="outlined">Comments</Button>
                <Grid container justifyContent="flex-end">
                    <Button variant="contained" color="success" size="small">Join Search</Button>
                </Grid>
                <Grid>
                    <Button href={`/dashboard/${post.id}`} variant="contained" color="primary" size="small">View</Button>
                </Grid>
            </CardActions>
        </Card>
    )
}