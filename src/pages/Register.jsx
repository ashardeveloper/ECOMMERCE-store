import React, { Fragment, useRef } from "react";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";

const Register = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBcB-1CBlCx_6uVp98RpmQndBEw-4kO8kI",
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
            let errorMessage = "Enter password of atleast 6 characters!";

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        alert("Account created successfully!");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Fragment>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>CREATE AN ACCOUNT</h1>
          <form className={styles.form} onSubmit={submitHandler}>
            {/* <input className={styles.input} placeholder="name" />
          <input className={styles.input} placeholder="last name" />
          <input className={styles.input} placeholder="username" /> */}
            <input
              className={styles.input}
              placeholder="email"
              ref={emailInputRef}
              type="email"
            />
            <input
              className={styles.input}
              placeholder="password"
              ref={passwordInputRef}
              type="password"
            />
            {/* <input className={styles.input} placeholder="confirm password" /> */}
            <div className={styles.subcontainer}>
              <span className={styles.agreement}>
                By creating an amount, I consent to the processing of my
                personal data in accordance with the <b>PRIVACY POLICY</b>
              </span>
              {!isLoading && (
                <button className={styles.button}>CREATE ACCOUNT</button>
              )}
              {isLoading && <p>Sending request...</p>}

              <Link to="/login" className={styles.link}>
                Login with existing account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
