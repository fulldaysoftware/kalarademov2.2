import React, { useState, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import {useParams } from "react-router-dom";
import { getClientReviewForm } from './Scripts/Server';
import {useDispatch} from "react-redux"
import { addFormElement } from './States/Reducers/reviewFormReducer';
import CreateElement from './Components/Dashboards/Misc/ElementCreator';
import { useTheme } from '@emotion/react';

const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: '50%',
  margin: 'auto',
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper, // Match background color
  boxShadow: theme.shadows[3], // Subtle shadow
  borderRadius: theme.shape.borderRadius,
  fontFamily: 'Roboto, sans-serif', // Use Roboto font
  display: 'flex',
  fontSize: 'medium',
  flexDirection: 'column',
  alignItems: 'center', // Center elements within the card
  justifyContent: 'center', // Vertically center elements within the card
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2), // Add margin after content
  width: '100%', // Make button responsive (full width)
  backgroundColor: theme.palette.primary.main, // Use primary color
  color: theme.palette.primary.contrastText, // White text
  '&:hover': {
    backgroundColor: theme.palette.primary.dark, // Darken on hover
  },
}));




const ClientReviewForm = () => {
    const theme = useTheme()

  let FormElementsMain = []
  const [elements, setElements] = useState([])
  const [branchName, setBranchName] = useState("")
  const { branchID } = useParams();

    console.log("My IDDDDDDDDDDD",branchID);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const formRef = useRef(null);

const clearForm = () => {
    const form = formRef.current;
    if (form) {
      const inputs = form.querySelectorAll('input, select, textarea'); // Target various form elements
      for (const input of inputs) {
        if (input.type === 'checkbox' || input.type === 'radio') {
          input.checked = false;
        } else {
          input.value = '';
        }
      }
    }
  };

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await fetch(`https://klara-backend.vercel.app/api/reviews/${branchID}`);
        if (!response.ok) {
          throw new Error(`Error fetching review: ${response.status}`);
        }
        const reviewData = await response.json();
        setBranchName((prev)=>{return reviewData.data.branchName})
        const newItems = {
            tenantId: reviewData.data.tenantId,
            branchId: reviewData.data.branchId,
            formElements: reviewData.data.attributes
        }
        const newForm = newItems.formElements.map((item) => {
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

        setElements((prev) => {return newForm})
        console.log("Formsssssssssssss", newForm);
        // dispatch(addFormElement(newItems))
        // Use the fetched data to populate form fields or perform other actions
      } catch (error) {
        console.error('Error fetching review:', error);
        // Handle the error appropriately
      }
    };

    fetchReviewData();
  }, [branchID]);

  elements.map((item) => {
    console.log("each element", item);
  })




  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Submitted Successfully!")
    window.location.reload()


    // Access form elements using formRef.current.elements
    const formData = new FormData(formRef.current);
    
    const getSelectedOption = () => {
    const dropdown = formRef.current ? formRef.current.querySelector('select') : null;
    return dropdown ? dropdown.value : '';
  };



    const getCheckedValues = () => {
        const checkedValues = [];
    const checkboxes = formRef.current.querySelectorAll('input[type="checkbox"]:checked');
    for (const checkbox of checkboxes) {
      checkedValues.push(checkbox.value);
    }
    return checkedValues;
};

console.log("Inputttttttttttttttts", getCheckedValues());
    // Loop through form entries and access values
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

  };

  // Form Elements (Array)
  const formElements = [
    { label: 'Name', name: 'name', type: 'text', required: true },
    { label: 'Email', name: 'email', type: 'email', required: true },
    { label: 'Message', name: 'message', type: 'text', multiline: true, rows: 4, required: true },
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5 }}>  {/* Added mt: 5 for margin-top */}
      <StyledCard>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            {branchName || "Client"} Review Form
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Share your feedback with us!
          </Typography>
        </CardContent>
        <form ref={formRef} noValidate style={{ width:"100%" }} autoComplete="off" onSubmit={handleSubmit}>
          {
            elements.map((item)=>{
                console.log("element ",item);
                return CreateElement(item, theme)
            })
          }
          
          {/* {formElements.map((element) => (
            <TextField
              key={element.name} // Add key for each element
              label={element.label}
              variant="outlined"
              fullWidth
              {...element} // Spread element properties
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
          ))} */}
          <StyledButton variant="contained" type="submit">
            Submit Review
          </StyledButton>
        </form>
      </StyledCard>
    </Box>
  );
};

export default ClientReviewForm;
