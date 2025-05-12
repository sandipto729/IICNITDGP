import React from "react";
import { Link } from "react-router-dom";
import styles from './styles/footer.module.scss'; // Import SCSS styles
import GradientText from "../../component/Core/TextStyle";
import { motion } from "framer-motion";
import { HashLink } from "react-router-hash-link";

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
          <h3><GradientText text={"Address"}/></h3>
          <p className={styles.footerText}>National Institute of Technology, Durgapur</p>
          <p className={styles.footerText}>Mahatma Gandhi Avenue, Durgapur</p>
          <p className={styles.footerText}>West Bengal , PIN 713209</p>
        </div>

        {/* Column 2 */}
        <div className={styles.footerColumn}>
          <h3><GradientText text={"President"} /></h3>
          <p className={styles.footerText}>president_name</p>
          <p className={styles.footerText}>IIC NITDGP</p>
          <p className={styles.footerText}>iic@nitdgp.ac.in</p>
        </div>

        {/* Column 3 */}
        <div className={styles.footerColumn}>
          <h3><GradientText text={"Contact Us"}/></h3>
          <p className={styles.footerText}>Email: iic@nitdgp.ac.in</p>
          <p className={styles.footerText}>Phone:+91 </p>
        </div>

        {/* Column 4: Quick Links */}
        <div className={styles.footerColumn}>
          <h3><GradientText text={"Quick Links"}/></h3>
          <ul className={styles.footerLinks}>
            <li><Link className={styles.footerLink} to="/">Home</Link></li>
            <li><Link className={styles.footerLink} to="/team">Team</Link></li>
            {/* <li><Link className={styles.footerLink} to="/guidelines">Guidelines</Link></li> */}
            <li><HashLink smooth className={styles.footerLink} to="/#contact">Contact</HashLink></li>
          </ul>
          <HashLink to="/#contact">
            <button className={styles.joinBtn}>Join Us</button>
          </HashLink>
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