import { Badge } from "@material-ui/core";
import { useContext } from "react";
import CartContext from "../store/cart-context";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styles from "./Navbar.module.css";
import SearchBar from "./SeachBar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSliceActions } from "../redux/userSlice";

const Navbar = () => {
  const cartCtx = useContext(CartContext);
  const cartUpdate = useSelector((state) => state.cartItem.totalQuantity);
  const user = useSelector((state) => state.user.currentUser);
  const productList = useSelector((state) => state.products.productList);
  const dispatch = useDispatch();
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  console.log(productList);
  const logoutHandler = () => {
    dispatch(userSliceActions.logOut());
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <p className={styles.language}>EN</p>
        <div className={styles.searchcontainer}>
          {/* <input placeholder="Search" className={styles.input} />
          <Search style={{ color: "grey", fontSize: 16 }} /> */}
          <SearchBar
            className={styles.searchIcon}
            placeholder="Search..."
            data={productList}
          />
        </div>
      </div>
      <div className={styles.mobileWrapper}>
        <div className={styles.center}>
          <Link to="/home">
            <h1 className={styles.logo}>ONE.</h1>
          </Link>
        </div>
        <div className={styles.right}>
          <Link to="/products">
            <p className={styles.menuitem}>CATALOG</p>
          </Link>
          {!user && (
            <Link to="/register">
              <p className={styles.menuitem}>REGISTER</p>
            </Link>
          )}
          {!user && (
            <Link to="/login">
              <p className={styles.menuitem} onClick={logoutHandler}>
                LOGIN
              </p>
            </Link>
          )}
          {user && (
            <p className={styles.menuitem} onClick={logoutHandler}>
              Log Out
            </p>
          )}
          <Link to="/cart" className={styles.menuitem}>
            <Badge badgeContent={cartUpdate} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
