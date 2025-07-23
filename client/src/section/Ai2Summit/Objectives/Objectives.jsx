import React from 'react'
import styles from './styles/objectives.module.scss'
import { motion } from 'framer-motion';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const objectives = [
  {
      details: "Strengthen collaboration between industry and academia to drive future innovation and growth"
  },
  {
      details: "Provide cutting-edge research and technological solutions to address real-world industrial problems"
  },
  {
      details: "Design indutry-aligned academic programs and establish shared infrastructure and resources"
  },
  {
    details: "Foster entrepreneurial initiatives through mentorship, startup incubation and access to funding opportunities"
  }
];

const Objectives = () => {
  return (
    <div className={styles.Objectives}>
      <div className={styles.objectivesContainer}>
      <div className={styles.heading}>
        <p className={styles.head}>{" "}
          <span
            style={{
              background: "var(--primary)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Objectives
          </span>
        </p>
      </div>
        <div className={styles.details}>
        Strengthen academia – industry – alumni collaborations aligned with national missions such as Make in India, Digital India, Startup India, and Viksit Bharat 2047
        </div>
        <div className={styles.Objective}>
          {objectives.map((objective, index) => (
            <motion.div
              key={index}
              className={styles.Card}
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              transition={{ type: "spring", stiffness: 100, duration: 0.5, delay: index * 0.2 }}
            >
              <LightbulbIcon className={styles.icon} />
              <div className={styles.CardDetails}>{objective.details}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Objectives
