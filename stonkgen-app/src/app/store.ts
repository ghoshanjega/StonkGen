import { configureStore, ThunkAction, Action,getDefaultMiddleware } from '@reduxjs/toolkit';
import authenticationReducer from '../features/authentication/AuthenticationSlice';
import stocksListReducer from '../features/stocksList/StocksListSlice';
import cartReducer from '../features/cart/CartSlice';

export const store = configureStore({
  reducer: {
    authentication : authenticationReducer,
    stocksList: stocksListReducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
