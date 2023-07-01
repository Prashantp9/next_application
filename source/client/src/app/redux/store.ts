import { TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import appState from "./features/applicationStates";
import authReducer from "./features/userAuthSlice";
import productReducer from "./features/productsSlice";

const rootReducer = combineReducers({
  authReducer: authReducer,
  appState: appState,
  productState: productReducer,
});

export const store = configureStore({
  reducer: {
    rootReducer: rootReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
