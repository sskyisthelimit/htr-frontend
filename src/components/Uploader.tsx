import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface UploaderProps {
  onImageUpload: (image: File) => void;
  onSubmit: () => void;
  setIsGenerated: (isGenereated: boolean) => void;
}

const Uploader: React.FC<UploaderProps> = ({ onImageUpload, onSubmit, setIsGenerated}) => {
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
    setIsGenerated(false);
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
