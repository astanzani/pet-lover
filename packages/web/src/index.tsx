import React from 'react';
import ReactDOM from 'react-dom';
import { Auth } from '@aws-amplify/auth';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { ThemeProvider, CssBaseline } from '@mui/material';

import { apolloConfig, theme, darkTheme } from './config';
import reportWebVitals from './reportWebVitals';
import { App } from './App';
import './index.css';

Auth.configure({
  userPoolId: process.env.REACT_APP_USER_POOL_ID,
  userPoolWebClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
});

const client = new ApolloClient(apolloConfig);

const params = new URLSearchParams(window.location.search);
const isDark = params.get('theme') === 'dark';

const chosenTheme = isDark ? darkTheme : theme;

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={chosenTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
