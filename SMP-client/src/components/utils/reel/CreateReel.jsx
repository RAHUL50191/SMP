import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { SERVER_URL } from '../../../config';

const { jwt, user } = {
  jwt: JSON.parse(localStorage.getItem('jwt')),
  user: JSON.parse(localStorage.getItem('user')),
};
const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  reel: Yup.mixed().required('File is required'),
});

const initialValues = {
  title: '',
  reel: null,
};

const CreateReel = () => {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('file', values.reel);

      const response = await axios.post(`${SERVER_URL}/reel/addReel`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Typography variant="h4">Add Reel</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue,values }) => (
          <Form>
            <div style={{ marginBottom: '1rem' }}>
              <Field
                as={TextField}
                variant="outlined"
                label="Title"
                name="title"
                fullWidth
                helperText={<ErrorMessage name="title" />}
              />
            </div>
            <div class="flex items-center justify-center w-full">
    <label  htmlFor='reel' class="flex bg-white flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  dark:hover:bg-bray-800 dark:g-gray-700 hover:g-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:g-gray-600 mb-4">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
        {values.reel ? (
           <svg
           fill="#6b7280"
           class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
           version="1.1"
           id="Layer_1"
           xmlns="http://www.w3.org/2000/svg"
           xmlnsXlink="http://www.w3.org/1999/xlink"
           viewBox="-45.5 -45.5 546.00 546.00"
           xmlSpace="preserve"
           transform="matrix(-1, 0, 0, 1, 0, 0)"
           stroke="#6b7280"
         >
           <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
           <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
           <g id="SVGRepo_iconCarrier">
             <path d="M0,0v455h455V0H0z M259.405,80c17.949,0,32.5,14.551,32.5,32.5s-14.551,32.5-32.5,32.5s-32.5-14.551-32.5-32.5 S241.456,80,259.405,80z M375,375H80v-65.556l83.142-87.725l96.263,68.792l69.233-40.271L375,299.158V375z"></path>
           </g>
         </svg>
 
) : (
  <svg viewBox="0 0 24 24" fill="#6b7280" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M8 10.4656V13.5344C8 15.6412 10.2299 16.4543 11.6609 15.7205L14.6534 14.1861C16.4489 13.2655 16.4488 10.7345 14.6534 9.81391L11.6609 8.27949C10.2299 7.54573 8 8.3588 8 10.4656ZM10 13.5344C10 13.8889 10.4126 14.113 10.7484 13.9408L13.7409 12.4064C14.0864 12.2293 14.0864 11.7707 13.7409 11.5936L10.7484 10.0592C10.4126 9.88702 10 10.1111 10 10.4656V13.5344Z" fill="#6b7280"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7ZM4 7C4 5.34315 5.34315 4 7 4H17C18.6569 4 20 5.34315 20 7V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V7Z" fill="#6b7280"></path> </g></svg>

)}
{!values.reel?
<p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>:
 <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Added</span></p>}
<p class="text-xs text-gray-500 dark:text-gray-400">MP4 & mov </p>

         
            
        </div> 
        
        <input  
                id="reel"
                name="reel"
                type="file"
                accept=".mp4,.mov"
                onChange={(event) => {
                  setFieldValue('reel', event.currentTarget.files[0]);
                }}
                style={{ display: 'none' }}
              />
    </label> 
    <ErrorMessage name="reel" component="div" style={{ color: 'red' }} />
</div> 
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateReel;
