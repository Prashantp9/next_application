"use client";

import "./styles/home.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { AppDispatch, useAppSelector } from "./redux/store";
import {
  Autoplay,
  FreeMode,
  Lazy,
  Navigation,
  Pagination,
  Thumbs,
  Zoom,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { cookieTest, test } from "./redux/features/userAuthSlice";
import { useEffect, useState } from "react";

import Login from "./login";
import { useDispatch } from "react-redux";

export default function Home() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <div className="flex justify-center w-full h-52">
        <div className="flex w-3/4 h-full"></div>
      </div>
    </>
  );
}
