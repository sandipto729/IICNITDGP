import React from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import styles from './styles/technologicalverticals.module.scss';

const technologicalVerticals = [
  "MSME, Quantum Innovation, Semiconductors ",
  "Electric Vehicles, Green, and Clean Energy",
  "Biomanufacturing and Digital Manufacturing ",
  "Resilient Infrastructure"
];

const governmentAlignments = [
  "Atmanirbhar Bharat, MSME Growth ",
  "National Electric Mobility Mission, Net Zero 2070 ",
  "Make in India, Startup India",
  "Smart Cities Mission, AMRUT, Urban Sustainability "
];

const TechnologicalVerticals = () => {
  const handleInfoClick = () => {
    toast.info("More information coming soon!");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Technological Verticals & Government Alignments</h1>
      <p className={styles.catchyLine}>Innovating for a better tomorrow!</p>
      <div className={styles.cardContainer}>
        <div className={styles.verticals}>
          <h2>Technological Verticals</h2>
          {technologicalVerticals.map((vertical, index) => (
            <motion.div
              key={index}
              className={styles.card}
              onClick={handleInfoClick}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {vertical}
            </motion.div>
          ))}
        </div>
        <div className={styles.alignments}>
          <h2>Government Alignments</h2>
          {governmentAlignments.map((alignment, index) => (
            <motion.div
              key={index}
              className={styles.card}
              onClick={handleInfoClick}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {alignment}
            </motion.div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TechnologicalVerticals;
