import React, { useState } from 'react';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import './ImgSlider.css';

interface ImgSliderProps {
  img: string[];
}

const ImgSlider: React.FC<ImgSliderProps> = ({ img }) => {
  console.log("ImgSlider får bild-URL:er: ", img);
  console.log("re-rendering slider: ", img) 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const canScrollLeft = currentImageIndex > 0;
  console.log("Aktuellt index (initialt): ", currentImageIndex);
  const canScrollRight = currentImageIndex < img.length - 1;

  const scroll = (direction: 'left' | 'right') => {
    let newIndex = currentImageIndex;
    if (direction === 'left' && canScrollLeft) {
      newIndex = currentImageIndex - 1;
    } else if (direction === 'right' && canScrollRight) {
      newIndex = currentImageIndex + 1;
    }
    setCurrentImageIndex(newIndex);
    console.log("Nytt index efter scroll: ", newIndex); // Logga uppdaterat index
  };

return (
  <div className="image-slider">
    <img src={img[currentImageIndex]} alt={`Product Image ${currentImageIndex + 1}`} style={{ maxWidth: '500px', maxHeight: '500px' }} />
      {canScrollLeft && (
          <div className="arrow-icon">
            <MdOutlineKeyboardArrowLeft className="arrow arrow-left" onClick={() => scroll('left')} />
          </div>
      )}

      <img src={img[currentImageIndex]} alt={`Product Image ${currentImageIndex + 1}`} className="image" />

      {canScrollRight && (
          <div className="arrow-icon">
            <MdOutlineKeyboardArrowRight className="arrow arrow-right" onClick={() => scroll('right')} />
          </div>
      )}

      <div className="dots-container">
          {img.map((_, index) => (
              <span key={index} className={`dot ${index === currentImageIndex ? 'active' : ''}`}></span>
          ))}
      </div>
  </div>
);
};

export default ImgSlider;
