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
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from '../firebase';

import { collection, getDocs ,onSnapshot} from "firebase/firestore";
import TableDesign from './TableDesign';
import Data from './Data';


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

export default function Table() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const [docData, setdocData] = useState([]);

    const getProducts = async () => {
        // const querySnapshot = await getDocs(collection(db, "Products"));onSnapshot
         await onSnapshot(collection(db, "Products"),
        (snapshot) => {
          // ...
          console.log(snapshot)
          if(!snapshot.empty){
            let array=snapshot.docs.map((doc)=>{
                return {id:doc.id,...doc.data()}
            })
            console.log("data",array)
            setdocData(array);  
          }else{
            setdocData([])
          }
        },
        (error) => {
          // ...
        });
        // );
        // console.log(querySnapshot)
        // let array = []
        // querySnapshot.forEach((doc) => {
            // console.log(doc.id)
        //     array.push({ ...doc.data(), id: doc.id })
        // });
        // setdocData(array)


    }

    useEffect(() => {
        getProducts()
    }, [])

    console.log(docData)

    const handleSubmit = async (event) => {
        event.preventDefault();

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
                        Table of Data from Database

                    </Typography>


                    <TableDesign docData={docData} getProducts={getProducts} />

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

                        <Link to="/data" style={{ textDecoration: "none" }}>

                            <Button

                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Enter Data
                            </Button>
                        </Link>
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