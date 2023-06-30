"use client";

import { useEffect, useState } from "react";

import Router from "next/router";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

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
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFakeData();
    getFakeCategories();
  }, []);
  return (
    <div className="p-3">
      <h4 className="mb-2 mt-0 text-3xl font-medium leading-tight text-primary text-gray-400 mb-5">
        Categories
      </h4>
      <div className="flex flex-wrap content-around w-full gap-2 border-b-4  border-slate-400 pb-7">
        {categories.concat()?.map((elm: any, idx: number) => (
          <div className="p-5 shadow-lg rounded-md hover:bg-neutral-800 bg-neutral-900">
            <p className="text-gray-400 font-semibold">{elm}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 w-full p-3 h-screen overflow-y-scroll no-scrollbar">
        {products.map((elm: any, idx: number) => (
          <div className="flex flex-col p-2 bg-stone-800 rounded-md cursor-pointer w-60">
            <div className="w-full h-48 mb-3">
              <img
                className="object-cover h-full w-full"
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
            <p className="text-gray-200 text-base font-semibold">
              {"$" + elm?.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
