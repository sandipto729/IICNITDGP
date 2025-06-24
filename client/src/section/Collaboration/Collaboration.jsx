import React from 'react'
import Data from '../../../public/data/collaboration.json'
import Card from '../../component/CollaborationCard/Card'
import styles from './styles/Collaboration.module.scss' // <-- Missing import

const Collaboration = () => {
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <p className={styles.head}>
                    IIC'S{" "}
                    <span
                        style={{
                            background: "var(--primary)",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                        }}
                    >
                        Collaboration
                    </span>
                </p>
                <div className={styles.bottomLine}></div>
            </div>
            <div className={styles.grid}>
                {Data.map((item, index) => (
                    <Card key={index} name={item.name} photo={item.photo} link={item.link} />
                ))}
            </div>
        </div>
    )
}

export default Collaboration
