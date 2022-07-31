import React from "react";
import { Link } from "react-router-dom";
import styles from "./cartEmpty.module.scss";
import cartEmptyImg from "../../assets/emptyCart.svg";

export const CartEmpty: React.FC = () => (
  <div className={styles.contentWrapper}>
    <div className={styles.leftWrapper}>
      <h1 className={styles.title}>
        Cart is empty <span>😕</span>
      </h1>
      <p className={styles.text}>
        You probably haven't ordered pizza yet,
        <br />
        to order a pizza, go to the main page.
      </p>
      <div className={styles.buttonsWrapper}>
        <Link to="/">
          <button className="button orange">
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 13L1 6.93015L6.86175 1"
                stroke="#fe5f00"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Main page</span>
          </button>
        </Link>
        <Link to="/orders">
          <button className="button gray">My orders</button>
        </Link>
      </div>
    </div>
    <div className={styles.rightWrapper}>
      <img className={styles.image} src={cartEmptyImg} alt="notfoundpage" />
    </div>
  </div>
);
