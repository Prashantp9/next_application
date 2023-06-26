import { BASE_URL, IDLE, Type } from "@/app/constants/constants";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

axios.defaults.withCredentials = true;

type initialState = {
  value: authstate;
};

type authstate = {
  isLoading: boolean;
  isError: boolean;
  status: object;
  errorData: object;
  isAdmin: boolean;
  userName: string;
  id: string;
};
const initialState = {
  value: {
    status: { userRegistrationThunk: IDLE },
    isLoading: false,
    errorData: {
      message: "",
      type: "",
      errors: [],
    },
    isError: true,
    isAdmin: false,
    userName: "",
    id: "",
  } as authstate,
} as initialState;

// const config = {
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// };
export const cookieTest = createAsyncThunk("test/api", async (data) => {
  try {
    const res = await axios.post("http://localhost:5000/test", {});
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const userRegistrationThunk = createAsyncThunk(
  "user/Registratio",
  async (data: object) => {
    try {
      const res = await axios.post(`${BASE_URL}/user/create_user`, data);
      return res.data;
    } catch (error: any) {
      console.log(error);
      return error.data;
    }
  }
);

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    test: () => {},
    // test: (state, action: PayloadAction<string>) => {
    //   return {
    //     value: {
    //       isError: false,
    //       isAdmin: true,
    //       userName: "lfdsadfkodsi",
    //       id: "dofodno",
    //     },
    //   };
    // },
    setCustomAlert: (state) => {
      state.value.errorData = {};
      state.value.isError = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userRegistrationThunk.pending, (state, action) => {
        state.value.isLoading = true;
      })
      .addCase(userRegistrationThunk.fulfilled, (state, { payload }) => {
        state.value.isLoading = true;
        switch (payload.type) {
          case Type.SUCCESS:
            state.value.userName = payload.data.name;
            break;

          case Type.DEFAULT:
            (state.value.isError = true),
              (state.value.errorData = {
                message: payload.message,
                type: payload.type,
                errors: payload.errors,
              });
        }
      });
  },
});

export const { test, setCustomAlert } = auth.actions;
export default auth.reducer;
