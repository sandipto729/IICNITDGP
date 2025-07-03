import React from 'react';
import { motion } from 'framer-motion';
import styles from './styles/Activity.module.scss';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import GradientText from '../../component/Core/TextStyle';
import InnovationApply from '../../component/InnovationIdea/Idea';
const activities = [
    {
        title: "Internet of Medical Things (IoMT)",
<<<<<<< HEAD
        details: "The Internet of Medical Things (IoMT) is a network of interconnected medical devices and sensors that collect and transmit healthcare data for monitoring and treatment purposes."
    },
    {
        title: "Artificial Intelligence in Health care",
        details: "Artificial Intelligence (AI) in healthcare refers to the use of advanced algorithms and data analytics to improve medical diagnosis, treatment, and patient outcomes."
    },
    {
        title: "Bio-fluidics",
        details: "Bio-fluidics is the study and manipulation of fluids and their properties in biological systems, with applications in fields such as biotechnology and medical diagnostics."
    },
    {
        title: "Wearable Implants",
        details: "Wearable implants are implantable medical devices that can be worn on or inside the body to monitor, track, or treat various health conditions."
    },
    {
        title: "Mobile Health (mHealth)",
        details: "Mobile health (mHealth) refers to the use of mobile devices and wireless technologies to support healthcare delivery and health outcomes."
    },
    {
        title: "3D Printing",
        details: "3D printing is a manufacturing process that creates three-dimensional objects by layering materials on top of each other based on a digital model, with applications in fields such as healthcare, engineering, and architecture."
    },
    {
        title: "3D Imaging, AR, VR",
        details: "3D imaging, augmented reality (AR), and virtual reality (VR) technologies create immersive, interactive experiences that enable users to visualize and interact with three-dimensional digital objects or environments, with applications in fields such as gaming, entertainment, education, and healthcare."
    },
    {
        title: "Computer Aided Diagnostics (CAD)",
        details: "Computer-aided diagnostics (CAD) involves the use of computer algorithms and machine learning techniques to support medical professionals in the interpretation of diagnostic imaging and other medical data for improved accuracy and efficiency."
    }
];

const Activity = () => {
    return (
        <div className={styles.mainAcitivity} id="activity">
            <div className={styles.heading}>
                <p className={styles.head}>
                    <div>FOCUSED AREAS</div>
                    <span
                        style={{
                            background: "var(--primary)",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                        }}
                    >
                    Focused areas of our<br />
                    Incubation Centre
                    </span>
                </p>
                <div className={styles.bottomLine}></div>
            </div>
            <div className={styles.activityContainer}>
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
                <InnovationApply />
            </div>
=======
        details: "The Internet of Medical Things is a network of interconnected medical devices and sensors that collect and transmit healthcare data for monitoring and treatment purposes.",
        icon: "🌐"
    },
    {
        title: "Artificial Intelligence in Healthcare",
        details: "AI refers to the use of advanced algorithms and data analytics to improve medical diagnosis, treatment, and patient outcomes.",
        icon: "🤖"
    },
    {
        title: "Bio-fluidics",
        details: "The study and manipulation of fluids in biological systems, with applications in medical diagnostics and biotechnology.",
        icon: "💧"
    },
    {
        title: "Wearable Implants",
        details: "Implantable medical devices worn on or inside the body to monitor, track, or treat health conditions.",
        icon: "📟"
    },
    {
        title: "Mobile Health (mHealth)",
        details: "Use of mobile devices and wireless technologies to support healthcare delivery and outcomes.",
        icon: "📱"
    },
    {
        title: "3D Printing",
        details: "Creates three-dimensional objects layer by layer, with applications in healthcare, engineering, and architecture.",
        icon: "🖨️"
    },
    {
        title: "3D Imaging, AR, VR",
        details: "Immersive tech for interacting with 3D digital objects in education, diagnostics, and simulation.",
        icon: "🕶️"
    },
    {
        title: "Computer Aided Diagnostics (CAD)",
        details: "Uses algorithms and machine learning to interpret medical imaging and diagnostics more accurately.",
        icon: "💻"
    }
];

<div className={styles.mainAcitivity} id="activity">
    <div className={styles.heading}>
        <p className={styles.head}>
            Healthcare{" "}
            <span
                style={{
                    background: "var(--primary)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                }}
            >
                Innovation
            </span>
        </p>
        <div className={styles.bottomLine}></div>
    </div>
    <div className={styles.activityContainer}>
        <div className={styles.details}>Explore groundbreaking advancements transforming the healthcare ecosystem:</div>
        <div className={styles.Activity}>
            {activities.map((activity, index) => (
                <motion.div
                    key={index}
                    className={styles.Card}
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                    <div className={styles.icon}>{activity.icon}</div>
                    <div className={styles.CardTitle}>{activity.title}</div>
                    <div className={styles.CardDetails}>{activity.details}</div>
                </motion.div>
            ))}
>>>>>>> c61af4f (Update Activity component and add new common JS file)
        </div>
    </div>
</div>

export default Activity;