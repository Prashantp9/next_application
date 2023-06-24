import { TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import appState from "./features/applicationStates";
import authReducer from "./features/userAuthSlice";

const rootReducer = combineReducers({
  authReducer: authReducer,
  appState: appState,
});

export const store = configureStore({
  reducer: {
    rootReducer: rootReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
