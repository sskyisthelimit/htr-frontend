import React, { useEffect, useState, useRef} from "react";
import Uploader from "../../src/components/Uploader";
import Slider from "../../src/components/Slider";
import { motion } from "framer-motion";


interface ChatBlockProps {
    setIsFirstSubmit: (isSubmitted: boolean) => void;
    addNewChatBlock: () => void;
  }
  
  const ChatBlock: React.FC<ChatBlockProps> = ({ setIsFirstSubmit, addNewChatBlock }) => {
  const [tokensLog, setTokensLog] = useState<any[]>([]);
  const [currentTokens, setCurrentTokens] = useState<any[]>([]);
  const [isGenerated, setIsGenerated] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRegenerated, setIsRegenerated] = useState(false);
  const [isUploadNew, setIsUploadNew] = useState(false);
  
  const handleTokensGeneration = async () => {
    if (!image) return;
  
    const formData = new FormData();
    formData.append("file", image);
  
    const response = await fetch("https://htr-api.xyz/predict", {
      method: "POST",
      body: formData,
    });
  
    const reader = response.body?.getReader();
    if (reader) {
      const decoder = new TextDecoder("utf-8");
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
  
        const textChunk = decoder.decode(value);
        const parsedTokens = JSON.parse(textChunk).predicted_word;
        setCurrentTokens((prevTokens) => [...prevTokens, parsedTokens]);
      }
    }
  
    setTokensLog((prevLog) => [...prevLog, currentTokens.join(" ")]);
  };

  const handleTokensRegeneration = async () => {
    setIsGenerated(false);
    setIsRegenerated(false);
    setCurrentTokens([]);
    if (!image) return;
  
    const formData = new FormData();
    formData.append("file", image);
  
    const response = await fetch("https://htr-api.xyz/predict", {
      method: "POST",
      body: formData,
    });
  
    const reader = response.body?.getReader();
    if (reader) {
      const decoder = new TextDecoder("utf-8");
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
  
        const textChunk = decoder.decode(value);
        const parsedTokens = JSON.parse(textChunk).predicted_word;
        setCurrentTokens((prevTokens) => [...prevTokens, parsedTokens]);
      }
    }
  
    setTokensLog((prevLog) => [...prevLog, currentTokens.join(" ")]);
    setIsGenerated(true);
    setIsRegenerated(true);
  };

  const handleNewImageUpload = () => {
    setIsUploadNew(true);
    addNewChatBlock();
  };

  const handleImageUpload = (uploadedImage: File) => {
    setImage(uploadedImage);
    setCurrentTokens([]);
    setIsSubmitted(false);
  };

  useEffect(() => {
    if (isSubmitted) {
      handleTokensGeneration();
    }
  }, [isSubmitted]);

  const handleImageSubmit = () => {
    setIsSubmitted(true);
    setIsFirstSubmit(true);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const joinedTokens = tokensLog.map(tokens => tokens.join(" "));
  return (
    <div className="chatBlockContainer">
      {!isSubmitted ? (
        <Uploader
          onImageUpload={handleImageUpload}
          onSubmit={handleImageSubmit}
          setIsGenerated={setIsGenerated}
        />
      ) : (
        image && (
          <div className="image-thumbnail-container">
            <img
              src={URL.createObjectURL(image)}
              alt={image.name}
              className="thumbnail"
              onClick={() => openModal()}
            />
            <p className="response-title">{image.name}</p>
          </div>
        )
      )}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={image ? URL.createObjectURL(image): undefined} alt="Full-size view" className="full-size-image" />
            <button className="close-modal-button" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
      {isRegenerated ? (
        <Slider items={joinedTokens} currentIndex={joinedTokens.length - 1} />
      ) : (
        <div className="tokens-container">
          <div className="tokens-display">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {currentTokens.map((token, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.01 }}
                  className="recognition-token"
                >
                  {token}{" "}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      )}
      {isGenerated ? (
        <div className="choice-buttons-wrapper">
          <div className="choice-buttons">
            <button className="choice-button" onClick={handleTokensRegeneration}>
              Regenerate Response
            </button>
            {!isUploadNew ? (
                <button
                className="choice-button"
                onClick={handleNewImageUpload}>
                    Upload a new image
                </button>) : null}
              
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ChatBlock;

