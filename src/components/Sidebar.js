import React from 'react';
import { SidebarContainer, SidebarItem, Thumbnail, SidebarFilename } from '../styles';

const Sidebar = ({ chats, onChatClick }) => {
  return (
    <SidebarContainer>
      {chats.map((chat) => (
        <SidebarItem key={chat.id} onClick={() => onChatClick(chat)}>
          <Thumbnail src={chat.thumbnail} alt="thumb" />
          <SidebarFilename>{chat.filename}</SidebarFilename>
        </SidebarItem>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
