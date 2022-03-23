import React, { Fragment, useRef, useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSliceActions } from "../redux/userSlice";
import Navbar from "../components/Navbar";

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    dispatch(userSliceActions.loginStart());
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBcB-1CBlCx_6uVp98RpmQndBEw-4kO8kI",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        dispatch(userSliceActions.loginSuccess(data));
      })
      .catch((err) => {
        dispatch(userSliceActions.loginFailure());
        // alert(err.message);
      });
  };

  return (
    <Fragment>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>SIGN IN</h1>
          <form className={styles.form} onSubmit={submitHandler}>
            <input
              className={styles.input}
              placeholder="email"
              type="email"
              ref={emailInputRef}
            />
            <input
              className={styles.input}
              placeholder="password"
              type="password"
              ref={passwordInputRef}
            />
            <button className={styles.button} disabled={isFetching}>
              LOGIN
            </button>
            {error && (
              <span className={styles.error}>Wrong email or password...</span>
            )}
            {/* <Link className={styles.link}>DO NOT YOU REMEBER THE PASSWORD?</Link> */}
            <Link to="/register" className={styles.link}>
              CREATE A NEW ACCOUNT
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
