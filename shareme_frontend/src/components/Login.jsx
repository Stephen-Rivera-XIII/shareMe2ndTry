import React from 'react';
import { GoogleLogin, GoogleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { client } from '../client';
import jwt_decode from 'jwt-decode';

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    const decodedToken = jwt_decode(response.credential);
  
    if (decodedToken) {
      const { name, sub: googleId, picture: imageUrl } = decodedToken;
  
      localStorage.setItem('user', JSON.stringify(decodedToken)); // Set 'user' in localStorage to the JSON string representation of the decoded token      
      
      const doc = {
        _id: googleId,
        _type: 'user',
        userName: name,
        image: imageUrl,
      };
      
      client.createIfNotExists(doc).then(() => {
        navigate('/');
      });
    }
  };    

  return (
    <div className='flex justify-center items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
          src={shareVideo}
          type='video/mp4'
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src={logo} alt='logo' width='130px' />
          </div>
          <div className='shadow-2xl'>
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={() => {
                console.log('error');
              }}
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
            >
              <button className='bg-white text-black font-bold p-3 rounded-full shadow-lg hover:shadow-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>
                <FcGoogle />
              </button>
            </GoogleLogin>
          </div>
        </div>
      </div>
      Login
    </div>
  );
};

export default Login;
