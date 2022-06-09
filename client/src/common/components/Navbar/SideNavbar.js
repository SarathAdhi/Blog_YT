import { Popover } from "@headlessui/react";
import React from "react";
import { Links } from "../elements/links";
import { useState, useEffect } from "react";
import { Mobile } from "./Mobile";
import { sideNavbarLinks } from "./index";
import { UserCircleIcon } from "@heroicons/react/outline";
import { P } from "../elements/Text";
import Image from "next/image";

export const SideNavbar = () => {
  const [userDetailsFromLocalStorage, setUserDetailsFromLocalStorage] =
    useState("");

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("user-details");
    if (isUserLoggedIn != "") {
      setUserDetailsFromLocalStorage(JSON.parse(isUserLoggedIn));
    }
  }, []);

  const logoutUser = () => {
    localStorage.setItem("user-details", "");
    setUserDetailsFromLocalStorage("");
  };

  const NavLinks = ({ onClick, href, Icon, children }) => {
    return (
      <Links
        href={href}
        onClick={onClick}
        className="flex items-center justify-center w-full h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300"
      >
        <Icon className="w-6 h-6" />
        <div className="font-semibold">
          <P>{children}</P>
        </div>
      </Links>
    );
  };

  return (
    <Popover>
      <div className="hidden md:block lg:w-40 h-full z-50">
        <div className=" flex flex-col items-center w-full h-full overflow-hidden text-gray-200 bg-[#111]">
          <Links
            href="/"
            className="flex justify-center items-center w-full px-3 mt-3"
          >
            <Image
              width={35}
              height={35}
              className="rounded-lg"
              src={require("../../../assets/logo.jpg")}
            />
            <span className="ml-2 hidden lg:block text-xl font-medium">
              Blog_YT
            </span>
          </Links>
          <div className="w-full flex flex-col flex-1 px-2">
            <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
              {sideNavbarLinks.map((link) => (
                <Links
                  key={link.key}
                  href={link.href}
                  className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
                >
                  <link.Icon className="w-6 h-6" />
                  <span className="ml-2 hidden lg:block text-sm font-medium">
                    {link.name}
                  </span>
                </Links>
              ))}
            </div>
            <div className="flex flex-col items-center w-full mt-2 border-t border-gray-700">
              {/* <a
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
                href="#"
              >
                <svg
                  className="w-6 h-6 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="ml-2 hidden lg:block text-sm font-medium">
                  Products
                </span>
              </a>
              <a
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
                href="#"
              >
                <svg
                  className="w-6 h-6 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
                <span className="ml-2 hidden lg:block text-sm font-medium">
                  Settings
                </span>
              </a>
              <a
                className="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
                href="#"
              >
                <svg
                  className="w-6 h-6 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
                <span className="ml-2 hidden lg:block text-sm font-medium">
                  Messages
                </span>
                <span className="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-indigo-500 rounded-full"></span>
              </a> */}
            </div>
          </div>
          {userDetailsFromLocalStorage && (
            <div className="flex items-center justify-center w-full h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300">
              <img
                className="w-10 h-10 cursor-pointer rounded-full"
                src={userDetailsFromLocalStorage.userImage}
                onClick={logoutUser}
              />
            </div>
          )}
          {!userDetailsFromLocalStorage && (
            <NavLinks href="/auth/login" Icon={UserCircleIcon}>
              <span className="ml-2 hidden lg:block text-sm font-medium">
                Account
              </span>
            </NavLinks>
          )}
        </div>
      </div>
      <Mobile
        logoutUser={logoutUser}
        userDetailsFromLocalStorage={userDetailsFromLocalStorage}
      />
    </Popover>
  );
};
