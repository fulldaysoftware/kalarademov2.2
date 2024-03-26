import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import {TextField, Button,Typography,Stack,Chip,FormGroup,Checkbox, FormControlLabel, Select, MenuItem, Paper, InputLabel,FormControl   } from '@mui/material/';
import { Add, LockOutlined, Save } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { useDispatch } from 'react-redux';
import {UploadFile} from "@mui/icons-material"
import store from '../../../../../States/Store';
import {useSelector} from "react-redux"
import { useTheme } from '@emotion/react';
import CreateElement from '../../../Misc/ElementCreator';
import { getForms, saveFormMain } from '../../../../../Scripts/Server';
import {useNavigate} from "react-router-dom"


const DsiplayForm=({formState})=>{
    const dispatch = useDispatch()
    const theme = useTheme()
    const nav = useNavigate()
    const tenantId = useSelector(state=> state.tenant.tenantID)
    const saveForm = async() =>{
    //     {question: question,
    //   type: selectedValue,
    //   required: isChecked,
    //   options: [formOptions], }
    // { value: 'CheckBoxes', key: 1 },
    // { value: 'DropDown', key: 2 },
    // { value: 'Files', key: 3 },
    // { value: 'paragraph', key: 4 },
    // { value: 'Sentence', key: 5 },
    // { value: 'Star Rating', key: 6 },
         const attributes = store.getState().form.map((item) => {
            console.log("the dataaaaaaaaaaaaa", item.options);
            return {
                title: item.question,
                default: item.default,
                inputType: item.type,
                dataType:function() {
                    if(item.type == "Star Rating"){
                        return "INT"
                    }
                    else if(item.type == "Files"){
                        return "File"
                    }
                    else {
                        return "STRING"
                    }
                }(),
                required: item.required,
                options: function(){
                if(!Array.isArray(item.options) && (typeof item.options === "string") ) {
                    return item.options.split(",")
                }
                return item.options
                }() // Assuming options is defined elsewhere
            };
            });
            console.log("To be Added",attributes);

            // console.log("TO be Send", { tenantID: store.getState().tenant.tenantID, attributes} );
            // const saved  = await saveFormMain({ tenantId: store.getState().tenant.tenantID, attributes})
            // if(saved){
            //   const data = {tenantID: tenantId }
            //   const updaedForm = await getForms(data)
            //   console.log("the new onnnnnnnnnnnnnnnnnnn",updaedForm);
            //     const newForm = updaedForm.map((item) => {
            //         return  {question: item.title,
            //           type: item.inputType,
            //           default: item.default,
            //           id: item.id,
            //           required: item.required,
            //           options: item.options}})
            //     console.log("Form is Saved", updaedForm);
            //     dispatch(removeForm())
            //     dispatch(addToFormOnce(newForm))
            //     nav("/forms")
            // }

            console.log("TO be Send", { tenantID: store.getState().tenant.tenantID, attributes} );
            const saved  = await saveFormMain({ tenantId: store.getState().tenant.tenantID, attributes})
            if(saved){
                const updaedForm = await getForms(tenantId)
                
                nav("/forms")
            }
            

    }


    // const [fstate, setFstate] = useState(store.getState().form)
    // const updateForms = () => {
    //   setFstate((prev) => {
    //     return [...store.getState().form]
    //   })
    // }
    const paperStyle={padding :20, margin:"0 auto"}
    const avatarStyle={backgroundColor: theme.palette.primary.main}
    const btnstyle={margin:'8px 0'}

    return(
        <form>
        <Paper style={paperStyle} elevation={5}>
        <Grid container gap={3} alignContent="center">
            <Grid xs={12} align={'right'}>
                    <Button variant='contained' size='small' onClick={saveForm}><Save/> Save and Submit</Button>
            </Grid>
            <Grid xs={12}>
                    <h2 color={theme.palette.text.main}>Updated Form</h2>
            </Grid>
            
        { 
            store.getState().form.map((item) => {
            console.log("Execued ", item)
            return CreateElement(item, theme, true)
          })
        }
            
        </Grid>
        </Paper>
        </form>
    )
}

export default DsiplayForm