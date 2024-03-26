import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Store from "./States/Store"
import { useSelector, Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import theme from "./Theme/Theme"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

