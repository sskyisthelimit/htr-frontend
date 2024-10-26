import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface UploaderProps {
  onImageUpload: (image: File) => void;
  onSubmit: () => void;
  tokens: string[];
  setTokens: React.Dispatch<React.SetStateAction<string[]>>;
}

const Uploader: React.FC<UploaderProps> = ({ onImageUpload, onSubmit, tokens, setTokens }) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const image = acceptedFiles[0];
    setFile(image);
    onImageUpload(image);
  }, [onImageUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const submitImage = () => {
    if (!file) return;
    onSubmit();
    setTokens([]);
    const generatedTokens = [
      "Once", "upon", "a", "time,", "in", "a", "land", "far,", "far", "away,", "there", "lived", "a", "brave", "knight", "named", "Arthur.", 
      "Arthur", "was", "known", "throughout", "the", "kingdom", "for", "his", "courage", "and", "chivalry.", 
      "One", "day,", "while", "wandering", "through", "the", "enchanted", "forest,", "he", "stumbled", "upon", "a", "mysterious", "cave.", 
      "Intrigued", "by", "the", "strange", "markings", "on", "the", "cave", "walls,", "Arthur", "decided", "to", "venture", "inside.", 
      "Deep", "within", "the", "cave,", "he", "found", "an", "ancient", "scroll", "that", "spoke", "of", "a", "hidden", "treasure", "guarded", "by", "a", "fearsome", "dragon.", 
    ];
    generatedTokens.forEach((token, index) => {
      setTimeout(() => {
        setTokens((prevTokens) => [...prevTokens, token]);
      }, 70 * index);
    });
  };

  return (
    <div className="uploader-container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {file ? (
          <p className="uploader-filename">{file.name}</p>
        ) : (
          <p className="uploader-text">Drag & drop an image, or click to select one</p>
        )}
      </div>
      <button
        className="uploader-submit-button"
        onClick={submitImage}
        disabled={!file}
      >
        Submit
      </button>
    </div>
  );
};

export default Uploader;
