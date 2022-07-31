import React from "react";
import SortBy from "../../components/sortby/SortBy";
import Skelet from "../../components/skeleton/Skeleton";
import Item from "../../components/items/item/Item";
import { useAppSelector } from "../../hooks/redux";
import styles from "./mainpage.module.scss";
import PaginationCmp from "../../components/pagination/PaginationCmp";
import Modal from "../../components/modal";
import { AnimatePresence, motion } from "framer-motion";
import { selectItems } from "../../redux-toolkit/reducers/items/selectors";
import axios from "axios";
import { selectCart } from "../../redux-toolkit/reducers/cart/selectors";

type MainPageProps = {
  isPromptOpen: boolean;
  setIsPromptOpen: (arg: boolean) => void;
};

const MainPage: React.FC<MainPageProps> = ({
  isPromptOpen,
  setIsPromptOpen,
}) => {
  const { pizzas, status } = useAppSelector(selectItems);
  const { modalData } = useAppSelector(selectCart);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [toppings, setToppings] = React.useState([]);
  const [toppingsError, setToppingsError] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<[]>(
          "https://61e6a5ccce3a2d0017359303.mockapi.io/toppings"
        );
        setToppings([...data]);
      } catch (error) {
        setToppingsError(true);
      }
    })();
  }, []);

  const pizzasArray = pizzas.map((pizza) => (
    <Item
      key={pizza.id}
      setIsPromptOpen={setIsPromptOpen}
      setIsModalOpen={setIsModalOpen}
      {...pizza}
    />
  ));
  const skeletons = [...new Array(8)].map((_, index) => <Skelet key={index} />);

  return (
    <>
      <AnimatePresence>
        {isPromptOpen ? (
          <motion.div
            initial={{
              opacity: 0,
              x: 170,
            }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                delay: 0.3,
                duration: 0.3,
              },
            }}
            exit={{
              x: 170,
              opacity: 0,
            }}
            className={styles.banner}
          >
            <h3>
              Added: <br></br>
              {modalData.title}, {modalData.sizes} cm
            </h3>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className={styles.homepageTopWrapper}>
        <SortBy />
        <div className={styles.homepageBottomWrapper}>
          <div className="mainContainerWrapper">
            {status === "loading" ? (
              <div className="pizzasWrapper">{skeletons}</div>
            ) : status === "error" ? (
              <div className={styles.error}>
                <div className={styles.errorWrapper}>
                  <h2>An error occured 😕</h2>
                  <p>
                    Unfortunately, it was not possible to get pizzas. Try again
                    later.
                  </p>
                </div>
              </div>
            ) : pizzas.length === 0 ? (
              <div className={styles.shortage}>
                <div className={styles.shortageWrapper}>
                  <h2>Sorry we don't have that many pizzas 😕</h2>
                  <p>
                    Unfortunately, we don't have that many pizzas. Go to the
                    first page to see all availible pizzas
                  </p>
                </div>
              </div>
            ) : (
              <div className="pizzasWrapper">{pizzasArray}</div>
            )}
            {status !== "error" && <PaginationCmp />}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen ? (
          <Modal
            setIsPromptOpen={setIsPromptOpen}
            toppings={toppings}
            toppingsError={toppingsError}
            setIsModalOpen={setIsModalOpen}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default MainPage;
