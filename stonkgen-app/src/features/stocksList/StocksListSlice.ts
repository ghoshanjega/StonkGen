import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios';
import { IAddNewItem } from '../../api-interface/Cart';
import { IStocksList, IStockShort } from '../../api-interface/Stocks';
import { AppThunk, RootState } from '../../app/store';


interface StocksListState {
    isLoading: boolean;
    error: AxiosError | null;
    stocks: IStockShort[] | null;
    totalPages: number;
    params: {
        page: number;
        limit: number;
        orderBy: string;
        trend: string;
    }
    displayTable: boolean;
}

const initialState: StocksListState = {
    isLoading: true,
    error: null,
    stocks: null,
    totalPages: 0,
    params: {
        page: 1,
        limit: 10,
        orderBy: "name",
        trend: "asc"
    },
    displayTable: true

}

export const stocksListSlice = createSlice({
    name: 'stocksList',
    initialState,
    reducers: {
        setLimit: (state, action) => {
            state.params.page = 1;
            state.params.limit = action.payload
        },
        setOrderBy: (state, action) => {
            state.params.page = 1;
            state.params.orderBy = action.payload
        },
        setOrderTrend: (state, action) => {
            state.params.page = 1;
            state.params.trend = action.payload
        },
        setPage: (state,action) => {
            state.params.page = action.payload;
        },
        toggleDisplayTable: (state) => {
            state.displayTable = !state.displayTable;
        },
        fetchStarted: (state, action) => {
            state.error = null;
            state.isLoading = true;
        },
        fetchSuccessful: (state, action) => {
            state.isLoading = false;
            const apiReturn = action.payload as IStocksList
            state.stocks = apiReturn.stocks;
            state.totalPages = apiReturn.totalPages;
            // state.params.page = apiReturn.currentPage;
        },
        fetchUnSuccessful: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export const {setOrderBy, setPage, setLimit, setOrderTrend,toggleDisplayTable, fetchStarted, fetchSuccessful, fetchUnSuccessful } = stocksListSlice.actions;

export const fetchStocks = (params: any): AppThunk => dispatch => {
    dispatch(fetchStarted)
    return axios.get("http://localhost:3001/stocks", {
        params
    })
        .then(({ data }) => {
            dispatch(fetchSuccessful(data));
        }).catch((err: AxiosError) => {
            dispatch(fetchUnSuccessful(err))
        });
};

export const addToCart = (data: IAddNewItem): AppThunk => dispatch => {
    dispatch(fetchStarted)
    return axios.post("http://localhost:3001/cart", data )
        .then(({ data }) => {
            // dispatch(fetchSuccessful(data));
        }).catch((err: AxiosError) => {
            // dispatch(fetchUnSuccessful(err))
        });
};

export const selectStocks = (state: RootState) => state.stocksList.stocks;
export const selectParams = (state: RootState) => state.stocksList.params;
export const selectDisplayTable = (state: RootState) => state.stocksList.displayTable;
export const selectTotalPages = (state: RootState) => state.stocksList.totalPages;
export const selectLoadingError = (state: RootState) => { return { isLoading : state.stocksList.isLoading, error : state.stocksList.error} };


export default stocksListSlice.reducer;