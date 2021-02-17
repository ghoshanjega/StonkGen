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
                      <tr>
                        <th></th>
                        <th>Stock code</th>
                        <th>Execution side</th>
                        <th>Execution mode</th>
                        <th>Order price</th>
                        <th>amount</th>
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {session.items.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>
                            <DisplayStatus displayStatus={item.status} />
                          </td>
                          <td data-test="bloombergTickerLocal">{item.stock.bloombergTickerLocal}</td>
                          <td data-test="executionSide">{item.executionSide}</td>
                          <td data-test="executionMode">{item.executionModeBooked}</td>
                          <td data-test="priceBooked">{item.priceBooked + " " + item.stock.currency}</td>
                          <td data-test="amountBooked">{item.amountBooked}</td>
                        </tr>
                      );
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
          <p className="lead text-center" data-test="nothing">Nothing to show yet</p>
        </div>
      </div>
    );
  }
};
