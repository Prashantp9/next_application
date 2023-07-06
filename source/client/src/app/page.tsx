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

export default function Home() {
  const product = [
    "https://images.unsplash.com/photo-1645655892437-c5149679d223?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    "https://images.unsplash.com/photo-1674574124340-c00cc2dae99c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  ];
  return (
    <>
      <div className="flex  w-full justify-center p-6">
        <div className="shadow-lg shadow-gray-700/50 ">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true,
            }}
            // thumbs={{ swiper: thumbsSwiper }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            // zoom={true}
            // lazy={true}
            modules={[Autoplay, Pagination, Navigation, Zoom, Thumbs]}
            style={{
              width: "80rem",
              height: "30rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
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
    </>
  );
}
