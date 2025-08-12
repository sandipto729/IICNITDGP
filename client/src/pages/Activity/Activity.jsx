import React from 'react';
import Internship from '../../section/Internship/Internship';
import IdeathonEvent from '../../section/IdeathonEvent/IdeathonEvent';
import EventSection from '../../section/Event/event';
import styles from './styles/Activity.module.scss';

const Activity = () => {
    const [activeTab, setActiveTab] = React.useState('Internship');

    return (
        <div className={styles.activityWrapper} id="activity">

            <center className={styles.newsTitle}>
                <div>
                    Our <span style={{
                        background: "var(--primary)",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                    }}>Activity</span>
                </div>
                <div className={styles.bottomLine}></div>
            </center>

            <div className={styles.tabHeader}>
                <button
                    className={activeTab === 'Internship' ? styles.active : ''}
                    onClick={() => setActiveTab('Internship')}
                >
                    Internship
                </button>
                <button
                    className={activeTab === 'IdeathonEvent' ? styles.active : ''}
                    onClick={() => setActiveTab('IdeathonEvent')}
                >
                    Ideathon Event
                </button>
                <button
                    className={activeTab === 'Events' ? styles.active : ''}
                    onClick={() => setActiveTab('Events')}
                >
                    Events
                </button>
            </div>

            <div className={styles.tabContent}>
                {activeTab === 'Internship' && <Internship />}
                {activeTab === 'IdeathonEvent' && <IdeathonEvent />}
                {activeTab === 'Events' && <EventSection />}
            </div>
        </div>
    );
};

export default Activity;
