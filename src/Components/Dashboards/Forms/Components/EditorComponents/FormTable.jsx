import { useTheme } from '@emotion/react';
import { Delete, DisabledByDefault, Edit } from '@mui/icons-material';
import {TextField, Button,Typography,Stack,Chip,FormGroup,Checkbox, FormControlLabel, Select, MenuItem, Paper, InputLabel,FormControl   } from '@mui/material/';
import React from 'react';
import { deleteForm } from '../../../../../States/Reducers/FormSlice';
import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom"
import { saveFormMain } from '../../../../../Scripts/Server';
import store from '../../../../../States/Store';

const Table = ({ data, onEdit, onDelete, setDataEdit }) => {
  console.log("my dataaaaaaaaaaaa", data);
  const nav = useNavigate()
    const theme = useTheme()
    const dispatch = useDispatch()
    const thStyle = {
  backgroundColor: theme.palette.primary.main,
  padding: '12px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
  color: "white"
};

const tdStyle = {
  padding: '12px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd'
};

const askConfirmation = async (item) => {
    const confirmed = window.confirm('Are you sure you want to delete this item?')
    console.log(item);
    if(confirmed === true) {
        console.log("Working");
        dispatch(deleteForm(item))
        const attributes = store.getState().form.map((item) => {
          return {
            title: item.question,
            inputType: item.type,
            id: item.id,
            default: item.default,
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
        
        // console.log("TO be Deleted............", { tenantID: store.getState().tenant.tenantID, attributes} );
        const saved  = await saveFormMain({ tenantId: store.getState().tenant.tenantID, attributes})
              if(saved){
                console.log("saved  dfdfgs", saved);
                  // nav("/forms")
                  window.location.reload();
                }
    }
}


  return (
    <>
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={thStyle}>S.No</th>
          <th style={thStyle}>Title</th>
          <th style={thStyle}>Input Type</th>
          <th style={thStyle}>Required</th>
          <th style={thStyle}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
            <td style={tdStyle}>{index + 1}</td>
            <td style={tdStyle}>{item.question}</td>
            <td style={tdStyle}>{item.type}</td>
            <td style={tdStyle}>{item.required ? 'Yes' : 'No'}</td>
            <td style={tdStyle}>
              
                <Button disabled={item.default} ><Edit color='warning' onClick={() => setDataEdit((prev) => {return item})} /></Button>
                <Button disabled={item.default} ><Delete color='error' onClick = {() => askConfirmation(item)} /></Button>
              
                {/* <button onClick={() => onEdit(item)}>Edit</button> */}
              {/* <button style={buttonStyle} onClick={() => onDelete(item)}>Delete</button> */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <Button variant='conained' onClick={()=>{nav("/createForm") }} style={{ margin:"20px", backgroundColor: theme.palette.primary.main,color:"white" }}>Create New Fields</Button>
    </>
  );
};

export default Table;
