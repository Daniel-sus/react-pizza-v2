import React from "react";
import styles from "./modal.module.scss";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setTimerId, itemAdd } from "../../redux-toolkit/reducers/cart/slices";
import { selectCart } from "../../redux-toolkit/reducers/cart/selectors";
import { setSizeName } from "../../hooks/setSizeName";
import { toppingType } from "../../redux-toolkit/reducers/cart/types";

type ModalProps = {
  toppings: toppingType[];
  setIsModalOpen: (args: boolean) => void;
  setIsPromptOpen: (args: boolean) => void;
  toppingsError: boolean;
};

const Modal: React.FC<ModalProps> = ({
  toppings,
  setIsModalOpen,
  setIsPromptOpen,
  toppingsError,
}) => {
  const { modalData } = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  const [selectedToppings, setSelectedToppings] = React.useState(
    new Array(toppings.length).fill(false)
  );

  const addItemInCartHandler = () => {
    dispatch(
      itemAdd({
        ...modalData,
        toppings: toppings.filter((item, i) =>
          selectedToppings[i] ? item : null
        ),
        price:
          modalData.price +
          selectedToppings
            .filter((item) => item !== false)
            .reduce((sum, item) => (sum = sum + 3), 0),
      })
    );
    setIsModalOpen(false);
    setIsPromptOpen(true);
    // document.body.style.overflow = "";
    // document.body.style.marginRight = "";
    const timerId: any = setTimeout(() => {
      setIsPromptOpen(false);
    }, 3000);
    dispatch(setTimerId(timerId));
  };

  const onHandleCloseModal = () => {
    setIsModalOpen(false);
    // document.body.style.overflow = "";
    // document.body.style.marginRight = "";
  };

  const setWeight = (sizes: number) => {
    if (sizes === 26) {
      return 470;
    } else if (sizes === 30) {
      return 670;
    } else {
      return 990;
    }
  };

  const onSelectToppings = (num: number) => {
    const updatedCheckedState = selectedToppings.map((item, index) => {
      if (index === num) {
        return !item;
      } else {
        return item;
      }
    });
    setSelectedToppings(updatedCheckedState);
  };

  return (
    <div>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.3,
          },
        }}
        exit={{
          opacity: 0,
        }}
        onClick={onHandleCloseModal}
        className={styles.modalBackDrop}
      ></motion.div>
      <motion.div
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
          transition: {
            duration: 0.3,
          },
        }}
        exit={{
          scale: 0,
        }}
        className={styles.modalWrapper}
      >
        <motion.div
          className={styles.modalContentWrapper}
          initial={{
            opacity: 0,
            x: 100,
          }}
          animate={{
            opacity: 1,
            x: 0,
            transition: {
              delay: 0.3,
              duration: 0.3,
            },
          }}
        >
          <div className={styles.leftColumn}>
            <img
              className={styles.image}
              src={modalData.imageUrl}
              alt="pizza"
            />
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.rightColumnWrapper}>
              <h1 className={styles.title}>
                {modalData.title}{" "}
                {modalData.iconUrl &&
                  (modalData.iconUrl === "vege" ? "🌱" : "🌶️")}
              </h1>
              <p className={styles.sizes}>
                {setSizeName(modalData.sizes)} {modalData.sizes} сm, {""}
                {modalData.types} {modalData.types === "standart" && "crust"},{" "}
                {setWeight(modalData.sizes)} g
              </p>
              <p className={styles.text}>{modalData.text}</p>
              <h3 className={styles.add}>Add toppings:</h3>
              {!toppingsError ? (
                <div className={styles.toppingsWrapper}>
                  {toppings.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      data-selected={selectedToppings[index]}
                      onClick={() => onSelectToppings(index)}
                      className={styles.toppingsItem}
                    >
                      {selectedToppings[index] && (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          className={styles.svgTick}
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 20a8 8 0 100-16 8 8 0 000 16zm0 2c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                            fill="rgb(252, 120, 25)"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.602 7.864a1 1 0 01.2 1.4l-4.576 6.101c-.061.082-.146.197-.23.29a1.346 1.346 0 01-.513.366c-.311.121-.656.121-.967 0a1.346 1.346 0 01-.513-.365c-.084-.094-.17-.209-.23-.29l-2.075-2.767a1 1 0 011.6-1.2l1.701 2.269 4.202-5.604a1 1 0 011.4-.2z"
                            fill="rgb(252, 120, 25)"
                          ></path>
                        </svg>
                      )}

                      <img
                        src={item.imgUrl}
                        alt="toppings"
                        className={styles.topping}
                      />
                      <p className={styles.titleTopping}>{item.title}</p>
                      <h4 className={styles.priceTopping}>3 $</h4>
                    </button>
                  ))}
                </div>
              ) : (
                <h1>Sorry, an error occured, we couldn't get toppings</h1>
              )}
            </div>
            <div className={styles.rightBottonWrapper}>
              <button
                onClick={() => addItemInCartHandler()}
                className="button__modal__add__to__cart"
              >
                Buy for{" "}
                {modalData.price +
                  selectedToppings
                    .filter((item) => item !== false)
                    .reduce((sum, item) => (sum = sum + 3), 0)}{" "}
                $
              </button>
            </div>
          </div>
          <div onClick={onHandleCloseModal} className={styles.modalCross}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.84606 12.4986L0.552631 3.20519C-0.1806 2.47196 -0.1806 1.28315 0.552631 0.549923C1.28586 -0.183308 2.47466 -0.183308 3.20789 0.549923L12.5013 9.84335L21.792 0.552631C22.5253 -0.1806 23.7141 -0.1806 24.4473 0.552631C25.1805 1.28586 25.1805 2.47466 24.4473 3.20789L15.1566 12.4986L24.45 21.792C25.1832 22.5253 25.1832 23.7141 24.45 24.4473C23.7168 25.1805 22.528 25.1805 21.7947 24.4473L12.5013 15.1539L3.20519 24.45C2.47196 25.1832 1.28315 25.1832 0.549923 24.45C-0.183308 23.7168 -0.183308 22.528 0.549923 21.7947L9.84606 12.4986Z"
                fill="black"
              ></path>
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Modal;
