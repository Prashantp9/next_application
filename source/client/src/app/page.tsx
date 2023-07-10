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
import { useEffect, useState } from "react";

import ProductCard from "./categories/ProductCard";
import { useSelector } from "react-redux";

export default function Home() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const product = [
    "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1590845947376-2638caa89309?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  ];
  const gProduct: any[] = useSelector(
    (state: any) => state.rootReducer.productState.products
  );
  return (
    <div className="flex flex-col w-full overflow-y-scroll h-full">
      <div className="flex  w-full justify-center p-6">
        <div>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true,
            }}
            thumbs={{ swiper: thumbsSwiper }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            // zoom={true}
            // lazy={true}
            modules={[Autoplay, Pagination, Navigation, Zoom, Thumbs]}
            // style={{
            //   width: "80rem",
            //   height: "30rem",
            //   display: "flex",
            //   justifyContent: "center",
            //   alignItems: "center",
            // }}
            className="w-[90vw] h-[15rem] md:h-[25rem] sm:w-[33rem] md:w-[45rem] lg:w-[60rem] xl:w-[80rem]"
          >
            {product.map((data: any) => {
              return (
                <SwiperSlide>
                  <div
                    className="swiper-zoom-container"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <img
                      className="rounded-md object-cover"
                      style={{ width: "100%", height: "100%" }}
                      src={data}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div className="flex align-center w-full md:px-16 px-5 justify-between">
        <p className="text-gray-400 text-base font-semibold ">Trending Now !</p>
        <div></div>
      </div>
      {/* trending slides */}
      <div className="flex justify-center self-center w-[90%]">
        <div className="grid justify-items-center grid-cols-1 pt-4 h-full gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {gProduct.slice(0, 8).map((elm: any, idx: number) => (
            <div className="w-full h-full flex flex-col p-3 bg-zinc-800 rounded-md">
              <div className="w-full h-full min-h-48 max-h-48">
                <img
                  src={elm.image}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>

              <p className="text-secondary-700 text-xs pt-2 h-16">
                {elm?.description?.slice(0, 80)}
              </p>

              <div className="flex justify-between w-full h-10 align-center">
                <p className="flex items-center text-gray-200 text-sm font-semibold md:text-base">
                  {"$" + elm?.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
