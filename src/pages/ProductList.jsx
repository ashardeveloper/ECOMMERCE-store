import React from "react";
import Navbar from "../components/Navbar";
import Annoucement from "../components/Annoucement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import styles from "./ProductList.module.css";
import { useState } from "react";

const ProductList = () => {
  // const location = useLocation();
  // console.log(location.pathname.split("/")[2]);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handlerFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };
  console.log(filters);
  return (
    <div>
      <Navbar />
      <Annoucement />
      <h1 className={styles.title}>Dresses</h1>
      <div className={styles.filtercontainer}>
        <div className={styles.filter}>
          <div className={styles.filtertext}>Filter Products:</div>
          <select
            className={styles.select}
            name="color"
            onChange={handlerFilters}
          >
            <option disabled selected className={styles.option}>
              Color
            </option>
            <option>Black</option>
            <option>Red</option>
            <option>Blue</option>
            <option>Yellow</option>
            <option>Green</option>
            <option>White</option>
          </select>
          <select
            className={styles.select}
            name="size"
            onChange={handlerFilters}
          >
            <option disabled selected className={styles.option}>
              Size
            </option>
            <option className={styles.option}>XS</option>
            <option className={styles.option}>S</option>
            <option className={styles.option}>M</option>
            <option className={styles.option}>L</option>
            <option className={styles.option}>XL</option>
          </select>
        </div>
        <div className={styles.filter}>
          <div className={styles.filtertext}>Sort Products:</div>
          <select
            className={styles.select}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest" selected className={styles.option}>
              Newest
            </option>
            <option value="asc" className={styles.option}>
              Price (asc)
            </option>
            <option value="desc" className={styles.option}>
              Price (desc)
            </option>
          </select>
        </div>
      </div>
      <Products filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ProductList;
