import { AnimatePresence } from "framer-motion";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Overlay from "../overlay/Overlay";
import SideBar from "../sidebar/SideBar";

type MainPageType = {
  cartOpened: boolean;
  openCart: () => void;
};

const Layout: React.FC<MainPageType> = ({ cartOpened, openCart }) => {
  return (
    <>
      <Header openCart={openCart} />
      <>
        <AnimatePresence>
          {cartOpened ? <Overlay openCart={openCart} /> : null}
        </AnimatePresence>
        <AnimatePresence>
          {cartOpened ? <SideBar openCart={openCart} /> : null}
        </AnimatePresence>
      </>
      <Outlet />
    </>
  );
};

export default Layout;
