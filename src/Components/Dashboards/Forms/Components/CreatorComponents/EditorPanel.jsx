import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import {TextField,Checkbox, Button,Typography,Stack,Chip, Select, MenuItem, Paper, InputLabel,FormControl   } from '@mui/material/';
import { Add, LockOutlined } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import { useDispatch } from 'react-redux';
import { addToForm } from '../../../../../States/Reducers/FormSlice';
import { useTheme } from '@emotion/react';
import { useSelector, Provider } from 'react-redux';
import store from '../../../../../States/Store';

const EditorForm=({updateForm})=>{
    const dispatch = useDispatch()
  const formele = useSelector((state) => state.form)

    const [addOptionsForm, setAddOptions] = React.useState(false)
    const [selectedValue, setSelectedValue] = useState("")
    const [formOptions, setFormOptions] = React.useState([])
    const [dataOptions, setDataOptions] = React.useState("")
    const [formItems, setFormItems] = React.useState([])
    const [isChecked, setIsChecked] = React.useState(false);
    const [question, setQuestion] = React.useState("")
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
      id: question,
      default: false,
      type: selectedValue,
      required: isChecked,
      options: [...formOptions], // Create a copy of formOptions
    };
    dispatch(addToForm(newItem))  
    setQuestion("")
    setSelectedValue("")
    setFormOptions([])
    setDataOptions("")
    setAddOptions(false)
    console.log(store.getState());
    updateForm()
    }
    return(
        <form onSubmit={handleSubmit}>
        <Paper style={paperStyle} elevation={5}>
        <Grid container gap={3} alignContent="center">
            <Grid xs={12}>
                    <h2 color={theme.palette.text.main}>Create Form</h2>
            </Grid>
            <Grid align="center" xs={12}>
               <TextField type='text' label='Question'
               size='small'
                value={question}
                onChange={(e) => {setQuestion((prev) => {return e.target.value})}}
                placeholder='Insert Your Question' fullWidth required/>
            </Grid>
            <Grid align="center" xs={12}>
            <FormControl fullWidth required>
            <InputLabel htmlFor="input-type-label">Choose Input Type</InputLabel>
               <Select
               label='Choose Input Type'
              value={selectedValue}
              size='small'
              onChange={handleSelectOptions}
              labelId="input-type-label">

              <MenuItem key={options[0].key} value={options[0].value}>
                  {options[0].value}
                </MenuItem>
                <MenuItem key={options[1].key} value={options[1].value}>
                  {options[1].value}
                </MenuItem>
                <MenuItem key={options[2].key} value={options[2].value}>
                  {options[2].value}
                </MenuItem>
                <MenuItem key={options[3].key} value={options[3].value}>
                  {options[3].value}
                </MenuItem>
                <MenuItem key={options[4].key} value={options[4].value}>
                  {options[4].value}
                </MenuItem>
                <MenuItem key={options[5].key} value={options[5].value}>
                  {options[5].value}
                </MenuItem>
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

            <Button type='submit' color='success' variant="outlined" style={btnstyle} fullWidth> Add to Form</Button>
        </Grid>
        </Paper>
        </form>
    )
}

export default EditorForm