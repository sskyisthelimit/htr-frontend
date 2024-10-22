import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const PreloaderDiv = styled.div`
  width: 8.8px;
  height: 8.8px;
  animation: ${spin} 0.8s infinite;
  border-radius: 50%;
  box-shadow: 35.2px 0 0 8.8px #474bff, -35.2px 0 0 8.8px #474bff;
  @media (max-width: 768px) { 
    width: 7.2px;
    height: 7.2px;
    animation: ${spin} 0.8s infinite;
    border-radius: 50%;
    box-shadow: 28.8px 0 0 7.2px #9d72ae, -28.8px 0 0 7.2px #9d72ae;
    margin-top: 20px;
  }
`;

const Preloader = () => <PreloaderDiv />;

export default Preloader;


