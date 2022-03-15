import React, { useMemo, useState } from 'react'
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
import { useDropzone } from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

export default function Submit2() {
    const [files, setFiles] = useState([]);

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles: any) => {
            setFiles(
                acceptedFiles.map((file: any) => Object.assign(FileReader, {
                    preview: URL.createObjectURL(file)
                }))
            )
        }
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    const images = files.map((file: any) => (
        <div key={file.name}>
            <div>
                <img src={file.preview} style={{ width: '450px' }} alt="preview" />
            </div>
        </div>
    ))

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
                    <div style={{ marginLeft: '3.2%', marginTop: '2%', width: '100%' }}>
                        <div {...getRootProps()}>
                            <input {...getInputProps({ ...style })} />
                            <Box 
                                style={{ 
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '20px',
                                    borderWidth: 2,
                                    borderRadius: 2,
                                    borderColor: '#eeeeee',
                                    borderStyle: 'dashed',
                                    backgroundColor: '#fafafa',
                                    outline: 'none',
                                    transition: 'border .24s ease-in-out'
                                }}
                            >
                                <Typography variant="subtitle1" color="secondary">Drop or select an image here</Typography>
                            </Box>
                        </div>
                        <div>{images}</div>
                    </div>
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