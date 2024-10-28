import React, { useState } from "react";
import Link from "next/link";
import ChatBlock from "./ChatBlock";
import IntroSection from "./IntroSection";
import '../styles/globals.css';
import '../styles/normalize.css';
import '../styles/guestPage.css';

interface ChatInstanceProps {
    settedFirstSubmit: boolean;
}
  
const ChatInstance: React.FC<ChatInstanceProps> = ({settedFirstSubmit}) => {
  const [chatBlocks, setChatBlocks] = useState([{ id: 1 }]);
  const [isFirstSubmit, setIsFirstSubmit] = useState(settedFirstSubmit);

  const addNewChatBlock = () => {
    setChatBlocks([...chatBlocks, { id: chatBlocks.length + 1 }]);
  };

  return (
    <div className="guestPageWrapper">
      <section className="guestChatBox">
      <div className="linkWrapper">
        <Link href="/">
          <button className="auth-button">
            <svg
              fill="#000000"
              height="24px"
              width="24px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <polygon points="12,17 11,17 11,15 9,15 9,13 21,13 21,11 9,11 9,9 11,9 11,7 12,7 12,5 9,5 9,7 7,7 7,9 5,9 5,10 4,10 4,11 3,11 3,13 4,13 4,14 5,14 5,15 7,15 7,17 9,17 9,19 12,19 " />
            </svg>
             <span>Go to Auth</span>
            </button>
        </Link>
      </div>
        <div className="guestChatContainer">
          {!isFirstSubmit && <IntroSection />}
          {chatBlocks.map((block) => (
            <ChatBlock
              key={block.id}
              setIsFirstSubmit={setIsFirstSubmit}
              addNewChatBlock={addNewChatBlock}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ChatInstance;
