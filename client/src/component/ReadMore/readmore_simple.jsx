import React, { useState } from 'react';
import styles from './styles/readmore.module.scss';
import Button from '../Core/Button';

const NewsCard = ({ image, title, date, time, content }) => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseModal = () => {
        setShowModal(false);
        document.body.style.overflow = 'unset';
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains(styles.modalOverlay)) {
            handleCloseModal();
        }
    };

    const stripHtml = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };

    const truncatedContent = (html, length) => {
        const text = stripHtml(html);
        return text.length > length ? text.slice(0, length) + "..." : text;
    };

    return (
        <>
            <div className={styles.newsCard}>
                <div className={styles.imageContainer}>
                    <img
                        src={image}
                        alt={title}
                        className={styles.newsCardImage}
                    />
                </div>
                <div className={styles.newsCardContent}>
                    <h4 className={styles.schoolName}>National Institute Of Technology, Durgapur</h4>
                    <h3 className={styles.newsTitle}>{title}</h3>
                    <p className={styles.newsDateTime}>
                        {date} - {time}
                    </p>
                    <p className={styles.newsDescription}>
                        <div dangerouslySetInnerHTML={{ __html: truncatedContent(content, 57) }} />
                    </p>
                    <Button className={styles.readMoreBtn} onClick={handleOpenModal}>
                        Read More
                    </Button>
                </div>
            </div>

            {/* Simple Modal */}
            {showModal && (
                <div className={styles.modalOverlay} onClick={handleOverlayClick}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeBtn} onClick={handleCloseModal}>
                            ×
                        </button>
                        
                        <div className={styles.modalImage}>
                            <img src={image} alt={title} />
                        </div>
                        
                        <div className={styles.modalBody}>
                            <h2>{title}</h2>
                            <p className={styles.modalDate}>{date} - {time}</p>
                            <div 
                                className={styles.modalContent_text}
                                dangerouslySetInnerHTML={{ __html: content }} 
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NewsCard;
