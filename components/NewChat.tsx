import React from "react";

const NewChat = ({ setChatLog, setShowMenu }) => {
  return (
    <div className="newChatButtonWrapper">
      <div
        className="sideMenuButton"
        onClick={() => {
          setChatLog([]);
          setShowMenu(false);
        }}
      >
        <span>+</span>
        Upload new image
    </div>
    </div>
  );
};

export default NewChat;
