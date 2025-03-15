import React from 'react';
import styles from  './styles/about.module.scss';

const About = () => {
  return (
    <div className={styles.aboutSection}>
      <div className={styles.aboutHeader}>
        <h1>Institute Innovation Council (IIC)</h1>
      </div>
      <div className={styles.aboutDescription}>
        <p>
        The Institute Innovation Council (IIC) is dedicated to fostering a vibrant culture of innovation and incubation among faculty and students at NITDGP. Our mission is to drive creativity and entrepreneurial spirit, resulting in the establishment of successful startups. These ventures, promoted and owned by our talented faculty and students, showcase the innovative potential and collaborative efforts within our community. By fostering collaboration and a proactive mindset, the IIC is dedicated to making NITDGP a hub of innovation, where ideas are turned into reality, and the next generation of entrepreneurs is born.
        </p>
      </div>
    </div>
  );
};

export default About;