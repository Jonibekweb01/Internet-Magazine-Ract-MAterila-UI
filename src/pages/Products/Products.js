import { Box, Button, DialogActions, DialogContent, MenuItem, Tab, Tabs, TextField, Toolbar } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { Modal } from '../../components/Modal/Modal';
import axios from 'axios';
import { ScaleLoader } from 'react-spinners';
import './Products.css'
import { Stack } from '@mui/system';
import { AdminProductCard } from '../../components/AdminProductCard/AdminProductCard';

export const Products = () => {
    const nameRef = useRef()
    const priceRef = useRef()
    const imageRef = useRef()
    const categoryRef = useRef()
    const [products, setProducts] = useState();
    const [product, setProduct] = useState([]);
    const [productModal, setProductModal] = useState(false);
    const [category, setCategory] = useState([])

    const handleSubmit = (evt) => {
        evt.preventDefault();
        axios.post("http://localhost:8080/products", {
            name: nameRef.current.value,
            price: priceRef.current.value,
            image: imageRef.current.value,
            category_id: categoryRef.current.value,
        }).then(res => {
            if (res.status == 201) {
                setProducts(res.data)
                setProductModal(false)
            }
        })
            .catch(err => console.log(err))
    }
    const [value, setValue] = useState(1);
    const handleChange = (evt) => {
        setValue(+evt.target.attributes.tabIndex.nodeValue);
    };
    const getCategory = async () => {
        axios.get('http://localhost:8080/category')
            .then(res => setCategory(res.data))
            .catch(err => console.log(err))

    }
    useEffect(() => {
        axios
            .get('http://localhost:8080/products')
            .then(res => {
                if (res.status === 200) {
                    setProduct(res.data)
                }
                console.log(res)
            })
            .catch(err => console.log(err))

    }, [value])
    useEffect(() => {
        getCategory()
    }, [])


    return (
        <>
            <Toolbar />
            <Box sx={{ maxWidth: "1240px", width: "100%", marginLeft: "260px" }}>
                <Button onClick={() => setProductModal(true)} sx={{ marginBottom: "15px", marginLeft: "auto", display: "flex", alignItems: "center" }} variant='contained' color='info' size='large' startIcon={<AddTaskRoundedIcon sx={{ margin: "0", display: "inherit" }} />}>
                    Add product
                </Button>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderRadius: "10px", borderBottom: 1, borderColor: 'divider', marginBottom: "10px" }}>
                        <Tabs value={value}
                            onChange={handleChange}
                            variant="standard"
                            aria-label="basic tabs example"
                            sx={{ borderRadius: "5px" }}
                        >
                            {
                                category.map(el => (
                                    <Tab sx={{ color: "white" }} key={el.id} label={el.category_name} value={el.id} id={`simple-tab-${el.id}`} tabIndex={el.id} />
                                ))
                            }
                        </Tabs>
                    </Box>
                    {
                        category.length ? (
                            category.map(el => (
                                <Box key={el.id} role="tabpanel" hidden={value !== el.id} value={value} index={el.id}>
                                    {
                                        product.map(el => <AdminProductCard product={product} setProduct={setProduct} key={el.id} item={el} />)
                                    }
                                </Box>
                            ))
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
                </Box>
                <Modal title={"Add Product"} modal={productModal} setModal={setProductModal}>
                    <form onSubmit={handleSubmit}>
                        <DialogContent dividers>
                            <Stack spacing={2}>
                                <TextField inputRef={nameRef} variant='outlined' sx={{ width: "400px" }} placeholder='Name' label='Product name' />
                                <TextField inputRef={priceRef} variant='outlined' sx={{ width: "400px" }} placeholder='Name' label='Product price' />
                                <TextField inputRef={imageRef} variant='outlined' sx={{ width: "400px" }} placeholder='Name' label='Product image' />
                                <TextField inputRef={categoryRef} variant='outlined' sx={{ width: "400px" }} placeholder='Name' label='Product category' select>
                                    {
                                        category.length ? (
                                            category.map(el => (
                                                <MenuItem key={el.id} value={el.id}>{el.category_name}</MenuItem>
                                            ))
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
                                </TextField>
                            </Stack>
                        </DialogContent>
                        <DialogActions>
                            <Button type='submit' color='info' variant='contained' autoFocus endIcon={<AddTaskRoundedIcon />}>
                                Add product
                            </Button>
                        </DialogActions>
                    </form>
                </Modal>
            </Box>
        </>
    )
}
