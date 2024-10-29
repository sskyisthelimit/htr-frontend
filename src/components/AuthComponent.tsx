// components/AuthComponent.tsx
'use client';
import { useRouter } from 'next/router';
import BotResponse from "./BotResponse";
import React, { useState } from 'react';
import '../styles/authComponent.css';

const AuthComponent = () => {
  const router = useRouter();
  const handleGuestLogin = async () => {
    router.push('/guest');
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
        <div className='authButtonsWrapper'>
          <div className='authButtonsBlock'>
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
