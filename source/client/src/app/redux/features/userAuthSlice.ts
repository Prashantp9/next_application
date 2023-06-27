import { BASE_URL, IDLE, Type } from "@/app/constants/constants";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { rejects } from "assert";

axios.defaults.withCredentials = true;

type initialState = {
  value: authstate;
};

type authstate = {
  isLogin: boolean;
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
    isLogin: false,
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

export const userAuthByCookie = createAsyncThunk(
  "user/user_authby_cookie",
  async () => {
    try {
      const res = await axios.post(`${BASE_URL}/user/user_authby_cookie`);
      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);
type loginData = {
  phone: string;
  password: string;
};
export const userLoginThunk = createAsyncThunk(
  "user/user_login",
  async (data: loginData) => {
    try {
      const res = await axios.post(`${BASE_URL}/user/user_login`, data);
      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);

export const userLogoutThunk = createAsyncThunk(
  "user/user_logout",
  async () => {
    try {
      const res = await axios.post(`${BASE_URL}/user/user_logout`);
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
        state.value.isLoading = false;
        switch (payload.type) {
          case Type.SUCCESS:
            state.value.isLogin = true;
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
        state.value.isLoading = false;
        state.value.isError = true;
        state.value.errorData = {
          type: "FAILURE",
          message: "SERVER ERRO",
          errors: [],
        };
      })
      .addCase(userAuthByCookie.pending, (state, { payload }) => {
        state.value.isLoading = true;
      })
      .addCase(userAuthByCookie.fulfilled, (state, { payload }) => {
        state.value.isLoading = false;
        switch (payload.type) {
          case Type.SUCCESS:
            state.value.isLogin = true;
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
      .addCase(userAuthByCookie.rejected, (state, { payload }) => {
        state.value.isLoading = false;
        state.value.isError = true;
        state.value.errorData = {
          type: "FAILURE",
          message: "SERVER ERROR",
          errors: [],
        };
      })
      // userLogin
      .addCase(userLoginThunk.pending, (state, { payload }) => {
        state.value.isLoading = true;
      })
      .addCase(userLoginThunk.fulfilled, (state, { payload }) => {
        state.value.isLoading = false;
        switch (payload.type) {
          case Type.SUCCESS:
            state.value.isLogin = true;
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
      .addCase(userLoginThunk.rejected, (state, { payload }) => {
        state.value.isLoading = false;
        state.value.isError = true;
        state.value.errorData = {
          type: "FAILURE",
          message: "SERVER ERROR",
          errors: [],
        };
      })
      // userLogoutThunk
      .addCase(userLogoutThunk.pending, (state, { payload }) => {
        state.value.isLoading = true;
      })
      .addCase(userLogoutThunk.fulfilled, (state, { payload }) => {
        state.value.isLoading = false;
        switch (payload.type) {
          case Type.SUCCESS:
            state.value.isLogin = false;
            state.value.userName = "";
            state.value.isAdmin = false;
            state.value.id = "";
            state.value.phone = "";
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
      .addCase(userLogoutThunk.rejected, (state, { payload }) => {
        state.value.isLoading = false;
        state.value.isError = true;
        state.value.errorData = {
          type: "FAILURE",
          message: "SERVER ERROR",
          errors: [],
        };
      });
  },
});

export const { test, setCustomAlert } = auth.actions;
export default auth.reducer;
