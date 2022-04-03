import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, Grid, Toolbar, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import agent from '../../App/api/agent';
import { Profile } from '../../App/models/user';
import { useStore } from '../../App/stores/store';
import LoadingComponent from '../../Components/loadingComponent';
import NavBar from '../../Components/navBar';
import SideBar from '../../Components/sideBar';

const drawerWidth = 300;

export default observer(function PostDetails() {
    const {postStore} = useStore();
    const {selectedPost: post, loadPost, loadingInitial, deletePost} = postStore;
    const {id} = useParams<{id: string}>();

    const [curEmail, setCurEmail] = useState("");
    const [ joined, setJoined ] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        // Check if current user has joined search
        const findMembers = (email: string | null) => {
            if (email !== null) {
                let inputJson = {
                    email: email
                }

                agent.Users.current(inputJson).then(res => {
                    let match = post?.members?.filter((member: Profile) => member.userName === res.userName);
                    if (match !== undefined && match.length > 0) setJoined(true);
                })
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
    }, [post?.members])

    useEffect(() => {
        if (id) loadPost(id);
    }, [id, loadPost])

    // Delete post
    const handleDelete = async () => {
        if (id) {
            await deletePost(id);
            navigate(`/dashboard`, { replace: true });
        }
    }

    // Join search for current user
    const handlejoin = async () => {
        console.log("Join search");
        let email = window.localStorage.getItem("email");
        if (email !== null && post !== undefined) {
            let params = {
                id: post.id,
                email: email
            }
            await agent.Posts.join(params);
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
                                image={post.photos[0].url}
                                alt="Placeholder image"
                            />) : (
                                <CardMedia
                                    component="img"
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
                                {curEmail === post.posterEmail && 
                                    <Button onClick={handleDelete} size="small" variant="contained" color="error">Delete</Button>}
                                <Grid container justifyContent="flex-end">
                                {curEmail === post.posterEmail ? null
                                : [joined 
                                    ? <Button variant="contained" color="error" size="small" onClick={handlejoin}>Unjoin</Button>
                                    : <Button variant="contained" color="success" size="small" onClick={handlejoin}>Join Search</Button>]
                                }
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
                        {post.members?.map((member: Profile) => (
                            <CardHeader
                                avatar={
                                <Avatar sx={{ bgcolor: '#3273a8' }} aria-label="recipe">
                                    {member.screeName[0]}
                                </Avatar>
                                }
                                action={
                                <>
                                    {member.screeName === post.posterName && <div>
                                        <Button variant="contained" color="warning" size="small">Poster</Button>
                                    </div>}
                                </>
                                }
                                title={member.screeName}
                                subheader={post.date}
                            />
                        ))}
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
})