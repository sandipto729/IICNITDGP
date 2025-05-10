import React from 'react'
import styles from './styles/Card.module.scss'

const TestimonialCard = ({ description, name, degree }) => {
  return (
    <div className={styles.card}>
      <p className={styles.description}>"{description}"</p>
      <div className={styles.author}>
        <h4>{name}</h4>
        <p>{degree}</p>
      </div>
    </div>
  )
}

export default TestimonialCard;
