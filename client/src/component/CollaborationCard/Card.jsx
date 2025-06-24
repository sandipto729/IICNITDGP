import React from 'react'
import styles from './styles/Card.module.scss'

const Card = ({ name, photo, link }) => {
  return (
    <div className={styles.card}>
      <img src={photo} alt={name} className={styles.image} />
      <h3 className={styles.name}>{name}</h3>
      <a href={link} target="_blank" rel="noopener noreferrer" className={styles.link}>
        Visit Site
      </a>
    </div>
  )
}

export default Card