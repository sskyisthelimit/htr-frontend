export const addChat = (image, progressText, chats, setChats) => {
    const newChat = {
      id: chats.length,
      thumbnail: URL.createObjectURL(image),
      filename: image.name,
      text: progressText.map((block) => block.join(' ')),
    };
    setChats([...chats, newChat]);
  };
  
  export const handleChatClick = (chat, setImage, setProgressText, setShowOptions) => {
    setImage({ name: chat.filename });
    setProgressText(chat.text.map((t) => t.split(' '))); // Re-split text for word rendering
    setShowOptions(true);
  };
  