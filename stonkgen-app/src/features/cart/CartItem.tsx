import React from "react";

import { ICartItemExtended } from "./CartSlice";
import { DisplayStatus } from "./DisplayStatus";

interface Props {
  item: ICartItemExtended;
  handleItemChange: (payload: any, id: string, refreshStatus?: boolean) => void;
}

export const CartItem = ({ item, handleItemChange }: Props) => {
  const isOrderPriceDisabled = () => {
    if (
      item.executionMode === "market" ||
      ["inProgress", "booked", "rejected"].includes(item.displayStatus) ||
      item.status === "error"
    ) {
      return true;
    }
    return false;
  };
  const isAmountDisabled = () => {
    if (["inProgress", "booked", "rejected"].includes(item.displayStatus) || item.status === "error") {
      return true;
    }
    return false;
  };

  const isCheckBoxDisabled = () => {
    if (item.displayStatus === "inProgress") {
      return true;
    }
    return false;
  };

  if (item.error) {
    return (
      <tr>
        <td colSpan={12} style={{ borderRadius: "5px", backgroundColor: "#f5b0b3", color: "#753d3f" }}>
          <div className="d-flex justify-content-between align-items-center px-2">
            <span>
              <b>Error: </b>
              {item.error.message}
            </span>
            <button className="btn btn-light" onClick={() => handleItemChange({ error: null }, item.id,false)}>
              Close
            </button>
          </div>
        </td>
      </tr>
    );
  } else {
    return (
      <tr>
        {/* checkbox */}
        <td>
          <input
            type="checkbox"
            disabled={isCheckBoxDisabled()}
            checked={item.selected}
            onChange={(e) => handleItemChange({ selected: e.target.checked }, item.id)}
          />
        </td>
        {/* status */}
        <td>
          <DisplayStatus displayStatus={item.displayStatus} />{" "}
        </td>
        {/* execution side */}
        <td data-test="executionSide" style={{ textTransform: "capitalize" }}>{item.executionSide}</td>
        {/* stock code */}
        <td data-test="bloombergTickerLocal">{item.stock.bloombergTickerLocal}</td>
        {/* execution mode */}
        <td>
          <select
            className="form-control"
            data-test="executionMode"
            value={item.executionMode}
            disabled={isAmountDisabled()}
            onChange={(e) => handleItemChange({ executionMode: e.target.value }, item.id)}
          >
            <option value={"market"}>Market</option>
            <option value={"limit"}>Limit</option>
          </select>
        </td>
        {/* order price and currency */}
        <td>
          <div className="input-group">
            <input
              type="number"
              data-test="orderPrice"
              value={item.displayPrice || ""}
              className="form-control"
              disabled={isOrderPriceDisabled()}
              onChange={(e) => handleItemChange({ displayPrice: e.target.valueAsNumber }, item.id)}
            />
            <div className="input-group-append">
              <span className="input-group-text" data-test="currency">{item.stock.currency}</span>
            </div>
          </div>
        </td>
        {/* amount (shares) */}
        <td>
          <input
            type="number"
            value={item.amount || ""}
            data-test="amount"
            className="form-control"
            disabled={isAmountDisabled()}
            onChange={(e) => handleItemChange({ amount: e.target.valueAsNumber }, item.id)}
          />
        </td>
      </tr>
    );
  }
};
