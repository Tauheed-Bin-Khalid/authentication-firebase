import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase';


export default function UploadBtn({ setImage, image }) {

    // const changeImage = async (e) => {
    //     if(e.target.files[0]){
    //         setImage(e.target.files[0])
    //     }

    // }

    const uploadImage = async (e) => {
    //     console.log(image)
    //   const uploadTask =storage.ref(`images/${image.name}`).put(image);
    //   uploadTask.on(
    //     "state_changed",
    //     snapshot => {},
    //     error => {
    //         console.log(error)
    //     },
    //     () => {
    //         storage
    //             .ref("images")
    //             .child(image.name)
    //             .getDownloadURL()
    //             .then(url => {
    //                 console.log(url)
    //             })
    //     }
    //   )
        let fileName = e.target.files[0].name;
        fileName = fileName + new Date();
        const storageRef = ref(storage, `images/${fileName}`);


        const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                // Handle unsuccessful uploads
                console.log("Handle unsuccessful uploads")
            },
            () => {
                // Handle successful uploads on complete
                console.log("successful uploads")

                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setImage(downloadURL);
                });
            }
        );

    }

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Button variant="contained" component="label">
                Upload
                <input hidden accept="image/*" onChange={(e) => uploadImage(e)} type="file" />
            </Button>

        </Stack>
    );
}
