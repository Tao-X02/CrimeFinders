import React from 'react'
import Card from '@mui/material/Card';
import { Divider, List, ListItemButton, ListItemText } from '@mui/material';

export default function Filter() {
    return (
        <Card sx={{ maxWidth: '90%', marginTop: '6%' }}>
            <List>
                <ListItemButton>
                <ListItemText primaryTypographyProps={{ style: { fontWeight: 'bold' } }} primary="Filter posts:" />
                </ListItemButton>
                <Divider />
                <ListItemButton>
                    <ListItemText primary={"My tips"} />
                </ListItemButton>
                <Divider />
                <ListItemButton>
                    <ListItemText primary={"Tips I'm searching"} />
                </ListItemButton>
                <Divider />
                <ListItemButton>
                    <ListItemText primary={"All tips"} />
                </ListItemButton>
                <Divider />
                <ListItemButton>
                    <ListItemText primary={"By date"} />
                </ListItemButton>
            </List>
        </Card>
    )
}