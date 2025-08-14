import React from 'react'
import styles from './styles/HackathonCard.module.scss'

const HackathonCard = ({ name, link }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{name}</h3>
      <a href={link} target="_blank" rel="noopener noreferrer" className={styles.link}>
        Visit Site
      </a>
    </div>
  )
}

export default HackathonCard