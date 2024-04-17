import React, { useState, useEffect } from 'react';
import { SERVER_URL, userId } from '../../../config';
import { Avatar, Card, CardHeader, Divider, Typography, Skeleton } from '@mui/material';
import { Favorite, FavoriteBorder, Bookmark, BookmarkBorderOutlined, Add } from '@mui/icons-material';
import { userData } from '../../../redux/auth/reducer';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const {jwt,user}={jwt:JSON.parse(localStorage.getItem('jwt')),user:JSON.parse(localStorage.getItem('user'))}


const Reels = ({ fetchReels,reels,loading}) => {
    return (
    <Card className='flex-grow p-4  w-full md:min-w-xl sm:min-w-md min-w-xl  '>
      {reels ?
        reels.length > 0 ?
           reels.map((reel) => (
              <ReelCard key={reel.id}  reel={reel}  fetchReels={fetchReels}/>
        )):
     <div className='w-full min-w-xl max-w-3xl max-h-dvh mx-auto bg-white rounded-lg shadow-md overflow-hidden my-4 z-20 relative'>
        <Skeleton variant="rectangular" width="100%" height={200} animation="wave" />
        <CardHeader
          title={<Skeleton variant="text" />}
          subheader={<Skeleton variant="text" />}
          avatar={<Skeleton variant="circular" width={40} height={40} />}
        />
        <Skeleton variant="text" width="80%" height={30} animation="wave" />
        <Skeleton variant="text" width="90%" height={20} animation="wave" />
      </div>:
      <div className='w-full' >No Reels Found</div>} 
    </Card>
  );
};
const ReelCard=({reel, fetchReels})=>{
  
  const [commentTab, setCommentTab] = useState(false);
    
  return <> 
    <div key={reel.id} className='w-full max-w-3xl max-h-dvh mx-auto bg-white rounded-lg shadow-md overflow-hidden my-4 z-20 relative'>
      <CardHeader
        className='font-semibold text-6xl'
        title={<span style={{ fontSize: '24px' }}>{reel.user.name}</span>}
        subheader={reel.date}
        avatar={<Avatar></Avatar>}
      />
      <CardHeader title={reel.title} />
      <VideoPlayer videoId={reel.vidObj} />
      <VideoFooter  likes={reel.likes} reelId={reel.id} commentTab={commentTab} setCommentTab={setCommentTab}/>
      
    <Comment open={commentTab} reelId={reel.id} comments={reel.comments}  fetchReels={fetchReels}/>
    </div> 
  </>
}
// const VideoFooter = ({reelId,likes,commentTab,setCommentTab}) => {
 

// const [like, setLike] = useState(likes.includes(userId));
// const [save, setSave] = useState(user.saved.includes(reelId));
// const [likeArr, setLikeArr] = useState(likes);
// const [TotalLike, setTotalLikes] = useState(likes.length);


// const handleLike = async() => {
//   if (!like) {
//     setLike(true);
//     setTotalLikes(prevLikes => prevLikes + 1);
//     try { 
//       const response = await axios.put(`${SERVER_URL}/reel/likeReel?reelId=${reelId}`, null, {
//         headers: {
//             Authorization: `Bearer ${jwt }`,
//         },
//       });
    
//       if (response.ok) { 
//         setLikeArr(response.data.likes)
//       } else {
//         console.error('Error liking reel:', response.status);
//       }
//     } catch (error) {
//       console.error('Error liking reel:', error);
//     }
    
//   } else {
//     setLike(false);
//     setTotalLikes(prevLikes => prevLikes - 1);
//     try {
//       const response = await axios.put(`${SERVER_URL}/reel/unlikeReel?reelId=${reelId}`, null, {
//         headers: {
//             Authorization: `Bearer ${jwt}`,
//         },
//     });
    
//       if (response.ok) { 
//         // console.log(response.data.likes)
//         setLikeArr(response.data.likes);
//       } else {
//         console.error('Error liking reel:', response.status);
//       }
//     } catch (error) {
//       console.error('Error liking reel:', error);
//     }
    
