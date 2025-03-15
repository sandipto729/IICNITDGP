import React from 'react';
import styles from './styles/policyCard.module.scss'; // Importing the styles as a module


const PolicyCard = ({ heading, link }) => {
  return (
    <div className={styles.policyCard} onClick={() => window.open(link, '_blank')}>

      <h3>{heading}</h3>
    </div>
  );
}

export default PolicyCard;
