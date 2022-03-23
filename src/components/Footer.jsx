import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1 className={styles.logo}>ONE.</h1>
        <p className={styles.description}>
          There are many variations of passages of Lorem Ipsum available,but the
          majority have suffered alteration in some form, by injected humour, or
          randomised words which don't look even slightly believable.
        </p>
        <div className={styles.socialcontainer}>
          <div
            className={styles.socialicon}
            style={{ backgroundColor: "#385999" }}
          >
            <Facebook />
          </div>
          <div
            className={styles.socialicon}
            style={{ backgroundColor: "#E4405F" }}
          >
            <Instagram />
          </div>
          <div
            className={styles.socialicon}
            style={{ backgroundColor: "#55ACEE" }}
          >
            <Twitter />
          </div>
          <div
            className={styles.socialicon}
            style={{ backgroundColor: "#E60023" }}
          >
            <Pinterest />
          </div>
        </div>
      </div>
      <div className={styles.center}>
        <h3 className={styles.title}>Useful Links</h3>
        <ul className={styles.list}>
          <li className={styles.listitem}>Home</li>
          <li className={styles.listitem}>Cart</li>
          <li className={styles.listitem}>Man Fastion</li>
          <li className={styles.listitem}>Woman Fashion</li>
          <li className={styles.listitem}>Accessories</li>
          <li className={styles.listitem}>My Account</li>
          <li className={styles.listitem}>Order Tracking</li>
          <li className={styles.listitem}>Wishlist</li>
          <li className={styles.listitem}>Terms</li>
        </ul>
      </div>
      <div className={styles.right}>
        <h3 className={styles.title}>Contact</h3>
        <div className={styles.contactitem}>
          <Room style={{ marginRight: "10px" }} />
          622 Dixie Path, South Tobinchester 98336
        </div>
        <div className={styles.contactitem}>
          <Phone style={{ marginRight: "10px" }} />
          +1 234 56 78
        </div>
        <div className={styles.contactitem}>
          <MailOutline style={{ marginRight: "10px" }} />
          contact@one.dev
        </div>
        <img
          src="https://i.ibb.co/Qfvn4z6/payment.png"
          className={styles.payment}
        />
      </div>
    </div>
  );
};

export default Footer;
