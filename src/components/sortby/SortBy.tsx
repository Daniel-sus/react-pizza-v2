import React from "react";
import arrows from "../../assets/arrows.svg";
import styles from "./sortby.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { selectFilter } from "../../redux-toolkit/reducers/filter/selectors";
import {
  changeFilterBy,
  changeSortBy,
} from "../../redux-toolkit/reducers/filter/slices";
import { useAppDispatch } from "../../redux-toolkit/store";
import { useAppSelector } from "../../hooks/redux";
import useOnClickOutside from "../../hooks/useOnClickOutside";

export const sortByArray = [
  {
    name: "rating (DESC)",
    type: "rating",
    order: "desc",
  },
  {
    name: "rating (ASC)",
    type: "rating",
    order: "asc",
  },
  {
    name: "price (DESC)",
    type: "price",
    order: "desc",
  },
  {
    name: "price (ASC)",
    type: "price",
    order: "asc",
  },
  {
    name: "alphabet (DESC)",
    type: "title",
    order: "desc",
  },
  {
    name: "alphabet (ASC)",
    type: "title",
    order: "asc",
  },
];
const SortBy = () => {
  const dispatch = useAppDispatch();
  const { filterBy, sortBy } = useAppSelector(selectFilter);
  const [sortByOpen, setSortByOpen] = React.useState(false);
  const ref: any = React.useRef();

  const filterByArray = [
    "All",
    "Meaty",
    "Spicy",
    "Sweety",
    "Vegetarian",
    "With chicken",
  ];

  useOnClickOutside(ref, () => setSortByOpen(false));

  const handleChangeFilterOption = (newValue: number) => {
    dispatch(changeFilterBy(newValue));
  };

  const setActiveSortBy = (index: number) => {
    dispatch(changeSortBy(index));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All pizzas</h1>
      <div className={styles.wrapper}>
        <div className={styles.tabs}>
          {filterByArray.map((option, index) => (
            <div
              onClick={() => handleChangeFilterOption(index)}
              key={index}
              className={
                filterBy === index
                  ? `${styles.tab} ${styles.active}`
                  : styles.tab
              }
            >
              {option}
            </div>
          ))}
        </div>
        <div
          ref={ref}
          onClick={() => setSortByOpen(!sortByOpen)}
          className={styles.sortBy}
        >
          <img
            className={
              sortByOpen === true
                ? styles.arrow
                : `${styles.arrow} ${styles.active}`
            }
            src={arrows}
            alt="arrows"
          />
          <h4 className={styles.title}>Sort by:</h4>
          <h5 className={styles.text}>{sortByArray[sortBy].name}</h5>
          <div ref={ref}>
            <AnimatePresence>
              {sortByOpen ? (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -6,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.3,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: -6,
                  }}
                  className={styles.dropDown}
                >
                  {sortByArray.map((tab, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveSortBy(index)}
                      className={
                        sortBy === index
                          ? `${styles.active} ${styles.tab}`
                          : styles.tab
                      }
                    >
                      {tab.name}
                    </div>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortBy;
