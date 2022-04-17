import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { useStore } from '../App/stores/store';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import BackupIcon from '@mui/icons-material/Backup';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import agent from '../App/api/agent';

const drawerWidth = 300;

// Define props interface
interface Props {
    window1?: () => Window;
    current?: string;
}


export default observer(function SideBar(props: Props) {
    const [name, setName] = useState("Anonymous User");

    const {postStore, userStore} = useStore();

    useEffect(() => {
        const findUser = () => {
            let name1 = window.localStorage.getItem("name");
            if (name1 !== null) setName(name1);
        }
        findUser();
    }, [])

    const { window1, current } = props;
    let navigate = useNavigate();

    const drawer = (
        <div>
        <Toolbar style={{ height: '50%' }}>
            <PersonIcon />
            <Typography style={{ marginLeft: '10%' }}>{name}</Typography>
        </Toolbar>
        <Divider />
        <div style={{ backgroundColor: current === "Dashboard" ? '#d9f6ff' : 'white' }}>
        <List>
            <Link href="/dashboard" variant="body2" style={{ textDecoration: 'none', color: 'black' }}>
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} />
            </ListItemButton>
            </Link>
        </List>
        </div>
        <Divider />
        <div style={{ backgroundColor: current === "Submit" ? '#d9f6ff' : 'white' }}>
        <List>
            <Link href="/submit" variant="body2" style={{ textDecoration: 'none', color: 'black' }}>
            <ListItemButton>
                <ListItemIcon>
                    <BackupIcon />
                </ListItemIcon>
                <ListItemText primary={"Submit/Request"} />
            </ListItemButton>
            </Link>
        </List>
        </div>
        <Divider />
        <div style={{ backgroundColor: current === "Profile" ? '#d9f6ff' : 'white' }}>
        <List>
            <Link href="/profile" variant="body2" style={{ textDecoration: 'none', color: 'black' }}>
            <ListItemButton>
                <ListItemIcon>
                    <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary={"Profile"} />
            </ListItemButton>
            </Link>
        </List>
        </div>
        <Divider />
        <List>
            <ListItemButton 
                onClick={() => {
                    console.log("Clicked");
                    userStore.logout();
                    navigate('/');
                }}
            >
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary={"Log Out"} />
            </ListItemButton>
        </List>
        </div>
    );

    const container = window1 !== undefined ? () => window1().document.body : undefined;

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
            container={container}
            variant="temporary"
            open={postStore.mobileOpen}
            onClose={postStore.handleDrawerToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            >
            {drawer}
            </Drawer>
            <Drawer
            variant="permanent"
            sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
            >
            {drawer}
            </Drawer>
        </Box>
    );
})