import React from 'react';
import styles from './styles/policies.module.scss';
import PolicyCard from '../../component/PolicyCard/PolicyCard'; // Importing PolicyCard
import policyData from '../../../public/data/policyItem.json'; // Importing policy data

import policyImage from '../../assets/policy.jpg'; // Importing the image

const Policies = () => {
  return (
    <div>
      <img src={policyImage} alt="Policies" className={styles['policy-image']} />

      <div className={styles["policy-container"]}>


        {policyData.map((item, index) => (
          <PolicyCard key={index} heading={item.heading} link={item.link} />
        ))}

      </div>
    </div>
  )
}

export default Policies;
