import React from "react";
import { Link, useLocation } from "react-router-dom";
import OrderItem from "../../components/items/orderitem/OrderItem";
import { returnDateFunc } from "../../hooks/dateToString";
import { useAppSelector } from "../../hooks/redux";
import { selectCart } from "../../redux-toolkit/reducers/cart/selectors";
import styles from "./orderspage.module.scss";

const OrdersPage = () => {
  const [selectedTab, setSelectedTab] = React.useState<number | null>(0);
  const { orders } = useAppSelector(selectCart);

  let location = useLocation();

  if (location.pathname === "/orders") {
    document.body.style.background = "#F4F1EE";
  }

  const handleOpenTab = (num: number) => {
    if (num === selectedTab) {
      return setSelectedTab(null);
    }
    setSelectedTab(num);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Link to="/">
          <div className="button__return">
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
          </div>
        </Link>
        <h1 className={styles.title}>My orders</h1>
      </div>

      <div className={styles.orders}>
        {orders.map((obj, index) => (
          <div key={obj.id} className={styles.order}>
            <div className={styles.top}>
              <div className={styles.info}>
                <h2 className={styles.orderId}>Order #{obj.id}</h2>
                <div className={styles.date}>
                  {returnDateFunc(obj.purchaseData.date)}
                </div>
              </div>
              <div
                onClick={() => handleOpenTab(index)}
                className={
                  selectedTab === index
                    ? `${styles.arrow} ${styles.turn}`
                    : styles.arrow
                }
              >
                <svg
                  width="17"
                  height="10"
                  viewBox="0 0 17 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.500079 8.45122C0.499498 8.25199 0.537177 8.05514 0.610346 7.87514C0.683514 7.69513 0.790314 7.53655 0.922897 7.41103L7.77939 0.969876C7.98387 0.773731 8.24035 0.666504 8.50504 0.666504C8.76973 0.666504 9.02621 0.773731 9.23068 0.969876L16.0872 7.63774C16.3205 7.8641 16.4673 8.18937 16.4952 8.54201C16.523 8.89464 16.4297 9.24574 16.2357 9.51808C16.0418 9.79042 15.763 9.96168 15.4609 9.99419C15.1587 10.0267 14.8578 9.9178 14.6245 9.69145L8.49932 3.73037L2.37419 9.49141C2.20645 9.65448 2.00219 9.75807 1.78559 9.78991C1.56898 9.82176 1.34909 9.78053 1.15193 9.6711C0.954775 9.56168 0.788606 9.38863 0.673086 9.17244C0.557565 8.95626 0.497528 8.70598 0.500079 8.45122Z"
                    fill="#AEAEAE"
                  />
                </svg>
              </div>
            </div>

            <div
              className={
                selectedTab === index
                  ? `${styles.bottom} ${styles.show}`
                  : styles.bottom
              }
            >
              {obj.order.map((item, index) => (
                <OrderItem key={index} {...item} />
              ))}
              <div className={styles.info}>
                <div className={styles.total}>
                  <p>Total:</p>
                  <p className={styles.price}>
                    {obj.order.reduce(
                      (sum, item) =>
                        (sum = sum + item.price * item.quantityadded),
                      0
                    )}{" "}
                    $
                  </p>
                </div>
                {obj.purchaseData.status === "transaction rejected" ? (
                  <div className={styles.rejected}>
                    {obj.purchaseData.status}
                  </div>
                ) : (
                  <div className={styles.accepted}>
                    {obj.purchaseData.status}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
