import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LoadingError } from "../../components/LoadingError";
import { selectUser } from "../authentication/AuthenticationSlice";
import { CartItem } from "./CartItem";
import { selectCartItems, fetchCartItems, removeCartItems, bookCartItem, updateItem, setDisplayStatus, selectLoadingError } from "./CartSlice";

export const CartPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cartItems = useSelector(selectCartItems);
  const stat = useSelector(selectLoadingError);
  const history = useHistory()

  const loadCartItems = () => {
    if (user) {
      const sessionId = user.sessionId || "no session detected";
      dispatch(fetchCartItems({ sessionId }));
    }
  }

  useEffect(() => {
   loadCartItems();
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
      <div className="d-flex justify-content-between my-5">
        <div></div>
        <div>
        <button className="btn btn-link mr-2" onClick={() => history.push("/order-history")}>
            History
          </button>
          <button className="btn btn-primary mr-2" disabled={isRemoveDisabled()} onClick={() => handleRemove()}>
            Remove
          </button>
          <button className="btn btn-primary" onClick={()=>handleBook()} disabled={isBookDisabled()}>
            Book
          </button>
        </div>
      </div>
      <div>
        <LoadingError error={stat.error} loading={stat.isLoading} refreshButton={loadCartItems}>
        {cartItems && cartItems.length > 0 ?<table className="table mytable">
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
          {
            <tbody>
              {cartItems.map((item, index) => {
                return <CartItem item={item} key={item.id} handleItemChange={handleItemChange} />;
              })}
            </tbody>
          }
        </table>
        : <p className="lead text-center">No items to show</p>}
        </LoadingError>
      </div>
    </div>
  );
};
