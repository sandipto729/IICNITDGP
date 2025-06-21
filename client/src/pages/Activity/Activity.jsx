import React from 'react';
import Internship from '../../section/Internship/Internship';
import IdeathonEvent from '../../section/IdeathonEvent/IdeathonEvent';
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
            </div>

            <div className={styles.tabContent}>
                {activeTab === 'Internship' && <Internship />}
                {activeTab === 'IdeathonEvent' && <IdeathonEvent />}
            </div>
        </div>
    );
};

export default Activity;
