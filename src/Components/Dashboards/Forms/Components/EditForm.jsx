import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import {TextField, Button,Typography,Select, MenuItem, InputLabel, FormControl } from '@mui/material/';
import store from '../../../../States/Store'
import MainFormEditor from './EditorComponents/FormEditor';
import Table from './EditorComponents/FormTable';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function EditForm () {

  const [dataEdit, setDataEdit] = useState({})

const paperStyle={padding :20, margin:"0 auto"}

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid md={7}>
          <div>
            <Paper style={paperStyle} elevation={5}>
              <Grid container gap={3} alignContent="center">
                <Grid xs={12}>
                  <h2>Form Attributes</h2>
                  {
          
                    <Table data={store.getState().form} setDataEdit = {setDataEdit} />
                  }
                </Grid>
              </Grid>
            </Paper>
          </div>
        </Grid>
        <Grid md={5}>
          <div>
            <MainFormEditor data = {dataEdit} />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
