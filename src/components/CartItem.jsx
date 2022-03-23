import classes from "./CartItem.module.css";
import styles from "./CartItem.module.css";
import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { cartItemActions } from "../redux/cart-item";
import { Fragment } from "react";

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const CartItem = (props) => {
  // const productPrice = `$${props.price.toFixed(2)}`;
  const dispatch = useDispatch();

  const { id, title, price, image, color, size } = props.item;
  let { quantity } = props.item;

  const removeItemHandler = () => {
    console.log(id);
    console.log(size);
    dispatch(cartItemActions.removeItemFromCart({ id, size }));
  };

  const addItemHandler = () => {
    const cartItemQuantity = quantity;
    console.log("cartItemQuantity: " + cartItemQuantity);
    quantity = quantity - cartItemQuantity;
    quantity++;
    console.log("Quantity: " + quantity);
    dispatch(
      cartItemActions.addItemToCart({
        id,
        title,
        price,
        image,
        quantity,
        color,
        size,
      })
    );
  };

  return (
    <Fragment>
      <li className={styles.product}>
        <div className={styles.productdetail}>
          <img className={styles.image} src={image} />
          <div className={styles.details}>
            <p className={styles.productname}>
              <b>Product:</b>
              {title}
            </p>
            <span className={styles.productid}>
              <b>ID:</b>
              {id}
            </span>
            {/* {color.map((c) => ( */}
            <ProductColor color={color} />
            {/* ))} */}

            <p className={styles.producsize}>
              <b>Size:</b>
              {size}
            </p>
          </div>
        </div>
        <div className={styles.pricedetail}>
          <div className={styles.productamountcontainer}>
            <Remove
              onClick={removeItemHandler}
              className={styles.addSubtractButton}
            />
            <div className={styles.productamount}>{quantity}</div>
            <Add
              onClick={addItemHandler}
              className={styles.addSubtractButton}
            />
          </div>
          <div className={styles.productprice}>
            {`$${price * quantity}`}
            <span className={styles.itemprice}>(${price}/item)</span>
          </div>
        </div>
      </li>
      <hr style={{ backgroundColor: "#eee", border: "none", height: "1px" }} />
    </Fragment>
  );
};

export default CartItem;
