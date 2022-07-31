import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from "./checkoutpage.module.scss";
import box from "../../assets/box.svg";
import car from "../../assets/car.svg";
import procent from "../../assets/procent.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CheckOutItem from "../../components/items/checkoutitem/CheckOutItem";
import React from "react";
import { selectCart } from "../../redux-toolkit/reducers/cart/selectors";
import {
  deleteAllItems,
  transferDataToOrderConfirmed,
} from "../../redux-toolkit/reducers/cart/slices";
import { calcTotalPrice } from "../../hooks/calcTotalPrice";
import { CartEmpty } from "../cartempty/CartEmpty";
import OrderConfirmed from "../orderconfirmed/OrderConfirmed";

const SignupSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid firstname")
    .min(2)
    .max(20)
    .required(),
  lastName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid lastname")
    .min(2)
    .max(20)
    .required(),
  email: yup.string().email().required(),
  phoneNumber: yup
    .string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    )
    .required(),
});

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const onError = (errors: any) => {};

const CheckOutPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(SignupSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = async (info) => {
    try {
      setDisabled(true);
      const { data } = await axios.post(
        "https://61e6a5ccce3a2d0017359303.mockapi.io/orders",
        {
          personalData: info,
          purchaseData: {
            date: new Date(),
            status: "transaction accepted",
          },
          order: items,
        }
      );
      dispatch(
        transferDataToOrderConfirmed({
          personalData: info,
          purchaseData: {
            date: new Date(),
            status: "transaction accepted",
          },
          order: items,
        })
      );
      setOrderId(data.id);
      dispatch(deleteAllItems());
      reset();
      setIsOrderComplete(true);
      setDisabled(false);
    } catch (error) {
      alert("Не удалось заказать пиццы");
    }
  };

  const dispatch = useAppDispatch();
  const { items } = useAppSelector(selectCart);

  const [disabled, setDisabled] = React.useState(false);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(0);

  return (
    <>
      {isOrderComplete ? (
        <OrderConfirmed id={orderId} />
      ) : (
        <>
          {items.length < 1 ? (
            <CartEmpty />
          ) : (
            <div className={styles.container}>
              <div className={styles.title}>
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
                <h2 className={styles.text}>Checkout</h2>
              </div>

              <div className={styles.wrapper}>
                <div className={styles.column}>
                  <div className={styles.box}>
                    <div className={styles.name}>
                      <p className={styles.article}>1. Cart</p>
                      <div
                        onClick={() => dispatch(deleteAllItems())}
                        className={styles.deletePizzas}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.5 5H4.16667H17.5"
                            stroke="#B6B6B6"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z"
                            stroke="#B6B6B6"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M8.33337 9.16667V14.1667"
                            stroke="#B6B6B6"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M11.6666 9.16667V14.1667"
                            stroke="#B6B6B6"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                        <p className={styles.wrapperText}>Clear the cart</p>
                      </div>
                    </div>
                    <div className={styles.items}>
                      <AnimatePresence>
                        {items.map((obj) => (
                          <CheckOutItem key={obj.id} {...obj} />
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                  <div className={styles.box}>
                    <div className={styles.name}>
                      <p className={styles.article}>2. Personal information</p>
                    </div>
                    <form
                      id="first-form"
                      onSubmit={handleSubmit(onSubmit, onError)}
                    >
                      <div className={styles.inputContainer}>
                        <div>
                          {" "}
                          <label className={styles.inputTitle}>
                            Fisrt Name
                          </label>
                          <input
                            className={styles.checkOutInput}
                            type="text"
                            {...register("firstName")}
                          />
                          {errors.firstName ? (
                            <p className={styles.error}>
                              {errors.firstName.message}
                            </p>
                          ) : (
                            <p style={{ height: 0 }}></p>
                          )}
                        </div>

                        <div>
                          <label className={styles.inputTitle}>Last Name</label>
                          <input
                            className={styles.checkOutInput}
                            type="text"
                            {...register("lastName")}
                          />
                          {errors.lastName ? (
                            <p className={styles.error}>
                              {errors.lastName.message}
                            </p>
                          ) : (
                            <p style={{ height: 0 }}></p>
                          )}
                        </div>
                        <div>
                          <label className={styles.inputTitle}>E-Mail</label>
                          <input
                            className={styles.checkOutInput}
                            type="email"
                            {...register("email")}
                          />
                          {errors.email ? (
                            <p className={styles.error}>
                              {errors.email.message}
                            </p>
                          ) : (
                            <p style={{ height: 0 }}></p>
                          )}
                        </div>
                        <div>
                          <label className={styles.inputTitle}>
                            Phone Number
                          </label>
                          <input
                            className={styles.checkOutInput}
                            type="tel"
                            {...register("phoneNumber")}
                          />
                          {errors.phoneNumber ? (
                            <p className={styles.error}>
                              {errors.phoneNumber.message}
                            </p>
                          ) : (
                            <p style={{ height: 0 }}></p>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className={styles.total}>
                  <div className={styles.top}>
                    <p className={styles.totalText}>Total:</p>
                    <p className={styles.price}>
                      {calcTotalPrice(items, "total")} $
                    </p>
                  </div>
                  <div className={styles.middle}>
                    <div className={styles.row}>
                      <div className={styles.cover}>
                        <img className={styles.img} src={box} alt="box" />
                      </div>
                      <div className={styles.text}>Pizzas price:</div>
                      <div className={styles.dots}></div>
                      <div className={styles.price}>
                        {calcTotalPrice(items, "price")} $
                      </div>
                    </div>
                    <div className={styles.row}>
                      <div className={styles.cover}>
                        <img
                          className={styles.img}
                          src={procent}
                          alt="procent"
                        />
                      </div>

                      <div className={styles.text}>Taxes:</div>
                      <div className={styles.dots}></div>
                      <div className={styles.price}>
                        {calcTotalPrice(items, "taxes")} $
                      </div>
                    </div>
                    <div className={styles.row}>
                      <div className={styles.cover}>
                        <img className={styles.img} src={car} alt="car" />
                      </div>
                      <div className={styles.text}>Delivery price:</div>
                      <div className={styles.dots}></div>
                      <div className={styles.price}>
                        {calcTotalPrice(items, "delivery")} $
                      </div>
                    </div>
                  </div>
                  <div className={styles.bottom}>
                    <button
                      disabled={disabled}
                      type="submit"
                      form="first-form"
                      className={styles.checkoutButton}
                    >
                      Purchase
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CheckOutPage;
