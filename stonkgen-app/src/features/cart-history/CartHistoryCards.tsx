import React from "react";
import { DisplayStatus } from "../cart/DisplayStatus";
import { IGroupedCartItems } from "./CartHistorySlice";

interface Props {
  cartItems: IGroupedCartItems[] | null;
}

export const CartHistoryCards = ({ cartItems }: Props) => {
  if (cartItems && cartItems.length > 0)
    return (
      <div>
        {cartItems?.map((session) => {
          var date = new Date(parseInt(session.sessionId));
          return (
            <div className="card mb-3" key={session.sessionId}>
              <div className="card-body">
                <p className="text-muted mb-2">{date.toUTCString()} </p>
                <table className="table table-sm">
                  {session.items.length > 0 && (
                    <thead>
                      <td></td>
                      <td>Stock code</td>
                      <td>Execution side</td>
                      <td>Execution mode</td>
                      <td>Order price</td>
                      <td>amount</td>
                    </thead>
                  )}
                  <tbody>
                    {session.items.map((item) => {
                      if (item.status === "booked") {
                        return (
                          <tr>
                            <td>
                              <DisplayStatus displayStatus={item.status} />
                            </td>
                            <td>{item.stock.bloombergTickerLocal} </td>
                            <td>{item.executionSide} </td>
                            <td>{item.executionModeBooked} </td>
                            <td>{item.priceBooked} </td>
                            <td>{item.amountBooked}</td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    );
  else {
    return (
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <p className="lead text-center">Nothing to show yet</p>
        </div>
      </div>
    );
  }
};
