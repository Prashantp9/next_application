"use client";

import "./globals.css";
import "./layout.css";

import { Inter } from "next/font/google";
import Navbar from "./navbar";
import { ReduxProvider } from "./redux/features/provider";
import Sidebar from "./sidebar";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebar, SetSidebar] = useState(false);
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ReduxProvider>
          <div className="applayout_container">
            <div
              className={`${
                sidebar
                  ? "applayout_sidebar_container_active"
                  : "applayout_sidebar_container"
              }`}
            >
              <Sidebar setSidebar={() => SetSidebar(!sidebar)} />
            </div>
            <div
              className={`${
                sidebar
                  ? "applayout_hori_container_active"
                  : "applayout_hori_container"
              }`}
            >
              <div className="app_navbar_container">
                <Navbar
                  isSidebar={sidebar}
                  setSidebar={() => SetSidebar(!sidebar)}
                />
              </div>
              <div className="applayout_children_container">{children}</div>
            </div>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
