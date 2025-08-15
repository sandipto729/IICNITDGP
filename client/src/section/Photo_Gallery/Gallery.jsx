import React, { useEffect, useState } from 'react';
import styles from './styles/Gallery.module.scss';
import api from '../../common/api';
import Loader from './Loader/Loader'; // import the loader

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // loading state
  const [loadedCount, setLoadedCount] = useState(0); // Image load tracking

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch(api.GalleryFetch.url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log('Gallery data fetched:', data);
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching gallery photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  // Once all images are loaded
  useEffect(() => {
    if (photos.length > 0 && loadedCount === photos.length) {
      setIsLoading(false);
    }
  }, [loadedCount, photos.length]);

  const handleImageLoad = () => {
    setLoadedCount((prev) => prev + 1);
  };

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
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.galleryGrid}>
            {photos.map((photo, index) => (
              <img
                key={index}
                src={photo.images}
                alt={`Thumbnail ${index}`}
                onClick={() => setSelectedIndex(index)}
                onLoad={handleImageLoad}
                className={styles.galleryThumb}
              />
            ))}
          </div>

          {selectedIndex !== null && photos.length > 0 && photos[selectedIndex] && (
            <div className={styles.lightbox}>
              <button className={`${styles.closeBtn}`} onClick={closeViewer}>×</button>
              <button className={`${styles.navBtn} ${styles.left}`} onClick={showPrev}>‹</button>
              <img src={photos[selectedIndex].images} alt={`Large ${selectedIndex}`} className={styles.lightboxImg} />
              <button className={`${styles.navBtn} ${styles.right}`} onClick={showNext}>›</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PhotoGallery;
