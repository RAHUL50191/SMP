 import React, { useEffect, useState } from 'react' 
import { SERVER_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AccountCircle as ProfileIcon, Search as SearchIcon } from '@mui/icons-material';
import { Card, ListItemAvatar, Avatar, Typography, TextField, InputAdornment } from '@mui/material';
import { debounce } from 'lodash';  
const {jwt,user}={jwt:JSON.parse(localStorage.getItem('jwt')),user:JSON.parse(localStorage.getItem('user'))}

 function Suggest() { 
  const [suggests,setSuggests]=useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const navigate=useNavigate(); 
 
  useEffect(() => {
    fetchSuggests();
  }, []);

  const fetchSuggests = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/user/suggests`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = response.data;
      setSuggests(data);
    } catch (error) {
      console.error("Suggest fetch error", error); 
    }
  };

  const handleFollow = async (id) => {
    try {
      await axios.put(`${SERVER_URL}/user/follow?followUserId=${id}`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      fetchSuggests(); // Consider optimizing this if needed
    } catch (error) {
      console.error("Error following user", error); 
    }
  };
  
  
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchChange = debounce(async (event) => {
    try {
        setSearchQuery(event.target.value); 
        const response = await axios.get(`${SERVER_URL}/user/search/${event.target.value}`,{
            headers: {
                Authorization: `Bearer ${jwt}`,
              },
        });
       
        setSearchResults(response.data)
    } catch (error) {
        console.error('Error occurred while searching:', error); 
    }
}, 300); 
  
   return ( 
    <section className='px-4  w-[450px]'>
        <SearchBar  placeholder={searchQuery} onChange={handleSearchChange}/>
        <Card className="bg-black  border border-gray-200 rounded-lg shadow  dark: bg -[#121212] dark:border-gray-700 p-4" sx={{background:"#121212"}} >
            <Typography align='center' fontSize={20} fontWeight='bold' color={"white"} pb={4}>Suggested Users</Typography>
            <div style={{ maxHeight: '200px', overflowY: 'auto', overflowX: 'hidden' }}>
                {suggests.length < 1 ? (
                    <div className="flex pb-6 justify-center">
                    <h5 className="text-lg font-medium text-gray-900 dark:text-white">No Suggest🥠</h5>
                    </div>
                ) : (
                    suggests.map((suggest) => {
                    return (
                        <div key={suggest.id} className="flex pb-6 justify-center">
                        <ListItemAvatar>
                            {suggest.img ? (
                            <Avatar alt={suggest.name} src={`data:image/jpeg;base64,${suggest.img}`} />
                            ) : (
                            <ProfileIcon sx={{ width: 80 ,color:'white',fontSize:'40px'}} />
                            )}
                        </ListItemAvatar>
                        <div className="flex flex-col">
                            <h5 className="text-lg font-medium text-gray-900 dark:text-white text-center">{suggest.name}</h5>
                        </div>
                        <div className=" ml-auto">
                            <button
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={() => handleFollow(suggest.id)}
                            >
                            follow
                            </button>
                            <button
                            className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                            Message
                            </button>
                        </div>
                        </div>
                    )
                    })
                )}
                </div>

            <Typography align='center' fontSize={20} fontWeight='bold' color={"white"} pb={4}>
            Search Results
            </Typography>
            <div className="max-h-150 overflow-y-auto scrollbar-w-5 scrollbar-track-white scrollbar-thumb-white">
                {searchResults.length < 1 ? (
                    <div className="flex pb-6 justify-center">
                    <h5 className="text-lg font-medium text-gray-900 dark:text-white">{searchQuery === "" ? 'Search name' : 'No User Found🥠'}</h5>
                    </div>
                ) : (
                    searchResults.map((item) => {
                    return (
                        <div key={item.id} className="flex pb-6 justify-center">
                        <ListItemAvatar>
                            {item.img ? (
                            <Avatar alt={item.name} src={`data:image/jpeg;base64,${item.img}`} />
                            ) : (
                            <ProfileIcon sx={{ width: 100 }} />
                            )}
                        </ListItemAvatar>
                        <div className="flex flex-col">
                            <h5 className="text-lg font-medium text-gray-900 dark:text-white">{item.name}</h5>
                            {/* <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span> */}
                        </div>
                        <div className="float-right ml-auto">
                            {user.id !== item.id ? (
                            <>
                                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleFollow(item.id)}>follow</button>
                                <button href="#" className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Message</button>
                            </>
                            ) : (
                            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => navigate("profile")}>View Profile</button>
                            )}
                        </div>
                        </div>
                    );
                    })
                )}
                </div>
        </Card>
       </section> 
   )
 } 

function SearchBar({ placeholder, onChange }) {
  return (
    <TextField
    fullWidth
    id="outlined-textarea"
    label="Search User"
    multiline
    placeholder={placeholder}
    onChange={onChange} 
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
  />
  );
}
 

 export default Suggest
 