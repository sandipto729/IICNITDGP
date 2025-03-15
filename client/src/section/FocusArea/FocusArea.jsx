import React from "react";
import { motion } from "framer-motion";
import styles from "./styles/FocusArea.module.scss";

const MainFocus = [
    "To create a vibrant local innovation ecosystem.",
    "Start-up/entrepreneurship supporting Mechanism in HEIs.",
    "Prepare the institute for Atal Ranking of Institutions on Innovation Achievements Framework (ARIIA).",
    "Establish Function Ecosystem for Scouting Ideas and Pre-incubation of Ideas.",
    "Develop better Cognitive Ability amongst Technology Students."
];

const Functions = [
    "To conduct various innovation and entrepreneurship-related activities prescribed by Central MIC in a time-bound fashion.",
    "Identify and reward innovations and share success stories.",
    "Organize periodic workshops/seminars/interactions with entrepreneurs, investors, professionals and create a mentor pool for student innovators.",
    "Network with peers and national entrepreneurship development organizations.",
    "Create an Institution’s Innovation portal to highlight innovative projects carried out by institution’s faculty and students.",
    "Organize Hackathons, idea competitions, mini-challenges, etc. with the involvement of industries."
];

const FocusArea = () => {
    return (
        <div className={styles.OuterContainer}>
            <div className={styles.FocusAreaContainer}>
                <motion.div
                    className={styles.FocusArea}
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 50 }} 
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                >
                    <div className={styles.FocusAreaTitle}>Main Focus</div>
                    <div className={styles.FocusAreaDetails}>
                        <ul>
                            {MainFocus.map((item, index) => (
                                <motion.li
                                    key={index}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    initial={{ opacity: 0, x: -50 }}
                                    transition={{ type: "spring", stiffness: 100, duration: 0.5, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

                <motion.div
                    className={styles.FocusArea}
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
                >
                    <div className={styles.FocusAreaTitle}>Functions</div>
                    <div className={styles.FocusAreaDetails}>
                        <ul>
                            {Functions.map((item, index) => (
                                <motion.li
                                    key={index}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    initial={{ opacity: 0, x: -50 }}
                                    transition={{ type: "spring", stiffness: 100, duration: 0.5, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default FocusArea;
