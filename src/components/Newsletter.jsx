import { Send } from "@material-ui/icons";
import React from "react";
import styles from "./Newsletter.module.css";

const Newsletter = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Newsletter</h1>
      <div className={styles.description}>
        Get timely updates from your favorite products.
      </div>
      <div className={styles.inputcontainer}>
        <input placeholder="Your email" className={styles.input} />
        <button className={styles.button}>
          <Send />
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
