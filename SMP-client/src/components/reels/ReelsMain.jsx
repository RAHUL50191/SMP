import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../../config';
import   axios  from 'axios';
import Reels from '../utils/reel/Reels';

function ReelsMain() {
    
  const [reels, setReels] = useState([]);
  const {jwt,user}={jwt:JSON.parse(localStorage.getItem('jwt')),user:JSON.parse(localStorage.getItem('user'))}
    const fetchReels=async () =>{
        try {
        
          const response = await axios.get(`${SERVER_URL}/reel/all`, {
            headers: {
              Authorization: `Bearer ${jwt}`, 
            },
          }); 
          const data = response.data;
          setReels(data); 
        } catch (error) {
          console.error('Error fetching reels:', error);
        }
      };
  useEffect(() => {
    fetchReels();
  }, []);
  return (
    <div className='w-fit md:max-w-xl sm:max-w-xl max-w-sm  h-screen'>
      <Reels fetchReels={fetchReels} reels={reels}/>
    </div>
  )
}

export default ReelsMain
