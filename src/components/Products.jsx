import React from "react";
import { useEffect, useState } from "react";
import Product from "./Product";
import styles from "./Products.module.css";

const Products = ({ filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [homeProducts, setHomeProducts] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
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
  useEffect(() => {
    setFilteredProducts(
      products.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      )
    );
    if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === "desc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
    // setFilterProducts(products);
    // setHomeProducts(false);
  }, [products, filters]);

  useEffect(() => {
    // if ((sort = "newest")) {
    //   setFilteredProducts((prev) =>
    //     [...prev].sort((a, b) => a.createdAt - b.createdAt)
    //   );
    // }

    if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  console.log(filteredProducts);

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
      {filteredProducts.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Products;
