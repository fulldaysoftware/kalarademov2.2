// ImageCarousel.js

import React, { useState } from 'react';
import './ImageCarousel.css'; // Import the CSS file for styling
import {ArrowBack, ArrowForward, AspectRatio} from "@mui/icons-material"


const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const goToPrevSlide = () => {
    const newIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNextSlide = () => {
    const newIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

   const handleFullscreen = () => {
    const elem = document.getElementById("lightbox");
    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className={`image-carousel ${isFullscreen ? <AspectRatio/> : ''}`}>
      <button className="fullscreen-button" onClick={handleFullscreen}>
        {isFullscreen ? <AspectRatio/> : <AspectRatio/>}
      </button>
      <button className="prev-button" onClick={goToPrevSlide}><ArrowBack/></button>
      <div id='lightbox'>
        <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
      </div>
      <button className="next-button" onClick={goToNextSlide}><ArrowForward/></button>
      <div className="indicators">
        {images.map((image, index) => (
          <span
            key={index}
            className={currentIndex === index ? 'active' : ''}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
