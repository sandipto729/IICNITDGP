import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "../Core/Button";
import styles from "./styles/readmore_simple.module.scss";

function ReadMore({ title, content, className, image, date, eventId, name, time, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  const scrollPositionRef = useRef(0);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Reset body styles if component unmounts while modal is open
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const openModal = () => {
    // Store current scroll position
    scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop;
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollPositionRef.current}px`;
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    // Restore scroll position
    window.scrollTo(0, scrollPositionRef.current);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const formatContentWithLineBreaks = (text) => {
    if (!text) return '';
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  const stripHtml = (html) => {
    if (!html) return '';
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const truncateText = (text, limit = 150) => {
    if (!text) return '';
    const plainText = stripHtml(text);
    if (plainText.length <= limit) return plainText;
    return plainText.substring(0, limit) + '...';
  };

  return (
    <>
      <div className={`${styles.newsCard} ${className || ''}`} {...props}>
        {image && (
          <div className={styles.imageContainer}>
            <img 
              src={image} 
              alt={title || 'Event image'} 
              className={styles.newsCardImage}
            />
          </div>
        )}
        
        <div className={styles.newsCardContent}>
          <h4 className={styles.schoolName}>
            {name || "National Institute Of Technology, Durgapur"}
          </h4>
          <h3 className={styles.newsTitle}>{title}</h3>
          {date && (
            <p className={styles.newsDateTime}>
              {date}{time && ` - ${time}`}
            </p>
          )}
          <p className={styles.newsDescription}>
            {truncateText(content, 100)}
          </p>
          <Button 
            className={styles.readMoreBtn}
            onClick={openModal}
          >
            Read More
          </Button>
        </div>
      </div>

      {isOpen && createPortal(
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
          <div className={styles.modalContent}>
            <button className={styles.closeBtn} onClick={closeModal}>
              ×
            </button>
            
            {image && (
              <div className={styles.modalImage}>
                <img src={image} alt={title || 'Event image'} />
              </div>
            )}
            
            <div className={styles.modalBody}>
              <h2>{title}</h2>
              {date && (
                <p className={styles.modalDate}>
                  {date}{time && ` - ${time}`}
                </p>
              )}
              <div 
                className={styles.modalContent_text}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export default ReadMore;