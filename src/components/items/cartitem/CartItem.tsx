import React from "react";
import { motion } from "framer-motion";
import styles from "./cartitem.module.scss";
import { useAppDispatch } from "../../../hooks/redux";
import {
  itemAdd,
  itemDelete,
} from "../../../redux-toolkit/reducers/cart/slices";
import { setSizeName } from "../../../hooks/setSizeName";
import { CartItemType } from "../../../redux-toolkit/reducers/cart/types";

const CartItem: React.FC<CartItemType> = ({
  id,
  imageUrl,
  title,
  text,
  price,
  quantityadded,
  types,
  sizes,
  toppings,
}) => {
  const dispatch = useAppDispatch();
  const dispatchItem = {
    id,
    imageUrl,
    title,
    text,
    price,
    quantityadded,
    types,
    sizes,
    toppings,
    isItemInCart: true,
  };

  return (
    <motion.div
      layout
      initial={{
        y: 15,
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
        x: 300,
        opacity: 0,
        transition: {
          delay: 0.1,
          duration: 0.3,
        },
      }}
    >
      <div className={styles.item}>
        <div className={styles.pizzaImageWrapper}>
          <img className={styles.cartImage} src={imageUrl} alt="pizza" />
        </div>

        <div className={styles.cartRightWrapper}>
          <div className={styles.topRightWrapper}>
            <div className={styles.cartTitle}>{title}</div>
            <div className={styles.description}>
              {setSizeName(sizes)} {sizes} cm, {types}{" "}
              {types === "standart" && "crust"} <br></br>
              {toppings.length > 0 ? "+ " : ""}
              {toppings.map((item, index) =>
                index < 2
                  ? item.title.toLowerCase() +
                    (toppings.length > 2 && index === 1
                      ? "..."
                      : (toppings.length <= 1 && index === 0) || index === 1
                      ? ""
                      : ", ")
                  : ""
              )}
            </div>
          </div>
          <div className={styles.bottomRightWrapper}>
            <div className={styles.quantityWrapper}>
              <div
                onClick={() => dispatch(itemDelete(dispatchItem))}
                className="cart__button cart__minus"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                    fill="#EB5A1E"
                  ></path>
                  <path
                    d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                    fill="#EB5A1E"
                  ></path>
                </svg>
              </div>

              <div className={styles.quanitity}>{quantityadded}</div>
              <div
                onClick={() => dispatch(itemAdd(dispatchItem))}
                className="cart__button"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                    fill="#EB5A1E"
                  ></path>
                  <path
                    d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                    fill="#EB5A1E"
                  ></path>
                </svg>
              </div>
            </div>
            <div className={styles.price}>{price * quantityadded} $ </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
