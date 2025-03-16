// Loading.jsx
import React from "react";
import styles from "./styles/loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingCircle}></div>
      <div className={styles.loadingText}>IIC NITDGP</div>
    </div>
  );
};

export default Loading;
