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
  image: Yup.mixed().required('File is required'),
});

const initialValues = {
  title: '',
  image: null,
};

const CreatePost = () => {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('image', values.image);

      const response = await axios.post(`${SERVER_URL}/post/addPost`, formData, {
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
      <Typography variant="h4">Add Post</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue ,values}) => (
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
            {/* <div style={{ marginBottom: '1rem' }}>
              <input
                id="image"
                name="image"
                type="file"
                onChange={(event) => {
                  setFieldValue('image', event.currentTarget.files[0]);
                }}
                style={{ display: 'none' }}
              />
              <label htmlFor="image">
                <Button variant="contained" component="span">
                  Choose File
                </Button>
              </label>
              <ErrorMessage name="image" component="div" style={{ color: 'red' }} />
            </div> */}
            
<div class="flex items-center justify-center w-full">
    <label  htmlFor='image' class="flex bg-white flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  dark:hover:bg-bray-800 dark:g-gray-700 hover:g-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:g-gray-600 mb-4">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
        {values.image ? (
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
  <svg
    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 16"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2" // Corrected attribute name
      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
    />
  </svg>

)}
            {!values.image?
<p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>:
 <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Added</span></p>}
 <p class="text-xs text-gray-500 dark:text-gray-400">JPEG,JPG & PNG </p>
        </div> 
        <input  
                id="image"
                name="image"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(event) => {
                  setFieldValue('image', event.currentTarget.files[0]);
                }}
                style={{ display: 'none' }}
              />
    </label> 
    <ErrorMessage name="image" component="div" style={{ color: 'red' }} />
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

export default CreatePost;
