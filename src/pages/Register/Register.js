import { Paper, Typography, TextField, MenuItem, InputAdornment, Button } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import axios from "axios";
import { AuthContext } from "../../contenxt/auth-content";
import { UserContext } from "../../contenxt/user-context";


export const Register = () => {
    const [inpType, setInpType] = useState(false)

    const schema = Yup.object({
        first_name: Yup.string().required('Reqiured'),
        last_name: Yup.string().required('Reqiured'),
        email: Yup.string().email('Invalid formar').required('Reqiured'),
        password: Yup.string().min(3, "3 tadan kop kiriting").max(8, "8 tadan kam kiriting").required('Reqiured'),
        gender: Yup.string().required('Reqiured'),
    })
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        mode: "all",
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            gender: "",
        },
        resolver: yupResolver(schema)
    })
    const { setToken } = useContext(AuthContext);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <>
            <div className="box">
                <Paper sx={{ width: "50%", marginX: "auto", marginTop: 15, padding: "32px" }}>
                    <Typography marginBottom={2} color="primary" variant="h4" component='h2' textAlign="center">
                        Register
                    </Typography>
                    <form onSubmit={handleSubmit((data) => {
                        axios.post('http://localhost:8080/register', data)
                            .then(res => {
                                if (res.status === 201) {
                                    setToken(res.data.accessToken)
                                    setUser(res.data.user)
                                    navigate("/")
                                }
                                console.log(res)
                            })
                            .catch(err => console.log(err))
                    })}>
                        <Stack spacing={2}>
                            <TextField error={errors.first_name ? true : false} helperText={errors.first_name ? "Required" : ''} {...register("first_name", { required: 'Required!!!' })} type='text' color="primary" label='First Name' />
                            <TextField error={errors.last_name ? true : false} helperText={errors.last_name ? "Required" : ''} {...register("last_name", { required: 'Required!!!' })} type='text' color="primary" label='Surename' />
                            <TextField error={errors.email ? true : false} helperText={errors.email ? "Required" : ''} {...register("email", { required: 'Required!!!' })} type='email' color="primary" label='Email' />
                            <TextField
                                error={errors.password ? true : false}
                                helperText={errors.password?.message}
                                {...register("password", { required: 'Required!!!' })}
                                type={inpType ? "text" : "password"} color="primary" label='Password'
                                InputProps={{
                                    endAdornment: <InputAdornment position="end" onClick={() => setInpType(!inpType)} >
                                        {
                                            inpType ? <RemoveRedEyeIcon cursor="pointer" /> : <VisibilityOffIcon cursor="pointer" />
                                        }
                                    </InputAdornment>
                                }} />
                            <TextField error={errors.gender ? true : false} helperText={errors.gender ? "Required" : ''} {...register("gender")} label="Gender" select>
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                            </TextField>
                            <Button disabled={!isValid} type="submit" size="large" variant="contained">Submit</Button>
                        </Stack>
                    </form>
                </Paper>
            </div>
        </>
    )
}
