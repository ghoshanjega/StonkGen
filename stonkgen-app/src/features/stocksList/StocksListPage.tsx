import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAddNewItem } from "../../api-interface/Cart";
import { IStockShort } from "../../api-interface/Stocks";
import { selectUser } from "../authentication/AuthenticationSlice";
import { StocksListCard } from "./StocksListCard";
import { StocksListFilter } from "./StocksListFilter";
import { StocksListPagination } from "./StocksListPagination";
import { fetchStocks, selectStocks, selectParams, selectDisplayTable, addToCart } from "./StocksListSlice";
import { StocksListTable } from "./StocksListTable";

export const StocksListPage = () => {
  const dispatch = useDispatch();
  const stocks = useSelector(selectStocks);
  const params = useSelector(selectParams);
  const user = useSelector(selectUser);
  const displayTable = useSelector(selectDisplayTable);

  useEffect(() => {
    dispatch(fetchStocks(params));
    return () => {};
  }, [params]);

  

  const handleBuy = (stock: IStockShort) => {
    const body: IAddNewItem = {
      stockId: stock.stockId,
      executionSide: "buy",
      sessionId: user?.sessionId || "no session detected",
    };
    dispatch(addToCart(body));
  };

  const handleSell = (stock: IStockShort) => {
    const body: IAddNewItem = {
      stockId: stock.stockId,
      executionSide: "sell",
      sessionId: user?.sessionId || "no session detected",
    };
    dispatch(addToCart(body));
  };

  return (
    <div className="container">
      <div className="row my-5">
        {
          <div className="col-12 col-10-xl mb-5">
            <StocksListFilter />
            <StocksListPagination />
            {stocks &&
              (displayTable ? (
                <StocksListTable stocks={stocks} handleBuy={handleBuy} handleSell={handleSell} />
              ) : (
                <StocksListCard stocks={stocks} handleBuy={handleBuy} handleSell={handleSell}/>
              ))}
          </div>
        }
      </div>
    </div>
  );
};
