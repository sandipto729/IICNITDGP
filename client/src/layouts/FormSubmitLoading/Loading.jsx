import React from 'react'
import styles from './styles/Loading.module.scss'
const Loading = () => {
    return (
        <div className={styles.loader_wrapper}>
            <div className={styles.loader}></div>
        </div>
    )
}

export default Loading
