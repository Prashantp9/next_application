"use client";

import "./styles/home.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { AppDispatch, UseAppSelector } from "./redux/store";
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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Link from "next/link";
import { fetchProductData } from "./redux/features/productsSlice";

export default function Home() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const product = [
    "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1590845947376-2638caa89309?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  ];
  const gProduct: any[] = useSelector(
    (state: any) => state.rootReducer.productState.products
  );

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    // dispatch(fetchProductData({}));
  }, []);

  return(
    <div className="flex w-[100vw] h-[100vh] justify-center align center">

      <h1>Hello from next application</h1>

    </div>
  )

  // return (
  //   <div className="flex flex-col w-full h-full lg:overflow-y-scroll lg:h-[100vh]">
  //     <div className="flex  w-full justify-center p-6">
  //       <div>
  //         <Swiper
  //           spaceBetween={30}
  //           centeredSlides={true}
  //           slidesPerView={1}
  //           autoplay={{
  //             delay: 4000,
  //             disableOnInteraction: true,
  //           }}
  //           thumbs={{ swiper: thumbsSwiper }}
  //           pagination={{
  //             clickable: true,
  //           }}
  //           navigation={true}
  //           modules={[Autoplay, Pagination, Navigation, Zoom, Thumbs]}
  //           className="w-[90vw] h-[15rem] md:h-[25rem] sm:w-[33rem] md:w-[45rem] lg:w-[60rem] xl:w-[80rem]"
  //         >
  //           {product.map((data: any, idx: number) => {
  //             return (
  //               <SwiperSlide key={idx}>
  //                 <div
  //                   className="swiper-zoom-container"
  //                   style={{ width: "100%", height: "100%" }}
  //                 >
  //                   <img
  //                     className="rounded-md object-cover"
  //                     style={{ width: "100%", height: "100%" }}
  //                     src={data}
  //                     alt=""
  //                     loading="lazy"
  //                   />
  //                 </div>
  //               </SwiperSlide>
  //             );
  //           })}
  //         </Swiper>
  //       </div>
  //     </div>
  //     <div className="flex align-center w-full md:px-16 px-5 justify-between">
  //       <p className="text-gray-400 text-base font-semibold ">Trending Now !</p>
  //       <div></div>
  //     </div>
  //     {/* trending slides */}
  //     <div className="flex flex-col items-center pb-8 w-full h-[100vh] overflow-y-scroll lg:h-auto lg:overflow-visible lg:pb-20">
  //       <div className="flex justify-center self-center w-[90%]">
  //         <div className="grid justify-items-center grid-cols-1 pt-4 h-full gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  //           {gProduct.slice(0, 8).map((elm: any, idx: number) => (
  //             <Link
  //               key={idx}
  //               href={`/categories/${elm.category?.name}/${elm._id}`}
  //               className="w-full h-full flex flex-col p-3 bg-zinc-800 rounded-md"
  //             >
  //               <div className="w-full h-full min-h-48 max-h-48">
  //                 <img
  //                   src={elm.image}
  //                   className="w-full h-full object-cover"
  //                   alt=""
  //                 />
  //               </div>

  //               <p className="text-secondary-700 text-xs pt-2 h-16">
  //                 {elm?.description?.slice(0, 80)}
  //               </p>

  //               <div className="flex justify-between w-full h-10 align-center">
  //                 <p className="flex items-center text-gray-200 text-sm font-semibold md:text-base">
  //                   {"$" + elm?.price}
  //                 </p>
  //                 <div className="flex gap-3">
  //                   <svg
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     id="like"
  //                     width="25"
  //                     height="25"
  //                     viewBox="0 0 29 29"
  //                   >
  //                     <path
  //                       fill="#ffff"
  //                       d="M14.5 25.892a.997.997 0 0 1-.707-.293l-9.546-9.546c-2.924-2.924-2.924-7.682 0-10.606 2.808-2.81 7.309-2.923 10.253-.332 2.942-2.588 7.443-2.479 10.253.332 2.924 2.924 2.924 7.683 0 10.606l-9.546 9.546a.997.997 0 0 1-.707.293zM9.551 5.252a5.486 5.486 0 0 0-3.89 1.608 5.505 5.505 0 0 0 0 7.778l8.839 8.839 8.839-8.839a5.505 5.505 0 0 0 0-7.778 5.505 5.505 0 0 0-7.778 0l-.354.354a.999.999 0 0 1-1.414 0l-.354-.354a5.481 5.481 0 0 0-3.888-1.608z"
  //                     />
  //                   </svg>

  //                   <svg
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     width="25"
  //                     height="25"
  //                     viewBox="0 0 512 500"
  //                     id="cart"
  //                   >
  //                     <path
  //                       fill="#ffff"
  //                       d="M169.6 377.6c-22.882 0-41.6 18.718-41.6 41.601 0 22.882 18.718 41.6 41.6 41.6s41.601-18.718 41.601-41.6c-.001-22.884-18.72-41.601-41.601-41.601zM48 51.2v41.6h41.6l74.883 151.682-31.308 50.954c-3.118 5.2-5.2 12.482-5.2 19.765 0 27.85 19.025 41.6 44.825 41.6H416v-40H177.893c-3.118 0-5.2-2.082-5.2-5.2 0-1.036 2.207-5.2 2.207-5.2l20.782-32.8h154.954c15.601 0 29.128-8.317 36.4-21.836l74.882-128.8c1.237-2.461 2.082-6.246 2.082-10.399 0-11.446-9.364-19.765-20.8-19.765H135.364L115.6 51.2H48zm326.399 326.4c-22.882 0-41.6 18.718-41.6 41.601 0 22.882 18.718 41.6 41.6 41.6S416 442.082 416 419.2c0-22.883-18.719-41.6-41.601-41.6z"
  //                     ></path>
  //                   </svg>
  //                 </div>
  //               </div>
  //             </Link>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
