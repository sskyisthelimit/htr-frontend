import React from 'react';
import { motion } from 'framer-motion';
import { DropArea, DropText, SubmitButton, Title } from '../styles';
import { useDropzone } from 'react-dropzone';

const MainContent = ({ image, progressText, loading, showOptions, handleSubmit, handleRegenerate, handleUploadNewImage }) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleUploadNewImage, accept: 'image/*' });

  return (
    <div>
      {!showOptions && (
        <>
          <Title
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Recognize handwriting on your image!<br />
            To start, upload an image and click submit
          </Title>
          <DropArea {...getRootProps()}>
            <input {...getInputProps()} />
            <DropText>{image ? image.name : 'Drag & drop an image or click to upload'}</DropText>
          </DropArea>
          <SubmitButton onClick={handleSubmit} disabled={loading || !image}>
            {loading ? 'Processing...' : 'Submit'}
          </SubmitButton>
        </>
      )}

      {showOptions && (
        <>
          {progressText.map((block, index) => (
            <div key={index} style={{ marginTop: '10px' }}>
              <motion.h4 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                Generated Text #{index + 1}:
              </motion.h4>
              <div>
                {block.map((word, i) => (
                  <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
                    {word}{' '}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
          <div style={{ marginTop: '20px' }}>
            <SubmitButton onClick={handleRegenerate}>Regenerate Response</SubmitButton>
            <SubmitButton onClick={handleUploadNewImage} style={{ marginLeft: '10px' }}>
              Upload New Image
            </SubmitButton>
          </div>
        </>
      )}
    </div>
  );
};

export default MainContent;
