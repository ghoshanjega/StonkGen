import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectParams, selectTotalPages, setPage } from "./StocksListSlice";

export const StocksListPagination = () => {
  const dispatch = useDispatch();
  const params = useSelector(selectParams);
  const totalPages = useSelector(selectTotalPages);

  const handlePageButtonClick = (page: number) => {
    dispatch(setPage(page));
  };

  const noPreviousPage = () => {
    if (params.page === 1) {
      return true;
    }
    return false;
  };

  const noNextPage = () => {
    if (params.page === totalPages) {
      return true;
    }
    return false;
  };

  const renderPageButtons = () => {
    let pages = [];
    for (
      let page = noPreviousPage() ? params.page : params.page - 1;
      page < Math.min(totalPages+1, params.page + 5);
      page++
    ) {
      pages.push(
        <li className={`page-item ${page === params.page && "active"}`} key={page}>
          <button className={`page-link`} onClick={() => handlePageButtonClick(page)}>
            {page}
          </button>
        </li>
      );
    }
    return pages;
  };
  return (
    <nav className="fixed-bottom">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${noPreviousPage() && "disabled"}`}>
          <button className="page-link" disabled={noPreviousPage()} onClick={()=>{handlePageButtonClick(params.page-1)}}>
            Previous
          </button>
        </li>
        {renderPageButtons()}
        <li className={`page-item ${noNextPage() && "disabled"}`}>
          <button className="page-link" disabled={noNextPage()} onClick={()=>{handlePageButtonClick(params.page+1)}}>Next</button>
        </li>
      </ul>
    </nav>
  );
};
