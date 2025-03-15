import React from 'react';
import styles from './styles/footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>




      <div className={styles.footerColumns}>
        <div className={styles.column} >
          <div className={styles.address}>
            <h4>Address</h4>
            <p>National Institute of Technology, Durgapur</p>
            <p>Address</p>
            <p>Address</p>
            <p>West Bengal , PIN 72XXXX</p>
          </div>
        </div>
        <div className={styles.column}>
          <h4>President</h4>
          <p>Dr. unknown unknown</p>
          <p>IIC </p>
          <p>iic.che@nitdgp.ac.in</p>
        </div>
        <div className={styles.column}>
          <h4>Contact Us</h4>
          <p>Email: iic.che@nitdgp.ac.in</p>
          <p>Phone: </p>
          <p>Fax: </p>
        </div>
        <div className={styles.column}>
          <div className={styles.quickLinks}>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/about">Innovation Cell</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className={styles.joinUs}>
            <button>JOIN US</button>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        IIC NITDGP Web Team
      </div>
    </footer>

  );
};

export default Footer;
