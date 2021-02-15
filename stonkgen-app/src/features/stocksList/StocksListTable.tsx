import React from "react";
import { useDispatch } from "react-redux";
import { IStockShort } from "../../api-interface/Stocks";

interface Props {
  stocks: IStockShort[];
  handleBuy: (stock: IStockShort) => void;
  handleSell: (stock: IStockShort) => void;
}

export const StocksListTable = ({ stocks, handleBuy, handleSell }: Props) => {
  const dispatch = useDispatch();

  return (
    <div>
      <table className="table">
        <thead >
          <tr >
            <th className="sticky-top bg-light">Stock Code</th>
            <th className="sticky-top bg-light d-none d-md-table-cell">Name</th>
            <th className="sticky-top bg-light">Market Price</th>
            <th className="sticky-top bg-light">Currency</th>
            <th className="sticky-top bg-light">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => {
            return (
              <tr key={stock.stockId}>
                <td>{stock.bloombergTickerLocal} </td>
                <td className="d-none d-md-table-cell">{stock.name} </td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{stock.currency} </td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <button className="btn btn-sm btn-success mr-2" onClick={() => handleBuy(stock)}>
                    Buy
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleSell(stock)}>
                    Sell
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
