import React, { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from '../firebase';

import { collection, addDoc } from "firebase/firestore";
import UploadBtn from './UploadBtn';
import { storage } from '../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link to="#">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Data() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "Products"), {
                name: name,
                price: price,
                type: type,
                image: image,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setName('')
        setPrice('')
        setType('')
        // navigate('/table')
        // ...
    }

    // const handleChange = (e) => {
    //     if (e.target.files[0]) {
    //         setImage(e.target.files[0])
    //     }
    // }
//     const uploadImage = async (e) => {
//         // const uploadTask = storage.ref(`images/${image.name}`).put(image);
//         // uploadTask.on(
//         //     "state_changed",
//         //     snapshot => { },
//         //     error => {
//         //         console.log(error)
//         //     },
//         //     () => {
//         //         storage
//         //             .ref("images")
//         //             .child(image.name)
//         //             .getDownloadURL()
//         //             .then(url => {
//         //                 console.log(url)
//         //             })
//         //     }
//         // )

//         console.log(image)




// //  let fileName = e.target.files[0].name;
// //         fileName = fileName + new Date();
//         const storageRef = ref(storage, `images/${image}`);


//         const uploadTask = uploadBytesResumable(storageRef, image);

//         // Register three observers:
//         // 1. 'state_changed' observer, called any time the state changes
//         // 2. Error observer, called on failure
//         // 3. Completion observer, called on successful completion
//         uploadTask.on('state_changed',
//             (snapshot) => {
//                 // Observe state change events such as progress, pause, and resume
//                 // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 console.log('Upload is ' + progress + '% done');
//                 switch (snapshot.state) {
//                     case 'paused':
//                         console.log('Upload is paused');
//                         break;
//                     case 'running':
//                         console.log('Upload is running');
//                         break;
//                 }
//             },
//             (error) => {
//                 // Handle unsuccessful uploads
//                 // Handle unsuccessful uploads
//                 console.log("Handle unsuccessful uploads")
//                 console.log(error)
//             },
//             () => {
//                 // Handle successful uploads on complete
//                 console.log("successful uploads")

//                 // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                     console.log('File available at', downloadURL);
//                     setImage(downloadURL);
//                 });
//             }
//         );


//     }


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h5">
                        Enter Product Data
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="name"
                                    autoFocus
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="price"
                                    label="price"
                                    name="price"
                                    autoComplete="family-name"
                                    value={price}
                                    onChange={(e) => {
                                        setPrice(e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="type"
                                    label="type"
                                    name="type"
                                    autoComplete="email"
                                    value={type}
                                    onChange={(e) => {
                                        setType(e.target.value)
                                    }}
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
                                <input type="file" onChange={handleChange} />
                            </Grid> */}


                        </Grid>
                        {/* <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={uploadImage}
                        >
                            Upload photo
                        </Button> */}
                        <UploadBtn image={image} setImage={setImage} />


                        <Button
                            // type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}

                        >
                            Enter Data
                        </Button>
                        <Link to="/table" style={{ textDecoration: "none" }}>

                            <Button

                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Back
                            </Button>
                        </Link>

                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}