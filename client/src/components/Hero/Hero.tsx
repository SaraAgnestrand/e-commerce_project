import { useState } from 'react';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import './Hero.css';

const Hero = () => {
  const images = [
    "https://livingedge.com.au/on/demandware.static/-/Sites-livingedge-master/default/dw0b358f25/Flos_GattoLamp_0000_1920x1080.jpg",
    "https://101cph.se/cdn/shop/products/Loft_Dining_Area_-_Brass_-_1_74bdfed0-6e5e-4325-bcce-5138c50fb400_1728x.jpg?v=1699956086",
    "https://paperrooms.co.uk/image/catalog/Petite%20Friture/Vertigo%20200/L0020101_L0020301_vertigo_suspension_small%20large_black_delight%20yoga_hospitality_Den%20Haag_%C2%A9Aico%20Lind%20-%20The%20Loft.jpg"
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

//https://livingedge.com.au/on/demandware.static/-/Sites-livingedge-master/default/dw0b358f25/Flos_GattoLamp_0000_1920x1080.jpg

// "https://www.lannamobler.se/globalassets/category-images/7.-belysning/bordslampor-2021.jpg" 

//https://paperrooms.co.uk/image/catalog/Petite%20Friture/Vertigo%20200/L0020101_L0020301_vertigo_suspension_small%20large_black_delight%20yoga_hospitality_Den%20Haag_%C2%A9Aico%20Lind%20-%20The%20Loft.jpg

// "https://101cph.se/cdn/shop/products/Loft_Dining_Area_-_Brass_-_1_74bdfed0-6e5e-4325-bcce-5138c50fb400_1728x.jpg?v=1699956086"


// Denna bild fungerar om man skjuter bilderna nedåt lite så man klipper den i överkant.
//https://www.svenssons.se/assets/blobs/fritz-hansen-night-owl-bordslampa-steel-polished-steel/588197-01_40_EnvironmentImage-6e5738a164.jpeg?preset=medium&dpr=2