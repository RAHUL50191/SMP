 
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom' 
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios';
import { SERVER_URL } from '../../config'; 
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Posts from '../utils/post/Posts';
import Reels from '../utils/reel/Reels';
import { ThemeProvider } from '@emotion/react';
import { Avatar, Card, CardHeader } from '@mui/material';
import { Typography } from '@mui/material';
import CreatePost from '../utils/post/CreatePost';
import CreateReel from '../utils/reel/CreateReel';

function UserProfile() {
  
    const { jwt, user } = useSelector(state => {
        if (state.auth.user && state.auth.jwt) {
          return state.auth;
        } else {
          return {
            jwt: JSON.parse(localStorage.getItem('jwt')),
            user: JSON.parse(localStorage.getItem('user'))
          };
        }
      });
console.log(user)

  const [data,setData]=useState(user)
  const {id}=user
    console.log(id); 
//   const fetchData=async ()=>{
//     const res=await axios.get(`${SERVER_URL}/user/${id}`,{ headers: {
//       Authorization: `Bearer ${jwt }`,
//   },})
//     setData(res.data);
//   }
  
//   useEffect(()=>{
//     fetchData();
//   },[])
 
  return (
    <div className="flex px-2 flex-wrap min-h-screen text-wrap w-full   sm:max-w-lg  md:max-w-xl  lg:max-w-full ">
      <div className='min-h-60 w-full'>
      <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: '#007FFF',
            dark: '#0066CC',
          },
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: 200,
          borderRadius: 1,
          bgcolor: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        }}
      />
    </ThemeProvider>
    <Avatar  size="large" sx={{width:'10rem',height:"10rem",display:"absolute",top:-85,left:60}}/>
    <div className="w-full flex justify-between px-4">
    <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' ,justifyContent:"start"}}>{data.name}</Typography>
  <Typography variant="body1" sx={{ textAlign: 'center' ,justifyContent:"end"}}>Following: {Object.keys(data.following).length}</Typography>
  <Typography variant="body1" sx={{ textAlign: 'center',justifyContent:"end" }}>Followers: {Object.keys(data.followers).length}</Typography>
        {/* posts{posts.length}Reels{reels.length} */}</div> 
      </div>
      <div className='grow'></div>
      
      <LabTabs id={id} data={data} setData={setData} jwt={jwt}/>
    </div>
  )
}
 function LabTabs({id,data,setData,jwt}) { 
  const [value, setValue] = React.useState('1');
  const [posts,setPosts]=useState([])
  const [reels,setReels]=useState([])
  const [loading,setLoading]=useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(()=>{
    setLoading(true);
    fetchPostData();
    fetchReelData()
    setLoading(false);
  },[])
  const fetchPostData=async ()=>{
    
    const res=await axios.get(`${SERVER_URL}/post/postsByUsers?id=${id}`,{ headers: {
      Authorization: `Bearer ${jwt }`,
  },})
    setPosts(res.data);
    
  }
  const fetchReelData=async ()=>{
    const res=await axios.get(`${SERVER_URL}/reel/reelsByUsers?id=${id}`,{ headers: {
      Authorization: `Bearer ${jwt }`,
  },})
    setReels(res.data);
  }
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}  >
      <TabContext value={value} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Posts" value="1" />
            <Tab label="Reels" value="2" />
            {/* <Tab label="Item Three" value="3" /> */}
          </TabList>
        </Box>
        {/* <div className='max-w-2xl justify-center flex'> */}
        <TabPanel value="1"  sx={{justifyContent:'center',maxWidth:700,marginX:"auto"}}>
          <CreatePost/>
          <Posts  posts={posts} fetchPosts={fetchPostData} loading={loading}/></TabPanel>
        <TabPanel value="2" sx={{justifyContent:'center',maxWidth:700,marginX:"auto"}}>
          <CreateReel/>
          <Reels reels={reels} fetchReels={fetchReelData} loading={loading}/></TabPanel>
        {/* </div> */}
        {/* <TabPanel value="3">Item Three</TabPanel> */}
      </TabContext>
    </Box>
  );
}  
export default UserProfile