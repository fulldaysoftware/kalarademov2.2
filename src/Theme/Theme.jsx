import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#186F65', // A cool blue
    },
    secondary: {
      main: '#FFC107', // Orange contrast
    },
    background: {
      default: '#f5f5f5', // Light background
    },
    text:{
        main: '#040D12'
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Roboto font
  },
  breakpoints: {
    xs: 0, // Adjust breakpoints for your needs (optional)
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          fontFamily: 'Roboto, sans-serif',
        },
      },
    },
  },
});

export default theme;
