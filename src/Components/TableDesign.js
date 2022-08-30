import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import EditUpdate from './EditUpdate';
import { doc, deleteDoc, updateDoc, deleteField } from "firebase/firestore";
import { db } from '../firebase';

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }

const rows = [
    //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //   createData('Eclair', 262, 16.0, 24, 6.0),
    //   createData('Cupcake', 305, 3.7, 67, 4.3),
    //   createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function TableDesign({ docData,getProducts
}) {


    const DeleteDoc = async (id) => {
        console.log(id)
        await deleteDoc(doc(db, "Products", id));
        // getProducts();

    }
    return (
        <TableContainer component={Paper} sx={{ minWidth: "1000px" }} >
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>products</TableCell>
                        <TableCell align="right">name</TableCell>
                        <TableCell align="right">price</TableCell>
                        <TableCell align="right">type</TableCell>
                        <TableCell align="right">Edit</TableCell>
                        <TableCell align="right">Delete</TableCell>


                    </TableRow>
                </TableHead>
                <TableBody>
                    {docData.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">
                                <img src={row.image} style={{width:"30px", height:"30px"}}/>
                                {row.name}</TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell align="right">{row.type}</TableCell>
                            <TableCell align="right">
                                <Link to={`/editProduct/${row.id}`} style={{ textDecoration: "none" }}>

                                    <Button

                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 2, mb: 1 }}

                                    >
                                        Edit
                                    </Button>
                                </Link>
                            </TableCell>
                            <TableCell align="right">
                                {/* <Link to={`/editProduct/${row.id}`} style={{ textDecoration: "none" }}> */}

                                <Button

                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 2, mb: 1 }}
                                    onClick={()=>DeleteDoc(row.id)}
                                >
                                    Delete
                                </Button>
                                {/* </Link> */}
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
