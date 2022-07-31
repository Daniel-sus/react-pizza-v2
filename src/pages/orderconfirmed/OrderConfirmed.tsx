import React from "react";
import { Link } from "react-router-dom";
import OrderItem from "../../components/items/orderitem/OrderItem";
import { returnDateFunc } from "../../hooks/dateToString";
import { useAppSelector } from "../../hooks/redux";
import { selectCart } from "../../redux-toolkit/reducers/cart/selectors";
import styles from "./orderconfirmed.module.scss";

const OrderConfirmed: React.FC<{ id: number }> = ({ id }) => {
  const { currentOrder } = useAppSelector(selectCart);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.confirmation}>Your order {id} is confirmed</h1>
        <div key={id} className={styles.orderWrapper}>
          <div className={styles.topWrapper}>
            <div className={styles.topWrapper__leftWrapper}>
              <h2 className={styles.orderId}>Order #{id}</h2>
              <div className={styles.date}>
                {returnDateFunc(currentOrder?.purchaseData.date)}
              </div>
            </div>
          </div>

          <div className={`${styles.content} ${styles.show}`}>
            <div className={styles.pizzasWrapper}>
              {currentOrder?.order.map((item, index) => (
                <OrderItem key={index} {...item} />
              ))}
            </div>
            <div className={styles.bottomWrapper}>
              <div className={styles.total}>
                <p>Total:</p>
                <p className={styles.totalPrice}>
                  {currentOrder?.order.reduce(
                    (sum, item) =>
                      (sum = sum + item.price * item.quantityadded),
                    0
                  )}{" "}
                  $
                </p>
              </div>
              {currentOrder?.purchaseData.status === "transaction rejected" ? (
                <div className={styles.orderStatusRejected}>
                  {currentOrder?.purchaseData.status}
                </div>
              ) : (
                <div className={styles.orderStatusAccepted}>
                  {currentOrder?.purchaseData.status}
                </div>
              )}
            </div>
          </div>
        </div>
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
    </div>
  );
};

export default OrderConfirmed;
