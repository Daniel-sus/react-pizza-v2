import React from "react";
import styles from "./item.module.scss";
import QuantityButton from "./QuantityButton";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../hooks/redux";
import { selectCart } from "../../../redux-toolkit/reducers/cart/selectors";
import { transferDataToModal } from "../../../redux-toolkit/reducers/cart/slices";
import { ItemType } from "../../../redux-toolkit/reducers/items/types";

interface ItemProps extends ItemType {
  setIsModalOpen: (arg: boolean) => void;
  setIsPromptOpen: (arg: boolean) => void;
}

const Item: React.FC<ItemProps> = ({
  setIsPromptOpen,
  setIsModalOpen,
  id,
  imageUrl,
  iconUrl,
  title,
  text,
  price,
  types,
  sizes,
}) => {
  const dispatch = useDispatch();
  const [activeDiameter, setActiveDiameter] = React.useState(0);
  const [activeDough, setActiveDough] = React.useState(0);
  const sizesType = ["standart", " thin crust"];
  const priceAdd = [0, 2, 4];

  const { timerId, items } = useAppSelector(selectCart);

  const item = {
    id,
    imageUrl,
    iconUrl,
    title,
    text,
    price: price + priceAdd[activeDiameter],
    quantityadded: 0,
    types: sizesType[activeDough],
    sizes: sizes[activeDiameter],
    toppings: [],
  };

  const onHandleClickCard = () => {
    clearTimeout(timerId);
    setIsPromptOpen(false);
    dispatch(transferDataToModal(item));
    setIsModalOpen(true);
  };

  const count = items.reduce(
    (quantity, item) =>
      item.id === id ? (quantity = quantity + item.quantityadded) : quantity,
    0
  );

  return (
    <div className={styles.item}>
      <div className={styles.topItemWrapper}>
        {iconUrl &&
          (iconUrl === "vege" ? null : (
            <img className={styles.pepper} src={iconUrl} alt="pepper" />
          ))}
        <img
          onClick={onHandleClickCard}
          className={styles.itemImage}
          src={imageUrl}
          alt="pizza"
        />
      </div>

      <div className={styles.itemTitleWrapper} onClick={onHandleClickCard}>
        <h2 className={styles.itemTitle}>{title}</h2>
        {iconUrl &&
          (iconUrl === "vege" ? (
            <h2 style={{ marginLeft: 7 }}>🌱</h2>
          ) : (
            <h2 style={{ marginLeft: 7 }}>🌶️</h2>
          ))}
      </div>
      <div className={styles.pizzaOptionsWrapper}>
        <ul>
          {types.map((type, index) => (
            <li
              key={index}
              onClick={() => setActiveDough(type)}
              className={activeDough === type ? styles.active : ""}
            >
              {sizesType[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={index}
              onClick={() => setActiveDiameter(index)}
              className={activeDiameter === index ? styles.active : ""}
            >
              {size} сm
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.bottomWrapper}>
        <h4 className={styles.itemPrice}>
          from {""}
          {price + priceAdd[activeDiameter]}$
        </h4>

        {count === 0 ? (
          <div onClick={onHandleClickCard}>
            <div className="mainpage__button">
              <div>+</div>
              <p>Add to cart</p>
            </div>
          </div>
        ) : (
          <QuantityButton
            onHandleClickCard={onHandleClickCard}
            quantityadded={count}
            item={item}
          />
        )}
      </div>
    </div>
  );
};

export default Item;
