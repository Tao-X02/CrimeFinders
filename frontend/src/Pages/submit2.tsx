import React, { useEffect, useMemo, useState } from 'react'
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
import { observer } from 'mobx-react-lite';
import { useStore } from '../App/stores/store';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import agent from '../App/api/agent';
import PhotoCroppper from '../Components/photoCropper';
import LoadingComponent from '../Components/loadingComponent';

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

export default observer(function Submit2() {
    const {postStore, photoStore} = useStore();

    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    // Clean up preview
    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview))
        }
    }, [files])

    let navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        postStore.setLoading(true);

        // Get email from local storage
        let email = window.localStorage.getItem("email");
        if (email !== null) {
            let inputJson = {
                email: email
            }

            // Get user
            await agent.Users.current(inputJson).then(async res => {
                let newId = uuid();

                // Define new post
                let newPost = {
                    id: newId,
                    type: postStore.submit1?.type ? postStore.submit1?.type : "",
                    description: String(data.get('description')),
                    city: postStore.submit1?.city ? postStore.submit1?.city : "",
                    region: postStore.submit1?.region ? postStore.submit1?.region : "",
                    location: postStore.submit1?.location ? postStore.submit1?.location : "",
                    date: postStore.submit1?.date ? postStore.submit1?.date : "",
                    posterName: res.userName ? res.userName : "",
                    posterEmail: email ? email : "",
                    members: [],
                    photos: [],
                    isCancelled: false
                }

                // Create post
                await postStore.createPost(newPost);

                await files.forEach((file: any) => URL.revokeObjectURL(file.preview));

                if (cropper) {
                    cropper.getCroppedCanvas().toBlob(async blob => {
                        let photoParams = {
                            file: blob!,
                            postId: newId
                        }
                        await photoStore.postPhoto(photoParams);
                        setTimeout(() => {
                            navigate(`/dashboard`, { replace: true });
                            postStore.setLoading(false);
                        }, 1900)
                    });
                }
                else {
                    navigate(`/dashboard`, { replace: true });
                    navigate(`/dashboard/${newId}`, { replace: true });
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    };

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles: any) => {
            console.log(acceptedFiles);
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

    // const images = files.map((file: any) => (
    //     <div key={file.name}>
    //         <div>
    //             <img src={file.preview} style={{ width: '450px' }} alt="preview" />
    //         </div>
    //     </div>
    // ))

    if (postStore.loading) return <LoadingComponent />

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
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, width: 1 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-multiline-static"
                            name="description"
                            label="Add Description"
                            type="description"
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
                        {/* <div>{images}</div> */}
                        {files && files.length > 0 && (
                            <>
                            <PhotoCroppper setCropper={setCropper} imagePreview={files[0].preview} />
                            <div className='img-preview' style={{ minHeight: 200, overflow: 'hidden' }} />
                            </>
                        )}
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
})