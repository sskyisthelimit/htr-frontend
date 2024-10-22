import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { addChat, handleChatClick } from './components/Chat';
import { Container } from './styles';

function App() {
  const [image, setImage] = useState(null);
  const [progressText, setProgressText] = useState([]); // Store multiple generations
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [chats, setChats] = useState([]); // Chats to store session history

  const simulateApiResponse = () => {
    return new Promise((resolve) => {
      const words = ['This', 'is', 'a', 'mock', 'stream', 'of', 'words', 'for', 'testing.'];
      let wordIndex = 0;
      const intervalId = setInterval(() => {
        if (wordIndex < words.length) {
          setProgressText((prevText) => {
            const lastBlock = prevText[prevText.length - 1] || [];
            const updatedText = [...prevText.slice(0, -1), [...lastBlock, words[wordIndex]]];
            return updatedText;
          });
          wordIndex++;
        } else {
          clearInterval(intervalId);
          resolve();
          addChat(image, progressText, chats, setChats);
          setShowOptions(true); 
        }
      }, 500);
    });
  };

  const handleImageSubmit = async () => {
    if (!image) return;
    setLoading(true);
    setProgressText([[]]); // Start with an empty block for this generation
    await simulateApiResponse();
    setLoading(false);
  };

  const handleRegenerate = async () => {
    setProgressText([...progressText, []]); // Add a new empty block for new text generation
    await simulateApiResponse();
  };

  const handleUploadNewImage = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
    setProgressText([]);
    setShowOptions(false);
  };

  return (
    <Container>
      <Sidebar chats={chats} onChatClick={(chat) => handleChatClick(chat, setImage, setProgressText, setShowOptions)} />
      <MainContent
        image={image}
        progressText={progressText}
        loading={loading}
        showOptions={showOptions}
        handleSubmit={handleImageSubmit}
        handleRegenerate={handleRegenerate}
        handleUploadNewImage={handleUploadNewImage}
      />
    </Container>
  );
}

export default App;
