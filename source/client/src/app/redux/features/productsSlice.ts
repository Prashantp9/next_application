import { BASE_URL, Type } from "@/app/constants/constants";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

interface initialState {
  isLoading: boolean;
  isError: boolean;
  errorData: any;
  products: {}[];
  searchInput: string;
}

const initialState: initialState = {
  isLoading: false,
  isError: false,
  errorData: {},
  products: [],
  searchInput: "",
};

export const fetchProductData = createAsyncThunk(
  "/public/products",
  async (data: any) => {
    try {
      const response = await axios.post(`${BASE_URL}/public/products`, data);
      return response.data;
    } catch (error: any) {
      return error.data;
    }
  }
);

export const fetchProduct = createAsyncThunk(
  "/public/get_product",
  async (data: any) => {
    try {
      console.log("inside redux");
      console.log(data);
      const response = await axios.post(`${BASE_URL}/public/get_product`, data);
      console.log(response);
      return response.data;
    } catch (error: any) {
      return error.data;
    }
  }
);

type SearchInput = {
  searchInput: string;
};

export const productState = createSlice({
  name: "productState",
  initialState: initialState,
  reducers: {
    setSearchInput: (
      state: initialState,
      { payload }: PayloadAction<SearchInput>
    ) => {
      state.searchInput = payload.searchInput;
    },
  },
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
      })
      // fetchProduct
      .addCase(fetchProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        switch (action.payload.type) {
          case Type.SUCCESS:
            break;
          default:
            (state.isError = true),
              (state.errorData = {
                message: action.payload.message,
                type: action.payload.type,
                errors: action.payload.errors,
              });
        }
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.errorData = {
            type: "FAILURE",
            message: "SERVER ERROR",
            errors: [],
          });
      });
  },
});

export default productState.reducer;
export const { setSearchInput } = productState.actions;
