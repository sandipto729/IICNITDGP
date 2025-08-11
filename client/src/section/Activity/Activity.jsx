import React from 'react';
import { motion } from 'framer-motion';
import styles from './styles/Activity.module.scss';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import GradientText from '../../component/Core/TextStyle';
import InnovationApply from '../../component/InnovationIdea/Idea';

const activities = [
    {
        title: "Industry 4.0",
        details: "Industry 4.0 integrates AI, IoT, and automation to create smart factories, enhancing productivity, real-time decision-making, and seamless communication between machines, systems, and humans."
    },   

    {
        title: "Robotics and AI",
        details: "Robotics and AI work together to create smart machines that automate tasks, learn from data, and improve efficiency across industries through precision, speed, and adaptability."

    },

    {
        title: "Quantum Innovation",
        details: "Quantum innovation uses the science of very tiny particles to make super-fast computers, safer ways to share information, and new tools for science and technology."
    },

     {
        title: "Semiconductor technology ",
        details: "Semiconductor technology powers electronic devices like phones and computers by controlling electricity flow, making them faster, smaller, and more efficient for everyday use."
    },

    {
        title: "E- mobility",
        details: "E-mobility means using electric vehicles like e-bikes and cars. It helps reduce pollution, saves fuel, and creates a cleaner, greener way to travel every day."

    },

    {
        title: "Iot",
        details: "The Internet of Things (IoT) connects everyday devices like lights, fans, and TVs to the internet, letting them work smartly and talk to each other."

    },
    
    {
        title: "Additive manufacturing and 3D printing",
        details: "Additive manufacturing, or 3D printing, builds objects layer by layer using digital designs. It helps make parts quickly, saves material, and allows custom shapes easily."

    },
    
    {
        title: "Healthcare Technology",
        details: "Healthcare technology uses machines, apps, and smart tools to help doctors treat patients better, track health easily, and improve care with faster and safer methods."

    },
    
    {
        title: "Green and clean Energy ",
        details: "Green and clean energy comes from natural sources like sunlight, wind, and water. It reduces pollution and helps keep the Earth safe and healthy for everyone."


    },
    
     
    {
        title: "Cyber security and block chain ",
        details: "Cybersecurity protects computers and data from hackers. Blockchain safely stores information in digital blocks, making online transactions more secure, honest, and harder to change or hack."


    }





];

const Activity = () => {
    return (
        <div className={styles.mainAcitivity} id="activity">
            <div className={styles.heading}>
                <p className={styles.head}>
                    Technological Verticals{" "}
                    <span
                        style={{
                            background: "var(--primary)",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                        }}
                    >
                        Of IIC
                    </span>
                </p>
                <div className={styles.bottomLine}></div>
            </div>
            <div className={styles.activityContainer}>
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
                {/* <InnovationApply /> */}
            </div>
        </div>

    );
};

export default Activity;
