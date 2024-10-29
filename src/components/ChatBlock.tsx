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

  const handleResponseRegeneration = () => {
    setIsRegenerated(false);
    setIsGenerated(false);
    setTokensLog((prevLog) => [...prevLog, currentTokens]);
    setCurrentTokens([]);
    const generatedTokens = [
      "Once", "upon", "a", "time,", "in", "a", "land", "far,", "far", "away,", "there", "lived", "a", "brave", "knight", "named", "Arthur.",
      "Arthur", "was", "known", "throughout", "the", "kingdom", "for", "his", "courage", "and", "chivalry.",
      "One", "day,", "while", "wandering", "through", "the", "enchanted", "forest,", "he", "stumbled", "upon", "a", "mysterious", "cave.",
      "Intrigued", "by", "the", "strange", "markings", "on", "the", "cave", "walls,", "Arthur", "decided", "to", "venture", "inside.",
      "Deep", "within", "the", "cave,", "he", "found", "an", "ancient", "scroll", "that", "spoke", "of", "a", "hidden", "treasure", "guarded", "by", "a", "fearsome", "dragon.",
    ];
    const delayPerToken = 70;
    generatedTokens.forEach((token, index) => {
      setTimeout(() => {
        setCurrentTokens((prevTokens) => [...prevTokens, token]);
      }, delayPerToken * index);
    });
    const totalDelay = delayPerToken * generatedTokens.length;
    setTimeout(() => {
      setIsGenerated(true);
      setIsRegenerated(true);
      setTokensLog((prevLog) => [...prevLog, generatedTokens]);
    }, totalDelay);
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

  const handleTokensGeneration = () => {
    const generatedTokens = [
      "Once", "upon", "a", "time,", "in", "a", "land", "far,", "far", "away,", "there", "lived", "a", "brave", "knight", "named", "Arthur.",
      "Arthur", "was", "known", "throughout", "the", "kingdom", "for", "his", "courage", "and", "chivalry.",
      "One", "day,", "while", "wandering", "through", "the", "enchanted", "forest,", "he", "stumbled", "upon", "a", "mysterious", "cave.",
      "Intrigued", "by", "the", "strange", "markings", "on", "the", "cave", "walls,", "Arthur", "decided", "to", "venture", "inside.",
      "Deep", "within", "the", "cave,", "he", "found", "an", "ancient", "scroll", "that", "spoke", "of", "a", "hidden", "treasure", "guarded", "by", "a", "fearsome", "dragon.",
    ];
    const delayPerToken = 70;
    generatedTokens.forEach((token, index) => {
      setTimeout(() => {
        setCurrentTokens((prevTokens) => [...prevTokens, token]);
      }, delayPerToken * index);
    });
    const totalDelay = delayPerToken * generatedTokens.length;
    setTimeout(() => {
      setIsGenerated(true);
    }, totalDelay);
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
            <button className="choice-button" onClick={handleResponseRegeneration}>
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

