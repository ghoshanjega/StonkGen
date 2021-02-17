import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { AdminPage } from "../features/admin/AdminPage";

import { AuthenticationPage } from "../features/authentication/AuthenticationPage";
import { selectUser } from "../features/authentication/AuthenticationSlice";
import { CartHistoryPage } from "../features/cart-history/CartHistoryPage";
import { CartPage } from "../features/cart/CartPage";
import { StocksListPage } from "../features/stocksList/StocksListPage";

import "./App.css";

function App() {
  const user = useSelector(selectUser);
  if (!user) {
    return (
      <div>
        <AuthenticationPage />
      </div>
    );
  }
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/orders">
            <CartPage />
          </Route>
          <Route path="/order-history">
            <CartHistoryPage />
          </Route>
          <Route path="/admin">
            <AdminPage />
          </Route>
          <Route path="/login">
            <AuthenticationPage />
          </Route>
          <Route path="/">
            <StocksListPage />
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
