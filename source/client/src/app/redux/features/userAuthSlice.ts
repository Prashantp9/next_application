import { BASE_URL, IDLE, Type } from "@/app/constants/constants";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { rejects } from "assert";

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
  phone: string;
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
    isError: false,
    isAdmin: false,
    userName: "",
    id: "",
    phone: "",
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
      return error.response.data;
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
            state.value.isAdmin = payload.data.isAdmin;
            state.value.id = payload.data._id;
            state.value.phone = payload.data.phone;
            break;

          default:
            (state.value.isError = true),
              (state.value.errorData = {
                message: payload.message,
                type: payload.type,
                errors: payload.errors,
              });
        }
      })
      .addCase(userRegistrationThunk.rejected, (state, { payload }) => {
        state.value.isError = true;
        state.value.errorData = {
          type: "FAILURE",
          message: "SERVER ERRO",
          errors: [],
        };
      });
  },
});

export const { test, setCustomAlert } = auth.actions;
export default auth.reducer;
