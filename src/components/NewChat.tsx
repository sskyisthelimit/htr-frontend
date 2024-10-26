import React from "react";

interface NewChatProps {
  setChatLog: React.Dispatch<React.SetStateAction<any[]>>;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewChat: React.FC<NewChatProps> = ({ setChatLog, setShowMenu }) => {
  const handleNewChat = () => {
    setChatLog([]);
    setShowMenu(false);
  };

  return (
    <div className="newChatButtonWrapper">
      <div className="sideMenuButton" onClick={handleNewChat}>
        <span>+</span>
        Upload new image
      </div>
    </div>
  );
};

export default NewChat;
