import React from "react";
import { useEffect, useState } from "react";
import Product from "./Product";
import styles from "./Products.module.css";
import { useDispatch } from "react-redux";
import { productsActions } from "../redux/productsSlice";

const PopularProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://eshop-68b6c-default-rtdb.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedProducts = [];
      for (const key in responseData) {
        loadedProducts.push({
          id: key,
          title: responseData[key].title,
          description: responseData[key].description,
          price: responseData[key].price,
          image: responseData[key].image,
          size: responseData[key].size,
          color: responseData[key].color,
        });
      }
      setProducts(loadedProducts);
      setIsLoading(false);
    };

    fetchProducts().catch((error) => {
      setIsLoading(false);
      setHttpError(error.mesesage);
    });
  }, []);

  console.log(products);
  products.map((item) =>
    dispatch(
      productsActions.addProducts({
        key: item.id,
        id: item.id,
        title: item.title,
      })
    )
  );

  if (isLoading) {
    return (
      <section className={styles.productsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    console.log(httpError);
    return (
      <section className={styles.productsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  return (
    <div className={styles.container}>
      {products.slice(0, 4).map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </div>
  );
};

export default PopularProducts;
