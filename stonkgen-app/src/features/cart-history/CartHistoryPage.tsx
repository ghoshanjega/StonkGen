import { group } from "console";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../authentication/AuthenticationSlice";
import { ICartItemExtended } from "../cart/CartSlice";
import { DisplayStatus } from "../../components/DisplayStatus";
import { CartHistoryCards } from "./CartHistoryCards";
import { fetchCartItems, selectCartHistoryItems } from "./CartHistorySlice";

export const CartHistoryPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartHistoryItems);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      const sessionId = user.sessionId;
      if (sessionId) {
        dispatch(fetchCartItems({ sessionId }));
      }
    }
  }, []);

  return (
    <div className="container my-5">
      <CartHistoryCards cartItems={cartItems} />
    </div>
  );
};
