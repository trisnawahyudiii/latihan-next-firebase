import React from "react";
import styles from "../styles/NotFount.module.css";
const NotFound = () => {
  return (
    <div className={styles.main}>
      <span className={styles.bold}>404</span>
      <span className={styles.bold}>|</span>
      <span>This page could not be found.</span>
    </div>
  );
};

export default NotFound;
