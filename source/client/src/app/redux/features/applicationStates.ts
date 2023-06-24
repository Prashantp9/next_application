import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initialState = {
  value: appState;
};

type appState = {
  isLogin: boolean;
};
const initialState = {
  value: { isLogin: false } as appState,
} as initialState;

export const appState = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<string>) => {
      return {
        value: {
          isLogin: !state.value.isLogin,
        },
      };
    },
  },
});

export const { setLogin } = appState.actions;
export default appState.reducer;
