import React from 'react';
import styles from './styles/card.module.scss';

const Card = ({ img, name, designation }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={img} 
          alt={`Profile of ${name}`}
          /*onError={(e) => {
            e.target.src = 'https://placehold.co/300x300';
            e.target.alt = 'Default profile image';
          }}*/
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.designation}>{designation}</p>
      </div>
    </div>
  );
};

export default Card;