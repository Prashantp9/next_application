"use client";

import * as yup from "yup";

import { AppDispatch, useAppSelector } from "../redux/store";
import {
  setCustomAlert,
  userRegistrationThunk,
} from "../redux/features/userAuthSlice";

import ApplicationAlert from "../components/alert";
import ApplicationAlertFunction from "../components/alert";
import { Type } from "../constants/constants";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";

export default function registeration() {
  const isError = useAppSelector(
    (state) => state.rootReducer.authReducer.value.isError
  );
  const errorData = useAppSelector(
    (state) => state.rootReducer.authReducer.value.errorData
  );
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  type FormData = yup.InferType<typeof schema>;
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required").max(20),
    phone: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10)
      .max(10),
    name: yup.string().required("name is required").max(20),
  });

  const onSubmit = (data: FormData) => {
    dispatch(userRegistrationThunk(data)).then((data) => {
      if (data.payload.type == Type.SUCCESS) {
        router.push("/");
      }
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleBlur = async (e: React.FormEvent<HTMLInputElement>) => {
    await trigger(
      e.currentTarget.value as "email" | "password" | "phone" | "name"
    );
  };

  const setAlert = () => {
    dispatch(setCustomAlert());
  };
  return (
    <>
      {isError && (
        <ApplicationAlert
          success={true}
          errorData={errorData}
          setAlert={setAlert}
        />
      )}

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="text-red-500 text-xs">
                {errors.name ? errors.name?.message : ""}
              </div>
              <div className="mt-2">
                <input
                  {...register("name")}
                  name="name"
                  onBlur={handleBlur}
                  type="text"
                  required
                  className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="text-red-500 text-xs">
                {errors.email ? errors.email?.message : ""}
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email")}
                  type="email"
                  autoComplete="email"
                  onBlur={handleBlur}
                  required
                  className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone Number
              </label>
              <div className="text-red-500 text-xs">
                {errors.phone ? errors.phone?.message : ""}
              </div>
              <div className="mt-2">
                <input
                  {...register("phone")}
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    const value = e.currentTarget.value;
                    e.currentTarget.value = value.slice(0, 10);
                  }}
                  type="number"
                  required
                  className="p-3  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div className="text-red-500 text-xs">
                {errors.password ? errors.password?.message : ""}
              </div>
              <div className="mt-2">
                <input
                  // id="password"
                  {...register("password")}
                  onBlur={handleBlur}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  // required
                  className="p-3  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
