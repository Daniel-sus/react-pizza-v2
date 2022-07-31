import styles from "./sidebar.module.scss";
import cross from "../../assets/cross.svg";
import CartItem from "../items/cartitem/CartItem";
import { useAppSelector } from "../../hooks/redux";
import { Link } from "react-router-dom";
import empty from "../../assets/empty.svg";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { selectCart } from "../../redux-toolkit/reducers/cart/selectors";
import { calcTotalPrice } from "../../hooks/calcTotalPrice";

type SideBarProps = {
  openCart: () => void;
};

const SideBar: React.FC<SideBarProps> = ({ openCart }) => {
  const { items } = useAppSelector(selectCart);

  return (
    <motion.div
      initial={{
        x: 395,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.3,
        },
      }}
      exit={{
        x: 395,
        opacity: 0,
      }}
      className={items.length > 0 ? styles.sidebar : styles.sidebarClosed}
    >
      {items.length > 0 ? (
        <>
          <div className={styles.topWrapper}>
            <div className={styles.cartTitle}>
              There{" "}
              {items.reduce((sum, item) => sum + item.quantityadded, 0) === 1
                ? "is"
                : "are"}{" "}
              {items.reduce((sum, item) => sum + item.quantityadded, 0)}{" "}
              {items.reduce((sum, item) => sum + item.quantityadded, 0) === 1
                ? "pizza"
                : "pizzas"}{" "}
              in the cart
            </div>
            <img
              className={styles.cross}
              onClick={openCart}
              src={cross}
              alt="cross"
            />
          </div>
          <div className={styles.itemsWrapper}>
            <AnimatePresence>
              {items.map((obj) => (
                <CartItem
                  key={
                    obj.id +
                    obj.sizes +
                    obj.types +
                    JSON.stringify(obj.toppings)
                  }
                  {...obj}
                />
              ))}
            </AnimatePresence>
          </div>
          <div className={styles.checkout}>
            <div className={styles.itogo}>
              <div className={styles.itogoText}>Taxes 5%:</div>
              <div className={styles.dots}></div>
              <div className={styles.checkoutPrice}>
                {calcTotalPrice(items, "taxes")} ${" "}
              </div>
            </div>
            <div className={styles.itogo}>
              <div className={styles.itogoText}>Delivery price:</div>
              <div className={styles.dots}></div>
              <div className={styles.checkoutPrice}>
                {calcTotalPrice(items, "delivery")} $
              </div>
            </div>
            <div className={styles.itogo}>
              <div className={styles.itogoText}>Total:</div>
              <div className={styles.dots}></div>
              <div className={styles.checkoutPrice}>
                {calcTotalPrice(items, "total")} ${" "}
              </div>
            </div>
            <Link onClick={openCart} to="/checkout">
              <div className={styles.checkoutButton}>
                <p>Make an order</p>
              </div>
            </Link>
          </div>
        </>
      ) : (
        <motion.div
          initial={{
            y: 30,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              delay: 0.3,
              duration: 0.3,
            },
          }}
          exit={{
            x: 30,
            opacity: 0,
          }}
          className={styles.cartempty}
        >
          <img src={empty} alt="box" />
          <h2>Cart is empty</h2>
          <h5 style={{ color: "gray", fontWeight: "100", paddingTop: "12px" }}>
            Add at least one pair of
          </h5>
          <h5 style={{ color: "gray", fontWeight: "100" }}>
            sneakers to make an order.
          </h5>
          <div
            onClick={openCart}
            style={{ marginTop: 12 }}
            className="go__back__button"
          >
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 13L1 6.93015L6.86175 1"
                stroke="#D3D3D3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Return back</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SideBar;
