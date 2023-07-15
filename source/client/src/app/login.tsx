import "./navbar.css";

import * as yup from "yup";

import { AppDispatch, useAppSelector } from "./redux/store";
import { setCustomAlert, userLoginThunk } from "./redux/features/userAuthSlice";

import ApplicationAlert from "./components/alert";
import Link from "next/link";
import { Type } from "./constants/constants";
import { setLogin } from "./redux/features/applicationStates";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Login() {
  // global states =============================================================
  const isError = useAppSelector(
    (state) => state.rootReducer.authReducer.value.isError
  );
  const errorData = useAppSelector(
    (state) => state.rootReducer.authReducer.value.errorData
  );
  const dispatch = useDispatch<AppDispatch>();

  // Login form / validation =====================================================
  const schema = yup.object().shape({
    password: yup.string().required("Password is required").required(),
    phone: yup.string().min(10, "invalid phone number").max(10).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    dispatch(userLoginThunk(data)).then((data) => {
      data.payload.type == Type.SUCCESS && dispatch(setLogin(""));
    });
  };
  //  ==============================================================
  //
  const handleLogin = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      dispatch(setLogin(""));
    }
  };
  const handleBlur = async (e: React.FormEvent<HTMLInputElement>) => {
    await trigger(e.currentTarget.value as "password" | "phone");
  };
  const setAlert = () => {
    dispatch(setCustomAlert());
  };

  return (
    <>
      {/* Errro handling */}
      {isError && (
        <ApplicationAlert
          success={true}
          errorData={errorData}
          setAlert={setAlert}
        />
      )}
      <div>
        <div
          className="login-page"
          onClick={(e) => {
            console.log(e);
            handleLogin(e);
          }}
        >
          <div className="login-container flex justify-center align-center ">
            <section className="flex align-center">
              <div className="container">
                <div className="flex flex-wrap items-center justify-center lg:justify-between">
                  {/* <!-- Left column container with background--> */}
                  <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                    <img
                      src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                      className="w-full"
                      alt="Phone image"
                    />
                  </div>

                  {/* <!-- Right column container with form --> */}
                  <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
                    <form>
                      {/* <!-- Email input --> */}
                      <div className="text-red-400 text-xs">
                        {errors.phone ? errors.phone?.message : ""}
                      </div>
                      <div className="relative mb-6">
                        <input
                          type="text"
                          className="border-gray-800 border-2 peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          id="exampleFormControlInput3"
                          placeholder="Email address"
                          onInput={(e: React.FormEvent<HTMLInputElement>) => {
                            const val = e.currentTarget.value;
                            e.currentTarget.value = val.slice(0, 10);
                          }}
                          {...register("phone")}
                          name="phone"
                        />
                        <label
                          htmlFor="exampleFormControlInput3"
                          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >
                          Phone number
                        </label>
                      </div>

                      {/* <!-- Password input --> */}
                      <div className="relative mb-6" data-te-input-wrapper-init>
                        <div className="text-red-400 text-xs">
                          {errors.password ? errors.password?.message : ""}
                        </div>
                        <input
                          type="password"
                          className="border-gray-800 border-2 peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          id="exampleFormControlInput33"
                          placeholder="Password"
                          {...register("password")}
                          name="password"
                        />
                        <label
                          htmlFor="exampleFormControlInput33"
                          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >
                          Password
                        </label>
                      </div>

                      {/* <!-- Remember me checkbox --> */}
                      <div className="mb-6 flex items-center justify-between">
                        <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                          <input
                            className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                            type="checkbox"
                            value=""
                            id="exampleCheck3"
                          />
                          <label
                            className="inline-block pl-[0.15rem] hover:cursor-pointer"
                            htmlFor="exampleCheck3"
                          >
                            Remember me
                          </label>
                        </div>

                        {/* <!-- Forgot password link --> */}
                        <a
                          href="#!"
                          className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <div
                        onClick={() => dispatch(setLogin(""))}
                        className="mb-6 flex items-center justify-between"
                      >
                        <Link
                          className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                          href="/registeration"
                        >
                          Register
                        </Link>
                      </div>

                      {/* <!-- Submit button --> */}
                      <button
                        // type="submit"
                        onClick={handleSubmit(onSubmit)}
                        className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                      >
                        Sign in
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
