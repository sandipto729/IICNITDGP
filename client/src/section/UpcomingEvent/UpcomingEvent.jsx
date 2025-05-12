import React from 'react'
import { AnimatedBox } from '../../assets/animation/AnimatedBox'
import styles from './styles/UpcomingEvent.module.scss'
import Data from './../../../public/data/events.json'
import API from '../../common/api'

const UpcomingEvent = () => {
  const [upcomingEvent, setUpcomingEvent] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  const fetchUpcomingEvent = async () => {
    setLoading(true)
    const response= await fetch(API.WebinarFetch.url, {
        method: API.WebinarFetch.method,
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        const data = await response.json();
        setUpcomingEvent(data[data.length - 1]);
        setLoading(false)
    } else {
        console.error("Failed to fetch news data");
    }
    
  }

  React.useEffect(() => {
    fetchUpcomingEvent()
  },[])

  return (
    <div id='upcoming'>
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
              {loading? <p className={styles.boxinnertitle}>Loading...</p>:<p className={styles.boxinnertitle}>{upcomingEvent ? upcomingEvent.name : "Coming Soon"}</p>}
              {/* <p className={styles.boxinnersubtitle}>{upcomingEvent ? upcomingEvent.details : ""}</p> */}
            </div>
          </div>
        </div>
      </AnimatedBox>
    </div>
  )
}

export default UpcomingEvent
