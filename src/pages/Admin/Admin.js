import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useContext } from 'react';
import { UserContext } from '../../contenxt/user-context';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { Link as RouterLink, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { Link } from "@mui/material"
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import ClassRoundedIcon from '@mui/icons-material/ClassRounded';
import { Order } from '../Order/Order';
import { Products } from '../Products/Products';
import { Category } from '../Category/Category';

const drawerWidth = 240;

export const Admin = () => {

    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const handleClick = () => {
        localStorage.removeItem('token')
        localStorage.removeItem("uswer")
        navigate("/login")
    }
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, marginBottom: "20px" }}
                >
                    <Toolbar>
                        <Typography sx={{ display: "flex", alignItems: "center", gap: "5px" }} variant="h6" noWrap component="div">
                            Admin  {user.first_name}
                        </Typography>
                        <Button onClick={handleClick} sx={{ marginLeft: "auto" }} variant="filled">
                            <Link sx={{ display: "flex", gap: "5px", alignItems: "center" }} underline="none" color="white" to='/register' component={RouterLink} >
                                Add
                                <PersonAddAlt1Icon />
                            </Link>
                        </Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar>
                        <Typography sx={{ display: "flex", alignItems: "center", gap: "5px" }} variant="h6" noWrap component="div">
                            {user.first_name}
                            <AccountCircleIcon />
                        </Typography>
                    </Toolbar>
                    <Divider />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ display: "flex", gap: "15px" }} component={NavLink} to="order">
                                <ViewModuleRoundedIcon color={'info'} />
                                <ListItemText sx={{ color: "#1976D2FF" }} primary="Orders" />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding>
                            <ListItemButton sx={{ display: "flex", gap: "15px" }} component={NavLink} to="category">
                                <ClassRoundedIcon color={'info'} />
                                <ListItemText sx={{ color: "#1976D2FF" }} primary="Category" />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding>
                            <ListItemButton sx={{ display: "flex", gap: "15px" }} component={NavLink} to="products">
                                <InventoryRoundedIcon color={'info'} />
                                <ListItemText sx={{ color: "#1976D2FF" }} primary="Products" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                >
                </Box>
            </Box>
            <div>
                <Routes>
                    <Route path="/" element={<h1>Adminka</h1>} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/category" element={<Category />} />
                </Routes>
            </div>
        </>
    )
}
