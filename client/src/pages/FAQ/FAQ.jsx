import React from 'react';
import { HashLink } from 'react-router-hash-link';
import styles from './styles/FAQ.module.scss';
import faqImage from '../../assets/faq.jpg';

const FAQ = () => {
    return (
        <div className={styles.faqWrapper}>
            <img src={faqImage} alt="FAQ Banner" className={styles.banner} />
            <h2 className={styles.title}>Frequently Asked <span style={{
                background: "var(--primary)",
                WebkitBackgroundClip: "text",
                color: "transparent",
            }}>Questions</span> (FAQ)</h2>

            <div className={styles.accordion}>
                <details>
                    <summary>Who can join the Innovation and Incubation Cell?</summary>
                    <p>Any interested student of NIT Durgapur can join IIC by participating in our events or reaching out to the core team.</p>
                </details>

                <details>
                    <summary>What is the motto of IIC NIT Durgapur?</summary>
                    <p>Our motto is to nurture innovation, foster entrepreneurship, and build a startup-friendly ecosystem within the campus.</p>
                </details>

                <details>
                    <summary>What kind of programs have been conducted?</summary>
                    <p>We’ve organized ideation challenges, startup mentorship sessions, hackathons, innovation workshops, and incubation bootcamps.</p>
                </details>

                <details>
                    <summary>What events have happened recently?</summary>
                    <p>Recently, we hosted the "Techpreneur Talk", "Startup 101" seminar, and the "Campus Innovators Hackathon".</p>
                </details>

                <details>
                    <summary>What is the latest upcoming event?</summary>
                    <p>
                        Check out our <HashLink smooth to="/#upcoming" className={styles.hashLink}>Upcoming Event Section</HashLink> to know what's next!
                    </p>
                </details>
            </div>
        </div>
    );
};


export default FAQ;
