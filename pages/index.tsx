import React, { useEffect, useRef, useState } from "react";
import IntroSection from "../components/IntroSection";
import NavContent from "../components/NavContent";
import Uploader from "../components/Uploader";
import { motion } from 'framer-motion';

const Home = () => {
  const [chatLog, setChatLog] = useState([]);
  const [image, setImage] = useState(null); // State for uploaded image
  const [tokens, setTokens] = useState([]); // State for generated tokens
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const [showMenu, setShowMenu] = useState(false);
  const navRef = useRef();

  const handleOutsideClick = (e) => {
    if (navRef.current && !navRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showMenu]);
  const handleImageUpload = (uploadedImage) => {
    setImage(uploadedImage);
    setTokens([]);
    setIsSubmitted(false);
  };

  const handleImageSubmit = () => {
    setIsSubmitted(true);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <header>
        <div className="menu">
          <button onClick={() => setShowMenu(true)}>
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
            >
              <path d="M21 18H3M21 12H3M21 6H3" />
            </svg>
          </button>
        </div>
        <h1 style={{color: '#000'}}>HTR AI</h1>
      </header>

      {showMenu && (
        <nav ref={navRef} className={`show`}>
          <div className="navItems">
            <div className="navCloseIcon">
              <svg viewBox="0 0 24.00 24.00"
                fill="none" xmlns="http://www.w3.org/2000/svg"
                transform="matrix(1, 0, 0, 1, 0, 0)"
                width="24"  /* Set width to 24 */
                height="24"  /* Set height to 24 */
                onClick={() => setShowMenu(false)}
              >

                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M4 18H10" stroke="#7e7d7c" stroke-width="2.208" stroke-linecap="round"></path>
                    <path d="M4 12L16 12" stroke="#7e7d7c" stroke-width="2.208" stroke-linecap="round"></path>
                    <path d="M4 6L20 6" stroke="#7e7d7c" stroke-width="2.208" stroke-linecap="round"></path>
                </g>
              </svg>
            </div>
            <NavContent/>
          </div>
        </nav>
      )}

      {!showMenu && (
        <aside className="sideMenu">
        <NavContent
          chatLog={chatLog}
          setChatLog={setChatLog}
          setShowMenu={setShowMenu}
        />
      </aside>
      )}
      

      <section className="chatBox">
          <div className="chat-container">
            {!isSubmitted ? (<IntroSection />) : <></>}
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
                    style={{ width: '70px', height: '70px', cursor: 'pointer' }}
                    onClick={() => window.open(URL.createObjectURL(image), '_blank')}
                  />
                  <p className='response-title'>{image.name}</p>
                </div>
              )
            )}

            {/* Modal for full-size image */}
            {isModalOpen && (
              <div className="modal-overlay" onClick={closeModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Full-size view"
                    className="full-size-image"
                  />
                  <button className="close-modal-button" onClick={closeModal}>Close</button>
                </div>
              </div>
            )}
            <div className="tokens-container">
              <div className="tokens-display">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {tokens.map((token, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      style={{ whiteSpace: 'pre-wrap', color: '#282523'}} // Preserves space between tokens
                    >
                      {token}{' '}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          </div> 
      </section>
    </>
  );
};

export default Home;
