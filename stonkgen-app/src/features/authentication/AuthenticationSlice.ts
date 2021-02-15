import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import axios, { AxiosError } from "axios";
import { IUser } from "../../api-interface/User";
import { IApiError } from "../../api-interface/Error";

interface AuthenticationState {
  user: IUser | null;
  error: IApiError | null;
  displayLogin: boolean;
}

const localUser = localStorage.getItem("stonkgen-user");
const initialUser = localUser ? JSON.parse(localUser) : null;

const initialState: AuthenticationState = {
  user: initialUser,
  error: null,
  displayLogin: true,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    initial: (state) => {},
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("stonkgen-user", JSON.stringify(action.payload));
    },
    loginUnSuccessful: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    logoutSuccess: (state) => {
      localStorage.removeItem('stonkgen-user')
      state.user = null;
    },
    toggleDisplayLogin: (state) => {
      state.displayLogin = !state.displayLogin;
    },
  },
});

export const {
  loginSuccess,
  loginUnSuccessful,
  logoutSuccess,
  toggleDisplayLogin,
  clearError,
  initial,
} = authenticationSlice.actions;

export const login = (auth: any): AppThunk => (dispatch) => {
  dispatch(clearError());
  return axios({
    method: "post",
    url: "http://localhost:3001/login",
    data: auth,
  })
    .then(({ data }) => {
      dispatch(loginSuccess(data));
    })
    .catch((err: AxiosError) => {
      dispatch(loginUnSuccessful(err.response?.data));
    });
};

export const signup = (auth: any): AppThunk => (dispatch) => {
  dispatch(clearError());
  return axios({
    method: "post",
    url: "http://localhost:3001/signup",
    data: auth,
  })
    .then(({ data }) => {
      dispatch(loginSuccess(data));
    })
    .catch((err: AxiosError) => {
      dispatch(loginUnSuccessful(err.response?.data));
    });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: RootState) => state.authentication.user;
export const selectDisplayLogin = (state: RootState) => state.authentication.displayLogin;
export const selectError = (state: RootState) => state.authentication.error;

export default authenticationSlice.reducer;
