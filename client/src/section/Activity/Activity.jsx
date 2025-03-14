import React from 'react';
import { motion } from 'framer-motion';
import styles from './styles/Activity.module.scss';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const activities = [
    {
        title: "Promoting Innovation",
        details: "This includes encouraging experimentation, supporting risk-taking, and providing resources and opportunities for individuals and teams to explore new concepts. By valuing diverse perspectives and staying open to change, organizations and societies can drive progress and achieve groundbreaking solutions."
    },
    {
        title: "Entrepreneurship Development",
        details: "This includes offering access to funding, business advice, and practical tools, as well as creating a nurturing environment that encourages risk-taking and growth. Effective support helps entrepreneurs navigate challenges and scale their businesses, driving economic and social impact."
    },
    {
        title: "Technology Transfer & Research",
        details: "It includes cultivating a collaborative community, facilitating access to funding and talent, and promoting an entrepreneurial culture. A well-developed ecosystem enhances the chances of startup success and drives innovation and economic growth."
    }
];

const Activity = () => {
  return (
    <div className={styles.activityContainer}>
        <div className={styles.Title}>IIC'S ACTIVITIES</div>
        <div className={styles.details}>The following are key activities involved in the Institution's Innovation Council (IIC):</div>
        <div className={styles.Activity}>
            {activities.map((activity, index) => (
                <motion.div 
                    key={index} 
                    className={styles.Card}
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -50 }}
                    transition={{ type: "spring", stiffness: 100, duration: 0.5, delay: index * 0.2 }}
                >
                    <LightbulbIcon className={styles.icon} />
                    <div className={styles.CardTitle}>{activity.title}</div>
                    <div className={styles.CardDetails}>{activity.details}</div>
                </motion.div>
            ))}
        </div>
    </div>
  );
};

export default Activity;
