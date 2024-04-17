// src/components/Login.js
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, TextField, Typography, Container, createMuiTheme } from '@mui/material';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAction } from '../redux/auth/action';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const Login = ({toggle,setToggle,progress,setProgress}) => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
 
  const { jwt, loading, error,user } = useSelector(state => state.auth);


  // Start progress bar when loading is true
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setProgress(oldProgress => {
          if (oldProgress === 100) {
            return 90;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 90);
        });
      }, 2500);
      x();
      return () => clearInterval(timer);
    }
  }, [loading]);

  // Handle login success or failure
 function x() {
    if (jwt) {
      // If JWT token is received, set progress bar to 100%
      setProgress(100);
      // Navigate to home page or any other page
      // navigate('/home');
    } else if (error) {
      // If error is received, log the error
      console.error("Server error:", error);
      // Reset progress bar
      setProgress(0);
    }
  }

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
  });

  const handleSubmit = (values, { setSubmitting }) => {
    try { 
        dispatch(loginUserAction({ data: values }));
        // const {jwt,user}={jwt:JSON.parse(localStorage.getItem('jwt')),user:JSON.parse(localStorage.getItem('user'))}
        if (jwt) {
            navigate('/home');
        }
    } catch (err) { 
        console.error(err);
        handleErr();
    } finally {
        setSubmitting(false);
    }
};
//error handling
 const [openErr,setOpenErr]=useState(false);

  function handleErr(){
    setOpenErr(true);
    setTimeout(() => { setOpenErr(false); }, 30000);
  }
  //style
  const theme = createTheme({
    palette: {
      background: {
        default : 'rgb(255, 26, 26)', // Set the default background color to red
      },
    },
  });
  return (
    <Container maxWidth="xs">
      {error? <Box sx={{ width: 500 }}>
      <ThemeProvider theme={theme}>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal:  "center" }}
            open={openErr}
            // onClose={handleClose}
            message={error.payload}
            key={"top"+ "center"}
             
          />    </ThemeProvider>
        </Box>:<></>}
        

      <Typography variant="h4" align="center" gutterBottom>
        Login 
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              as={TextField}
              name="email"
              label="Email"
              type="email"
              fullWidth
              margin="normal"
            />
            <ErrorMessage name="email" component="div" />

            <Field
              as={TextField}
              name="password"
              label="Password"
              type="password"
              fullWidth
              margin="normal"
            />
            <ErrorMessage name="password" component="div" />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
            <button className='text-cyan-600' onClick={()=>setToggle(!toggle)}>Login</button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;

