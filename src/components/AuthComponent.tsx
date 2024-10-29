// components/AuthComponent.tsx
'use client';
import { useRouter } from 'next/router';
import BotResponse from "./BotResponse";
import React, { useState } from 'react';
// import { signUp, logIn, continueAsGuest } from '../authService';
import '../styles/authComponent.css';

const AuthComponent = () => {
  const router = useRouter();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [isLogin, setIsLogin] = useState(true);
  // const [message, setMessage] = useState<string | null>(null);

  // const handleSignUp = async () => {
  //   if (!email || !password) {
  //     setMessage('Please fill in both email and password to sign up.');
  //     return;
  //   }

  //   try {
  //     await signUp(email, password);
  //     // setMessage('Sign-up successful! Redirecting...');
  //     router.push('/');
  //   } catch (error) {
  //     console.error(error);
  //     setMessage('Sign-up failed! Please check your details and try again.');
  //   }
  // };

  // const handleLogIn = async () => {
  //   if (!email || !password) {
  //     setMessage('Both email and password are required to log in.');
  //     return;
  //   }

  //   try {
  //     await logIn(email, password);
  //     // setMessage('Login successful! Redirecting...');
  //     router.push('/');
  //   } catch (error) {
  //     console.error(error);
  //     if (error.code === 'auth/user-not-found') {
  //       setMessage('No account found with this email. Please sign up first.');
  //     } else if (error.code === 'auth/wrong-password') {
  //       setMessage('Incorrect password. Please try again.');
  //     } else {
  //       setMessage('Login failed! Please check your details and try again.');
  //     }
  //   }
  // };

  const handleGuestLogin = async () => {
    // try {
      // await continueAsGuest();
      // setMessage('Continuing as guest...');
    router.push('/guest');
    // } catch (error) {
    //   console.error(error);
    //   setMessage('Guest login failed! Please try again later.');
    // }
  };

  return (
    <div className='authContainer'>
      <div className='authOptionsWrapper'>
        <h1 className='authPageTitle'>
          <BotResponse response="Welcome to Handwriting recognition bot" />
        </h1>
        <h2 className='authPageDetails'>
        You can continue as guest using button below, <BotResponse response="your chat data won't be saved and you will only have one chat avaliable." />
        </h2>
        
        {/* <div className='authInputsWrapper'>
          <input
            type="email"
            placeholder="Email"
            className='authEmailInput authInput'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className='authPasswordInput authInput'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {message && <div className='authMessage'>{message}</div>}
        </div> */}
        


        <div className='authButtonsWrapper'>
          <div className='authButtonsBlock'>
            {/* <button
              className='authButton'
              onClick={isLogin ? handleLogIn : handleSignUp}
            >
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
            <button
              className='switchAuthButton'
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage(null);
              }}
            >
              {isLogin ? 'Switch to Sign Up' : 'Switch to Log In'}
            </button> */}
            <button
              className='authAsGuestButton'
              onClick={handleGuestLogin}
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
