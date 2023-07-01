import { BASE_URL, Type } from "@/app/constants/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

interface initialState {
  isLoading: boolean;
  isError: boolean;
  errorData: any;
  products: {}[];
}

const initialState: initialState = {
  isLoading: false,
  isError: false,
  errorData: {},
  products: [],
};

export const fetchProductData = createAsyncThunk(
  "/public/products",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/public/products`);
      return response.data;
    } catch (error: any) {
      return error.data;
    }
  }
);

export const productState = createSlice({
  name: "productState",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.isLoading = false;
        switch (action.payload.type) {
          case Type.SUCCESS:
            state.products = action.payload.data;
          default:
            (state.isError = true),
              (state.errorData = {
                message: action.payload.message,
                type: action.payload.type,
                errors: action.payload.errors,
              });
        }
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.errorData = {
            type: "FAILURE",
            message: "SERVER ERRO",
            errors: [],
          });
      });
  },
});

export default productState.reducer;
