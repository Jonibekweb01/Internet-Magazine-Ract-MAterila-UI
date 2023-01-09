import { Paper, Typography, Link, TextField, InputAdornment, Button } from "@mui/material"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Stack } from "@mui/system";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { AuthContext } from "../../contenxt/auth-content";
import { UserContext } from "../../contenxt/user-context";
import './Login.css';


export const Login = () => {
    const adminEmail = useRef()
    const adminPassword = useRef()
    const { setToken } = useContext(AuthContext);
    const { setUser } = useContext(UserContext);
    const schema = Yup.object({

        email: Yup.string().email('Invalid formar').required('Reqiured'),
        password: Yup.string().min(3, "3 tadan kop kiriting").max(8, "8 tadan kop kiritng").required('Reqiured'),
    })

    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({
        mode: "all",
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(schema)
    })

    const navigate = useNavigate()
    const [inpType, setInpType] = useState(false)
    return (
        <>
            <div className="box">
                <Paper sx={{ boxShadow: 'none', backgroundColor: "transparent", width: "50%", marginX: "auto", marginTop: 15, padding: "32px" }}>
                    <Typography color="primary" variant="h4" component='h2' textAlign="center">
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit(data => {
                        axios.post('http://localhost:8080/login', data)
                            .then(res => {
                                if (res.status === 200) {
                                    setToken(res.data.accessToken)
                                    setUser(res.data.user)
                                    navigate("/")
                                }
                                console.log(res);
                            })
                            .catch(err => console.log(err))
                    })}>
                        <Stack spacing={2}>
                            <TextField variant="filled" type='email' color="primary" label='Email' error={errors.email ? true : false} helperText={errors.email ? "Required" : ''} {...register("email", { required: 'Required!!!' })} />
                            <TextField variant="filled" type={inpType ? "text" : "password"} color="primary" label='Password'
                                error={errors.password ? true : false}
                                helperText={errors.password?.message}
                                {...register("password", { required: 'Required!!!' })}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end" onClick={() => setInpType(!inpType)} >
                                        {
                                            inpType ? <RemoveRedEyeIcon cursor="pointer" /> : <VisibilityOffIcon cursor="pointer" />
                                        }
                                    </InputAdornment>
                                }} />
                            <Button type="submit" disabled={!isValid} size="large" variant="contained">Submit</Button>
                        </Stack>
                    </form>
                </Paper>
            </div>
        </>
    )
}
