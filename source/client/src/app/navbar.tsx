import "./navbar.css";

import { AppDispatch, UseAppSelector } from "./redux/store";
import { ChangeEvent, useEffect, useState } from "react";
import {
  fetchProductData,
  setSearchInput,
} from "./redux/features/productsSlice";
import {
  setCustomAlert,
  userAuthByCookie,
  userLogoutThunk,
} from "./redux/features/userAuthSlice";

import ApplicationAlert from "./components/alert";
import Login from "./login";
import ProfileMenu from "./ProfileMenu";
import { setLogin } from "./redux/features/applicationStates";
import { useDispatch } from "react-redux";

interface Props {
  isSidebar: boolean;
  setSidebar: any;
}

export default function Navbar({ isSidebar, setSidebar }: Props) {
  const [isLogout, setIsLogout] = useState(false);
  const [isProfile, setProfile] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleLogin = () => dispatch(setLogin(""));
  const userLogin = UseAppSelector(
    (state) => state.rootReducer.authReducer.value.isLogin
  );
  const isLogin = UseAppSelector(
    (state) => state.rootReducer.appState.value.isLogin
  );
  const userName = UseAppSelector(
    (state) => state.rootReducer.authReducer.value.userName
  );

  // login by token
  useEffect(() => {
    dispatch(userAuthByCookie()).then((data) => console.log(data));
  }, []);
  // logout function
  const userLogout = () => {
    dispatch(userLogoutThunk());
  };
  const setAlert = () => {
    dispatch(setCustomAlert());
  };

  const setSearchInp = (e: any) => {
    dispatch(setSearchInput({ searchInput: e.target.value }));
    // dispatch(fetchProductData({ filter: { searchQuery: e.target.value } }));
  };

  return (
    <>
      {/* login PopUp */}
      {isLogin && <Login />}

      <div className="navbar_container">
        <div className="navbar_content">
          <div className="navbar_search_input_container">
            {/* <div className="absolute left-0 right-0 top-10 bg-zinc-800 rounded-md max-h-[15rem] z-10 overflow-auto p-2">
              {[...Array(5)].map((elm, idx) => (
                <p className="text-sm text-slate-300 font-semibold px-3 pb-1 border-b-[0.1px] border-gray-700">
                  PlayStation 5
                </p>
              ))}
            </div> */}
            <input
              type="text"
              onChange={(e) => {
                setSearchInp(e);
              }}
            />
          </div>
          <div className="navbar_user_info_container">
            <div className="user-info">
              <div className="w-[2rem] h-[2rem] relative">
                <img
                  onClick={() => setProfile(!isProfile)}
                  className="w-full h-full rounded-2xl cursor-pointer"
                  src="https://avatars.githubusercontent.com/u/100432036?s=400&u=b2d8f9650957f62e9147d0e724867251b2b580f6&v=4"
                  alt=""
                />
                {isProfile && (
                  <ProfileMenu onclick={() => setProfile(!isProfile)} />
                )}
                {isProfile && (
                  <div
                    className="fixed top-0 bottom-0 right-0 left-0 backdrop-blur-sm bg-black/10 z-10"
                    onClick={(event) =>
                      event.currentTarget === event.target && setProfile(false)
                    }
                  ></div>
                )}
              </div>

              {userLogin ? (
                <div
                  className="user-name relative"
                  onClick={() => setIsLogout(!isLogout)}
                >
                  {isLogout && (
                    <p
                      onClick={() => userLogout()}
                      className="logout-container absolute top-10 bg-gradient-to-b from-green-400 to-blue-400 z-10"
                    >
                      Logout
                    </p>
                  )}
                  {userName.split(" ")[0]}
                  <svg viewBox="0 0 492 492" fill="currentColor">
                    <path d="M484.13 124.99l-16.11-16.23a26.72 26.72 0 00-19.04-7.86c-7.2 0-13.96 2.79-19.03 7.86L246.1 292.6 62.06 108.55c-5.07-5.06-11.82-7.85-19.03-7.85s-13.97 2.79-19.04 7.85L7.87 124.68a26.94 26.94 0 000 38.06l219.14 219.93c5.06 5.06 11.81 8.63 19.08 8.63h.09c7.2 0 13.96-3.57 19.02-8.63l218.93-219.33A27.18 27.18 0 00492 144.1c0-7.2-2.8-14.06-7.87-19.12z"></path>
                  </svg>
                </div>
              ) : (
                <div
                  className="user-login-container"
                  onClick={() => handleLogin()}
                >
                  <p>
                    <span>Login / Sign Up</span>
                  </p>
                </div>
              )}

              <div className="notify">
                <div className="notification">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.707 8.796c0 1.256.332 1.997 1.063 2.85.553.628.73 1.435.73 2.31 0 .874-.287 1.704-.863 2.378a4.537 4.537 0 01-2.9 1.413c-1.571.134-3.143.247-4.736.247-1.595 0-3.166-.068-4.737-.247a4.532 4.532 0 01-2.9-1.413 3.616 3.616 0 01-.864-2.378c0-.875.178-1.682.73-2.31.754-.854 1.064-1.594 1.064-2.85V8.37c0-1.682.42-2.781 1.283-3.858C7.861 2.942 9.919 2 11.956 2h.09c2.08 0 4.204.987 5.466 2.625.82 1.054 1.195 2.108 1.195 3.745v.426zM9.074 20.061c0-.504.462-.734.89-.833.5-.106 3.545-.106 4.045 0 .428.099.89.33.89.833-.025.48-.306.904-.695 1.174a3.635 3.635 0 01-1.713.731 3.795 3.795 0 01-1.008 0 3.618 3.618 0 01-1.714-.732c-.39-.269-.67-.694-.695-1.173z"
                    />
                  </svg>
                  <p className="notification-active"></p>
                </div>
              </div>
              <div className="navbar_sidebar_button">
                <input
                  type="checkbox"
                  className="menu-open"
                  name="menu-open"
                  id="menu-open"
                  checked={isSidebar}
                  onChange={() => setSidebar()}
                />
                <label className="menu-open-button" htmlFor="menu-open">
                  <span className="lines line-1"></span>
                  <span className="lines line-2"></span>
                  <span className="lines line-3"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
