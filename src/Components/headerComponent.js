import React from "react";
import styles from "../CSS/head.module.css";
export default function HeaderComponent() {
  return (
    <div className={styles.maincontainer}>
      <div className={styles.innercontainer}>
        <div className={styles.leftDiv}>
          <img src="/images/Convertoo_logo.svg" />
          <p>ConverToo</p>
        </div>
        <div className={styles.rightDiv}></div>
      </div>
    </div>
  );
}
