"use client";

// Import Swiper styles

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
  EffectCoverflow,
  EffectFlip,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Link from "next/link";
import { fetchProductData } from "@/app/redux/features/productsSlice";
import { string } from "yup";

export default function ProductPage() {
  const [productQuantity, setProductQuantity] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // React Hooks Declaration
  const dispatch = useDispatch();
  // Redux States Declaration..
  const suggestedProduct: any[] = useSelector(
    (state: any) => state.rootReducer.productState.products
  );
  const decreaseQuantity: () => void = () => {
    if (productQuantity > 0) {
      setProductQuantity(productQuantity - 1);
    }
  };
  const swiperStyle: any = {
    "--swiper-navigation-color": "#fff",
    "--swiper-pagination-color": "#fff",
  };

  return (
    <div className="flex justify-center h-screen overflow-y-scroll">
      <div className="w-full pb-36 xl:max-w-[85%] ">
        <div className="p-4 grid grid-cols-4 gap-3">
          <div className="rounded-lg col-span-4 min-h-[15rem] max-h-[17rem] sm:row-span-2 lg:col-span-2 lg:p-6 lg:max-h-[25rem] ">
            <Swiper
              effect={"flip"}
              style={swiperStyle}
              className="w-full h-full"
              slidesPerView={1}
              navigation={true}
              grabCursor={true}
              modules={[Pagination, Navigation, EffectFlip]}
              pagination
            >
              <SwiperSlide>
                <img
                  className="rounded-lg object-cover  w-full h-full"
                  src={
                    "https://images.unsplash.com/photo-1582666251140-ea98398b1afd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  }
                  alt="product image"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="rounded-lg object-cover  w-full h-full"
                  src={
                    "https://images.unsplash.com/photo-1592155931584-901ac15763e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1475&q=80"
                  }
                  alt="product image"
                />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="col-span-4 row-span-2  lg:col-span-2 lg:p-6">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <p className="font-bold text-base text-slate-100 ">
                  Ps 4 Controller
                </p>

                <div className="flex min-w-fit col-span-3 items-start gap-4">
                  <p className="font-semibold text-xs text-end text-slate-300 italic">
                    rating
                  </p>
                  <div className="grid grid-cols-5 content-center gap-2">
                    {[...Array(5)].map(() => (
                      <>
                        <div className="cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            id="star"
                            version="1.1"
                            viewBox="0 0 29 29"
                            width={15}
                            fill="yellow"
                          >
                            <path d="M20.953 26.489c-.327 0-.656-.079-.959-.238l-5.466-2.875-5.521 2.874a2.044 2.044 0 0 1-2.169-.157 2.044 2.044 0 0 1-.819-2.014l1.044-6.086-4.439-4.363a2.045 2.045 0 0 1-.521-2.112 2.047 2.047 0 0 1 1.663-1.4l6.11-.888 2.778-5.57c.35-.708 1.057-1.147 1.847-1.147s1.497.439 1.847 1.147l2.733 5.537 6.155.921a2.047 2.047 0 0 1 1.663 1.4 2.049 2.049 0 0 1-.521 2.112l-4.422 4.31 1.027 6.14a2.049 2.049 0 0 1-.819 2.014 2.07 2.07 0 0 1-1.211.395zM4.019 12.198l4.421 4.31c.485.474.707 1.154.593 1.822L7.99 24.417l.552.948-.466-.885 5.465-2.874a2.063 2.063 0 0 1 1.917-.001l5.466 2.875.086-.063-1.044-6.086a2.064 2.064 0 0 1 .592-1.823l4.422-4.31-.033-.103-6.11-.888a2.064 2.064 0 0 1-1.551-1.127l-2.733-5.537c-.008-.016-.017-.032-.054-.032l-2.787 5.569a2.06 2.06 0 0 1-1.549 1.127l-6.112.888-.731.818.699-.715z"></path>
                          </svg>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
              <p className="font-bold text-base text-slate-200 mt-3">$ 500</p>
              <p className="text-xs font-semibold py-2 lg:text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi aspernatur numquam hic voluptatum maiores, sit nisi in
                odio ratione incidunt? Eligendi ea saepe nesciunt nisi, natus
                illo. Asperiores esse, velit doloribus animi a neque et!
              </p>

              <p className="text-xs font-semibold py-2 lg:text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi aspernatur numquam hic voluptatum maiores, sit nisi in
                odio ratione incidunt? Eligendi ea saepe nesciunt nisi, natus
                illo. Asperiores esse, velit doloribus animi a neque et! Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Sequi odio
                rem quis amet iure at voluptatem consectetur nihil molestiae
                maiores nostrum, voluptatum nemo!
              </p>
              <div className="w-full my-4 flex flex-col gap-1 md:flex-row items-center justify-between lg:flex-col lg:gap-4 lg:items-start">
                <div className="w-full grid grid-cols-4 min-h-[3rem] md:max-w-[30%] h-[2rem] lg:min-w-[50%]">
                  <button
                    onClick={() => setProductQuantity(productQuantity + 1)}
                    className="rounded-lg hover:scale-105 bg-gray-900 text-gray-100  hover:text-gray-400 shadow hover:shadow-lg"
                  >
                    +
                  </button>
                  <div className="flex text-base justify-center items-center font-semibold text-sky-100 col-span-2">
                    {!productQuantity ? "Quantity" : productQuantity}
                  </div>
                  <button
                    onClick={() => decreaseQuantity()}
                    className="rounded-lg hover:scale-105 bg-gray-900 text-gray-100 hover:text-gray-400 shadow hover:shadow-lg "
                  >
                    -
                  </button>
                </div>
                <div className="w-full flex flex-col gap-2 my-2 sm:flex-row sm:gap-10 md:gap-8 md:max-w-[50%] lg:max-w-full">
                  <button className="w-full py-4 text-base border-2 hover:scale-105 border-gray-500 text-sky-100 text-center rounded-lg ">
                    Add to cart
                  </button>
                  <button className="w-full py-4 text-base hover:scale-105 border-2  border-gray-500 h-full text-sky-100 text-center rounded-lg">
                    Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full h-[auto] col-span-4">
            <p className="font-bold text-bas border-b-2 pb-1 border-gray-400">
              Suggested Products !
            </p>
            <div className="w-full p-4 pb-[8rem]">
              <Swiper
                className="w-full my-6"
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                spaceBetween={5}
                slidesPerView={1}
                modules={[EffectCoverflow]}
                onSlideChange={() => console.log("slide change")}
                breakpoints={{
                  450: {
                    slidesPerView: 2,
                  },
                  640: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 4,
                    effect: "slide",
                    spaceBetween: "20",
                  },
                  1280: {
                    slidesPerView: 5,
                    effect: "slide",
                    spaceBetween: "20",
                  },
                }}
              >
                {suggestedProduct.slice(0, 8).map((elm: any, idx: Number) => (
                  <SwiperSlide>
                    <Link href={"/category/product"} className="w-full">
                      <div className="bg-zinc-800 rounded-lg p-2">
                        <div className="max-[400px]:h-[14rem] h-[10rem] w-full">
                          <img
                            src={elm.image}
                            className="w-full h-full object-cover rounded-md"
                            alt=""
                          />
                        </div>
                        <p className="flex items-center mt-2 text-gray-200 text-xs font-semibold md:text-base">
                          {elm?.title.slice(0, 20)}
                        </p>
                        <p className="text-secondary-700 text-xs pt-2 h-16">
                          {elm?.description?.slice(0, 50) + "..."}
                        </p>
                        <div className="flex justify-between w-full align-center">
                          <p className="flex items-center text-gray-200 text-sm font-bold md:text-base">
                            {"$" + elm?.price}
                          </p>
                          <div className="flex gap-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              id="like"
                              width="25"
                              height="25"
                              viewBox="0 0 29 29"
                            >
                              <path
                                fill="#ffff"
                                d="M14.5 25.892a.997.997 0 0 1-.707-.293l-9.546-9.546c-2.924-2.924-2.924-7.682 0-10.606 2.808-2.81 7.309-2.923 10.253-.332 2.942-2.588 7.443-2.479 10.253.332 2.924 2.924 2.924 7.683 0 10.606l-9.546 9.546a.997.997 0 0 1-.707.293zM9.551 5.252a5.486 5.486 0 0 0-3.89 1.608 5.505 5.505 0 0 0 0 7.778l8.839 8.839 8.839-8.839a5.505 5.505 0 0 0 0-7.778 5.505 5.505 0 0 0-7.778 0l-.354.354a.999.999 0 0 1-1.414 0l-.354-.354a5.481 5.481 0 0 0-3.888-1.608z"
                              />
                            </svg>

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              viewBox="0 0 512 500"
                              id="cart"
                            >
                              <path
                                fill="#ffff"
                                d="M169.6 377.6c-22.882 0-41.6 18.718-41.6 41.601 0 22.882 18.718 41.6 41.6 41.6s41.601-18.718 41.601-41.6c-.001-22.884-18.72-41.601-41.601-41.601zM48 51.2v41.6h41.6l74.883 151.682-31.308 50.954c-3.118 5.2-5.2 12.482-5.2 19.765 0 27.85 19.025 41.6 44.825 41.6H416v-40H177.893c-3.118 0-5.2-2.082-5.2-5.2 0-1.036 2.207-5.2 2.207-5.2l20.782-32.8h154.954c15.601 0 29.128-8.317 36.4-21.836l74.882-128.8c1.237-2.461 2.082-6.246 2.082-10.399 0-11.446-9.364-19.765-20.8-19.765H135.364L115.6 51.2H48zm326.399 326.4c-22.882 0-41.6 18.718-41.6 41.601 0 22.882 18.718 41.6 41.6 41.6S416 442.082 416 419.2c0-22.883-18.719-41.6-41.601-41.6z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <Swiper
className="w-full  h-[19rem] lg:h-[23rem]"
effect={"coverflow"}
grabCursor={true}
centeredSlides={true}
coverflowEffect={{
  rotate: 50,
  stretch: 0,
  depth: 100,
  modifier: 1,
  slideShadows: true,
}}
spaceBetween={5}
slidesPerView={1}
modules={[EffectCoverflow]}
onSlideChange={() => console.log("slide change")}
breakpoints={{
  450: {
    slidesPerView: 2,
  },
  640: {
    slidesPerView: 3,
  },
  1024: {
    slidesPerView: 4,
    effect: "slide",
    spaceBetween: "20",
  },
  1280: {
    slidesPerView: 5,
    effect: "slide",
    spaceBetween: "20",
  },
}}
>
{suggestedProduct.slice(0, 8).map((elm: any, idx: Number) => (
  <SwiperSlide>
    <Link
      href={"/category/product"}
      className="w-full h-full flex flex-col p-2 bg-zinc-800 rounded-md"
    >
      <div className="w-full h-full min-h-48 max-h-48 p-1 sm:p-0 lg:min-h-60 lg:max-h-60 lg:p-1">
        <img
          src={elm.image}
          className="w-full h-full object-cover rounded-md"
          alt=""
        />
      </div>
      <p className="flex items-center text-gray-200 text-sm font-semibold md:text-base">
        {elm?.title.slice(0, 20)}
      </p>
      <p className="text-secondary-700 text-xs pt-2 h-16">
        {elm?.description?.slice(0, 40)}
      </p>

      <div className="flex justify-between w-full h-10 align-center">
        <p className="flex items-center text-gray-200 text-sm font-semibold md:text-base">
          {"$" + elm?.price}
        </p>
        <div className="flex gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="like"
            width="25"
            height="25"
            viewBox="0 0 29 29"
          >
            <path
              fill="#ffff"
              d="M14.5 25.892a.997.997 0 0 1-.707-.293l-9.546-9.546c-2.924-2.924-2.924-7.682 0-10.606 2.808-2.81 7.309-2.923 10.253-.332 2.942-2.588 7.443-2.479 10.253.332 2.924 2.924 2.924 7.683 0 10.606l-9.546 9.546a.997.997 0 0 1-.707.293zM9.551 5.252a5.486 5.486 0 0 0-3.89 1.608 5.505 5.505 0 0 0 0 7.778l8.839 8.839 8.839-8.839a5.505 5.505 0 0 0 0-7.778 5.505 5.505 0 0 0-7.778 0l-.354.354a.999.999 0 0 1-1.414 0l-.354-.354a5.481 5.481 0 0 0-3.888-1.608z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 512 500"
            id="cart"
          >
            <path
              fill="#ffff"
              d="M169.6 377.6c-22.882 0-41.6 18.718-41.6 41.601 0 22.882 18.718 41.6 41.6 41.6s41.601-18.718 41.601-41.6c-.001-22.884-18.72-41.601-41.601-41.601zM48 51.2v41.6h41.6l74.883 151.682-31.308 50.954c-3.118 5.2-5.2 12.482-5.2 19.765 0 27.85 19.025 41.6 44.825 41.6H416v-40H177.893c-3.118 0-5.2-2.082-5.2-5.2 0-1.036 2.207-5.2 2.207-5.2l20.782-32.8h154.954c15.601 0 29.128-8.317 36.4-21.836l74.882-128.8c1.237-2.461 2.082-6.246 2.082-10.399 0-11.446-9.364-19.765-20.8-19.765H135.364L115.6 51.2H48zm326.399 326.4c-22.882 0-41.6 18.718-41.6 41.601 0 22.882 18.718 41.6 41.6 41.6S416 442.082 416 419.2c0-22.883-18.719-41.6-41.601-41.6z"
            ></path>
          </svg>
        </div>
      </div>
    </Link>
  </SwiperSlide>
))}
</Swiper> */
}
