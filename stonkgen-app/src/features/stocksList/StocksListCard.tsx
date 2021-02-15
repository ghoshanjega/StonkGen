import React from "react";
import { IStockShort } from "../../api-interface/Stocks";

interface Props {
  stocks: IStockShort[];
  handleBuy: (stock: IStockShort) => void;
  handleSell: (stock: IStockShort) => void;
}

export const StocksListCard = ({ stocks, handleBuy, handleSell }: Props) => {
  return (
    <div className="row">
      {stocks.map((stock) => {
        return (
          <div className="col-12 col-sm-6 col-md-4 col-xl-3">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{stock.bloombergTickerLocal} </h5>
                <h6 className="card-subtitle mb-1 text-muted ">{stock.currency + " " + stock.price.toFixed(2)} </h6>
                <p className="card-text" title={stock.name}>
                  {stock.name}{" "}
                </p>
                <div className="p-1 d-flex justify-content-between ">
                  <button className="btn btn-sm btn-success" onClick={() => handleBuy(stock)}>
                    Buy
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleSell(stock)}>
                    Sell
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
