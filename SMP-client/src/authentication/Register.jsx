// src/components/Login.js
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, TextField, Typography, Container } from '@mui/material';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginUserAction, registerUserAction } from '../redux/auth/action';

const Register= ({toggle,setToggle}) => {
  // const [isSubmitting,setSubmitting]=useState(false);
  const dispatch=useDispatch();

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission logic here
    console.log(values);
    dispatch(registerUserAction({data:values}))
    setSubmitting(false);
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
       Register
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
              name="id"
              label="id"
              type="id"
              fullWidth
              margin="normal"
            />
             <Field
              as={TextField}
              name="name"
              label="name"
              type="name"
              fullWidth
              margin="normal"
            />
            <ErrorMessage name="name" component="div" />
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
              {isSubmitting ? 'Logging in...' : 'Register'}
            </Button>
          </Form>
        )}
      </Formik>
      <button className='text-cyan-600' onClick={()=>setToggle(!toggle)}>Login</button>
    </Container>
  );
};

export default Register;

