import {TextField,Checkbox, Button,Typography,Stack,Chip, Select, MenuItem, Paper, InputLabel,FormControl, FormControlLabel, Grid, Rating, FormGroup,    } from '@mui/material/';
import { UploadFile } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
// const theme = useTheme()
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


const CreateElement = (data, theme) => {
   
    const newItem =  {}
//     newI
//     // const theme = useTheme()
//     const newItem = {
//   question: question,
//   type: selectedValue,
//   options: [formOptions], // Create a copy of formOptions
// };
// newItem.question = data.title
// newItem.type = data.inputType
// newItem.required = data.required
// newItem.options = data.options





switch (data.type) {
    case 'CheckBoxes':
        return <Grid align="left" xs={12}>
  <label color={theme.palette.text.main} name={data.question} htmlFor="chk">{data.question}</label>
  <FormGroup name={data.question} id={data.question}>
    {data.options.map((item) => (

      <FormControlLabel
        name={data.question} 
        key={item} // Add a unique key for each checkbox
        control={<Checkbox />}
        value={item}
        label={item}
      />
    ))}
  </FormGroup>
</Grid>
        break;
    case 'DropDown':
        return <Grid align="center" xs={12}>
            <FormControl fullWidth required>
            <InputLabel  htmlFor="input-type-label">{data.question}</InputLabel>
               <Select
                name={data.question}
               required = {data.required} 
               label={data.question}
              size='small'
              labelId="input-type-label">
                {
                    data.options.map((item) => {
                        return <MenuItem key={item} name={data.question}  value={item}>
                        {item}
                        </MenuItem>
                    })
                }
            </Select>
            </FormControl>
            </Grid>
        break;
    case 'Files':
        return <Grid align="center" xs={12}>
                        <TextField
                        sx={{ display: 'none' }}
                id="file-upload"
                type="file"
                name={data.question} 
                required = {data.required} 
              />
              <label htmlFor="file-upload">
                <Button variant="contained" component="span" fullWidth startIcon={<UploadFile />}>
                 {data.question}
                </Button>
              </label>
            </Grid>
        break;
    case 'paragraph':
        return <Grid align="center" xs={12}>
               <TextField type='text' label={capitalize(data.question)}
               size='small'
               multiline
                name={data.question}
               rows={4}
               required = {data.required} 
               fullWidth
               maxRows={7}/>
            </Grid>
        break;
    case 'Sentence':
        return <Grid align="center" xs={12}>
               <TextField type='text' label={capitalize(data.question)}
               required = {data.required} 
                name={data.question}
               size='small'
                placeholder={capitalize(data.question)} fullWidth/>
            </Grid>
        break;
    case 'Star Rating':
        return <Grid align="left" xs={12}>
              <Typography color={theme.palette.text.main} component="legend">{data.question}</Typography>
              <Rating
              required = {data.required} 
               name={data.question}
                
              />

              {/* <Typography component="legend">Controlled</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      /> */}
            </Grid>
        break;

    default:
        return ""
        break;
}

}

export default CreateElement