import React from "react";
import styles from "./checkoutitem.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch } from "../../../hooks/redux";
import {
  itemAdd,
  itemDelete,
  removeItem,
} from "../../../redux-toolkit/reducers/cart/slices";
import { setSizeName } from "../../../hooks/setSizeName";
import { CartItemType } from "../../../redux-toolkit/reducers/cart/types";

const CheckOutItem: React.FC<CartItemType> = ({
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

  const [isAllToppingsOpen, setIsAllToppingsOpen] = React.useState(false);

  const handleRemoveItem = () => {
    if (window.confirm("Are you sure you want to delete item?")) {
      dispatch(removeItem(dispatchItem));
    }
  };

  return (
    <motion.div
      layout
      initial={{
        y: 20,
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
      className={styles.item}
    >
      <div className={styles.item__image}>
        <img className={styles.cartImage} src={imageUrl} alt="pizza" />
      </div>
      <div className={styles.rightWrapper}>
        <div className={styles.orderWrapperMiddle}>
          <p className={styles.orderWrapperTitle}>{title}</p>
          <p
            className={styles.orderWrapperText}
            onClick={() => setIsAllToppingsOpen(!isAllToppingsOpen)}
          >
            {setSizeName(sizes)} {sizes} cm, {types}{" "}
            {types === "standart" && "crust"} <br></br>
            {toppings.length > 0 ? "+ " : ""}
            {toppings.map((item, index) =>
              index < 2
                ? item.title.toLowerCase() +
                  (toppings.length > 2 && index === 1
                    ? "..."
                    : index === toppings.length - 1
                    ? ""
                    : ", ")
                : ""
            )}{" "}
          </p>
          <AnimatePresence>
            {isAllToppingsOpen && toppings.length > 2 && (
              <motion.div
                initial={{
                  y: 10,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.15,
                  },
                }}
                exit={{
                  y: 10,
                  opacity: 0,
                  transition: {
                    duration: 0.15,
                  },
                }}
                className={styles.allToppingsModal}
              >
                {toppings.map(
                  (item, index) =>
                    item.title + (toppings.length - 1 === index ? "." : ", ")
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className={styles.adaptiveWrapper}>
          <div className={styles.quantityWrapper}>
            <button
              disabled={quantityadded === 1}
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
            </button>
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
          <div className={styles.priceWrapper}>
            <div className={styles.orderWrapperPrice}>
              {price * quantityadded} $
            </div>
            <div className={styles.orderButtonWrapper}>
              <div onClick={handleRemoveItem} className="cart__button__delete">
                <svg
                  width="10"
                  height="9"
                  viewBox="0 0 10 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.74791 6.95572L6.49931 4.70712L8.74791 2.45852C9.16184 2.04459 9.16184 1.37338 8.74791 0.959454C8.33398 0.545525 7.66277 0.545525 7.24884 0.959454L5.00024 3.20805L2.75164 0.959454C2.33771 0.545525 1.66651 0.545525 1.25258 0.959454C0.838648 1.37338 0.838648 2.04459 1.25258 2.45852L3.50118 4.70712L1.25258 6.95572C0.838649 7.36965 0.838649 8.04086 1.25258 8.45479C1.66651 8.86872 2.33772 8.86872 2.75164 8.45479L5.00024 6.20619L7.24884 8.45479C7.66277 8.86872 8.33398 8.86872 8.74791 8.45479C9.16184 8.04086 9.16184 7.36965 8.74791 6.95572Z"
                    fill="#D0D0D0"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckOutItem;
