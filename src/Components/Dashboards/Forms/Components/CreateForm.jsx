import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import {TextField, Button,Typography,Select, MenuItem, InputLabel, FormControl } from '@mui/material/';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import EditorForm from './CreatorComponents/EditorPanel';
import DsiplayForm from './CreatorComponents/DisplayPanel';
import store from '../../../../States/Store';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CreateForm () {
  const [editing, setEditing] = React.useState(false)
  const [question, setQuestion] = React.useState("")
  const [dataOptions, setDataOptions] = React.useState("")
  const [formOptions, setFormOptions] = React.useState([])
  const [selectedValue, setSelectedValue] = useState("")
  const [addOptionsForm, setAddOptions] = React.useState(false)
  const [formItems, setFormItems] = React.useState([])
  const btnActions = {editor: setEditing}

  const [isChecked, setIsChecked] = React.useState(false);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleDataOptions = (event) => {
    const newInput = event.target.value;
    const newStrings = newInput.split(',').map((value) => value.trim()); // Split by comma, trim spaces
    setFormOptions((prev) => {return newStrings})
    setDataOptions((prev) =>{return newInput}); 
 
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

    // const handleDataOptions= (event) => {
    //     const newInput = event.target.value;
    //     const newStrings = newInput.split(',').map((value) => value.trim()); // Split by comma, trim spaces
    //     setFormOptions((prev) => {return newStrings})
    //     setDataOptions((prev) =>{return newInput}); 
    
    // };

  const options = [
  { value: 'CheckBoxes', key: 1 },
  { value: 'DropDown', key: 2 },
  // { value: 'Files', key: 3 },
  { value: 'paragraph', key: 4 },
  { value: 'Sentence', key: 5 },
  { value: 'Star Rating', key: 6 },
];

const handleSubmit = (e) =>{
e.preventDefault()
const newItem = {
  question: question,
  type: selectedValue,
  options: [formOptions], // Create a copy of formOptions
};

setFormItems((prevItems) => [...prevItems, newItem]);   
console.log("Form Items ",formItems);
}

const [fstate, setFstate] = useState([])
    const updateForms = () => {
      console.log("data ", store.getState().form);
      console.log("Called", fstate);
      setFstate(store.getState().form)
      console.log("state", fstate);
    }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid md={5}>
          <div>
            {/* <h2>Create Form</h2> */}
            <EditorForm updateForm={updateForms} />
          </div>
        </Grid>
        <Grid md={7}>
          <div>
            {/* <h2>Updated Form</h2> */}
            <DsiplayForm formState = {fstate}/>
            {/* {formItems.map((item) => {return <h4>{item.question}</h4>})} */}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
