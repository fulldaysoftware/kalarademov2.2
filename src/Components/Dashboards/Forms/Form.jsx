import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import NoForm from './Components/NoForm';
// import CreateForm from './Components/CreateForm';
import ViewForm from './Components/ViewForm';
// import EditForm from './Components/EditForm';
import store from '../../../States/Store';
import {Button} from '@mui/material'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getForms } from '../../../Scripts/Server';
import {useDispatch} from 'react-redux'
import { addToForm, addToFormOnce } from '../../../States/Reducers/FormSlice';


export default function Form() {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const [startEdit, setStartEdit] = useState(false)
  const [createForm, setCreateForm] = useState(false)

      useEffect(() => {
    const fetchData = async () => {
      const forms = await getForms({tenantID: store.getState().tenant.tenantID})
      const newForm = forms.map((item) => {
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
            console.log("result ", newForm);
        dispatch(addToFormOnce(newForm))

        const formState = store.getState().form;
      
      };

      console.log("NotWorkinnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
    fetchData(); // Call the function on component mount
  }, []);
  
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={12} alignContent={'left'}>
          <ViewForm setEdit = {setStartEdit}/>
        </Grid>
      </Grid>
    </Box>
  );
}
