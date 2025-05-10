import React from 'react'
import { AnimatedBox } from '../../assets/animation/AnimatedBox'
import styles from './styles/UpcomingEvent.module.scss'
import Data from './../../../public/data/events.json'

const UpcomingEvent = () => {
  const [upcomingEvent, setUpcomingEvent] = React.useState(null)

  React.useEffect(() => {
    // Directly use imported JSON
    console.log("Upcoming Event", Data.events)
    if (Data.events.length > 0) {
      setUpcomingEvent(Data.events[0])
    }
  }, [])

  return (
    <div>
      <AnimatedBox direction="left">
        <div className={`${styles.box2} ${styles.boxflex}`}>
          <img
            className={styles.howfedimg}
            src="https://uploads-ssl.webflow.com/663d299655b46de106de40d7/6657309f141df2159c9ffd32_vecteezy_3d-masculino-personaje-brazo-cruzado_24387905%202%20(1).svg"
            alt=""
          />
          <div className={`${styles.howfed} ${styles.box}`}>
            <p className={styles.boxhead}>
              <span style={{ background: "var(--primary)", WebkitBackgroundClip: "text", color: "transparent" }}>
                Upcoming
              </span>{" "}
              Event
            </p>
            <div className={styles.boxinnertext}>
              <p className={styles.boxinnertitle}>{upcomingEvent ? upcomingEvent.name : "Coming Soon"}</p>
              <p className={styles.boxinnersubtitle}>{upcomingEvent ? upcomingEvent.details : ""}</p>
            </div>
          </div>
        </div>
      </AnimatedBox>
    </div>
  )
}

export default UpcomingEvent
