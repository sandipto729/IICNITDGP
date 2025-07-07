import React from 'react';
import styles from './styles/card.module.scss';

const Card = ({ img, link }) => {
  const handleClick = () => {
    window.open(link, '_blank');
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img 
        src={img} 
        alt="Card content"
        /*onError={(e) => {
          e.target.src = 'https://placehold.co/400x400';
          e.target.alt = 'Default placeholder image';
        }}*/
        className={styles.image}
      />
    </div>
  );
};

export default Card;