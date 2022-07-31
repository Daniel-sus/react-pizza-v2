import { Skeleton } from "@mui/material";
import styles from "./skeleton.module.scss";

const Skelet: React.FC = () => {
  return (
    <div className={styles.skeleton}>
      <div>
        <Skeleton
          animation="wave"
          variant="circular"
          width={246}
          height={246}
        />
      </div>
      <div className={styles.skeletonTopWrapper}>
        <Skeleton animation="wave" variant="text" width={250} height={50} />
      </div>
      <div className={styles.skeletonMiddleWrapper}>
        <Skeleton
          sx={{ borderRadius: 1.8 }}
          animation="wave"
          variant="rectangular"
          width={288}
          height={86}
        />
      </div>
      <div className={styles.skeletonBottomWrapper}>
        <Skeleton animation="wave" variant="text" width={90} height={50} />
        <Skeleton animation="wave" variant="text" width={125} height={55} />
      </div>
    </div>
  );
};

export default Skelet;
