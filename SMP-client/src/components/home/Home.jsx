import React, { useState, useEffect } from 'react';
import HomeAside from './Suggest';
import { Grid } from '@mui/material';
import SideBar from './SideBar';
import { Route, Routes, useLocation } from 'react-router-dom';
import MiddlePart from './MiddlePart';
import Reels from '../utils/reel/Reels';
import CreateReel from '../utils/reel/CreateReel';
import Posts from '../utils/post/Posts';
import ChatRoom from '../chatroom/ChatRoom';
import CreatePost from '../utils/post/CreatePost';
import Profile from '../profile/Profile';  
import Explore from "../expoler/Explore";
import { loginSuccess, userData } from '../../redux/auth/reducer';

import {useDispatch, useSelector } from "react-redux";
import UserProfile from '../profile/UserProfile';
import ReelsMain from '../reels/ReelsMain';
import Suggest from './Suggest';

function Home() {
  const location = useLocation();
  const [suggest, setSuggest] = useState(false);  
  // const {jwt,user}={jwt:JSON.parse(localStorage.getItem('jwt')),user:JSON.parse(localStorage.getItem('user'))}
  const dispatch=useDispatch(); 
  const {jwt,user}=useSelector(state=>state.auth)
  useEffect(() => {
    
    if(!jwt){
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const storedJwt = JSON.parse(localStorage.getItem('jwt'));
      if(storedJwt){
        dispatch(loginSuccess({token:storedJwt,user:storedUser}))
      }
      else if(storedUser) {
        dispatch(userData(storedUser));
      }
    } 
  }, [jwt,user, dispatch]);
// useEffect(()=>{
//   const storedUser = JSON.parse(localStorage.getItem('user'));
//     const storedJwt = JSON.parse(localStorage.getItem('jwt'));
//     if(storedJwt){
//       dispatch(loginSuccess({token:storedJwt,user:storedUser}))
//     }
//     else if(storedUser) {
//       dispatch(userData(storedUser));
//     }
// },[])

  useEffect(() => { 
    const profilePathRegex = /.*\/profile.*/;
    const isProfilePage = profilePathRegex.test( location.pathname ); 
    setSuggest(isProfilePage ? false : true);
  }, [location.pathname]);

  return ( 
    <Grid container spacing={0} className='flex justify-center mx-auto'>
      <Grid item className='relative'>
        <div className='min-[540]:sticky min-[540]:top-0 min-[540]:min-w-[240px]'>
          <SideBar/>
        </div>
      </Grid>
      <Grid item className='flex px-5 justify-center relative mx-auto grow h-fit '>
        <Routes>
          <Route path="/" element={<MiddlePart/>}/>
          <Route path="/reel" element={<ReelsMain/>}/>
          <Route path="/create-reel" element={<CreateReel/>}/>
          <Route path="/explore" element={<Explore />}/>
          <Route path="/create-post" element={<CreatePost/>}/>
          <Route path="/chat/:id" element={<ChatRoom/>}/>
          <Route path="/profile" element={<UserProfile/>}/>  
          <Route path="/profile/:id" element={<Profile/>}/>  
        </Routes>
      </Grid>
      {suggest && 
        <Grid item className='relative min-[1285px]:block hidden w-fit'>
          <div className='sticky top-0  p-2'>
            <Suggest/>
          </div>
        </Grid>
      }
    </Grid> 
  );
}

export default Home;
