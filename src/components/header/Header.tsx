import React from "react";
import { Link, useLocation } from "react-router-dom";
import search from "../../assets/search.svg";
import logo from "../../assets/logo.svg";
import styles from "./header.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { selectFilter } from "../../redux-toolkit/reducers/filter/selectors";
import { selectCart } from "../../redux-toolkit/reducers/cart/selectors";
import { changeSearchBy } from "../../redux-toolkit/reducers/filter/slices";
import { calcTotalPrice } from "../../hooks/calcTotalPrice";

type HeaderProps = {
  openCart: () => void;
};

const Header: React.FC<HeaderProps> = ({ openCart }) => {
  const { searchBy } = useAppSelector(selectFilter);
  const { items } = useAppSelector(selectCart);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
    isMounted.current = true;
  }, [items]);

  const handleChange = (event: any) => {
    dispatch(changeSearchBy(event.target.value));
  };

  return (
    <header
      className={
        pathname === "/orders" || pathname === "/checkout"
          ? styles.header
          : styles.headerMainPage
      }
    >
      <div className={styles.container}>
        <Link to="/">
          <div className={styles.left}>
            <img className={styles.logo} src={logo} alt="logo" />
            <div className={styles.name}>
              <h1 className={styles.title}>REACT PIZZA V2</h1>
              <p className={styles.text}>Tastes better than ever</p>
            </div>
          </div>
        </Link>
        {pathname === "/orders" || pathname === "/checkout" ? null : (
          <div className={styles.center}>
            <div className={styles.input__wrapper}>
              <img className={styles.search} src={search} alt="search" />
              <input
                value={searchBy}
                onChange={handleChange}
                className={styles.input}
                placeholder="Search pizza..."
                type="text"
              />
            </div>
          </div>
        )}
        <div className={styles.right}>
          <Link to="/orders">
            <div className={styles.profile}>
              <svg
                width="13"
                height="15"
                viewBox="0 0 13 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5706 14.2084V12.8195C11.5706 12.0828 11.2921 11.3763 10.7966 10.8553C10.301 10.3344 9.6288 10.0417 8.92793 10.0417H3.64264C2.94177 10.0417 2.2696 10.3344 1.77401 10.8553C1.27842 11.3763 1 12.0828 1 12.8195V14.2084"
                  stroke="#FE5F00"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.28522 7.26393C7.74471 7.26393 8.92787 6.02028 8.92787 4.48615C8.92787 2.95203 7.74471 1.70837 6.28522 1.70837C4.82573 1.70837 3.64258 2.95203 3.64258 4.48615C3.64258 6.02028 4.82573 7.26393 6.28522 7.26393Z"
                  stroke="#FE5F00"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <p>My orders</p>
            </div>
          </Link>
          <div onClick={openCart} className={styles.cart}>
            <div>{calcTotalPrice(items, "total")} $</div>
            <div className={styles.line}></div>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7363 7.66667 15C7.66667 14.2636 7.06971 13.6666 6.33333 13.6666C5.59695 13.6666 5 14.2636 5 15C5 15.7363 5.59695 16.3333 6.33333 16.3333Z"
                stroke="#FE5F00"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7363 15.6667 15C15.6667 14.2636 15.0697 13.6666 14.3333 13.6666C13.597 13.6666 13 14.2636 13 15C13 15.7363 13.597 16.3333 14.3333 16.3333Z"
                stroke="#FE5F00"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.77984 4.99996H16.3332L15.2132 10.5933C15.1522 10.9002 14.9852 11.1759 14.7415 11.3722C14.4977 11.5684 14.1927 11.6726 13.8798 11.6666H6.83317C6.50763 11.6694 6.19232 11.5529 5.94671 11.3393C5.70109 11.1256 5.54215 10.8294 5.49984 10.5066L4.4865 2.82663C4.44448 2.50612 4.28745 2.21179 4.04464 1.9984C3.80182 1.78502 3.48976 1.66712 3.1665 1.66663H1.6665"
                stroke="#FE5F00"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              {items.reduce((sum, item) => (sum = sum + item.quantityadded), 0)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
