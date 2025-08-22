import React, { useEffect, useState } from 'react';
import styles from './styles/Gallery.module.scss';
import api from '../../common/api';
import Loader from './../../layouts/Loader/Loader'; // import the loader

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // loading state

  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoading(true); // Start loading
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
        setIsLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error('Error fetching gallery photos:', error);
        setIsLoading(false); // Stop loading even if there's an error
      }
    };

    fetchPhotos();
  }, []);

  const handleImageLoad = () => {
    // Optional: Can be used for individual image loading states if needed
    console.log('Image loaded');
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
