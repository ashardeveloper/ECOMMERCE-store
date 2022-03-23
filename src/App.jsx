import React, { Suspense } from "react";
import "./index.css";
import { Route, Switch, Redirect } from "react-router-dom";
import CartProvider from "./store/CartProvider";
import Notification from "./UI/Notification";
import LoadingSpinner from "./UI/LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
import { sendCartData, fetchCartData } from "./redux/cart-actions";

const ProductList = React.lazy(() => import("./pages/ProductList"));
const Product = React.lazy(() => import("./pages/Product"));
const Cart = React.lazy(() => import("./pages/Cart"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Home = React.lazy(() => import("./pages/Home"));
let isInitial = true;

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cartItem);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const sendCartData = async () => {
  //     dispatch(
  //       cartItemActions.showNotification({
  //         status: "pending",
  //         title: "Sending...",
  //         message: "Sending cart data!",
  //       })
  //     );
  //     const response = await fetch(
  //       "https://eshop-68b6c-default-rtdb.firebaseio.com/cart.json",
  //       {
  //         method: "PUT",
  //         body: JSON.stringify(cart),
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error("Sending cart data failed.");
  //     }

  //     dispatch(
  //       cartItemActions.showNotification({
  //         status: "success",
  //         title: "Success!",
  //         message: "Sent cart data successfully!",
  //       })
  //     );
  //   };

  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }

  //   sendCartData().catch((error) => {
  //     dispatch(
  //       cartItemActions.showNotification({
  //         status: "error",
  //         title: "Error!",
  //         message: "Sending cart data failed!",
  //       })
  //     );
  //     console.log(error);
  //   });
  // }, [cart]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {/* {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )} */}
      <CartProvider>
        <Suspense
          fallback={
            <div className="centered">
              <LoadingSpinner />
            </div>
          }
        >
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/products" exact>
              <ProductList />
            </Route>
            <Route path="/products/:productId">
              <Product />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/login">
              {user ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route path="/register">
              {user ? <Redirect to="/" /> : <Register />}
            </Route>
          </Switch>
        </Suspense>
      </CartProvider>
    </Fragment>
  );
};

export default App;
