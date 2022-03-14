import React from 'react'
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../App/stores/store';

const drawerWidth = 300;

// Define props interface
interface Props {
    submit?: boolean;
}

export default observer(function Navbar(props: Props) {
    const {postStore} = useStore();

    const { submit } = props;

    return (
        <AppBar
            position="fixed"
            sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            }}
            style={{ backgroundColor: '#009688' }}
        >
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={postStore.handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h5" noWrap component="div">
                CrimeCrusher
            </Typography>
            <div style={{ marginLeft: '2%' }}>
            <Link href="/submit">
            {submit != true && <Button variant="contained" color="primary" size="small">Submit a Tip</Button>}
            </Link>
            </div>
            </Toolbar>
        </AppBar>
    );
})