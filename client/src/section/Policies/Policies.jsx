import React from 'react';
import styles from './styles/policies.module.scss';
import PolicyCard from '../../component/PolicyCard/PolicyCard'; // Importing PolicyCard
import policyData from '../../../public/data/policyItem.json'; // Importing policy data

import policyImage from '../../assets/policy.jpg'; // Importing the image

const Policies = () => {
  return (
    <div>
      <h1 className={styles.policyPage}>
        <div className={styles.policyTitle}>IIC <span style={{
          background: "var(--primary)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}>Policies</span></div>
      </h1>


      <div className={styles["policy-container"]}>


        {policyData.map((item, index) => (
          <PolicyCard key={index} heading={item.heading} link={item.link} />
        ))}

      </div>
    </div>
  )
}

export default Policies;
