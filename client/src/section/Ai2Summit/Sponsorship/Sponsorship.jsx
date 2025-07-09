import React from 'react'
import styles from './styles/sponsorship.module.scss'
import { motion } from 'framer-motion';
//import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { HashLink } from "react-router-hash-link";

const sponsorshipData = [
  {
    name: "Platinum",
    color: "#F0E68C", // Yellowish white
    amount: 750000,
    benefits: ["Logo on all materials", "Keynote Slot"]
  },
  {
    name: "Diamond",
    //color: "#B9FBC0", // Light green
    color: "rgb(198, 230, 225)",  // White
    amount: 600000,
    benefits: ["Banner branding", "Session Sponsorship"]
  },
  {
    name: "Gold",
    color: "#FFD700", // Gold
    amount: 500000,
    benefits: ["Logo on website", "Exhibition Stall "]
  },
  {
    name: "Silver",
    color: "#C0C0C0", // Silver
    amount: 250000,
    benefits: ["Logo in Brochure", "Logo in Acknowledgment"]
  },
  {
    name: "Bronze",
    color: "#CD7F32", // Bronze
    amount: 100000,
    benefits: ["Mention in Program Booklet"]
  }
];

const Sponsorship = () => {

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sponsorship Details</h1>
      <p className={styles.catchyLine}>Join us in making a difference!</p>
      <div className={styles.cardContainer}>
        {sponsorshipData.map((sponsor, index) => (
          <motion.div
            key={index}
            className={styles.card}
            style={{ backgroundColor: sponsor.color }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2>{sponsor.name}</h2>
            <p>Amount: Rs.{sponsor.amount}</p>
            <h3>Benefits:</h3>
            <ul>
              {sponsor.benefits.map((benefit, idx) => (
                <li key={idx}>{benefit}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <p className={styles.contactMessage}>
        If you want to sponsor, please contact us through the contact form.
      </p>
      
      <HashLink to="/#contact" style={{ marginTop: "3rem" ,paddingTop: '2rem'}}>
      <button 
        className={styles.joinBtn}
      >
        Contact Us
      </button>
          </HashLink>
      <ToastContainer />
    </div>
  );
}

export default Sponsorship
