import { Delete, Edit } from "@mui/icons-material"
import { Button, Card, CardActions, CardContent, CardMedia, Divider, Typography } from "@mui/material"
import { Box } from "@mui/system";
import axios from "axios";

export const AdminProductCard = ({ item, setProduct, product }) => {
    const { name, price, image, id } = item;
    const del = (delId) => {
        axios.delete('http://localhost:8080/products/' + delId)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err))
    }

    return (
        <>
            <Card sx={{ display: "flex", width: "1238px" }}>
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
                    <Button size="large" sx={{ marginLeft: "auto", width: "100%", padding: "10px 20px 10px 10px" }} color='info' variant="contained" endIcon={<Edit />}></Button>
                    <Button onClick={() => del(id)} size="large" sx={{ marginLeft: "auto", width: "100%", padding: "10px 20px 10px 10px" }} color='error' variant="contained" endIcon={<Delete />}></Button>
                </CardActions>
            </Card>
            <Divider />
            <Divider />
        </>
    )
}
