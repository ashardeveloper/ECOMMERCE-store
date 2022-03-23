import React from "react";
import { useRef, useState, useContext, useEffect } from "react";
import styles from "./Product.module.css";
import styled from "styled-components";
import Annoucement from "../components/Annoucement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { Add, Remove } from "@material-ui/icons";
import CartContext from "../store/cart-context";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartItemActions } from "../redux/cart-item";
import { publicRequest } from "../requestMethod";

// const PRODUCT = {
//   id: "p1",
//   price: 50,
//   title: "Denim Jumpsuit",
//   description:
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, facilis nesciunt. Corporis repellendus voluptatum maiores quidem porro? Magni, labore? Tempora tenetur natus accusantium? Placeat eius, vel numquam officia autem debitis.",
//   image: "https://i.ibb.co/S6qMxwr/jean.jpg",
// };

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0px 5px;
  cursor: pointer;
  background-color: ${(props) => props.color};
`;

const Product = () => {
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [colorArray, setColorArray] = useState();
  const [color, setColor] = useState();
  const [sizeArray, setSizeArray] = useState();
  const [size, setSize] = useState("-Select-");
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [isClicked, setIsClicked] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isChange, setIsChange] = useState(true);
  const [sizeSelected, setSizeSelected] = useState(true);
  const dispatch = useDispatch();

  // const cartCtx = useContext(CartContext);
  // const [amountIsValid, setAmountIsValid] = useState(true);
  // const priceRef = useRef();
  // const amountRef = useRef();

  const point =
    "https://eshop-68b6c-default-rtdb.firebaseio.com/products/" +
    pathId +
    ".json";
  // console.log(point);
  // {`/products/${item.id}`}

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(point);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const newProduct = {
        id: pathId,
        ...responseData,
      };

      const colorArray = newProduct.color;
      const sizeArray = newProduct.size;

      // console.log(newProduct.color.map);
      // const loadedProducts = [];

      // for (const key in responseData) {
      //   loadedProducts.push({
      //     id: key,
      //     title: responseData[key].title,
      //     description: responseData[key].description,
      //     price: responseData[key].price,
      //     image: responseData[key].image,
      //   });
      // }
      setProduct(newProduct);
      setColorArray(colorArray);
      setSizeArray(sizeArray);
      setIsLoading(false);
      console.log(sizeArray);
    };

    fetchProducts().catch((error) => {
      setIsLoading(false);
      setHttpError(error.mesesage);
    });
  }, [pathId]);

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

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const submitHandler = () => {
    if (!isClicked && size === "-Select-") {
      setIsValid(false);
      setSizeSelected(false);
      return;
    }
    if (!isClicked) {
      setIsValid(false);
      return;
    }
    if (size === "-Select-") {
      setSizeSelected(false);
      return;
    }
    // if (isClicked === false && sizeSelected === true) {
    //   setIsValid(false);
    //   setSizeSelected(false);
    //   return;
    // }
    // if (!isClicked) {
    //   setIsValid(false);
    //   console.log(isValid);
    //   return;
    // }

    // if (isChange) {
    //   setSizeSelected(false);
    //   setIsChange(false);
    //   return;
    // }
    dispatch(
      // cartActions.addToCart({
      //   //dispatch payload value to update cart
      // }),

      cartItemActions.addItemToCart({
        id: product.id + size,
        image: product.image,
        title: product.title,
        price: product.price,
        quantity: quantity,
        color: color,
        size: size,
      })
    );

    // const productPrice = priceRef.current.innerText;
    // const productAmountRef = amountRef.current.innerText;
    // const enteredAmountRef = +productAmountRef;
    // cartCtx.addItem({
    //   price: productPrice,
    //   amount: enteredAmountRef,
    // });
  };
  return (
    <div className={styles.container}>
      <Navbar />
      <Annoucement />
      {/* <form className={styles.wrapper} onSubmit={submitHandler}> */}
      <div className={styles.wrapper}>
        <div className={styles.imgcontainer}>
          <img className={styles.image} src={product.image} />
        </div>
        <div className={styles.infocontainer}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.description}>{product.description}</p>
          <label className={styles.price}>{`$${product.price}`}</label>
          <div className={styles.filtercontainer}>
            <div className={styles.filter}>
              <span className={styles.filtertitle}>Color</span>
              {colorArray.map((c) => (
                // <FilterColor color={c} key={c} onClick={(c) => setColor(c)} />
                <div
                  className={`${styles["color-nonClicked"]} ${
                    isClicked && styles.clicked
                  }`}
                  style={{ backgroundColor: c }}
                  key={c}
                  onClick={() => (
                    setColor(c), setIsClicked(true), setIsValid(true)
                  )}
                />
                // () => setColor(c)
              ))}
            </div>
            {!isValid && <p style={{ color: "red" }}>Select a color!</p>}
            <div className={styles.filter}>
              <span className={styles.filtertitle}>Size</span>
              <select
                className={styles.filtersize}
                onChange={(e) => (
                  setSize(e.target.value), setSizeSelected(true)
                )}
              >
                {sizeArray.map((s) => (
                  <option className={styles.filtersizeoption} key={s}>
                    {s}
                  </option>
                ))}
              </select>
              {!sizeSelected && <p style={{ color: "red" }}>Select a size</p>}
            </div>
          </div>

          <div className={styles.addcontainer}>
            <div className={styles.amountcontainer}>
              <Remove
                onClick={() => handleQuantity("dec")}
                className={styles.addSubtractButton}
              />
              <span className={styles.amount}>{quantity}</span>
              <Add
                onClick={() => handleQuantity("inc")}
                className={styles.addSubtractButton}
              />
            </div>
            <button className={styles.button} onClick={submitHandler}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      {/* </form> */}
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Product;
