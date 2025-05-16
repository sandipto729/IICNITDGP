import React, { useEffect, useState } from 'react';
import styles from './styles/Gallery.module.scss';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      const res = await fetch('/data/photos.json');
      const data = await res.json();
      setPhotos(data);
    };
    fetchPhotos();
  }, []);

  const showNext = () => {
    setSelectedIndex((prev) => (prev + 1) % photos.length);
  };

  const showPrev = () => {
    setSelectedIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const closeViewer = () => {
    setSelectedIndex(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex !== null) {
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'Escape') closeViewer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryGrid}>
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Thumbnail ${index}`}
            onClick={() => setSelectedIndex(index)}
            className={styles.galleryThumb}
          />
        ))}
      </div>

      {selectedIndex !== null && (
        <div className={styles.lightbox}>
          <button className={`${styles.closeBtn}`} onClick={closeViewer}>×</button>
          <button className={`${styles.navBtn} ${styles.left}`} onClick={showPrev}>‹</button>
          <img src={photos[selectedIndex]} alt={`Large ${selectedIndex}`} className={styles.lightboxImg} />
          <button className={`${styles.navBtn} ${styles.right}`} onClick={showNext}>›</button>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
