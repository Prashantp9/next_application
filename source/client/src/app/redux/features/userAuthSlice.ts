import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

type initialState = {
  value: authstate;
};
type authstate = {
  isAdmin: boolean;
  userName: string;
  id: string;
};
const initialState = {
  value: {
    isAdmin: false,
    userName: "",
    id: "",
  } as authstate,
} as initialState;

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};
export const cookieTest = createAsyncThunk("test/api", async (data) => {
  try {
    const res = await axios.post("http://localhost:5000/test", {}, config);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    test: (state, action: PayloadAction<string>) => {
      return {
        value: {
          isAdmin: true,
          userName: "lfdsadfkodsi",
          id: "dofodno",
        },
      };
    },
  },
});

export const { test } = auth.actions;
export default auth.reducer;
