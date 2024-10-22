import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f7f3e9;
`;

export const SidebarContainer = styled.div`
  width: 250px;
  background-color: #f4f4f4;
  padding: 10px;
  overflow-y: auto;
`;

export const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
`;

export const Thumbnail = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  margin-right: 10px;
`;

export const SidebarFilename = styled.span`
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
`;

export const DropArea = styled(motion.div)`
  width: 90%;
  max-width: 400px;
  height: 200px;
  border: 2px dashed #c3b1e1;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  background-color: #fffaf0;
`;

export const DropText = styled.p`
  font-size: 1.2rem;
`;

export const SubmitButton = styled(motion.button)`
  padding: 10px 20px;
  background-color: #fbc02d;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 20px;
`;

export const Title = styled(motion.h1)`
  font-size: 2.2rem;
  margin-bottom: 30px;
  text-align: center;
`;
