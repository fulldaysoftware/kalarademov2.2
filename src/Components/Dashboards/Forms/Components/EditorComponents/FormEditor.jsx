import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import {TextField,Checkbox, Button,Typography,Stack,Chip, Select, MenuItem, Paper, InputLabel,FormControl   } from '@mui/material/';
import { Add, LockOutlined } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import { useDispatch } from 'react-redux';
import { addToFormOnce, editForm, removeForm } from '../../../../../States/Reducers/FormSlice';
import { useTheme } from '@emotion/react';
import { useSelector, Provider } from 'react-redux';
import store from '../../../../../States/Store';
import {useNavigate} from "react-router-dom"
import { getForms, saveFormMain } from '../../../../../Scripts/Server';

const MainFormEditor=({data})=>{
  const tenantId = useSelector(state=> state.tenant.tenantID)
    const dispatch = useDispatch()
    console.log("I Got", data.type);
    

    useEffect(()=>{
        console.log("runs once", data);
    setQuestion((prev) => {return data.question})
    setDataOptions((prev)=> { return arrayToCommaSeparatedString(data.options)})
    },[data])

    function arrayToCommaSeparatedString(arr) {
  if (!Array.isArray(arr)) {
    return '';
  }
  
  return arr.join(', ');
}

    const [addOptionsForm, setAddOptions] = React.useState(false)
    const [selectedValue, setSelectedValue] = useState()
    const [formOptions, setFormOptions] = React.useState([])
    const [dataOptions, setDataOptions] = React.useState()
    const [formItems, setFormItems] = React.useState([])
    const [isChecked, setIsChecked] = React.useState();
    const [question, setQuestion] = React.useState(data.question)
    const theme = useTheme()



    const paperStyle={padding :20, margin:"0 auto"}
    const btnstyle={margin:'8px 0'}

    
    const handleDataOptions= (event) => {
        const newInput = event.target.value;
        const newStrings = newInput.split(',').map((value) => value.trim()); // Split by comma, trim spaces
        setFormOptions((prev) => {return newStrings})
        setDataOptions((prev) =>{return newInput}); 
    
    };
     
    const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

    const handleSelectOptions = (event) => {
   
    setSelectedValue((prev)=>{return event.target.value})
    console.log("current state", event.target.value);
    if(event.target.value == "CheckBoxes") {
      setAddOptions(true)
    }
    else if(event.target.value == "DropDown"){
      setAddOptions(true)
    }
    else 
    {
        setAddOptions(false)
        console.log("Updated", addOptionsForm);
    }
  };

        const options = [
    { value: 'CheckBoxes', key: 1 },
    { value: 'DropDown', key: 2 },
    { value: 'Files', key: 3 },
    { value: 'paragraph', key: 4 },
    { value: 'Sentence', key: 5 },
    { value: 'Star Rating', key: 6 },
    ];
    const handleSubmit = async (e) =>{
    e.preventDefault()
    const newItem = {
      question: question,
      type: selectedValue,
      required: isChecked,
      options: formOptions, // Create a copy of formOptions
    };
    console.log("Before ",{
      question: question,
      type: selectedValue,
      options: formOptions,
      required: isChecked
      
       // Create a copy of formOptions
    });
    dispatch(editForm(newItem))  
    window.location.reload()
    // setQuestion("")
    // setSelectedValue("")
    // setFormOptions([])
    // setDataOptions("")
    // setAddOptions(false)
    // console.log(store.getState());

    }

    const saveForm = async () =>{
      
         const attributes = store.getState().form.map((item) => {
            return {
                title: item.question,
                default: item.default ||  false,
                id: item.id ||  '',
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
                options: item.options // Assuming options is defined elsewhere
            };
            });

            console.log("TO be Send", { tenantID: store.getState().tenant.tenantID, attributes} );
            const saved  = await saveFormMain({ tenantId: store.getState().tenant.tenantID, attributes})
            if(saved){
              const data = {tenantID: tenantId }
              const updaedForm = await getForms(data)
              console.log("the new onnnnnnnnnnnnnnnnnnn",updaedForm);
                const newForm = updaedForm.map((item) => {
                    return  {question: item.title,
                      type: item.inputType,
                      default: item.default,
                      id: item.id,
                      required: item.required,
                      options: function(){
                        if(item.options) {
                          return item.options.split(",")
                        }
                        return null
                      }()}})
                console.log("Form is Saved", updaedForm);
                dispatch(removeForm())
                dispatch(addToFormOnce(newForm))
                nav("/forms")
            }
            

    }

    const nav = useNavigate()

    return(
        <form onSubmit={handleSubmit}>
        <Paper style={paperStyle} elevation={5}>
        <Grid container gap={3} alignContent="center">
            <Grid xs={12} align="right">
                    <Button variant='contained' onClick={saveForm}>Save and Close</Button>
            </Grid>
            <Grid xs={12}>
                    <h2 color={theme.palette.text.main}>Edit Form</h2>
            </Grid>
            <Grid align="center" xs={12}>
               <TextField type='text' label='Question'
               focused
                title="Not Editable"
               size='small'
                value={question}
                placeholder='Insert Your Question' fullWidth required/>
            </Grid>
            <Grid align="center" xs={12}>
            <FormControl fullWidth required>
            <InputLabel htmlFor="input-type-label">Choose Input Type</InputLabel>
               <Select
               label='Choose Input Type'
               focused
              value={selectedValue}
              size='small'
              onChange={handleSelectOptions}
              labelId="input-type-label">
                {
                    options.map((item, ind) => {
                       return <MenuItem selected={item.value === selectedValue} key={ind} value={item.value}>
                                        {item.value}
                                        </MenuItem>
                    })
                }
              
            </Select>
            </FormControl>
            </Grid>

            {addOptionsForm && <Grid align="center" xs={12}>
               <TextField label='Options' 
                value={dataOptions}
                onChange={handleDataOptions}
            //    value={password}
            //    onChange={(e) => {setPassword((prev) => {return e.target.value})}}
               placeholder='Enter Options' type='text' fullWidth/>
            </Grid>}
            <Grid xs={12}>
                <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '400px' }}>
                    {/* <Stack direction="row" spacing={1}> */}
                        {formOptions.map((item, ind) => {
                            if(item !== "") 
                                return <Chip key={ind} label={item} style = {{margin: '2px'  }} color="primary" />
                        })}
                    {/* </Stack> */}
                </div>
            </Grid>
            <Grid xs={12}>
                <Checkbox
                id='req'
                  checked={isChecked}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <label labelFor = "req">Required</label>
            </Grid>

            <Button type='submit' color='success' variant="outlined" style={btnstyle} fullWidth> Update Form</Button>
        </Grid>
        </Paper>
        </form>
    )
}

export default MainFormEditor