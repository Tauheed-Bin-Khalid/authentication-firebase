import React, { useEffect, useState } from 'react';

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
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from '../firebase';

import { collection, addDoc, doc, getDoc ,setDoc} from "firebase/firestore";
import { async } from '@firebase/util';


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

export default function EditUpdate() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const { id } = useParams();
    const navigate=useNavigate();
    const [docData, setdocData] = useState([]);


    console.log(id, "id")


    const getProductbyId = async () => {
        const docRef = doc(db, "Products", id);
        const docSnap = await getDoc(docRef);
        const {name,type,price}=docSnap.data();
        setName(docSnap.data().name)
        setPrice(docSnap.data().price)
        setType(docSnap.data().type)


        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }

    }

  
    useEffect(() => {
        getProductbyId()
    },[])
    const handleSubmit = async (event) => {
        event.preventDefault();
        const frankDocRef = doc(db, "Products", id);
        await setDoc(frankDocRef, {
            name: name,
            price: price,
            type: type,
        });
        setName('')
        setPrice('')
        setType('')
        navigate('/table')




        
        // ...
    }



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
                        Edit Data ANd Update
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


                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                           
                        >
                            Update data
                        </Button>
                        <Link to="/" style={{ textDecoration: "none" }}>

                            <Button

                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Home
                            </Button>
                        </Link>

                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}