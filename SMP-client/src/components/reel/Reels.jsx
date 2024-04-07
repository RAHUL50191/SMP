import React, { useState, useEffect } from 'react';
import { SERVER_URL, userId } from '../../config';
import { Avatar, Card, CardHeader } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
const Reels = () => {
  const [reels, setReels] = useState([]);
   // Get the JWT token from the Redux store
  //  const [jwt,setJwt] = useState(useSelector(state => state.auth.jwt));
  const jwt={payload:localStorage.getItem("jwt")}
  
  useEffect(() => {
    fetchReels();
  }, []);

  const fetchReels = async () => {
    try {
      
      const response = await axios.get(`${SERVER_URL}/reel/all`, {
        headers: {
          Authorization: `Bearer ${jwt.payload}`, // Include JWT token in the "Authorization" header
        },
      });
  
      // Extract data from the response
      const data = response.data;
      setReels(data); 
    } catch (error) {
      console.error('Error fetching reels:', error);
    }
  };

  const handleLike = async (userId,reelId) => {
    try {
      const response = await fetch(`${SERVER_URL}/reel/likeReel?userId=${userId}&reelId=${reelId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        fetchReels(); // Fetch updated reels data
        // setLike(like=>!like);
      } else {
        console.error('Error liking reel:', response.status);
      }
    } catch (error) {
      console.error('Error liking reel:', error);
    }
  };
  const handleUnLike = async (userId,reelId) => {
    try {
      const response = await fetch(`${SERVER_URL}/reel/unlikeReel?userId=${userId}&reelId=${reelId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        fetchReels(); // Fetch updated reels data

      } else {
        console.error('Error liking reel:', response.status);
      }
    } catch (error) {
      console.error('Error liking reel:', error);
    }
  };

  return (
    <Card className='flex-grow p-4 min-w-full'>
      {reels.length > 0 ? reels.map((reel) => (
        <div key={reel.id} className='w-full max-w-3xl max-h-dvh mx-auto bg-white rounded-lg shadow-md overflow-hidden my-4'>
          <CardHeader
            className='font-semibold text-6xl'
            title={<span style={{ fontSize: '24px' }}>{reel.user.name}</span>}
            subheader={reel.date}
            avatar={<Avatar></Avatar>}
          />
          <CardHeader title={reel.title} />
          <VideoPlayer videoId={reel.vidObj} />
          <VideoFooter  likes={reel.likes} reelId={reel.id} onLike={(userId,reelId) => handleLike(userId,reel.id)} 
          onUnLike={() => handleUnLike(userId,reel.id)} />
        </div>
      )) : (<p>No reels found. </p>)}
    </Card>
  );
};

const VideoFooter = ({reelId,likes, onLike ,onUnLike}) => {
    const [like, setLike] = useState(likes.includes(userId));
    const [TotalLike, setTotalLikes] = useState(likes.length);
    // console.log(likes,!likes.includes(userId))
  const handleLikeClick = async() => {
    if (!like) {
      setLike(true);
      setTotalLikes(prevLikes => prevLikes + 1);
      await onLike(userId,reelId);
    } else {
      setLike(false);
      setTotalLikes(prevLikes => prevLikes - 1);
      await onUnLike(userId,reelId);
    }
    
  };
  return (
    <div className="flex mx-auto m-2">
      <button>{TotalLike}</button> {like?"t":"f"}
      {likes.map(i=>i)}
      {like ?(<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={handleLikeClick}>
        UnLike
      </button>):<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={handleLikeClick}>
        Like
      </button>}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto">Comment</button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">Save</button>
    </div>
  );
};

const VideoPlayer = ({ videoId }) => {
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/reel/${videoId}`);
        const blob = await response.blob();
        const videoUrl = URL.createObjectURL(blob);
        setVideoUrl(videoUrl);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    fetchVideo();
  }, [videoId]);

  return (
    <div>
      {videoUrl ? (
        <video className='items-center justify-center flex' controls width="800">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Reels;
