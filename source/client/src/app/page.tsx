"use client";

import { AppDispatch, useAppSelector } from "./redux/store";
import { cookieTest, test } from "./redux/features/userAuthSlice";

import Login from "./login";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const isLogin = useAppSelector(
    (state) => state.rootReducer.appState.value.isLogin
  );
  return isLogin && <Login />;
}
