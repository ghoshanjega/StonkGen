import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../authentication/AuthenticationSlice";
import { CartItem } from "./CartItem";
import { selectCartItems, fetchCartItems, removeCartItems, bookCartItem, updateItem, setDisplayStatus } from "./CartSlice";

export const CartPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cartItems = useSelector(selectCartItems);

  useEffect(() => {
    if (user) {
      const sessionId = user.sessionId || "no session detected";
      dispatch(fetchCartItems({ sessionId }));
    }
    return () => {};
  }, []);

  const selected = () => {
    if (cartItems) {
      return cartItems.filter((item) => item.selected);
    }
    return [];
  };

  const isBookDisabled = () => {
    const selectedItems = selected();
    if (selectedItems.length === 0) {
      return true;
    } else if (selectedItems.filter((item) => ["booked", "notReady", "rejected", "inProgress"].includes(item.displayStatus)).length > 0) {
      return true;
    }
    return false;
  };

  const isRemoveDisabled = () => {
    const selectedItems = selected();
    if (selectedItems.length === 0) {
      return true;
    }
    return false;
  };

  const handleRemove = () => {
    dispatch(removeCartItems({ selected: selected() }));
  };

  const handleBook = () => {
    const selectedItems = selected();
    selectedItems.forEach((item) => {
      dispatch(
        bookCartItem({
          ...item
        })
      );
    });
  };
  
  const handleItemChange = (payload: any,id: string, refreshStatus = true ) => {
    dispatch(updateItem({ id,...payload }));
    refreshStatus && dispatch(setDisplayStatus({id}))
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between my-3">
        <div></div>
        <div>
          <button className="btn btn-primary mr-2" disabled={isRemoveDisabled()} onClick={() => handleRemove()}>
            Remove
          </button>
          <button className="btn btn-primary" onClick={()=>handleBook()} disabled={isBookDisabled()}>
            Book
          </button>
        </div>
      </div>
      <div>
        <table className="table mytable">
          <thead>
            <tr>
              <th></th>
              <th>Status</th>
              <th>Side</th>
              <th>Stock Code</th>
              <th>Execution Mode</th>
              <th>Order Price</th>
              <th>Amount (Shares)</th>
            </tr>
          </thead>
          {cartItems && (
            <tbody>
              {cartItems.map((item, index) => {
                return <CartItem item={item} key={item.id} handleItemChange={handleItemChange} />;
              })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};
