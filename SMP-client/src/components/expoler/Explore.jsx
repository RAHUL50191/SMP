import React, { useEffect, useState } from 'react'
import Posts from '../utils/post/Posts'
import axios from 'axios';
import { SERVER_URL } from '../../config';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {useDispatch, useSelector } from "react-redux";
const {jwt,user}={jwt:JSON.parse(localStorage.getItem('jwt')),user:JSON.parse(localStorage.getItem('user'))}

function Explore() {
  const [posts, setPosts] = useState([]); 
  
  const [loading,setLoading]=useState(false);
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/post/all`, {
        headers: {
          Authorization: `Bearer ${jwt }`, // Include JWT token in the "Authorization" header
        },
      });
      console.log(response)
      const data = await response.data;
      setPosts(data);
    } catch (error) {
      console.error('Error fetching reels:', error);
    }
  };
  useEffect(()=>{
    setLoading(true)
    fetchPosts()
    setLoading(false)
  },[])
  const handleRedirect=()=>{
    
  }
  return (
    <div className='w-fit md:max-w-4xl sm:max-w-md max-w-sm  h-screen'>
      {/* <Posts fetchPosts={fetchPosts} posts={posts}/> */}
      <ImageList cols={3}>
  {posts.length<1?<>Loading</>:posts.map((item) => (
    <ImageListItem key={item.id}>
      <img
        srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        src={`data:image/jpeg;base64,${item.image.data}`}
        alt={item.title}
        loading="lazy"
      />
      <div className='hover:static hidden'>{item.likes.length} {item.comments.length}</div>
    </ImageListItem>
  ))}
</ImageList>
    </div>
  )
}

export default Explore
