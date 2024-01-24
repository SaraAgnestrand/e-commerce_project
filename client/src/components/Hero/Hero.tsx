import { useState } from 'react';
import hero1 from "../../assets/hero1.png"
import hero2 from "../../assets/hero2.png"
import hero3 from "../../assets/hero3.png"
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import './Hero.css';


  const Hero = () => {
    const images = [
      hero1,
      hero2,
      hero3
    ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };


  return (
    <div className='hero-section'>
      <img className="hero-img" src={images[currentIndex]} alt="Hero image" />
      <button className="left-arrow" onClick={goToPrevious}>
        <MdOutlineKeyboardArrowLeft size={50} color="white" />
      </button>
      <button className="right-arrow" onClick={goToNext}>
        <MdOutlineKeyboardArrowRight size={50} color="white" />
      </button>
    </div>
  )
}

export default Hero;

