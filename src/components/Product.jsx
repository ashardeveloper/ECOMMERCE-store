import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import React from "react";
import styles from "./Product.module.css";
import { Link } from "react-router-dom";

const Product = ({ item }) => {
  return (
    <Link to={`/products/${item.id}`}>
      <div className={styles.container}>
        <div className={styles.circle}></div>
        <img src={item.image} className={styles.image} />
        <div className={styles.info}>
          <div className={styles.icon}>
            <ShoppingCartOutlined />
          </div>
          <div className={styles.icon}>
            <SearchOutlined />
          </div>
          <div className={styles.icon}>
            <FavoriteBorderOutlined />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
