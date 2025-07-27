/*
import React from 'react'
import styles from './styles/overview.module.scss';
import { motion } from 'framer-motion'

const Overview = () => {
  return (
    <div>
      <h1 className={styles.overviewContainer}>
        <div className={styles.overviewTitle}>{""} <span style={{
          background: "var(--primary)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}> Academic – Industry </span>
          and
          <span style={{
            background: "var(--primary)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}> Alumni Interaction </span>
          Summit
        </div>
        <div className={styles.bottomLine}></div>
      </h1>
      <div>
      <div >
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
          >
            <h1 className={styles.themeTitle}> <span style={{
              background: "var(--primary)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}> Theme: </span> Industry 4.0 : <span className={styles.themeDetails}>The Engine of Viksit Bharat 2047</span>
            </h1>
          </motion.div>
        </div>
        <div >
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
          >
            <h1 className={styles.venueDetails}> <span style={{
              background: "var(--primary)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}> Venue: </span> NIT Durgapur
            </h1>
          </motion.div>
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
          >
            <h1 className={styles.dateDetails}> <span style={{
              background: "var(--primary)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}> Date: </span> October 24 – 25, 2025
            </h1>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Overview
*/

import React from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import { CalendarToday } from '@mui/icons-material';
import styles from './styles/overview.module.scss';

const Overview = () => {
  const handleInfoClick = () => {
    toast.info("More information coming soon!");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.overviewContainer}>
        <div className={styles.overviewTitle}>{""} <span style={{
          background: "var(--primary)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}> Academic – Industry </span>
          and
          <span style={{
            background: "var(--primary)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}> Alumni Interaction </span>
          Summit
        </div>
        <div className={styles.bottomLine}></div>
      </h1>
      {/* Uncomment the line below to add a poster image */}
      <img src="assets/poster.jpg" alt="Poster" className={styles.poster} />
      
      <h1 className={styles.theme}>Theme{/*: <span className={styles.industry}>INDUSTRY 4.0</span>*/}</h1>
      <h2 className={styles.industry}>INDUSTRY 4.0</h2>
      <p className={styles.tagline}>The Engine of Viksit Bharat 2047</p>
      
      <div className={styles.details}>
        <div className={styles.venue}>
          <h4>Venue:</h4>
          <p onClick={handleInfoClick}>National Institute Of Technonlogy Durgapur</p>
        </div>
        <div className={styles.date}>
          <h4>Date:</h4>
          <p>
            <CalendarToday /> 24-25 th October, 2025
          </p>
        </div>
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default Overview;