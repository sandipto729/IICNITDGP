import React from "react";
import { Link } from "react-router-dom";
import styles from './styles/footer.module.scss'; // Import SCSS styles
import GradientText from "../../component/Core/TextStyle";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <motion.div className={styles.footerColumns}
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -30 }}
        transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
      >
        {/* Column 1 */}
        <div className={styles.footerColumn}>
          <h3><GradientText text={"Address"} gradient={"linear-gradient(to right, #1d9dec,#c7dcea)"}/></h3>
          <p className={styles.footerText}>Lorem ipsum dolor sit amet.</p>
          <p className={styles.footerText}>Consectetur adipiscing elit.</p>
          <p className={styles.footerText}>Lorem, ipsum dolor</p>
        </div>

        {/* Column 2 */}
        <div className={styles.footerColumn}>
          <h3><GradientText text={"President"} gradient={"linear-gradient(to right, #1d9dec,#c7dcea)"}/></h3>
          <p className={styles.footerText}>dfjkddewewiojdonj</p>
          <p className={styles.footerText}>this is </p>
          <p className={styles.footerText}>Web Development</p>
        </div>

        {/* Column 3 */}
        <div className={styles.footerColumn}>
          <h3><GradientText text={"Contact Us"} gradient={"linear-gradient(to right, #1d9dec,#c7dcea)"}/></h3>
          <p className={styles.footerText}>Email: example@domain.com</p>
          <p className={styles.footerText}>Phone: 12345689</p>
        </div>

        {/* Column 4: Quick Links */}
        <div className={styles.footerColumn}>
          <h3><GradientText text={"Quick Links"} gradient={"linear-gradient(to right, #1d9dec,#c7dcea)"}/></h3>
          <ul className={styles.footerLinks}>
            <li><Link className={styles.footerLink} to="/">Home</Link></li>
            <li><Link className={styles.footerLink} to="/team">Team</Link></li>
            <li><Link className={styles.footerLink} to="/guidelines">Guidelines</Link></li>
            <li><Link className={styles.footerLink} to="/contact">Contact</Link></li>
          </ul>
          <Link to="/contact">
            <button className={styles.joinBtn}>Join Us</button>
          </Link>
        </div>
      </motion.div>
      
      {/* Copyright Section */}
      <div className={styles.footerCopyright}>
        <p>&copy; 2025 IIC NIT DURGAPUR. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
