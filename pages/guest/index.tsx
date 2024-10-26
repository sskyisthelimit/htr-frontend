import React, { useEffect, useRef, useState } from "react";
import IntroSection from "../../src/components/IntroSection";
import Uploader from "../../src/components/Uploader";
import { motion } from "framer-motion";
import '../../src/styles/globals.css'
import '../../src/styles/normalize.css'
import '../../src/styles/guestPage.css'

const Home: React.FC = () => {
  const [chatLog, setChatLog] = useState<any[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [tokens, setTokens] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(e.target as Node)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (showMenu) document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showMenu]);

  const handleImageUpload = (uploadedImage: File) => {
    setImage(uploadedImage);
    setTokens([]);
    setIsSubmitted(false);
  };

  const handleImageSubmit = () => setIsSubmitted(true);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="guestPageWrapper">
      <section className="guestChatBox">
        <div className="guestChatContainer">
          {!isSubmitted && <IntroSection />}
          {!isSubmitted ? (
            <Uploader
              onImageUpload={handleImageUpload}
              onSubmit={handleImageSubmit}
              tokens={tokens}
              setTokens={setTokens}
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
                <img src={URL.createObjectURL(image)} alt="Full-size view" className="full-size-image" />
                <button className="close-modal-button" onClick={closeModal}>Close</button>
              </div>
            </div>
          )}

          <div className="tokens-container">
            <div className="tokens-display">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {tokens.map((token, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="recognition-token"
                  >
                    {token}{" "}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
      </section>
    </div>
  );
};

export default Home;
