import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import {TextField, Button,Typography,Stack,Chip,FormGroup,Checkbox, FormControlLabel, Select, MenuItem, Paper, InputLabel,FormControl   } from '@mui/material/';
import { Add, Edit, EditAttributes, LockOutlined } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { useDispatch } from 'react-redux';
import {UploadFile} from "@mui/icons-material"
import store from '../../../../States/Store';
import {useNavigate} from "react-router-dom"
import { useTheme } from '@emotion/react';
import CreateElement from '../../Misc/ElementCreator';
import { getForms } from '../../../../Scripts/Server';
// import store from '../../../../States/Store';

const ViewForm=({setEdit})=>{
    const nav = useNavigate()
    const theme = useTheme()
    const paperStyle={padding :20, margin:"0 auto"}
    const avatarStyle={backgroundColor: theme.palette.primary.main}
    const btnstyle={margin:'8px 0'}



    return(
        <form>
        <Paper style={paperStyle} elevation={5}sx={{ width: "60%" }}>
        <Grid container gap={3} alignContent="center">
            
                <Grid xs={12} align='right'>
                    <Button variant='outlined' onClick={() => {nav("/editForm")}} color='error'><Edit/> Edit Form</Button>
            </Grid>
            <Grid xs={12}>
                    <h2 color={theme.palette.text.main}>Review Form</h2>
            </Grid>
            <Grid xs={12}>
                    { 
            store.getState().form.map((item) => {
            
            return CreateElement(item, theme, true)
          })
        }
            </Grid>
        </Grid>
        </Paper>
        </form>
    )
}

export default ViewForm