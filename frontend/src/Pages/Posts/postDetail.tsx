import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, Grid, Toolbar, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../App/stores/store';
import LoadingComponent from '../../Components/loadingComponent';
import NavBar from '../../Components/navBar';
import SideBar from '../../Components/sideBar';

const drawerWidth = 300;

export default observer(function PostDetails() {
    const {postStore} = useStore();
    const {selectedPost: post, loadPost, loadingInitial, deletePost, loading} = postStore;
    const {id} = useParams<{id: string}>();

    let navigate = useNavigate();

    useEffect(() => {
        if (id) loadPost(id);
    }, [id, loadPost])

    const handleDelete = async () => {
        if (id) {
            await deletePost(id);
            navigate(`/dashboard`, { replace: true });
        }
    }

    if (loadingInitial || !post) return <LoadingComponent />

    return (
        <Box style={{ display: 'flex', backgroundColor: '#f2f3f5', minHeight: '100vh' }}>
            <NavBar />
            <SideBar />
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                style={{ marginLeft: '2%', marginBottom: '1%' }}
            >
                <Toolbar />
                <Grid container direction="row">
                    <Grid item xs={8}>
                        <Card sx={{ maxWidth: '90%', marginTop: '3%' }}>
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
                            <CardContent>
                                {post.description.split('\n').map((line: string, index) => (
                                    <div key={index}>
                                        {index % 2 === 1 && <br />}
                                        <Typography variant="body1" component="div">{line}</Typography>
                                    </div>
                                ))}
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
                                <Grid container justifyContent="flex-end">
                                    <Button variant="contained" color="success">Join</Button>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card sx={{ maxWidth: '90%', marginTop: '6%' }}>
                        <CardHeader
                            avatar={
                            <Avatar sx={{ bgcolor: '#f08529' }} aria-label="recipe">
                                T
                            </Avatar>
                            }
                            action={
                            <div>
                                <Button variant="contained" color="warning" size="small">Poster</Button>
                            </div>
                            }
                            title="Anonymous User"
                            subheader={post.date}
                        />
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
})