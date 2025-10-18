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
                            
                            {/* October 23 - timings changed to 12-hour AM/PM */}
                            <div className={styles.day}>
                              <h3 className={styles.title}>Pre-Event (October 23, 2025) – <i>Idea Pitch &amp; Prototype Demonstration</i></h3>
                              <h4 className={styles.header}> 9:00 AM–9:30 AM <span className={styles.desc}>Registration</span></h4>
                              <h4 className={styles.header}> 9:30 AM–12:30 PM <span className={styles.desc}>Idea Pitch (Theme-based challenges)</span></h4>
                              <h4 className={styles.header}> 12:30 PM–2:00 PM <span className={styles.desc}>Lunch</span></h4>
                              <h4 className={styles.header}> 2:00 PM–5:00 PM <span className={styles.desc}>Prototype Demonstrations &amp; Judging</span></h4>
                              <h4 className={styles.header}> 5:00 PM–5:30 PM <span className={styles.desc}>Winner Announcements</span></h4>
                            </div>

                            {/* Updated October 24 */}
                            <div className={styles.day}>
                              <h3 className={styles.title}>Day 1 (October 24, 2025) – <i>Partnerships &amp; Innovation Launchpad</i></h3>
                              <h4 className={styles.header}> 09:30 AM <span className={styles.desc}>Registration &amp; Tea</span></h4>
                              <h4 className={styles.header}> 10:30 AM <span className={styles.desc}>Inauguration Ceremony</span></h4>
                              <h4 className={styles.header}> 10:50 AM <span className={styles.desc}>Address from the Chief Guest</span></h4>
                              <h4 className={styles.header}> 11:15 AM <span className={styles.desc}>Alumni Entrepreneur Felicitation &amp; MoU Signing</span></h4>
                              <h4 className={styles.header}> 11:40 AM <span className={styles.desc}>Special Address by Eminent Alumni</span></h4>
                              <h4 className={styles.header}> 11:55 AM <span className={styles.desc}>Visionary Talk by Dignitaries</span></h4>
                              <h4 className={styles.header}> 2:30 PM <span className={styles.desc}>Prototype Demonstration &amp; Stall Visit</span></h4>
                              <h4 className={styles.header}> 3:30 PM <span className={styles.desc}>Panel Discussion-1 (Industry 4.0, Robotics, AI/ML)</span></h4>
                              <h4 className={styles.header}> 4:45 PM <span className={styles.desc}>StartUp Pitch Competition</span></h4>
                              <h4 className={styles.header}> 7:00 PM <span className={styles.desc}>Cultural Evening</span></h4>
                              <h4 className={styles.header}> 8:00 PM <span className={styles.desc}>Networking Dinner</span></h4>
                            </div>

                            {/* Updated October 25 */}
                            <div className={styles.day}>
                              <h3 className={styles.title}>Day 2 (October 25, 2025) – <i>Insights &amp; Action on Industry 4.0</i></h3>
                              <h4 className={styles.header}> 9:30 AM <span className={styles.desc}>Presentation of IIC NIT Durgapur &amp; MSME</span></h4>
                              <h4 className={styles.header}> 9:45 AM <span className={styles.desc}>Panel Discussion-II (IoT, Semiconductor, Quantum Innovation)</span></h4>
                              <h4 className={styles.header}> 11:00 AM <span className={styles.desc}>Plenary Talk by Industrialists</span></h4>
                              <h4 className={styles.header}> 12:05 PM <span className={styles.desc}>Panel Discussion- III (e-mobility and Green Energy)</span></h4>
                              <h4 className={styles.header}> 2:30 PM <span className={styles.desc}>Panel Discussion-IV (MSME &amp; Viksit Bharat)</span></h4>
                              <h4 className={styles.header}> 3:45 PM <span className={styles.desc}>Student, Alumni &amp; Faculty Interaction</span></h4>
                              <h4 className={styles.header}> 4:45 PM <span className={styles.desc}>Valedictory</span></h4>
                              <h4 className={styles.header}> 6:00 PM <span className={styles.desc}>Cultural Evening</span></h4>
                              <h4 className={styles.header}> 7:00 PM <span className={styles.desc}>Alumni Dinner</span></h4>
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
