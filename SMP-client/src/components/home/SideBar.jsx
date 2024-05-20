// import React from 'react'
// import { Link } from 'react-router-dom'; 
// function SideBar() {
//   return (
//     <nav className="bg-gray-800 p-4 h-screen flex flex-col items-center justify-between ">
//     <div className="flex flex-col  space-y-4 h-full">

//       <Link to="/" className="text-white text-lg font-bold w-full text-[2rem]">Social Media Platform</Link>
//       <ul className="flex-col space-y-6 text-[1.5rem] align-middle justify-center">
//         <li>
//         <Link to="/home" className="text-white flex items-center space-x-4">
//         <i className="fa-solid fa-house-chimney w-4 h-4"></i>
//             <p>Home</p>
//           </Link>
//         </li>
//          <li>
//           <Link to="/home/explore" className="text-white flex items-center space-x-4">
//              <i className="fa-regular fa-compass w-4 h-4 " ></i>  <p> Post</p>  
//           </Link>
//         </li>  
//         <li>
//           <Link to="/home/reel" className="text-white flex items-center space-x-4">
//           <i className="fa-solid fa-clapperboard w-4 h-4" ></i>
//             <p>Reel</p>
//           </Link>
//         </li>
//         {/* <li>
//           <Link to="/home/notifications" className="text-white flex items-center space-x-2">
//           <i className="fa-solid fa-bell w-4 h-4"></i>
//             <p>Notification</p>
//           </Link>
//         </li> */}
//         <li>
//           <Link to="/home/chat" className="text-white flex items-center space-x-4">
//           <i className="fa-solid fa-comments w-4 h-4"></i>
//            <p> Messages</p>
//           </Link>
//         </li>
//         <li>
//           <Link to="/home/profile/3" className="text-white flex items-center space-x-4">
//           <i className="fa-solid fa-user"></i>
//             <p>Profile</p>
//           </Link>
//         </li>
//       </ul>
//     </div>
//   </nav>
//   )
// }

// export default SideBar

import React, { useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'; 
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar'; 
import List from '@mui/material/List'; 
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText'; 
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import ReelIcon from '@mui/icons-material/Movie'; 
import ProfileIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom'; 
import MessageIcon from '@mui/icons-material/Message';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction'; 


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  // overflowX: 'hidden',
  zIndex: 9999,
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function SideBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
   
    setOpen(false);
  }; 
  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth > 1260);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
        setOpen(window.innerWidth > 1260);
    };

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, []);


  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return ( <>  {windowWidth<540?(<BottomNavigation sx={{width:"100%",position:'fixed',bottom:0,left:0 ,zIndex:9999}} value={value} onChange={handleChange}>
    <Link to='/home'>
    <BottomNavigationAction
      label="Home"
      value="home"
      icon={<HomeIcon />}
    /></Link>
      <Link to='/home/explore'>
    <BottomNavigationAction
      label="Explore"
      value="explore"
      icon={<ExploreIcon  />}
    /></Link>
      <Link to='/home/reel'>
    <BottomNavigationAction
      label="Reel"
      value="reel"
      icon={<ReelIcon />}
    /></Link>
      {/* <Link to='/home/message'>
    <BottomNavigationAction label="Message" value="message" icon={<MessageIcon />} /></Link> */}
    <Link to='/home/profile'>
    <BottomNavigationAction label="Profile" value="profile" icon={<ProfileIcon />} /></Link>
  </BottomNavigation>):(
  
  <Drawer variant="permanent" open={open} >
        <DrawerHeader>
        
          {open ?<><Typography
            variant="h4"
            component="div"
            sx={{
              fontFamily: 'Bebas Neue, sans-serif', 
              p:3,
              fontWeight: 'bold',
              width: '100%',
              fontSize: '2rem',
              textAlign: 'center',
            }}
          >
            <Link to="/" style={{ textDecoration: 'none' }}>S M P </Link>
          </Typography><IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton></>
            :
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              justifyContent: 'center',
              mx: 'auto',
              ...(open && { display: 'none' }),
            }}
            style={{justifyContent: 'center',px:2.5}}
          >
            <MenuIcon />
          </IconButton>}
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key="Home" disablePadding sx={{ display: 'block' }}>
                <Link to="/home"> <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
                component={Link}
                to="/home"
              >
            <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton></Link>
          </ListItem>
          <ListItem key="Explore" disablePadding sx={{ display: 'block' }}>
            <Link to="/home/explore"><ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <ExploreIcon /> 
              </ListItemIcon>
              <ListItemText primary="Explore" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton></Link>
          </ListItem>
          
          <ListItem key="Reel" disablePadding sx={{ display: 'block' }}>
            <Link to="/home/reel"><ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <ReelIcon />
              </ListItemIcon>
              <ListItemText primary="Reel" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton></Link>
          </ListItem>
 
          {/* <ListItem key="Messages" disablePadding sx={{ display: 'block' }}>
            <Link to="/home/message"><ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <MessageIcon />
              </ListItemIcon>
              <ListItemText primary="Messages" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton></Link>
          </ListItem>  */}
          <ListItem key="Profile" disablePadding sx={{ display: 'block' }}>
            <Link to="/home/profile"><ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <ProfileIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton></Link>
          </ListItem>
        </List>
        <Divider />
        {/* Add another List section here if needed */}
      </Drawer>)}
      </> 
  );
}
