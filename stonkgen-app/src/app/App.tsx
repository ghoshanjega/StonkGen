import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from "../components/Header";

import { AuthenticationPage } from "../features/authentication/AuthenticationPage";
import { selectUser } from "../features/authentication/AuthenticationSlice";
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
          <Route path="/login">
            <AuthenticationPage />
          </Route>
          <Route path="/">
            <StocksListPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
