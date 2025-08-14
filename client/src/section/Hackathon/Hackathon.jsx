import React from 'react'
import HackathonCard from '../../component/HackathonCard/HackathonCard'
import styles from './styles/Hackathon.module.scss'

const hackathons = [
    {
        name: "Smart India Hackathon",
        link: "https://www.sih.gov.in/"
    },
    {
        name: "MSME Idea Hackathon",
        link: "https://my.msme.gov.in/inc/"
    },
    {
        name: "Smart Bengal Hackathon",
        link: "https://sbh.rcciit.org.in/"
    }
];

const Hackathon = () => {
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <p className={styles.head}>
                    HACKATHONS{" "}
                    <span
                        style={{
                            background: "var(--primary)",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                        }}
                    >
                        FOR YOU
                    </span>
                </p>
                <div className={styles.bottomLine}></div>
            </div>
            <div className={styles.grid}>
                {hackathons.map((hackathon, index) => (
                    <HackathonCard key={index} name={hackathon.name} link={hackathon.link} />
                ))}
            </div>
        </div>
    )
}

export default Hackathon