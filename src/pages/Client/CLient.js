import { AppBar, Avatar, Button, Grid, Modal, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { UserContext } from "../../contenxt/user-context";
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { deepOrange } from "@mui/material/colors";
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import List from '@mui/material/List';
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ClientProductCard } from "../../components/ProductCard/ProductCard";
import './Client.css'
import axios from "axios";
import { useCart } from "react-use-cart";
import { CartCard } from "../../components/CartCard/CartCard";
import { ClearAll, Close, Done } from "@mui/icons-material";
import ScaleLoader from "react-spinners/ScaleLoader";


export const CLient = () => {
    const { totalItems, isEmpty, cartTotal, emptyCart, id, items } = useCart()
    const [product, setProduct] = React.useState([])
    const { user, setUser } = useContext(UserContext);
    const [orderModal, setOrderModal] = React.useState(false)
    const navigate = useNavigate()
    const LogOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        isEmpty(setProduct(ClearAll))
        navigate("/register")
    }

    const handleOrder = () => {

    }

    React.useEffect(() => {
        axios.get("http://localhost:8080/products")
            .then(res => {
                if (res.status === 200) {
                    setProduct(res.data)
                }
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <>
            <AppBar sx={{ paddingLeft: "50px", width: "1340px", right: "auto", left: "0", background: "blur" }}>
                <Box sx={{ maxWidth: "1500px", width: "100%", margin: "0 auto" }}>
                    <Box sx={{ padding: "15px", display: "flex", alignItems: "center" }}>
                        <Typography variant="h4" component='h2'>
                            Phones
                            <PhoneIphoneIcon />
                        </Typography>
                        <Box sx={{ display: "flex", marginLeft: "auto" }}>
                            <Button variant="filled">
                                <Link underline="none" color="white" to='/login' component={RouterLink} >
                                    Login
                                </Link>
                            </Button>
                            <Button sx={{ paddingRight: "20px" }} onClick={LogOut}>
                                <Stack direction="row" spacing={2}>
                                    <Avatar sx={{ padding: "5px", bgcolor: deepOrange[500] }}>{user.last_name.slice(0, 1)}{user.first_name.slice(0, 1)}</Avatar>
                                </Stack>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </AppBar>
            <Box sx={{ width: "400px", display: 'flex' }}>
                <Drawer
                    sx={{
                        width: "400px",
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: "200px",
                            boxSizing: 'border-box',
                            backgroundColor: "white",
                            boxShadow: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
                        },
                    }}
                    variant="permanent"
                    anchor="right"
                >
                    <Divider />
                    <List>
                        {['Inbox'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>

                            </ListItem>
                        ))}
                        <Divider />
                        <Stack paddingX={3} paddingTop="15px">
                            {
                                isEmpty ?
                                    (<Typography variant="h6">
                                        Cart is empty
                                    </Typography>) : ""
                            }
                            {
                                items.map(el => (
                                    <CartCard sx={{
                                        width: "10px !important",
                                        padding: "0",
                                        height: "13px",
                                    }} key={el.id} item={el} />
                                ))
                            }
                        </Stack>
                        <Stack direction='column'>
                            <Typography textAlign="center" marginTop={2}>Total: {cartTotal}</Typography>
                            <Button onClick={() => isEmpty(id)} sx={{
                                width: "100%",
                                marginX: "10px",
                                marginY: "10px",
                                width: "180px",
                            }} variant="contained" color="error">Clear</Button>
                            <Button sx={{
                                width: "100%",
                                marginX: "10px",
                                width: "180px",
                            }} variant='contained' size="medium" color="success"
                                onClick={() => setOrderModal(true)}
                            >
                                Order
                            </Button>
                        </Stack>
                    </List>
                </Drawer>
            </Box>
            {
                user ? (
                    <Box sx={{ marginLeft: "-10px", marginTop: "85px", }}>
                        <Box>
                            {
                                product.map(item => (
                                    <Box key={item.id}>
                                        <ClientProductCard item={item} />
                                        {/* <AdminProductCard item={item} /> */}
                                    </Box>
                                ))
                            }
                        </Box>
                    </Box>
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
            <Modal title="Are you sure?" modal={orderModal} setOrderModal={setOrderModal}>
                <Stack direction="row" spacing='2'>
                    <Button onClick={() => setOrderModal(false)} variant="outlined" color="error" endIcon={<Close />}>NO</Button>
                    <Button variant="outlined" color="succes" endIcon={<Done />}>Yes</Button>
                </Stack>
            </Modal>
        </>
    )
}
