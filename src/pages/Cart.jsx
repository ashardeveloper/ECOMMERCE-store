import { useContext, useState } from "react";

import Navbar from "../components/Navbar";
import Annoucement from "../components/Annoucement";
import Footer from "../components/Footer";
import styles from "./Cart.module.css";
import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import CartContext from "../store/cart-context";
import CartItem from "../components/CartItem";
import { useSelector } from "react-redux";
import Checkout from "../components/Checkout";

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const Cart = (props) => {
  // const cartCtx = useContext(CartContext);
  const [checkout, setCheckout] = useState(false);
  const cartItems = useSelector((state) => state.cartItem.items);
  const total = useSelector((state) => state.cartItem.totalPrice);
  // const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  let cartItemProducts = {};

  const checkoutHandler = () => {
    setCheckout(true);
  };

  const modalHandler = () => {
    setCheckout(false);
  };

  return (
    <div className={styles.container}>
      {checkout && <Checkout onClose={modalHandler} />}
      <Navbar />
      <Annoucement />
      {cartItems.length === 0 ? (
        <h4 className={styles.emptyCart}>Cart is empty.</h4>
      ) : (
        <div className={styles.wrapper}>
          <h1 className={styles.title}>YOUR ITEMS</h1>
          <div className={styles.top}>
            <TopButton>CONTINUE SHOPPING</TopButton>
            <div className={styles.toptexts}>
              <span className={styles.toptext}>Shopping Bag(2)</span>
              <span className={styles.toptext}>Your Wishlist(0)</span>
            </div>
            <TopButton type="filled">CHECKOUT NOW</TopButton>
          </div>
          <div className={styles.bottom}>
            <div className={styles.info}>
              {/* <div className={styles.product}> */}
              <ul className={styles.product}>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id + item.size}
                    item={{
                      id: item.id,
                      title: item.title,
                      image: item.image,
                      // size={item.size}
                      // amount={item.amount}
                      price: item.price,
                      quantity: item.quantity,
                      color: item.color,
                      size: item.size,
                      // total: item.totalPrice,
                      // onRemove={cartItemRemoveHandler.bind(null, item.id)}
                      // onAdd={cartItemAddHandler.bind(null, item)}
                    }}
                  />
                ))}
              </ul>
              {/* </div> */}

              {/*<div className={styles.product}>
              <div className={styles.productdetail}>
                <img
                  className={styles.image}
                  src="https://i.pinimg.com/originals/2d/af/f8/2daff8e0823e51dd752704a47d5b795c.png"
                />
                <div className={styles.details}>
                  <span className={styles.productname}>
                    <b>Product:</b>HAKURA T-SHIRT
                  </span>
                  <span className={styles.productid}>
                    <b>ID:</b>93813718293
                  </span>
                  <ProductColor color="gray" />
                  <span className={styles.producsize}>
                    <b>Size:</b>M
                  </span>
                </div>
              </div>
              <div className={styles.pricedetail}>
                <div className={styles.productamountcontainer}>
                  <Add />
                  <div className={styles.productamount}>1</div>
                  <Remove />
                </div>
                <div className={styles.productprice}>$ 20</div>
              </div>
            </div> */}
            </div>
            <div className={styles.summary}>
              <h1 className={styles.summarytitle}>ORDER SUMMARY</h1>
              <SummaryItem>
                <div className={styles.summaryitemtext}>Subtotal</div>
                <div className={styles.summaryitemprice}>{`$${total}`}</div>
              </SummaryItem>
              <SummaryItem>
                <div className={styles.summaryitemtext}>Estimated Shipping</div>
                <div className={styles.summaryitemprice}>$ 5.90</div>
              </SummaryItem>
              <SummaryItem>
                <div className={styles.summaryitemtext}>Shipping Discount</div>
                <div className={styles.summaryitemprice}>$ -5.90</div>
              </SummaryItem>
              <SummaryItem type="total">
                <div className={styles.summaryitemtext}>Total</div>
                <div className={styles.summaryitemprice}>{`$${total}`}</div>
              </SummaryItem>
              <button className={styles.button} onClick={checkoutHandler}>
                CHECKOUT NOW
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Cart;
