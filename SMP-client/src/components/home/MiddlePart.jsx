import React, { useEffect, useState } from 'react'
import Posts from '../utils/post/Posts'
import axios from 'axios';
import { SERVER_URL } from '../../config'; 
import {useDispatch, useSelector } from "react-redux";
const {jwt,user}={jwt:JSON.parse(localStorage.getItem('jwt')),user:JSON.parse(localStorage.getItem('user'))}
function MiddlePart() {
  const [posts, setPosts] = useState([]); 
  const [loading,setLoading]=useState(false);
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/post/postsByUserFollowing`, {
        headers: {
          Authorization: `Bearer ${jwt}`, // Include JWT token in the "Authorization" header
        },
      }); 
      const data = await response.data;
      console.log(user.following)
      setPosts(data);
    } catch (error) {
      console.error('Error fetching reels:', error);
    }
  };
  useEffect(() => {
    setLoading(true)
    fetchPosts();
    setLoading(false)
  }, []);

  return (
    <div className='w-fit md:max-w-xl sm:max-w-xl max-w-sm  h-screen'>
      <Posts fetchPosts={fetchPosts} posts={posts} loading={loading}/>
    </div>
  )
}

export default MiddlePart
