"use client";

import "./styles/home.css";

import { AppDispatch, useAppSelector } from "./redux/store";
import { cookieTest, test } from "./redux/features/userAuthSlice";

import Login from "./login";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Home() {
  return (
    <div className="homepage-container">
      <div className="home-page-carousel-container">
        <div className="home-page-carousel-content">
          <div className="carousel">
            <div className="carousel-inner">
              <input
                className="carousel-open"
                type="radio"
                id="carousel-1"
                name="carousel"
                aria-hidden="true"
                hidden
                checked
              />
              <div className="carousel-item">
                <img src="http://fakeimg.pl/2000x800/0079D8/fff/?text=Without" />
              </div>
              <input
                className="carousel-open"
                type="radio"
                id="carousel-2"
                name="carousel"
                aria-hidden="true"
                hidden
              />
              <div className="carousel-item">
                <img src="http://fakeimg.pl/2000x800/DA5930/fff/?text=JavaScript" />
              </div>
              <input
                className="carousel-open"
                type="radio"
                id="carousel-3"
                name="carousel"
                aria-hidden="true"
                hidden
              />
              <div className="carousel-item">
                <img src="http://fakeimg.pl/2000x800/F90/fff/?text=Carousel" />
              </div>
              <label
                htmlFor="carousel-3"
                className="carousel-control prev control-1"
              >
                ‹
              </label>
              <label
                htmlFor="carousel-2"
                className="carousel-control next control-1"
              >
                ›
              </label>
              <label
                htmlFor="carousel-1"
                className="carousel-control prev control-2"
              >
                ‹
              </label>
              <label
                htmlFor="carousel-3"
                className="carousel-control next control-2"
              >
                ›
              </label>
              <label
                htmlFor="carousel-2"
                className="carousel-control prev control-3"
              >
                ‹
              </label>
              <label
                htmlFor="carousel-1"
                className="carousel-control next control-3"
              >
                ›
              </label>
              <ol className="carousel-indicators">
                <li>
                  <label htmlFor="carousel-1" className="carousel-bullet">
                    •
                  </label>
                </li>
                <li>
                  <label htmlFor="carousel-2" className="carousel-bullet">
                    •
                  </label>
                </li>
                <li>
                  <label htmlFor="carousel-3" className="carousel-bullet">
                    •
                  </label>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
