import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/Error.module.scss';
import errorImage from '../../assets/404.png'; // Make sure to place a 404 image in assets

const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <img src={errorImage} alt="404 Not Found" className={styles.image} />
            <h1>404 - <span style={{
                background: "var(--primary)",
                WebkitBackgroundClip: "text",
                color: "transparent",
            }}>Page</span> Not Found</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className={styles.homeBtn} style={{ background: "var(--primary)" }}>Go Back Home</Link>
        </div>
    );
};

export default NotFound;
