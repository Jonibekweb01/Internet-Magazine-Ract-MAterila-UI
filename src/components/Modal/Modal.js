import { useTheme } from "@emotion/react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, useMediaQuery } from "@mui/material"
import { useState } from "react";
import AddTaskIcon from '@mui/icons-material/AddTask';
import CloseIcon from '@mui/icons-material/Close';

export const Modal = ({ title, modal, setModal, children }) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Dialog
                open={modal}
                onClose={() => setModal(false)}
            >
                <DialogTitle id="responsive-dialog-title">
                    {`${title}`}
                    {modal ? (
                        <IconButton
                            aria-label="close"
                            onClick={() => setModal(false)}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </DialogTitle>
                {children}
            </Dialog>
        </>
    )
}
