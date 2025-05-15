import React from 'react';
import PhotoGallery from '../../section/Photo_Galary/Galary';
import styles from './styles/Galary.module.scss';
const GalleryPage = () => {
    return (
        <div>
            <h2 className={styles.GalaryTitle}>
                <div>Photo <span style={{
                    background: "var(--primary)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                }}>Galary</span></div>
                <div className={styles.bottomLine}></div>
            </h2>
            {/* <h2 style={{ textAlign: 'center' }}>Photo Gallery</h2> */}
            <PhotoGallery />
        </div>
    );
};

export default GalleryPage;
