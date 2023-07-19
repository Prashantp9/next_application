"use client";

import { AppDispatch, useAppSelector } from "../redux/store";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import Link from "next/link";
import ProductCard from "./ProductCard";
import { fetchProductData } from "../redux/features/productsSlice";
import { useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";

export default function Categories() {
  // useState states
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [mProducts, setMProducts] = useState([]);
  // Hooks
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const dispatch = useDispatch<AppDispatch>();
  const useSelector = useAppSelector;
  //Search params
  const category = searchParams.get("category");
  //temporary function for fetching fake data
  //global states
  const gProduct: any[] = useSelector(
    (state) => state.rootReducer.productState.products
  );

  const getFakeCategories = async (): Promise<void> => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFakeData = async (): Promise<void> => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setMProducts(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  //============================================
  //===========================================Query fuction
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const changeSearchParams = (paramName: string, paramValue: string) => {
    router.push(pathname + "?" + createQueryString(paramName, paramValue));
  };
  //   =======================================

  useEffect(() => {
    getFakeData();
    getFakeCategories();
    dispatch(fetchProductData({}));
  }, []);

  useEffect(() => {
    if (category) {
      dispatch(fetchProductData({ filter: { "category.name": category } }));
    }
  }, [category]);

  return (
    <div className="p-3">
      <h4 className="mb-2 mt-0 text-3xl font-medium leading-tight text-primary text-gray-400 mb-5">
        Categories
      </h4>

      <div className="flex flex-wrap content-around w-full gap-2 border-b-4  border-slate-400 pb-7">
        {categories?.map((elm: any, idx: number) => (
          <div
            onClick={() => changeSearchParams("category", elm)}
            className={`cursor-pointer p-5 shadow-lg rounded-md hover:bg-neutral-800  ${
              category && category == elm ? "bg-neutral-800" : "bg-neutral-900"
            }`}
          >
            <p className="text-gray-400 font-semibold">{elm}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center w-full overflow-y-scroll h-[80vh]">
        <div className="grid w-[90%]  justify-items-center grid-cols-1 pt-4 h-full gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {gProduct?.map((elm: any, idx: number) => (
            <Link
              href={"/category/product"}
              className="w-full h-full flex flex-col p-3 bg-zinc-800 rounded-md"
            >
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
          ))}
        </div>
      </div>

      {/* <div className="flex flex-wrap gap-3 w-full h-screen overflow-y-scroll no-scrollbar justify-center pb-80 pt-3">
        {gProduct.map((elm: any, idx: number) => (
          <ProductCard elm={elm} idx={idx} />
        ))}
      </div> */}
    </div>
  );
}
