import styles from "./overlay.module.scss";
import React from "react";
import { motion } from "framer-motion";

type OverlayProps = {
  openCart: () => void;
};

const Overlay: React.FC<OverlayProps> = ({ openCart }) => {
  return (
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
      onClick={openCart}
      className={styles.overlay}
    ></motion.div>
  );
};

export default Overlay;
