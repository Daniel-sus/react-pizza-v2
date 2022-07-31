import { Link } from "react-router-dom";
import notfound from "../../assets/notfound.svg";
import styles from "./notfoundpage.module.scss";

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.leftWrapper}>
        <h1 className={styles.title}>Страница не найдена</h1>
        <p className={styles.text}>
          Проверьте корректность введённого адреса <br /> или повторите попытку
          позже
        </p>
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
      <div className={styles.rightWrapper}>
        <img className={styles.image} src={notfound} alt="notfoundpage" />
      </div>
    </div>
  );
};

export default NotFoundPage;
