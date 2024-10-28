import React, { useState, useEffect } from 'react';
import '../styles/slider.css';

interface SliderProps {
  items: string[];
  currentIndex: number;
}

const Slider: React.FC<SliderProps> = ({ items, currentIndex }) => {
  const [internalIndex, setInternalIndex] = useState(currentIndex);

  useEffect(() => {
    setInternalIndex(currentIndex);
  }, [currentIndex]);
  console.log(internalIndex);
  console.log(currentIndex);
  const handleNext = () => {
    if (internalIndex < items.length - 1) {
      setInternalIndex(internalIndex + 1);
    }
  };

  const handlePrev = () => {
    if (internalIndex > 0) {
      setInternalIndex(internalIndex - 1);
    }
  };

  return (
    <div className="slider">
      <div
        className="slider-items"
        style={{
          transform: `translateX(-${internalIndex * 100}%)`,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={`slider-item ${index === internalIndex ? 'active' : ''}`}
          >
            <div className="slider-tokens-display">
              {item}
            </div>
          </div>
        ))}
      </div>
      <div className="slider-controls">
        <button className="slider-arrow" onClick={handlePrev}>
          <svg
            fill="#000000"
            height="24px"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <polygon points="12,17 11,17 11,15 9,15 9,13 21,13 21,11 9,11 9,9 11,9 11,7 12,7 12,5 9,5 9,7 7,7 7,9 5,9 5,10 4,10 4,11 3,11 3,13 4,13 4,14 5,14 5,15 7,15 7,17 9,17 9,19 12,19 " />
          </svg>
        </button>
        <button className="slider-arrow" onClick={handleNext}>
        <svg fill="#000000" height="24px" width="24px"
        version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        transform="matrix(-1, 0, 0, 1, 0, 0)">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <polygon points="12,17 11,17 11,15 9,15 9,13 21,13 21,11 9,11 9,9 11,9 11,7 12,7 12,5 9,5 9,7 7,7 7,9 5,9 5,10 4,10 4,11 3,11 3,13 4,13 4,14 5,14 5,15 7,15 7,17 9,17 9,19 12,19 "></polygon> </g></svg>
        </button>
      </div>
    </div>
  );
};

export default Slider;
