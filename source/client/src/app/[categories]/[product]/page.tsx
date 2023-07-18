"use client";

import { useState } from "react";

export default function ProductPage() {
  const [productQuantity, setProductQuantity] = useState(0);

  const decreaseQuantity: () => void = () => {
    if (productQuantity > 0) {
      setProductQuantity(productQuantity - 1);
    }
  };

  return (
    <div className="h-[100vh] overflow-y-scroll">
      <div className="w-full h-[80rem] sm:h-[60rem]">
        <div className="h-full p-4 grid grid-cols-4 grid-rows-5 gap-3">
          <div className="rounded-lg col-span-4 row-span-1 sm:row-span-2">
            <img
              className="rounded-lg object-cover  w-full h-full"
              src={
                "https://images.unsplash.com/photo-1582666251140-ea98398b1afd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              }
              alt="product image"
            />
          </div>
          <div className="col-span-4 row-span-2">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <p className="font-bold text-base text-slate-100 ">
                  Ps 4 Controller
                </p>

                <div className="flex col-span-3 items-center gap-4">
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
              <p className="text-xs font-semibold py-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi aspernatur numquam hic voluptatum maiores, sit nisi in
                odio ratione incidunt? Eligendi ea saepe nesciunt nisi, natus
                illo. Asperiores esse, velit doloribus animi a neque et!
              </p>
              <div className="w-full my-4 flex flex-col gap-1 md:flex-row items-center justify-between">
                <div className="w-full grid grid-cols-4 min-h-[3rem] md:max-w-[30%] h-[2rem]">
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
                <div className="w-full flex flex-col gap-2 my-2 sm:flex-row sm:gap-10 md:gap-8 md:max-w-[50%]">
                  <button className="w-full py-4 text-base border-2 hover:scale-105 border-gray-500 text-sky-100 text-center rounded-lg">
                    Add to cart
                  </button>
                  <button className="w-full py-4 text-base hover:scale-105 border-2  border-gray-500 h-full text-sky-100 text-center rounded-lg">
                    Whishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 row-span-2">3</div>
        </div>
      </div>
    </div>
  );
}
