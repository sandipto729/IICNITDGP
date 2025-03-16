import React from 'react';
import styles from './styles/policies.module.scss';
import PolicyCard from '../../component/PolicyCard/PolicyCard'; // Importing PolicyCard
import policyData from '../../../public/data/policyItem.json'; // Importing policy data
import policyImage from '../../assets/policy.jpg'; // Importing the image
import { motion } from 'framer-motion';

const Policies = () => {
  return (
    <div>
      <img src={policyImage} alt="Policies" className={styles['policy-image']} />

      <motion.div className={styles["policy-container"]}
         whileInView={{ opacity: 1, x: 0 }}
         initial={{ opacity: 0, x: -30 }}
         transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
      >


        {policyData.map((item, index) => (
          <PolicyCard key={index} heading={item.heading} link={item.link} />
        ))}

      </motion.div>
    </div>
  )
}

export default Policies;
