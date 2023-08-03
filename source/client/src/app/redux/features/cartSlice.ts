import { BASE_URL, INTERNAL_ERROR, Type } from "@/app/constants/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { productState } from "./productsSlice";

interface errorData {
  type: string;
  message?: string;
  error: string | string[];
}

interface initialState {
  isLoading: boolean;
  isError: boolean;
  errorData: {} | errorData;
  userCart: any[];
  cartTotal: number;
  stateUpdate: boolean;
}

const initialState: initialState = {
  isLoading: false,
  isError: false,
  errorData: {},
  userCart: [],
  cartTotal: 0,
  stateUpdate: false,
};

// redux thunk for cart slice
export const getUserCartThunk = createAsyncThunk(
  "http://localhost:5000/user/auth_user/cart/get_user_cart",
  async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/auth_user/cart/get_user_cart`
      );
      return response.data;
    } catch (error: any) {
      return error.data;
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "http://localhost:5000/user/auth_user/cart/delete_cart",
  async (data: { cartId: string }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/auth_user/cart/delete_cart`,
        data
      );
      return response.data;
    } catch (error: any) {
      return error.data;
    }
  }
);

type addCartType = {
  productId: string;
  quantity: number;
};
export const addCart = createAsyncThunk(
  "http://localhost:5000/user/auth_user/cart/create_cart",
  async (data: addCartType) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/auth_user/cart/create_cart`,
        data
      );
      return response.data;
    } catch (error: any) {
      return error.data;
    }
  }
);

export const cartState = createSlice({
  name: "cartState",
  initialState: initialState,
  reducers: {
    setError: (state: initialState) => {
      (state.isError = false), (state.errorData = {});
    },
  },
  extraReducers(builder: any) {
    builder
      .addCase(
        getUserCartThunk.pending,
        (state: initialState, payload: any) => {
          state.isLoading = true;
        }
      )
      .addCase(
        getUserCartThunk.fulfilled,
        (state: initialState, action: any) => {
          state.isLoading = false;
          switch (action.payload.type) {
            case Type.SUCCESS:
              state.userCart = action.payload.data?.cart?.cartItems;
              state.cartTotal = action.payload.data?.cartTotal;
              break;
            default:
              state.isError = true;
              state.errorData = {
                message: action.payload.message,
                type: action.payload.type,
                error: action.payload.errors,
              };
              break;
          }
        }
      )
      .addCase(
        getUserCartThunk.rejected,
        (state: initialState, action: any) => {
          state.isLoading = false;
          state.isError = true;
          state.errorData = INTERNAL_ERROR;
        }
      )
      //   deleteCartItem
      .addCase(deleteCartItem.pending, (state: initialState, payload: any) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state: initialState, action: any) => {
        state.isLoading = false;
        switch (action.payload.type) {
          case Type.SUCCESS:
            state.stateUpdate = !state.stateUpdate;
            break;
          default:
            state.isError = true;
            state.errorData = {
              message: action.payload.message,
              type: action.payload.type,
              error: action.payload.errors,
            };
            break;
        }
      })
      .addCase(deleteCartItem.rejected, (state: initialState, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorData = INTERNAL_ERROR;
      })
      //addCart
      .addCase(addCart.pending, (state: initialState, payload: any) => {
        state.isLoading = true;
      })
      .addCase(addCart.fulfilled, (state: initialState, action: any) => {
        state.isLoading = false;
        switch (action.payload.type) {
          case Type.SUCCESS:
            state.stateUpdate = !state.stateUpdate;
            break;
          default:
            state.isError = true;
            state.errorData = {
              message: action.payload.message,
              type: action.payload.type,
              error: action.payload.errors,
            };
            break;
        }
      })
      .addCase(addCart.rejected, (state: initialState, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorData = INTERNAL_ERROR;
      });
  },
});

export default cartState.reducer;
// export const { setError } = productState.actions;
