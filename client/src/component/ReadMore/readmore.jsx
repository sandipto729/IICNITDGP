import React, { useState } from 'react';
import styles from './styles/readmore.module.scss'; 
import Button from '../Core/Button';
import { Blurhash } from 'react-blurhash';

const NewsCard = ({ image, title, date, time, content }) => {
    const [showModal, setShowModal] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showBlurhash, setShowBlurhash] = useState(true);

    // Handle image load with 2s delay for Blurhash
    const handleImageLoad = () => {
        setImageLoaded(true);
        setTimeout(() => {
            setShowBlurhash(false);
        }, 2000); // 2 seconds delay
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
        <div className={styles.newsCard}>
            {/* Show Blurhash until 2s after the image loads */}
            {showBlurhash && (
                <Blurhash
                    hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
                    width="100%"
                    height={200}
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                    className={styles.newsCardImage}
                />
            )}
            
            <img
                src={image}
                alt={title}
                className={styles.newsCardImage}
                style={{ display: showBlurhash ? "none" : "block" }} // Show image after Blurhash delay
                onLoad={handleImageLoad}
            />

            <div className={styles.newsCardContent}>
                <h4 className={styles.schoolName}>National Institute of Technology, Durgapur</h4>
                <h3 className={styles.newsTitle}>{title}</h3>
                <p className={styles.newsDateTime}>
                    {date} - {time}
                </p>
                <p className={styles.newsDescription}>
                    <div dangerouslySetInnerHTML={{ __html: truncatedContent(content, 57) }} />
                </p>
                <Button className={styles.readMoreBtn} onClick={() => setShowModal(true)}>Read More</Button>
            </div>

            {/* Modal for full news/blog content */}
            {showModal && (
                <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        {showBlurhash && (
                            <Blurhash
                                hash="LPECd-RkxuWA~WM}t7f6skIpayay"
                                width="100%"
                                height={250}
                                resolutionX={32}
                                resolutionY={32}
                                punch={1}
                                className={styles.modalImage}
                            />
                        )}
                        <img
                            src={image}
                            alt={title}
                            className={styles.modalImage}
                            style={{ display: showBlurhash ? "none" : "block" }}
                            onLoad={handleImageLoad}
                        />

                        <h3>{title}</h3>
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                        <p className={styles.modalDate}>
                            {date} - {time}
                        </p>
                        <button className={styles.closeBtn} onClick={() => setShowModal(false)}>X</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsCard;
