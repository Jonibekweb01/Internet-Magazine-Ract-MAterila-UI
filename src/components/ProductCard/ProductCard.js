import { Button, Card, CardActions, CardContent, CardMedia, Divider, Typography } from "@mui/material"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../../contenxt/auth-content';
import { useCart } from "react-use-cart";

export const ClientProductCard = ({ item }) => {
    const { addItem } = useCart()
    const { name, price, image, id } = item;
    const navigate = useNavigate();
    const { token } = useContext(AuthContext)
    const handleClick = () => {
        if (token) {
            addItem(item);
        }
        else {
            navigate('/register')
        }
    }

    return (
        <>
            <Card sx={{ display: "flex", width: "1325px" }}>
                <CardMedia
                    sx={{ width: "300px", height: '345px' }}
                    image={image}
                    title="green iguana"
                />
                <Box sx={{
                    paddingTop: "90px",
                    paddingLeft: "50px"
                }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Price: {price}
                        </Typography>
                    </CardContent>
                </Box>
                <CardActions sx={{
                    marginLeft: "auto",
                    marginTop: "auto"
                }}>
                    <Button onClick={handleClick} size="large" sx={{ marginLeft: "auto", width: "100%" }} variant="contained" endIcon={<AddShoppingCartIcon />}>To card</Button>
                </CardActions>
            </Card>
            <Divider />
            <Divider />
            <Divider />
        </>
    )
}
