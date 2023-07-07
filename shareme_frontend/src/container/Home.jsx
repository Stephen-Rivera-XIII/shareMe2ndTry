import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';

import {Sidebar, UserProfile} from '../components';
import Pins from './Pins'
import {userQuery } from '../utils/data';
import { client } from '../client';
import logo from '../assets/logo.png';
import jwtDecode from 'jwt-decode';


const Home = () => {
  console.log(localStorage.getItem('user'))
  const [toggleSidebar, setToggleSideBar] = useState(false);
  const [user, setUser] = useState(null);

  // const decodedToken = localStorage.getItem('user') //? jwtDecode(localStorage.getItem('user')) : null;
  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();


  useEffect(() => {
    const query = userQuery(userInfo?.sub);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height ease-out duration-75'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar user={user && user}/>
      </div>
      <div className='flex md:hidden flex-row'>
        <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
          <HiMenu
            fontSize={40}
            className='cursor-pointer'
            onClick={() => setToggleSideBar(false)}
          />
          <Link to='/'>
            <img src={logo} alt='logo' className='w-28' />
          </Link>
          <Link to={`user-profile/${user?._id}`} >
            <img src={user?.image} alt='user-pic' className='w-9 h-9 rounded-full' />
          </Link>
          </div>
          
      </div>
    </div>
  );
};

export default Home;

