import React from 'react'
import Card from '@mui/material/Card';
import { Divider, List, ListItemButton, ListItemText } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../App/stores/store';

export default observer(function Filter() {
    const { postStore } = useStore();
    const { setFilter } = postStore;
    
    return (
        <Card sx={{ maxWidth: '90%', marginTop: '6%' }}>
            <List>
                <ListItemButton>
                <ListItemText primaryTypographyProps={{ style: { fontWeight: 'bold' } }} primary="Filter posts:" />
                </ListItemButton>
                <Divider />
                <ListItemButton onClick={() => setFilter("my tips")}>
                    <ListItemText primary={"My tips"} />
                </ListItemButton>
                <Divider />
                <ListItemButton onClick={() => setFilter("search")}>
                    <ListItemText primary={"Tips I'm searching"} />
                </ListItemButton>
                <Divider />
                <ListItemButton onClick={() => setFilter("default")}>
                    <ListItemText primary={"All tips"} />
                </ListItemButton>
                <Divider />
                <ListItemButton>
                    <ListItemText primary={"By date"} />
                </ListItemButton>
            </List>
        </Card>
    )
})