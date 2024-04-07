import React from 'react'
import HomeAside from './HomeAside'
import { Grid } from '@mui/material'
import SideBar from './SideBar'
import { Route, Routes, useLocation } from 'react-router-dom';
import MiddlePart from './MiddlePart';
import Reels from '../reel/Reels';
import CreateReel from '../reel/CreateReel';
import Posts from '../post/Posts';
import ChatRoom from '../chatroom/ChatRoom';
import CreatePost from '../post/CreatePost';
import Profile from '../profile/Profile'; 

function Home() {
  const location=useLocation();
  return ( 
      <Grid container spacing={0} className='flex justify-center mx-auto'>
       <Grid item xs={0} lg={2} className='relative'>
        <div className='sticky top-0'>
          <SideBar/>
        </div>
        </Grid>
        <Grid lg={location.pathname==="/"?7:7 } xs={12} item className='flex px-5 justify-center w-full'>

            <Routes>
              <Route path="/" element={<MiddlePart/>}/>
              <Route path="/reel" element={<Reels/>}/>
              <Route path="/create-reel" element={<CreateReel/>}/>
              <Route path="/explore" element={<Posts/>}/>
              <Route path="/create-post" element={<CreatePost/>}/>
              <Route path="/chat/:id" element={<ChatRoom/>}/>
              <Route path="/profile/:id" element={<Profile/>}/>
            </Routes>
        </Grid>
        <Grid item lg={3} className='relative'>
          <div className='sticky top-0  '>
            <HomeAside/>
          </div>
        </Grid>
        
      </Grid> 
  )
}

export default Home
