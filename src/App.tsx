import React, { Suspense } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import "./scss/app.scss";
import { Routes, Route, useLocation } from "react-router-dom";
import MainPage from "./pages/mainpage/MainPage";
import Layout from "./components/layout/Layout";
import { selectFilter } from "./redux-toolkit/reducers/filter/selectors";
import axios from "axios";
import { fetchPizzas } from "./redux-toolkit/reducers/items/asyncActions";
import { selectCart } from "./redux-toolkit/reducers/cart/selectors";
import { setNewOrders } from "./redux-toolkit/reducers/cart/slices";
import CheckOutPage from "./pages/checkoutpage/CheckOutPage";
import OrdersPage from "./pages/orderspage/OrdersPage";

function App() {
  const [cartOpened, setCartOpened] = React.useState<boolean>(false);
  const [isPromptOpen, setIsPromptOpen] = React.useState<boolean>(false);
  const params = useAppSelector(selectFilter);
  const { timerId, currentOrder } = useAppSelector(selectCart);
  const { pageNumber, filterBy, sortBy, searchBy } = params;
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchPizzas(params));
  }, [pageNumber, filterBy, sortBy, searchBy]);

  React.useEffect(() => {
    if (pathname === "/orders" || pathname === "/checkout") {
      document.body.style.background = "#F4F1EE";
    } else {
      document.body.style.background = "#ff975c";
    }
  }, [pathname]);

  React.useEffect(() => {
    (async () => {
      try {
        axios
          .get("https://61e6a5ccce3a2d0017359303.mockapi.io/orders")
          .then((res) => res.data)
          .then((data) => dispatch(setNewOrders(data.reverse())));
      } catch (error) {
        alert("An error occured, try again later");
      }
    })();
  }, [currentOrder]);

  const openCart = () => {
    setIsPromptOpen(false);
    clearTimeout(timerId);
    setCartOpened(!cartOpened);
  };

  const NotFoundPage = React.lazy(
    () =>
      import(
        /* webpackChunkName: "NotFoundPage" */ "./pages/notfoundpage/NotFoundPage"
      )
  );

  // const CheckOutPage = React.lazy(
  //   () =>
  //     import(
  //       /* webpackChunkName: "NotFoundPage" */ "./pages/checkoutpage/CheckOutPage"
  //     )
  // );

  // const OrdersPage = React.lazy(
  //   () =>
  //     import(
  //       /* webpackChunkName: "OrderPage" */ "./pages/orderspage/OrdersPage"
  //     )
  // );
  return (
    <main
      className={
        pathname === "/orders" || pathname === "/checkout"
          ? "container__orderpage"
          : "container__mainpage"
      }
    >
      <Routes>
        <Route
          path="/"
          element={<Layout cartOpened={cartOpened} openCart={openCart} />}
        >
          <Route
            index
            element={
              <MainPage
                isPromptOpen={isPromptOpen}
                setIsPromptOpen={setIsPromptOpen}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              // <Suspense fallback={<div>Идёт загрузка...</div>}>
              <CheckOutPage />
              /* </Suspense> */
            }
          />
          <Route
            path="/orders"
            element={
              // <Suspense fallback={<div>Идёт загрузка...</div>}>
              <OrdersPage />
              /*</Suspense>*/
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<div>Идёт загрузка...</div>}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
