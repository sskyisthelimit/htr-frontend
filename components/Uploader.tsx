// Uploader.jsx
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const Uploader = ({ onImageUpload, onSubmit, tokens, setTokens }) => {
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const image = acceptedFiles[0];
    setFile(image);
    onImageUpload(image); // Pass the uploaded image to Home component
  }, [onImageUpload]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  // Imitation of an API call that returns tokens one by one
  const submitImage = () => {
    if (!file) return;
    onSubmit();
    const generatedTokens = [
        "Once", "upon", "a", "time,", "in", "a", "land", "far,", "far", "away,", "there", "lived", "a", "brave", "knight", "named", "Arthur.", 
        "Arthur", "was", "known", "throughout", "the", "kingdom", "for", "his", "courage", "and", "chivalry.", 
        "One", "day,", "while", "wandering", "through", "the", "enchanted", "forest,", "he", "stumbled", "upon", "a", "mysterious", "cave.", 
        "Intrigued", "by", "the", "strange", "markings", "on", "the", "cave", "walls,", "Arthur", "decided", "to", "venture", "inside.", 
        "Deep", "within", "the", "cave,", "he", "found", "an", "ancient", "scroll", "that", "spoke", "of", "a", "hidden", "treasure", "guarded", "by", "a", "fearsome", "dragon.", 
        ]; // Simulated tokens
    setTokens([]); // Reset tokens initially

    // Simulate receiving tokens with different latency
    generatedTokens.forEach((token, index) => {
      setTimeout(() => {
        setTokens((prevTokens) => [...prevTokens, token]);
      }, 70 * index); // Delay each token for effect
    });
  };

  return (
    <div className='uploader-container'>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {file ? <p className='uploader-filename'>{file.name}</p> : <p className='uploader-text'>Drag & drop an image, or click to select one</p>}
      </div>
      <button className='uploader-submit-button' onClick={submitImage} disabled={!file} >
        Submit
      </button>
    </div>
  );
};

export default Uploader;
