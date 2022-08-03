import styles from "./orderitem.module.scss";
import { setSizeName } from "../../../hooks/setSizeName";
import { CartItemType } from "../../../redux-toolkit/reducers/cart/types";

const OrderItem: React.FC<CartItemType> = ({
  imageUrl,
  iconUrl,
  title,
  price,
  quantityadded,
  types,
  sizes,
  toppings,
}) => {
  console.log(iconUrl);
  return (
    <div className={styles.item}>
      <div className={styles.image__wrapper}>
        <img className={styles.image} src={imageUrl} alt="pizza" />
      </div>
      <div className={styles.description__wrapper}>
        <h3 className={styles.title}>
          {title} {iconUrl && (iconUrl === "vege" ? "🌱" : "🌶️")}
        </h3>
        <p className={styles.description}>
          {setSizeName(sizes)} {sizes} cm, {types}{" "}
          {types === "standart" && "crust"} <br />
          {toppings.length > 0 ? "+ " : ""}
          {toppings.map(
            (item, index) =>
              item.title.toLowerCase() +
              (index === toppings.length - 1 ? "." : ", ")
          )}
        </p>
      </div>

      <div className={styles.price__wrapper}>
        <h4 className={styles.price}>{price * quantityadded} $ </h4>
        <p className={styles.quantityadded}>{quantityadded}x</p>
      </div>
    </div>
  );
};

export default OrderItem;
