import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAddNewItem } from "../../api-interface/Cart";
import { IStockShort } from "../../api-interface/Stocks";
import { LoadingError } from "../../components/LoadingError";
import { selectUser } from "../authentication/AuthenticationSlice";
import { StocksListCard } from "./StocksListCard";
import { StocksListFilter } from "./StocksListFilter";
import { StocksListPagination } from "./StocksListPagination";
import { fetchStocks, selectStocks, selectParams, selectDisplayTable, addToCart, selectLoadingError } from "./StocksListSlice";
import { StocksListTable } from "./StocksListTable";

export const StocksListPage = () => {
  const dispatch = useDispatch();
  const stocks = useSelector(selectStocks);
  const params = useSelector(selectParams);
  const user = useSelector(selectUser);
  const displayTable = useSelector(selectDisplayTable);
  const stat = useSelector(selectLoadingError);

  const loadStockList = () => {
    if (params) {
      dispatch(fetchStocks(params));
    }
  }

  useEffect(() => {
    loadStockList()
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
            <LoadingError error={stat.error} loading={stat.isLoading} refreshButton={loadStockList}>
            {stocks ?
              (displayTable ? (
                <StocksListTable stocks={stocks} handleBuy={handleBuy} handleSell={handleSell} />
              ) : (
                <StocksListCard stocks={stocks} handleBuy={handleBuy} handleSell={handleSell}/>
              )) : <p className="lead text-center">No items to show</p>}
              </LoadingError>
          </div>
        }
      </div>
    </div>
  );
};