//   }
  
// };
// function handleCommentTab(){
//   setCommentTab(prev=>!prev);
// }
// const handleSave = async () => {
//   try {
//     if (save) {
//       const response=await axios.put(`${SERVER_URL}/reel/unsaveReel?reelId=${reelId}`, {}, {
//         headers: {
//           Authorization: `Bearer ${jwt }`,
//         },
//       }); 
//       await dispatch(userData( response.data  )); 
      
//     } else {
//       const response=await axios.put(`${SERVER_URL}/reel/saveReel?reelId=${reelId}`, {}, {
//         headers: {
//           Authorization: `Bearer ${jwt }`,
//         },
//       }); 
//       await dispatch(userData(   response.data  ));
//     }
//     setSave(prevSave => !prevSave);
//   } catch (error) {
//     // Handle error
//     console.error('Error occurred while saving/unsaving post:', error);
//   }finally{ console.log(user)}
// };
//   return (
//     <div className="flex mx-auto m-2 px-2 ">
      
//     {/* {like?"t":"f"} */}
//     {/* {likeArr.map(i=>i)} */}
//     <button className="font-bold p-2  rounded m " onClick={handleLike}>
//     {like ?<Favorite style={{ fontSize: '28px' }}/>:<FavoriteBorderIcon style={{ fontSize: '28px' }}/>}
//     </button>
  
