import { Avatar, Card, CardHeader, Divider, Skeleton, Typography } from '@mui/material';
import { SERVER_URL, userId } from '../../../config';
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../../redux/auth/reducer';
import { useNavigate } from 'react-router';
import { Favorite, FavoriteBorder, Bookmark, BookmarkBorderOutlined, Add } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
const {jwt,user}={jwt:JSON.parse(localStorage.getItem('jwt')),user:JSON.parse(localStorage.getItem('user'))}

const Posts=({fetchPosts,posts,loading})=> {
   
    // useEffect(() => {
    //   fetchPosts();
    // }, []);
 
    return (
    
        <Card className='flex-grow px-4 py-4 h-fit  '>
            {posts?posts.length > 0 ? posts.map((post) => (
                <PostCard key={post.id}  post={post}   fetchPosts={fetchPosts}/>
            )) :<div className='w-full min-w-[500px] max-w-3xl max-h-dvh mx-auto bg-white rounded-lg shadow-md overflow-hidden my-4 z-20 relative'>
            
            <CardHeader
              title={<Skeleton variant="text" />}
              subheader={<Skeleton variant="text" />}
              avatar={<Skeleton variant="circular" width={40} height={40} />}
            />
            <Skeleton variant="text" width="80%" height={30} animation="wave" />
            <Skeleton variant="rectangular" width="100%" height={200} animation="wave" />
            <div className="flex items-center p-4">
      <Skeleton variant="circular" width={40} height={40} className='mx-2'  />
      <Skeleton variant="circular" width={40} height={40}className='mx-2' />
      <Skeleton variant="circular" width={40} height={40} className='ml-auto' />
    </div>
          </div>:<>No Post Found</>}
        </Card>
       
    );
    
}
const PostCard=({post ,fetchPosts})=>{
  // const {jwt,user}=useSelector(state=>state.auth)
  const [commentTab, setCommentTab] = useState(false);
  const navigate=useNavigate()
 
  return <>
    <div key={post.id} className='w-full min-h-fit mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-4 z-20 relative' >
    <CardHeader CardHeader title={post.user.name} subheader={post.date} avatar={<Avatar onClick={()=>navigate(`profile/${post.user.id}`)}></Avatar>} />
    <div className='px-4 py-2'>
        <div className='font-semibold text-lg'>{post.title}</div>
    </div>
    <img 
        src={`data:image/jpeg;base64,${post.image.data}`} 
        alt={post.title} 
        height={700}
        width={800}
        className='w-full min-h-fit  object-cover' 
    />
    <PostFooter  likes={post.likes} postId={post.id} commentTab={commentTab} setCommentTab={setCommentTab}    />
    </div>
    <Comment open={commentTab} postId={post.id} comments={post.comments}  fetchPosts={fetchPosts}/>
  </>
}

const PostFooter = ({postId,likes ,setCommentTab,commentTab }) => { 
  const [like, setLike] = useState(likes.includes(userId));
  const [save, setSave] = useState(user.saved.includes(postId));
  const [TotalLike, setTotalLikes] = useState(likes.length);
  const [likeArr, setLikeArr] = useState(likes);
  const dispatch=useDispatch()

  const handleLike = async () => {
    try {
      const response = await axios.put(
        `${SERVER_URL}/post/${like ? 'unlikeReel' : 'likeReel'}?postId=${postId}`,
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
        console.error('Error liking/unliking post:', response.status);
      }
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  const handleCommentTab = () => {
    setCommentTab(prev => !prev);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${SERVER_URL}/post/${save ? 'unsaveReel' : 'saveReel'}?postId=${postId}`,
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
const Comment=({open,postId, comments,fetchPosts})=>{
  // const {jwt,user}=useSelector(state=>state.auth)
  const [comment,setComment]=useState(""); 
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    if (comments.length > 0) {
      fetchCommentsData();
    }
  }, [comments]);
  const fetchCommentsData = async () => {
    try {
      // const encodedIds = encodeURIComponent(JSON.stringify(comments)); // Encode the array as a JSON string and then encode the string
      const response = await axios.get(`${SERVER_URL}/comment/${comments}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setCommentData(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
      // Handle the error as needed
    }
  };
  
      
    
  const handleComment =async ()=> {
   const res=await axios.post(`${SERVER_URL}/comment/addComment`,{postId:postId,content:comment},{ 
    headers: {
      Authorization: `Bearer ${jwt }`, // Include JWT token in the "Authorization" header
  
    },
   }) 
   fetchCommentsData();
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
  rounded-b-lg p-4 shadow-2xl py-2 ' style={{ animation: 'customAni .2s ease-in-out 0s 1 normal forwards'}}>
    <div className='flex w-full' >
        <input type='text' onChange={(e)=>{setComment(e.target.value)}} className='px-2 w-80 '/>
        <button className='ml-auto snap-center bg-opacity-80 bg-slate-200 p-2 rounded-lg' onClick={handleComment}>Comment<Add style={{fontSize:"28px"}}/></button>
</div>
    {commentData.map((item)=>{return <Card key={item.id} sm={{ backgroundColor:'#121212',p:4}} className='snap-center flex px-2'>
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
       {/* {item} */}
      </Card>})} 
      
  </div>:<></>}</>)
}

export default Posts;
