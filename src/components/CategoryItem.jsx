import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./CategoryItem.module.css";

function CategoryItem({ item }) {
  return (
    <div className={styles.container}>
      {/* <Link to={`/product/${item.cat}`}> */}
      <Link to="/products/">
        <img className={styles.image} src={item.img} />
        <div className={styles.info}>
          <h1 className={styles.title}>{item.title}</h1>
          <button className={styles.button}>SHOP NOW</button>
        </div>
      </Link>
    </div>
  );
}

export default CategoryItem;
