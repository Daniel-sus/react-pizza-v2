import { Pagination } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { selectFilter } from "../../redux-toolkit/reducers/filter/selectors";
import { changePageNumber } from "../../redux-toolkit/reducers/filter/slices";
import styles from "./pagination.module.scss";

const PaginationCmp = () => {
  const { pageNumber } = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(changePageNumber(value));
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.wrapper}>
        <Pagination
          count={4}
          page={pageNumber}
          onChange={handlePagination}
          variant="outlined"
          size="large"
        />
      </div>
    </div>
  );
};

export default PaginationCmp;
