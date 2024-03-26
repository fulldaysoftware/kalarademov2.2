import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import {TextField, Button,Typography, Link, Paper  } from '@mui/material/';
import { LockOutlined } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import user_login from '../../Scripts/Server';
import { useDispatch } from 'react-redux';
import {login} from "../../States/Reducers/sessionSlice"
import {makeAdmin} from "../../States/Reducers/adminSlice"
import {addTenant} from "../../States/Reducers/tenatId"
import { useTheme } from '@emotion/react';
import { useNavigate} from 'react-router-dom'
import { addUser } from '../../States/Reducers/UserSlice';
import { addPlace } from '../../States/Reducers/placesSlice';

const Login=()=>{
    const nav = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const theme = useTheme()
    const loginHandler = async (e) => {
        e.preventDefault()
        const userData = { email, password };
        const Info =await user_login(userData)
        
        if(Info.response === "error") {
        // setLoading((prev) => {return false}) 
            console.log("Something is wrong");
        }
        if(Info.response == true) {
            console.log("Info...",Info);
            dispatch(login())
            dispatch(addTenant(Info.ID))
            dispatch(addUser(Info.user))
            if(Info.data) {
                dispatch(addPlace(Info.data))
            }

            
            // console.log("Logged in", Info.data);

            if(Info.isAdmin) {
                dispatch(makeAdmin())
                
            // console.log("Admin Data",Info.regions);
            // setRegions((prev) => {return Info.regions})
            // setAdmin((prev) => {return true})
            }
            nav("/")
            // localStorage.setItem('data', Info.data);
            // setLoading((prev) => {return false})
            // setHotels((prev) => {return Info.data})
            // login((prev) => {return true})
            // window.sessionStorage.setItem("login", true);
        }
        if(Info.response == false) {
            console.log("wrong credential");
        }
    }


    const paperStyle={padding :20,width:300, margin:"0 auto", marginTop: '5%'}
    const avatarStyle={backgroundColor: theme.palette.primary.main}
    const btnstyle={margin:'8px 0'}

    return(
        <form onSubmit={loginHandler}>
        <Paper style={paperStyle} elevation={5}>
        <Grid container gap={3} alignContent="center">
            <Grid align="center" xs={12}>
                    <Avatar style={avatarStyle}><LockOutlined/></Avatar>
                    <h2 color={theme.palette.text.main}>Sign In</h2>
            </Grid>
            <Grid align="center" xs={12}>
               <TextField type='email' label='Email'
               size='small'
                value={email}
                onChange={(e) => {setEmail((prev) => {return e.target.value})}}
                placeholder='Enter email' fullWidth required/>
            </Grid>
            <Grid align="center" xs={12}>
               <TextField label='Password' 
               value={password}
               size='small'
               onChange={(e) => {setPassword((prev) => {return e.target.value})}}
               placeholder='Enter password' type='password' fullWidth required/>
            </Grid>
            <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography color={theme.palette.text.main}>
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
        </Grid>
        </Paper>
        </form>
    )
}

export default Login