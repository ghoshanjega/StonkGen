import { group } from "console";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../authentication/AuthenticationSlice";
import { ICartItemExtended } from "../cart/CartSlice";
import { DisplayStatus } from "../cart/DisplayStatus";
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
    return () => {};
  }, []);

  function groupBy<T, K>(list: T[], getKey: (item: T) => K) {
    const map = new Map<K, T[]>();
    list.forEach((item) => {
      const key = getKey(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return Array.from(map.values());
  }

  return (
    <div className="container my-5">
     <CartHistoryCards cartItems={cartItems} />
    </div>
  );
};
