import React from 'react'
import IICLOGO from '../../assets/iiclogo.png';
import NITDGPLOGO from '../../assets/NITLogo.jpeg';

import styles from './styles/mobiletopHeader.module.scss';
const mobiletopHeader = () => {
    return (

        <div className={styles.mobiletopHeader}>
            <div className={styles.mobiletopHeaderLeft}>
                <img src={IICLOGO} alt="IIC Logo" />
            </div>
            <div className={styles.mobiletopHeaderRight}>
                <img src={NITDGPLOGO} alt="NIT Durgapur Logo" />
            </div>
        </div>

    )
}

export default mobiletopHeader
