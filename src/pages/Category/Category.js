import { Box, Button, DialogActions, DialogContent, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { Delete, Edit } from '@mui/icons-material';
import { Modal } from '../../components/Modal/Modal';
import axios from 'axios';
import ScaleLoader from "react-spinners/ScaleLoader";

export const Category = () => {
    const categoryRef = useRef()

    const [categoryModal, setCategoryModal] = useState(false);
    const [category, setCategory] = useState([])
    const handleSubmit = (evt) => {
        evt.preventDefault();
        axios.post('http://localhost:8080/category', {
            category_name: categoryRef.current.value,

        })
            .then(res => {
                if (res.status === 201) {
                    setCategoryModal(false)
                }
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        axios.get('http://localhost:8080/category')
            .then(data => setCategory(data.data))
            .catch(err => console.log(err))
    })
    const handleDele = (delId) => {
        axios.delete(`http://localhost:8080/category/${delId}`)
            .then(res => setCategory(res.data))
            .catch(err => console.log(err))
    }

    // const handleEdit = async (el) => {
    //     el.title = prompt('Edit your category').valueOf;
    //     await axios.put(`http://localhost:8080/category/${el.id}`)
    //     const postClone = [...el]
    //     const index = postClone.indexOf(el)
    //     postClone[index] = { ...el };
    //     setCategory(postClone)
    // }

    return (
        <>
            <Toolbar />
            <Box sx={{ maxWidth: "1240px", width: "100%", marginLeft: "260px" }}>
                <Button onClick={() => setCategoryModal(true)} sx={{ marginBottom: "15px", marginLeft: "auto", display: "flex", alignItems: "center" }} variant='contained' color='info' size='large' startIcon={<AddTaskRoundedIcon sx={{ margin: "0", display: "inherit" }} />}>
                    Add Category
                </Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#0288D1FF" }}>
                                <TableCell sx={{ color: "white" }}>
                                    ID
                                </TableCell>
                                <TableCell sx={{ color: "white", textAlign: "right" }}>
                                    NAME
                                </TableCell>
                                <TableCell sx={{ color: "white", textAlign: "right" }}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {
                            category.length ? (
                                <TableBody>
                                    {
                                        category.map(el => (
                                            <TableRow key={el.id} sx={{ backgroundColor: "#fff" }}>
                                                <TableCell>{el.id}</TableCell>
                                                <TableCell sx={{ color: "black", textAlign: "right" }}>{el.category_name}</TableCell>
                                                <TableCell sx={{ color: "black", textAlign: "right" }}>
                                                    <IconButton>
                                                        <Edit color='info' />
                                                    </IconButton>
                                                    <IconButton>
                                                        <Delete onClick={() => handleDele(el.id)} color='error' />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            ) : <Box padding={5} width="100%" margin="0 auto">
                                <ScaleLoader
                                    color={"#1976D2FF"}
                                    loading={true}
                                    size={150}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            </Box>
                        }
                    </Table>
                </TableContainer>
                <Modal title={"Add Cateogory"} modal={categoryModal} setModal={setCategoryModal}>
                    <form onSubmit={handleSubmit}>
                        <DialogContent dividers>
                            <TextField inputRef={categoryRef} variant='outlined' sx={{ width: "400px" }} placeholder='Name' label='Category name' />
                        </DialogContent>
                        <DialogActions>
                            <Button type='submit' color='info' variant='contained' autoFocus endIcon={<AddTaskRoundedIcon />}>
                                Add Category
                            </Button>
                        </DialogActions>
                    </form>
                </Modal>
            </Box>
        </>
    )
}
