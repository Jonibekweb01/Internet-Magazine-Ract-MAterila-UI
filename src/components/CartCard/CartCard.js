import { Avatar, Box, Button, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useCart } from "react-use-cart";

export const CartCard = ({ item }) => {
    const { name, price, id, quantity } = item;
    const { updateItemQuantity, removeItem } = useCart()
    return (
        <>
            <ListItem sx={{
                display: "flex", flexDirection: "column",
                alignItems: "center",
                textAlign: "center"
            }}>
                <Stack mb="10px" direction={"row"} spacing={1}>
                    <ListItemAvatar>
                        <Avatar></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={name} secondary={`$${price}`} />
                </Stack>
                <Box>
                    <Stack>
                        <Button sx={{ paddingY: "4px" }} onClick={() => updateItemQuantity(id, quantity + 1)} variant='contained' size="small" color="primary">
                            +
                        </Button>
                        <Typography>{quantity}</Typography>
                        <Button sx={{ padding: "3px", marginBottom: "10px" }} onClick={() => updateItemQuantity(id, quantity - 1)} variant='contained' size="small" color="primary">
                            -
                        </Button>
                        <Button onClick={() => removeItem(id)} variant='contained' size="small" color="error">
                            Remove
                        </Button>
                      
                    </Stack>
                </Box>
            </ListItem>
            <Divider />
            <Divider />
        </>
    )
}
