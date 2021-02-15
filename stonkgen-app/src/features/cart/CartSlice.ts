import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IBookCartItem, ICartItem } from "../../api-interface/Cart";
import { IApiError } from "../../api-interface/Error";
import { AppThunk, RootState } from "../../app/store";

export interface ICartItemExtended extends ICartItem {
  isLoading: boolean;
  displayStatus: string;
  displayPrice: number | null;
  amount: number | null;
  executionMode: string;
  selected: boolean;
  error: null | IApiError;
}

interface CartState {
  isLoading: boolean;
  error: AxiosError | null;
  cartItems: ICartItemExtended[] | null;
}

const initialState: CartState = {
  isLoading: true,
  error: null,
  cartItems: null,
};



export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    fetchStarted: (state, action) => {
      state.isLoading = true;
    },
    fetchSuccessful: (state, action) => {
      state.isLoading = false;
      const cartItemsExtended = action.payload as ICartItemExtended[];
      state.cartItems = cartItemsExtended;
    },
    fetchUnSuccessful: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelect: (state, action) => {
      const index = action.payload.index as number;
      if (state.cartItems) {
        state.cartItems[index].selected = action.payload.select;
      }
    },
    setExecutionMode: (state, action) => {
      const index = action.payload.index as number;
      if (state.cartItems) {
        state.cartItems[index].executionMode = action.payload.executionMode;
      }
    },
    setDisplayPrice: (state, action) => {
      const index = action.payload.index as number;
      if (state.cartItems) {
        state.cartItems[index].displayPrice = action.payload.orderPrice;
      }
    },
    setAmount: (state, action) => {
      const index = action.payload.index as number;
      if (state.cartItems) {
        state.cartItems[index].amount = action.payload.amount;
      }
    },
    setDisplayStatus: (state, action) => {
      if (state.cartItems) {
        const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
        if (itemIndex > -1 && state.cartItems) {
          const item = state.cartItems[itemIndex]
          console.log("actions",action.payload)
          state.cartItems[itemIndex].displayStatus = computeDisplayStatus(item);
        }
      }
      // const index = action.payload.index as number;
      // if (state.cartItems) {
      //   const item = state.cartItems[index]
      //   state.cartItems[index].displayStatus = computeDisplayStatus(item);
      // }

    },
    removeItems: (state, action) => {
      const removeIds = action.payload.itemId as string[];
      if (state.cartItems) {
        state.cartItems = state.cartItems.filter((item) => !removeIds.includes(item.id));
      }
    },
    updateItem: (state, action) => {
      if (state.cartItems) {
        const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
        if (itemIndex > -1 && state.cartItems) {
          state.cartItems[itemIndex] = {
            ...state.cartItems[itemIndex],
            ...action.payload,
          };
        }
      }
    },
  },
});

export const {
  fetchStarted,
  fetchSuccessful,
  fetchUnSuccessful,
  setExecutionMode,
  setSelect,
  setAmount,
  setDisplayPrice,
  setDisplayStatus,
  removeItems,
  updateItem,
} = cartSlice.actions;

const computeDisplayStatus = (item : ICartItemExtended) => {
  if (item.status === "prebooking") {
    if (
      item.executionSide &&
      item.executionMode &&
      item.stock.stockId &&
      item.stock.currency &&
      item.amount &&
      item.amount > 0
    ) {
      if (item.executionMode === "limit" && item.displayPrice && item.displayPrice > 0) {
        return "ready";
      } else if (item.executionMode === "market") {
        return "ready";
      }
      return "notReady";
    } else {
      return "notReady";
    }
  } else {
    return item.status;
  }
};

const computeExtended = (data: ICartItem[]): ICartItemExtended[] => {
  const itemsExtended: ICartItemExtended[] = data.map((item) => {
    return {
      ...item,
      isLoading: false,
      displayStatus: item.status === "prebooking" ? "notReady" : item.status,
      displayPrice: item.priceBooked ? item.priceBooked : null,
      executionMode: item.executionModeBooked ? item.executionModeBooked : "market",
      selected: false,
      amount: item.amountBooked ? item.amountBooked : null,
      error: null,
    };
  });
  return itemsExtended;
};

export const fetchCartItems = (params: any): AppThunk => (dispatch) => {
  dispatch(fetchStarted);
  return axios
    .get("http://localhost:3001/cart", {
      params,
    })
    .then(({ data }) => {
      dispatch(fetchSuccessful(computeExtended(data)));
    })
    .catch((err: AxiosError) => {
      dispatch(fetchUnSuccessful(err));
    });
};

export const removeCartItems = (params: any): AppThunk => (dispatch) => {
  const itemsToRemove = params.selected as ICartItemExtended[];
  return axios
    .patch("http://localhost:3001/cart/remove", {
      itemId: itemsToRemove.map((item) => item.id),
    })
    .then(({ data }) => {
      dispatch(removeItems({ itemId: itemsToRemove.map((item) => item.id) }));
    })
    .catch((err: AxiosError) => {
      dispatch(fetchUnSuccessful(err.response?.data));
    });
};

export const bookCartItem = (params: any): AppThunk => (dispatch) => {
  const item = params as ICartItemExtended;
  dispatch(updateItem({ id: item.id, selected: false,status: "inProgress" }));
  const body : IBookCartItem = {
    executionSide: item.executionSide, 
    executionMode: item.executionMode,
    displayPrice: item.displayPrice,
    amount: item.amount,
  }
  return axios
    .patch(`http://localhost:3001/cart/${item.id}/book`, body )
    .then(({ data }) => {
      dispatch(
        updateItem({
          id: data.id,
          status: data.status,
          displayStatus: data.status,
          displayPrice: data.priceBooked,
        })
      );
    })
    .catch((err: AxiosError) => {
      console.log("err", err.response);
      dispatch(
        updateItem({
          id: item.id,
          status: "rejected",
          displayStatus: "rejected",
          error: err.response?.data as IApiError,
        })
      );
    });
};

export const selectCartItems = (state: RootState) => state.cart.cartItems;

export default cartSlice.reducer;
