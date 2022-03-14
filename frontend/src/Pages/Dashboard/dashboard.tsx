import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import Grid from '@mui/material/Grid';
import PostList from './postList';
import { useStore } from '../../App/stores/store';
import LoadingComponent from '../../Components/loadingComponent';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Filter from './filter';
import NavBar from '../../Components/navBar';
import SideBar from '../../Components/sideBar';

const drawerWidth = 300;

export default observer(function Dashboard() {
    const {postStore} = useStore();

    useEffect(() => {
        postStore.loadPosts();
    }, [postStore])

    if (postStore.loadingInitial) return <LoadingComponent />

    return (
        <Box style={{ display: 'flex', backgroundColor: '#f2f3f5' }}>
            <NavBar />
            <SideBar current="Dashboard" />
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                style={{ marginLeft: '2%' }}
            >
                <Toolbar />
                <Grid container direction="row">
                    <Grid item xs={8}>
                        <PostList />
                    </Grid>
                    <Grid item xs={4}>
                        <Filter />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
})