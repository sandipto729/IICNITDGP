import React from 'react'
import { AnimatedBox } from '../../assets/animation/AnimatedBox'
import styles from './styles/UpcomingEvent.module.scss'
import API from '../../common/api'

const UpcomingEvent = () => {
  const [upcomingEvents, setUpcomingEvents] = React.useState([])  // changed to plural
  const [loading, setLoading] = React.useState(true)

  const fetchUpcomingEvent = async () => {
    setLoading(true)
    try {
      const response = await fetch(API.WebinarFetch.url, {
        method: API.WebinarFetch.method,
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        // Fetch last 3 events and reverse the order
        const lastThree = data.slice(-3)
        console.log("Upcoming Events:", lastThree)
        setUpcomingEvents(lastThree.reverse())  // Store as an array of events
      } else {
        console.error("Failed to fetch upcoming events")
      }
    } catch (err) {
      console.error("Error fetching upcoming events", err)
    }
    setLoading(false)
  }

  React.useEffect(() => {
    fetchUpcomingEvent()
  }, [])

  return (
    <div id='upcoming'>
      <AnimatedBox direction="left">
        <div className={`${styles.box2} ${styles.boxflex}`}>
          <img
            className={styles.howfedimg}
            src="https://uploads-ssl.webflow.com/663d299655b46de106de40d7/6657309f141df2159c9ffd32_vecteezy_3d-masculino-personaje-brazo-cruzado_24387905%202%20(1).svg"
            alt="event"
          />
          <div className={`${styles.howfed} ${styles.box}`}>
            <p className={styles.boxhead}>
              <span style={{ background: "var(--primary)", WebkitBackgroundClip: "text", color: "transparent" }}>
                Upcoming
              </span>{" "}
              Event
            </p>
            <div className={styles.boxinnertext}>
              {loading ? (
                <p className={styles.boxinnertitle}>Loading...</p>
              ) : upcomingEvents.length ? (
                <ul className={styles.eventList}>
                  {upcomingEvents.map(event => (
                    <li key={event.id} className={styles.boxinnertitle}>
                      <span className={styles.eventTitle}>{event.name}</span>{" "}
                      <span className={styles.eventDate}>{event.date}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.boxinnertitle}>No Upcoming Event</p>
              )}
            </div>

          </div>
        </div>
      </AnimatedBox>
    </div>
  )
}

export default UpcomingEvent
