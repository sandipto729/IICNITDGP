import React from 'react';
import PhotoGallery from '../../section/Photo_Gallery/Gallery';
import styles from './styles/Gallery.module.scss';
const GalleryPage = () => {
    return (
        <div>
            <h2 className={styles.GalleryTitle}>
                <div>Photo <span style={{
                    background: "var(--primary)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                }}>Gallery</span></div>
                <div className={styles.bottomLine}></div>
            </h2>
            {/* <h2 style={{ textAlign: 'center' }}>Photo Gallery</h2> */}
            <PhotoGallery />
        </div>
    );
};

export default GalleryPage;
