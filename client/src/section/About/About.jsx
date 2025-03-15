import React from 'react';
import styles from './styles/about.module.scss';
import { motion } from 'framer-motion';
import GradientText from '../../component/Core/TextStyle';


const About = () => {
  return (
    <div className={styles.aboutSection}>
      <div className={styles.aboutHeader}>
        <motion.div
          className={styles.HeaderCardCard}
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 50 }}
          transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
        >
          <h1>Institute Innovation Council (<GradientText text={"IIC"}></GradientText>)</h1>
        </motion.div>

      </div>
      <div className={styles.aboutDescription}>
        <motion.div
          className={styles.Card}
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -50 }}
          transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
        >
          <p>
            The Institute Innovation Council (IIC) is dedicated to fostering a vibrant culture of innovation and incubation among faculty and students at NITDGP. Our mission is to drive creativity and entrepreneurial spirit, resulting in the establishment of successful startups. These ventures, promoted and owned by our talented faculty and students, showcase the innovative potential and collaborative efforts within our community. By fostering collaboration and a proactive mindset, the IIC is dedicated to making NITDGP a hub of innovation, where ideas are turned into reality, and the next generation of entrepreneurs is born.
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default About;