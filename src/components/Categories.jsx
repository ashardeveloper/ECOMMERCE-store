import React from "react";
import styles from "./Categories.module.css";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";

function Categories() {
  return (
    <div className={styles.container}>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </div>
  );
}

export default Categories;
