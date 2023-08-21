"use client";

import { AppDispatch, useAppSelector } from "../../../redux/store";
import {
  fetchProductData,
  setSearchInput,
} from "../../../redux/features/productsSlice";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import Link from "next/link";
import ProductCard from "./ProductCard";
import { useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";

export default function Categories() {
  // useState states
  const [categories, setCategories] = useState([]);
  const [isCategory, setCategory] = useState(false);
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
  const searchInput: string = useSelector(
    (state) => state.rootReducer.productState.searchInput
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
    getFakeCategories();
    dispatch(fetchProductData({}));
  }, []);

  useEffect(() => {
    console.log(searchInput);
    const filter: any = {};
    if (searchInput) {
      filter["searchQuery"] = searchInput;
    }
    if (category) {
      filter["category.name"] = category;
    }
    console.log(filter);
    dispatch(fetchProductData({ filter: filter }));
  }, [category, searchInput]);

  return (
    <div className="py-4">
      <div className="w-[2rem] px-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height={24}
          // fill="rgb(148 163 184)"
          fill="#dfdf"
          id="filter"
        >
          <path
            d="M20 5h-1.17a3.001 3.001 0 0 0-5.66 0H4a1 1 0 0 0 0 2h9.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2zm-4 2a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM3 12a1 1 0 0 1 1-1h1.17a3.001 3.001 0 0 1 5.66 0H20a1 1 0 1 1 0 2h-9.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 0 1-1-1zm5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-4 4a1 1 0 1 0 0 2h9.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-1.17a3.001 3.001 0 0 0-5.66 0H4zm13 1a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <div className="flex flex-wrap content-around w-full gap-2 border-b-4  border-slate-400 py-4 px-5">
        <div
          onClick={() => setCategory(!isCategory)}
          className="flex text-sm  lg:text-base justify-between items-center px-8 gap-10 py-2 relative border-2 border-slate-400 rounded-lg cursor-pointer "
        >
          Categories
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="dropdown"
            x="0"
            y="0"
            version="1.1"
            viewBox="0 0 29 29"
            width={20}
            fill="rgb(148 163 184)"
            className="cursor-pointer"
          >
            <path d="M14.5 27.065a12.465 12.465 0 0 1-8.839-3.655c-4.874-4.874-4.874-12.804 0-17.678 2.361-2.361 5.5-3.662 8.839-3.662s6.478 1.3 8.839 3.662c4.874 4.874 4.874 12.804 0 17.678a12.465 12.465 0 0 1-8.839 3.655zm0-22.995a10.43 10.43 0 0 0-7.425 3.076c-4.093 4.094-4.093 10.755 0 14.85 4.094 4.093 10.755 4.093 14.85 0 4.093-4.094 4.093-10.755 0-14.85A10.434 10.434 0 0 0 14.5 4.07zm8.132 18.633h.01-.01z"></path>
            <path d="M14.5 17.869a.997.997 0 0 1-.707-.293L9.197 12.98a.999.999 0 1 1 1.414-1.414l3.889 3.889 3.889-3.889a.999.999 0 1 1 1.414 1.414l-4.596 4.596a.997.997 0 0 1-.707.293z"></path>
          </svg>
          {isCategory && (
            <div className="flex flex-col h-[15rem] overflow-y-scroll top-10 left-0 right-0 rounded-md absolute z-10 bg-neutral-700 py-2 ">
              {categories.concat(categories).map((elm: any, idx: Number) => (
                <p
                  onClick={() => changeSearchParams("category", elm)}
                  className=" pl-[1rem] pr-[1rem] py-3 text-slate-100  whitespace-nowrap"
                >
                  {elm}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center w-full overflow-y-scroll h-[80vh]">
        <div className="grid w-[90%]  justify-items-center grid-cols-1 pt-4 h-full gap-4 lg:grid-rows-[auto_minmax(auto,1fr)] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {gProduct?.map((elm: any, idx: number) => (
            <Link
              href={`/${elm?.category?.name}/${elm._id}`}
              className="w-full h-full flex flex-col p-3 bg-zinc-800 rounded-md"
            >
              <div className="w-full h-full min-h-48 max-h-48">
                <img
                  src={elm.image}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <p className="flex items-center text-gray-200 text-sm font-semibold md:text-base pt-4 lg:font-medium">
                {"$" + elm?.title.slice(0, 45) + `...`}
              </p>
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
