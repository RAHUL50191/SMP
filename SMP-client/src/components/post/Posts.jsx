import { Avatar, Card, CardHeader } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SERVER_URL,userId } from '../../config';

function Posts() {
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      fetchPosts();
    }, []);
  
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/post/all`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching reels:', error);
      }
    };
  
    const handleLike = async (userId,reelId) => {
      try {
        const response = await fetch(`${SERVER_URL}/post/likePost?userId=${userId}&postId=${reelId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        if (response.ok) {
          fetchPosts(); // Fetch updated reels data

        } else {
          console.error('Error liking reel:', response.status);
        }
      } catch (error) {
        console.error('Error liking reel:', error);
      }
    };
    const handleUnLike = async (userId,reelId) => {
      try {
        const response = await fetch(`${SERVER_URL}/post/unlikePost?userId=${userId}&postId=${reelId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        if (response.ok) {
          fetchPosts(); // Fetch updated reels data
          // setLike(like=>!like);
        } else {
          console.error('Error liking reel:', response.status);
        }
      } catch (error) {
        console.error('Error liking reel:', error);
      }
    };
  
    return (
        <Card className='flex-grow px-4 py-4 '>
       
            {posts.length > 0 ? posts.map((post) => (
                <div key={post.id} className='w-full max-w-3xl min-h-fit mx-auto bg-white rounded-lg shadow-md overflow-hidden my-4'>
                    <CardHeader CardHeader title={post.title} subheader={post.date} avatar={<Avatar></Avatar>} />
                    <div className='px-4 py-2'>
                        <div className='font-semibold text-lg'>{post.user.name}</div>
                    </div>
                    <img 
                        src={`data:image/jpeg;base64,${post.image.data}`} 
                        alt={post.title} 
                        height={700}
                        className='w-full min-h-fit  object-cover' 
                    />
                     <PostFooter  likes={post.likes} postId={post.id} onLike={() => handleLike(userId,post.id)} 
          onUnLike={() => handleUnLike(userId,post.id)} />
                </div>
            )) : <p>No posts found</p>}
        </Card>
    );
    
}
const PostFooter = ({reelId,likes, onLike ,onUnLike}) => {
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

export default Posts;