//     <button className=" py-2 px-4 rounded ml-2 text-2xl" onClick={handleCommentTab}>
//       {commentTab ?<i class="fa-solid fa-comment"></i>:<i class="fa-regular fa-comment"></i>}
//     </button>
//       <Typography  className=" my-auto"    >
//       {TotalLike} likes
//       </Typography>
//     <button className=" font-bold text-black rounded text-2xl  ml-auto " onClick={handleSave}>{!save?<BookmarkBorderOutlinedIcon style={{ fontSize: '28px' }}/>:<BookmarkIcon style={{ fontSize: '28px' }}/> }</button>
//   </div>
//   );
// };
const VideoFooter = ({ reelId, likes, userId,commentTab, setCommentTab  }) => {
  const [like, setLike] = useState(likes.includes(userId));
  const [save, setSave] = useState(user.saved.includes(reelId));
  const [TotalLike, setTotalLikes] = useState(likes.length);
  const [likeArr, setLikeArr] = useState(likes);
  const dispatch=useDispatch()

  const handleLike = async () => {
    try {
      const response = await axios.put(
        `${SERVER_URL}/reel/${like ? 'unlikeReel' : 'likeReel'}?reelId=${reelId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
       
      if (response.status===200) {
        setLikeArr(response.data.likes);
        setTotalLikes(response.data.likes.length);
        setLike(prev=>!prev);
      } else {
        console.error('Error liking/unliking reel:', response.status);
      }
    } catch (error) {
      console.error('Error liking/unliking reel:', error);
    }
  };

  const handleCommentTab = () => {
    setCommentTab(prev => !prev);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${SERVER_URL}/reel/${save ? 'unsaveReel' : 'saveReel'}?reelId=${reelId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setSave(prev=>!prev);
      if (response.status===200) {
        dispatch(userData(response.data));
       
      } else {
        console.error('Error saving/unsaving post:', response.status);
      }
    } catch (error) {
      console.error('Error saving/unsaving post:', error);
    }
  };

  return (
    <div className="flex mx-auto m-2 px-2">
      <button className="font-bold p-2 rounded m" onClick={handleLike}>
        {like ? <Favorite style={{ fontSize: '28px' }} /> : <FavoriteBorder  style={{ fontSize: '28px' }} />}
      </button>
      <button className="py-2 px-4 rounded ml-2 text-2xl" onClick={handleCommentTab}>
        {commentTab ? <i className="fa-solid fa-comment"></i> : <i className="fa-regular fa-comment"></i>}
      </button>
      <Typography className="my-auto">{TotalLike} likes</Typography>
      <button className="font-bold text-black rounded text-2xl ml-auto" onClick={handleSave}>
        {save ? <Bookmark  style={{ fontSize: '28px' }} /> : <BookmarkBorderOutlined  style={{ fontSize: '28px' }} />}
      </button>
    </div>
  );
};

const VideoPlayer = ({ videoId }) => {
  const [videoUrl, setVideoUrl] = useState(null);
   
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        // const response = await fetch(`${SERVER_URL}/reel/${videoId}`);
        const response = await fetch(`${SERVER_URL}/reel/${videoId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          }
        });
        
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
        <video className='items-center justify-center flex  max-[1080px]:max-w-[500px] w-[800px] h-fit' controls  >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <Skeleton variant="rect" width={800} height={450} />
      )}
    </div>
  );
};
const Comment=({open,reelId, comments,fetchReels})=>{
  const [comment,setComment]=useState("");
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    const fetchCommentsData = async () => {
      const commentDataArray = await Promise.all(
        comments.map(async (cId) => {
          try {
            const resp = await axios.get(`${SERVER_URL}/comment/?cId=${cId}`, {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            });
            return resp.data;
          } catch (error) {
            console.error(`Error fetching comment with cId ${cId}:`, error);
            return null; // or handle the error as you wish
          }
        })
      );
      setCommentData(commentDataArray);
    };

    if (comments.length > 0) {
      fetchCommentsData();
    }
  }, [comments]);

  const handleComment =async ()=> {
   const res=await axios.post(`${SERVER_URL}/comment/addReelComment`,{postId:reelId,content:comment},{ 
    headers: {
      Authorization: `Bearer ${jwt }`, // Include JWT token in the "Authorization" header
  
    },
   })
   console.log(res)
   fetchReels();
  };
   function date(s){ 
      const now = new Date(); 
      const pastDate = new Date(s); 
      const differenceMs = now - pastDate;

      // Convert milliseconds to seconds
      const differenceSeconds = Math.floor(differenceMs / 1000); 

      const secondsInMinute = 60;
      const secondsInHour = secondsInMinute * 60;
      const secondsInDay = secondsInHour * 24;
      
      const days = Math.floor(differenceSeconds / secondsInDay);
      const hours = Math.floor((differenceSeconds % secondsInDay) / secondsInHour);
      const minutes = Math.floor((differenceSeconds % secondsInHour) / secondsInMinute);
      const seconds = Math.floor(differenceSeconds % secondsInMinute);

      
      if (days > 0) {
        return `${days}d ${hours}h ${minutes}m ${seconds}s ago.`;
    } else if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s ago.`;
    } else if (minutes > 0) {
        return `${minutes}m ${seconds}s ago.`;
    } else {
        return `${seconds}s ago.`;
    }
   }
  
  // dark:from-[#121212] dark:to-purple-950 

  return (<>{open?
  <div className='-z-10  max-h-[20vh] space-y-4  snap-y overflow-y-auto bg-gradient-to-b from-gray-300 to-gray-400  
  rounded-b-lg p-4 shadow-2xl py-2 ' style={{ animation: 'customAni .2s ease-in-out 0s 1 normal forwards'}} >
    <div className='flex w-full' >
        <input type='text' onChange={(e)=>{setComment(e.target.value)}} className='px-2 w-80 '/>
        <button className='ml-auto snap-center bg-opacity-80 bg-slate-200 p-2 rounded-lg' onClick={handleComment}>Comment<Add style={{fontSize:"28px"}}/></button>
</div>
    {commentData.map((item)=>{return <Card sm={{ backgroundColor:'#121212',p:4}} className='snap-center flex px-2' key={item.id}S>
      <div className="flex flex-col w-full">
        <div className='text-pretty font-bold flex'>
          <div className='w-fit'> {item.userName}</div>
          <div className='float-right font-normal ml-auto'>{date(item.createdAt)}</div>
        </div>
        <Divider/>
        <div>
          {item.content}
        </div>
       </div>
      </Card>})} 
      
  </div>:<></>}</>)
}
export default Reels;
