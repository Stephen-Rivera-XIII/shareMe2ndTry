import React, { useState, useEffect } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

import { userQuery } from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const randomImage = 'https://source.unsplash.com/random/1600x900/?nature,photography,technology';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  const navigate = useNavigate();

  const logout = () => {
    googleLogout();
    localStorage.clear();
    navigate('/');
  };

  if (!user) {
    return <Spinner message="Loading profile..." />;
  }

  return (
    console.log('user', user),
    console.log('userId', userId),
    console.log('user_id', user._id),
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomImage}
              className="q-full h-370 2xl:h-510 shadow-lg object-cover"
              alt="banner picture"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user.image}
              alt="profile-pic"
            />
            <h1 className="font-bold text-3xl text-center mt-3">{user.userName}</h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === user._id && (
                <>
                    <button
                      type="button"
                      className="border-2 p-2 rounded-full cursor-pointer outline-none shadow-md"
                      onClick={logout}
                    >
                      <AiOutlineLogout color="red" fontSize={21} />
                    </button>
                 
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
