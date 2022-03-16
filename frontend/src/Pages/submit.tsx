import React, { useState } from 'react'
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
import { Link, MenuItem } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../App/stores/store';
import { useNavigate } from "react-router-dom";

const types = ["Person of Interest", "Fugitive", "Missing Person"]

export default observer(function Submit() {
    const {postStore} = useStore();

    const [type, setType] = useState("")

    let navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let temp = {
            type: type,
            city: String(data.get('city')),
            region: String(data.get('region')),
            location: String(data.get('location')),
            date: String(data.get('date'))
        }
        postStore.setSubmission1(temp);
        navigate("/submit-final", { replace: true });
    };

    const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setType(event.target.value);
      };

    return (
        <Box style={{ display: 'flex', backgroundColor: '#f2f3f5', minHeight: '100vh' , alignItems: 'center', justifyContent: 'center' }}>
            <NavBar submit={true} />
            <SideBar current="Submit" />
            <Container component="main" maxWidth="sm" sx={{ backgroundColor: 'white', marginTop: '7%', marginBottom: '4%' }}>
                <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
                >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LibraryAddOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Submit a Tip
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: 1 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            defaultValue=""
                            select
                            fullWidth
                            value={type}
                            onChange={handleChangeType}
                            label="Type"
                            helperText="Select Type"
                        >
                            {types.map(type => (
                                <MenuItem key={type} value={type}>
                                {type}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        name="city"
                        label="City"
                        type="city"
                        id="city"
                        autoComplete="city"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        name="region"
                        label="Province/Territory"
                        type="region"
                        id="region"
                        autoComplete="region"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        name="location"
                        label="Location"
                        type="location"
                        id="location"
                        autoComplete="location"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="date"
                            label=""
                            type="date"
                            autoComplete="date"
                            helperText="Date of occurance"
                        />
                    </Grid>
                    </Grid>
                    <Button
                        
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Next
                    </Button>
                </Box>
                </Box>
            </Container>
        </Box>
    )
})