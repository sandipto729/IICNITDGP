import React, { useState, useEffect } from 'react';


import styles from './styles/carousel.module.scss';
import carouselData from '../../../public/data/carouselItem.json';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselData.length) % carouselData.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (

    <div className={styles.carouselContainer}>
      <button className={`${styles.carouselButton} ${styles.leftButton}`} onClick={prevSlide}>
        &#10094; {/* Left arrow */}
      </button>
      <div className={styles.carousel}>
        {carouselData.map((item, index) => (
          <div key={index} className={styles.carouselItem} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            <h3>{item.name}</h3>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <img src={item.img} alt={item.name} />
            </a>
          </div>
        ))}
      </div>
      <button className={`${styles.carouselButton} ${styles.rightButton}`} onClick={nextSlide}>
        &#10095; {/* Right arrow */}
      </button>
    </div>
  );
};

export default Carousel;
