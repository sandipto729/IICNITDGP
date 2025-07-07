import React from 'react'
import { useState } from 'react';
import styles from './styles/schedules.module.scss';
import Button from './../../../component/Core/Button';

const Schedules = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleSchedule =() =>{
    setShowModal(!showModal);
  }
  return (
    <div className={styles.ScheduleCard}>
      <div className={styles.ScheduleCardContent}>
                <div className={styles.catchyLine}>Curious about what's coming? Click below to preview the future - Get the tentative AI2 Summit schedule now!</div>
                <Button className={styles.readMoreBtn} onClick={toggleSchedule} style={{
                    background: "var(--primary)",
                    border: "none",
                }}>View</Button>
      </div>
      {showModal && (
                <div className={styles.modalOverlay} onClick={toggleSchedule}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.ScheduleContainer}>
                            <h1 className={styles.ScheduleCardTitle}>Tentative <span style={{
                                background: "var(--primary)",
                                WebkitBackgroundClip: "text",
                                color: "transparent",
                            }}>Schedule</span> </h1>
                            <div className={styles.day}>
                              <h3 className={styles.title}>Pre-Event (October 23, 2025) – <i>Idea Pitch &amp; Prototype Demonstration</i></h3>
                              <h4 className={styles.header}> 09:00–09:30 <span className={styles.desc}>Registration</span></h4>
                              <h4 className={styles.header}> 09:30–12:30 <span className={styles.desc}>Idea Pitch (Theme-based challenges)</span></h4>
                              <h4 className={styles.header}> 12:30–14:00 <span className={styles.desc}>Lunch</span></h4>
                              <h4 className={styles.header}> 14:00–17:00 <span className={styles.desc}>Prototype Demonstrations &amp; Judging</span></h4>
                              <h4 className={styles.header}> 17:00–17:30 <span className={styles.desc}>Winner Announcements</span></h4>
                            </div>
                            <div className={styles.day}>
                              <h3 className={styles.title}>Day 1 (October 24, 2025) – <i>Partnerships &amp; Innovation Launchpad</i></h3>
                              <h4 className={styles.header}> 09:00–09:30 <span className={styles.desc}>Registration</span></h4>
                              <h4 className={styles.header}> 09:30–10:30 <span className={styles.desc}>Inauguration Ceremony &amp; Keynote (Director &amp; Chief Guest)</span></h4>
                              <h4 className={styles.header}> 10:30–11:00 <span className={styles.desc}>Tea Break</span></h4>
                              <h4 className={styles.header}> 11:00–12:30 <span className={styles.desc}>Addresses by Dignitaries</span></h4>
                              <h4 className={styles.header}> 12:30–13:00 <span className={styles.desc}>Panel Discussion I</span></h4>
                              <h4 className={styles.header}> 13:00–14:30 <span className={styles.desc}>Lunch</span></h4>
                              <h4 className={styles.header}> 14:30–17:30 <span className={styles.desc}>Panel Discussion II</span></h4>
                              <h4 className={styles.header}> 19:30 onwards <span className={styles.desc}>Cultural Evening &amp; Networking 
Dinner</span></h4>
                            </div>
                            <div className={styles.day}>
                              <h3 className={styles.title}>Day 2 (October 25, 2025) – <i>Insights &amp; Action on Industry 4.0</i></h3>
                              <h4 className={styles.header}> 09:30–10:30 <span className={styles.desc}>Industry 4.0 Keynote </span></h4>
                              <h4 className={styles.header}> 10:30–12:30 <span className={styles.desc}>Panel Discussion</span></h4>
                              <h4 className={styles.header}> 12:30–14:00 <span className={styles.desc}>Lunch &amp; Networking</span></h4>
                              <h4 className={styles.header}> 14:00–16:00 <span className={styles.desc}> Roundtable on R&amp;D, Tech Transfer &amp; Industry Needs</span></h4>
                              <h4 className={styles.header}> 16:00–16:30 <span className={styles.desc}>Valedictory Ceremony &amp; Motivational Talk</span></h4>
                            </div>
                        </div>

                        <button className={styles.closeBtn} onClick={toggleSchedule}>X</button>
                    </div>
                </div>
            )}

    </div>
  )
}

export default Schedules

