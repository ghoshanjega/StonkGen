import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IBookCartItem, ICartItem } from "../../api-interface/Cart";
import { IApiError } from "../../api-interface/Error";
import { AppThunk, RootState } from "../../app/store";
import { ICartItemExtended } from "../cart/CartSlice";

export interface IGroupedCartItems  {
    sessionId : string;
    items : ICartItemExtended[]
} 

interface CartState {
  isLoading: boolean;
  error: AxiosError | null;
  cartItems: IGroupedCartItems[]  | null;
}

const initialState: CartState = {
  isLoading: true,
  error: null,
  cartItems: null,
};



export const cartHistorySlice = createSlice({
  name: "cartHistory",
  initialState,
  reducers: {
    fetchStarted: (state, action) => {
      state.isLoading = true;
    },
    fetchSuccessful: (state, action) => {
      state.isLoading = false;
      const cartItemsExtended = action.payload as IGroupedCartItems[];
      state.cartItems = cartItemsExtended;
    },
    fetchUnSuccessful: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchStarted,
  fetchSuccessful,
  fetchUnSuccessful,
} = cartHistorySlice.actions;


export const fetchCartItems = (params: any): AppThunk => (dispatch) => {
  dispatch(fetchStarted);
  return axios
    .get("http://localhost:3001/cart/history", {
      params,
    })
    .then(({ data }) => {
      dispatch(fetchSuccessful(data));
    })
    .catch((err: AxiosError) => {
      dispatch(fetchUnSuccessful(err));
    });
};


export const selectCartHistoryItems = (state: RootState) => state.cartHistory.cartItems;

export default cartHistorySlice.reducer;
