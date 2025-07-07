import React from 'react'
import styles from './styles/commitee.module.scss';
import Members from './../../../../public/data/ai2summitMember.json'
import Card from './Card';
import { motion } from 'framer-motion';
const Commitee = () => {
  return (
    <div className={styles.Wrapper}>
            <div className={styles.heading}>
                <p className={styles.head}>
                    Organising {" "}
                    <span
                        style={{
                            background: "var(--primary)",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                        }}
                    >
                        Commitee Members
                    </span>{" "}
                </p>
                {/*<div className={styles.bottomLine}></div>*/}
            </div>
            {/*<div className={styles.commiteeMembers}>
              {Members.map((Member, index) => (
                <motion.div
                  key={index}
                  className={styles.Card}
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: -50 }}
                  transition={{ type: "spring", stiffness: 100, duration: 0.5, delay: index * 0.2 }}
                >
                  <img src={Member.img} alt={Member.name} className={styles.image}/>
                  <h2 className={styles.CardTitle}>{Member.name}</h2>
                  <div className={styles.CardDetails}>{Member.designation}</div>
              </motion.div>
              ))}
              </div>*/}
              <div className={styles.commiteeMembers}>
                {Members.map((member, index) =>(
                  <Card
                  key={index}
                  img={member.img}
                  name={member.name}
                  designation={member.designation}
                  />
                ))

                }
              </div>

            {/* <div className={styles.circle}></div> */}
        </div>
  )
}

export default Commitee
