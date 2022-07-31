import React from "react";
import styles from "./item.module.scss";
import { useDispatch } from "react-redux";
import { itemDelete } from "../../../redux-toolkit/reducers/cart/slices";
import { CartItemType } from "../../../redux-toolkit/reducers/cart/types";

type QuantityButtonType = {
  onHandleClickCard: () => void;
  quantityadded: number;
  item: CartItemType;
};

const QuantityButton: React.FC<QuantityButtonType> = ({
  onHandleClickCard,
  quantityadded,
  item,
}) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.quanitityWrapper}>
      <div
        onClick={() => dispatch(itemDelete(item))}
        className="mainpage__button__change__quantity"
      >
        <svg
          width="12"
          height="4"
          viewBox="0 0 12 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.80024 0.799988H10.8002C11.4629 0.799988 12.0002 1.33729 12.0002 1.99999C12.0002 2.66269 11.4629 3.19999 10.8002 3.19999H4.80024H1.20024C0.537544 3.19999 0.000244141 2.66269 0.000244141 1.99999C0.000244141 1.33729 0.537544 0.799988 1.20024 0.799988H4.80024Z"
            fill="#FE5F1E"
          />
        </svg>
      </div>
      <p className={styles.itemQuantity}>{quantityadded}</p>
      <div
        onClick={onHandleClickCard}
        className="mainpage__button__change__quantity"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.8002 4.80001H7.20024V1.20002C7.20024 0.537315 6.66294 1.52588e-05 6.00024 1.52588e-05C5.33754 1.52588e-05 4.80024 0.537315 4.80024 1.20002V4.80001H1.20024C0.537544 4.80001 0.000244141 5.33731 0.000244141 6.00001C0.000244141 6.66271 0.537544 7.20001 1.20024 7.20001H4.80024V10.8C4.80024 11.4627 5.33754 12 6.00024 12C6.66294 12 7.20024 11.4627 7.20024 10.8V7.20001H10.8002C11.4629 7.20001 12.0002 6.66271 12.0002 6.00001C12.0002 5.33731 11.4629 4.80001 10.8002 4.80001Z"
            fill="#EB5A1E"
          />
        </svg>
      </div>
    </div>
  );
};

export default QuantityButton;
