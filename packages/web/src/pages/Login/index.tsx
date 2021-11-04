import React, { useState } from 'react';
import {
  Alert,
  Box,
  Divider,
  TextField,
  Typography,
  Paper,
  InputAdornment,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Auth } from '@aws-amplify/auth';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { AlternateEmail, VpnKey } from '@mui/icons-material';

import logo from 'assets/pet-lover-logo.png';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Please input a valid email').required(),
  password: Yup.string().required(),
});

interface LoginSchema {
  email: string;
  password: string;
}

export function Login() {
  const [authError, setAuthError] = useState(null);
  const [authInProgress, setAuthInProgress] = useState(false);

  const login = async (values: LoginSchema) => {
    setAuthInProgress(true);
    try {
      await Auth.signIn(values.email, values.password);
    } catch (e: any) {
      setAuthInProgress(false);
      setAuthError(e.message);
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <img style={{ height: 60 }} src={logo} alt="Pet Lover logo" />
      <Divider variant="fullWidth" sx={{ height: 8 }} flexItem={true} />
      <Box
        sx={{
          padding: 1,
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Paper
          sx={{
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={(values) => login(values)}
          >
            {({ values, errors, handleChange, handleSubmit, isValid }) => (
              <Form
                style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={handleSubmit}
              >
                <Typography
                  variant="h5"
                  component="h1"
                  sx={{ marginBottom: 4 }}
                >
                  Login
                </Typography>
                <TextField
                  sx={{ marginBottom: 2, width: 400 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AlternateEmail fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  name="email"
                  label={errors.email ? errors.email : 'Email'}
                  type="email"
                  placeholder="email@provider.com"
                  error={!!errors.email}
                  value={values.email}
                  onChange={handleChange}
                />
                <TextField
                  sx={{ marginBottom: 1, width: 400 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKey fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  name="password"
                  label={errors.password ? errors.password : 'Password'}
                  type="password"
                  placeholder="pass"
                  error={!!errors.email}
                  value={values.password}
                  onChange={handleChange}
                />
                <Alert
                  sx={{
                    visibility: authError ? 'visible' : 'hidden',
                    marginBottom: 1,
                  }}
                  severity="error"
                >
                  {authError}
                </Alert>
                <LoadingButton
                  loading={authInProgress}
                  variant="contained"
                  type="submit"
                  disabled={!isValid}
                >
                  Login
                </LoadingButton>
                <LoadingButton
                  loading={false}
                  variant="contained"
                  type="submit"
                  onClick={login.bind(null, {
                    email: 'arnaldo.stanzani+1@gmail.com',
                    password: 'Password!123',
                  })}
                  sx={{ marginTop: 2 }}
                >
                  Login with test account
                </LoadingButton>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Box>
  );
}
