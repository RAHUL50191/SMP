import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Login from "./Login";
import Register from "./Register"; 
import { useSelector } from 'react-redux'; 
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
const Authentication = () => {
 
  const src = [
    "/img1.png",
    "/img2.png",
    "/img3.png",
    "/img4.png"
  ];
  const [progress, setProgress] =useState(0);  
  const [index, setIndex] = useState(0);
  const [toggle,setToggle]=useState(true);
  const navigate = useNavigate();
  const { jwt, loading, error } = useSelector(state => state.auth);
  //mobile imges
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % src.length);
    }, 4000);

    // Cleanup function to clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  // useEffect(() => {
  //   if (localStorage.getItem("jwt")) {
  //     setTimeout(() => {
  //       // navigate("/home");
  //     }, 2000);
  //   }
  // });

  return (
    <div className='  '>
    {loading?
      <LinearProgress variant="determinate" color="success" value={progress} style={{height:5,width:'100%'}} />
       :<></>} 
    <div className='flex items-center justify-center h-screen my-auto p-60'>
      <Grid className='flex justify-center max-w-3xl' container>
        <Grid className='overflow-clip' item xs={false} md={7}>
          <Grid className='invisible md:visible h-full w-full bg-[url("https://static.cdninstagram.com/images/instagram/xig/homepage/phones/home-phones.png?__makehaste_cache_breaker=HOgRclNOosk")] bg-no-repeat pb-10'>
            <div className='invisible md:visible relative top-6 right-[-9.75rem] h-fit w-fit align-middle'>
              <img  src={ src[index]} alt={`Screenshot ${index + 1}`} />
            </div>
          </Grid>
        </Grid>
        <Grid className=' ' item xs={12} md={5}>
          <Grid>
           { toggle?<Login toggle={toggle} setToggle={setToggle} progress={progress} setProgress={setProgress} />:<Register  toggle={toggle} setToggle={setToggle} /> }
          </Grid> 
        </Grid>
      </Grid>
      </div>
    </div>
  );
}

export default Authentication;
