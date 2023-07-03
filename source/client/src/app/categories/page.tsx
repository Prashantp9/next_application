"use client";

import { AppDispatch, useAppSelector } from "../redux/store";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

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
    dispatch(fetchProductData());
  }, []);

  useEffect(() => {
    setProducts(
      mProducts.filter((elm: any, idx) => {
        return elm?.category == category;
      })
    );
    console.log(products, mProducts);
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

      <div className="flex flex-wrap gap-3 w-full h-screen overflow-y-scroll no-scrollbar justify-center pb-80 pt-3">
        {gProduct.map((elm: any, idx: number) => (
          <div className="flex flex-col p-2 bg-stone-800 rounded-md cursor-pointer w-72 max-h-80">
            <div className="w-full h-48 mb-3 max-h-48">
              <img
                className="object-cover h-full w-full rounded-md"
                src={elm?.image}
                alt=""
              />
            </div>
            <p className="text-gray-200 text-sm font-semibold">
              {elm?.title?.slice(0, 15) + "..."}
            </p>
            <div className="h-16">
              <p className="text-secondary-700 text-xs">
                {elm?.description?.slice(0, 100)}
              </p>
            </div>
            <div className="flex justify-between w-full h-10 align-center">
              <p className="text-gray-200 text-base font-semibold align-center">
                {"$" + elm?.price}
              </p>
              <div className="flex gap-2">
                <button className="text-xs font-semibold">
                  <svg
                    className="w-7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 3H4.5L6.5 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM6.07142 14H18L21 5H4.78571M11 19C11 20.1046 10.1046 21 9 21C7.89543 21 7 20.1046 7 19C7 17.8954 7.89543 17 9 17C10.1046 17 11 17.8954 11 19Z"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <button className="text-xs font-semibold"></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
