import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@emotion/react';
import Button from '@mui/material/Button';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function NoForm({createForm}) {
  const nav = useNavigate()
  const [editing, setEditing] = React.useState(false)
  const btnActions = {editor: setEditing}
  const theme = useTheme()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={12} alignContent={'left'}>
            <h1 color={theme.palette.text.main}>You Have No Forms Create New Form</h1>
            <Button variant="outlined" onClick={() => { nav("/createForm") }} startIcon={<Add />} color="success">
                Create Form
            </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
