import React from 'react'
import NavBar from '../Components/navBar'
import SideBar from '../Components/sideBar'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Submit2() {
    return (
        <Box style={{ display: 'flex', backgroundColor: '#f2f3f5', minHeight: '100vh' , alignItems: 'center', justifyContent: 'center' }}>
            <NavBar submit={true} />
            <SideBar current="Submit" />
            <Container component="main" maxWidth="sm" sx={{ backgroundColor: 'white', marginTop: '7%', marginBottom: '4%' }}>
                <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LibraryAddOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Almost Ready!
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3, width: 1 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Add Description"
                            multiline
                            fullWidth
                            rows={5}
                        />
                    </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        submit
                    </Button>
                </Box>
                </Box>
            </Container>
        </Box>
    )
}