/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  BookmarkAltIcon,
  CalendarIcon,
  MenuIcon,
  ShieldCheckIcon,
  SupportIcon,
  XIcon,
} from "@heroicons/react/outline";
import {
  HomeIcon,
  PencilAltIcon,
  TagIcon,
  LoginIcon,
} from "@heroicons/react/solid";
import Image from "next/image";
import { Links } from "./elements/links";
import { H2, P } from "./elements/Text";
import { useEffect, useState } from "react";

const resources = [
  {
    name: "Help Center",
    description:
      "Get all of your questions answered in our forums or contact support.",
    href: "#",
    icon: SupportIcon,
  },
  {
    name: "Guides",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "#",
    icon: BookmarkAltIcon,
  },
  {
    name: "Events",
    description:
      "See what meet-ups and other events we might be planning near you.",
    href: "#",
    icon: CalendarIcon,
  },
  {
    name: "Security",
    description: "Understand how we take your privacy seriously.",
    href: "#",
    icon: ShieldCheckIcon,
  },
];

const sideNavbarLinks = [
  {
    key: "home",
    name: "Home",
    href: "/",
    Icon: HomeIcon,
  },
  {
    key: "create",
    name: "Create",
    href: "/post/create",
    Icon: PencilAltIcon,
  },
  {
    key: "tags",
    name: "Tags",
    href: "/tags",
    Icon: TagIcon,
  },
];

// function classNames(...classes) {
//     return classes.filter(Boolean).join(" ");
// }

export default function Navbar() {
  const [userDetailsFromLocalStorage, setUserDetailsFromLocalStorage] =
    useState("");

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("user-details");
    if (isUserLoggedIn != "") {
      setUserDetailsFromLocalStorage(JSON.parse(isUserLoggedIn));
    }
  }, []);

  const NavLinks = ({ onClick, href, Icon, title }) => {
    return (
      <Links
        href={href}
        onClick={onClick}
        className="flex flex-col items-center text-white duration-300 hover:text-sky-500"
      >
        <Icon width={35} height={35} />
        <div className="font-semibold">
          <P>{title}</P>
        </div>
      </Links>
    );
  };

  return (
    <Popover className="fixed z-50 w-full md:w-16 md:h-full bg-black md:border-r-2">
      <div className="mx-auto md:py-2 flex h-full items-center md:justify-center">
        <div className="flex mx-4 md:flex-col items-center h-16 md:py-0 md:h-full w-full justify-between ">
          <div className="flex justify-center items-center">
            <Links href="/" className="w-10 h-10">
              <Image src={require("../../assets/logo.jpg")} />
            </Links>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden md:flex flex-col justify-between items-center md:h-1/3">
            {sideNavbarLinks.map((link) => (
              <NavLinks
                key={link.key}
                href={link.href}
                Icon={link.Icon}
                title={link.name}
              />
            ))}
          </div>
          <div className="hidden md:flex flex-col justify-center">
            {!userDetailsFromLocalStorage && (
              <NavLinks href="/auth/login" Icon={LoginIcon} title="Login" />
            )}

            {userDetailsFromLocalStorage && (
              <img
                className="w-10 h-10 cursor-pointer rounded-full"
                src={userDetailsFromLocalStorage.userImage}
                onClick={() => {
                  localStorage.setItem("user-details", "");
                  setUserDetailsFromLocalStorage("");
                }}
              />
            )}
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center  justify-between">
                <Links href="/" className="w-12 h-12">
                  <Image
                    className="rounded-lg"
                    src={require("../../assets/logo.jpg")}
                  />
                </Links>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-2">
                  {sideNavbarLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="m-0 p-3 flex items-center rounded-md hover:bg-gray-100"
                    >
                      <item.Icon
                        className="flex-shrink-0 h-6 w-6 text-indigo-600"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-base font-medium text-gray-900">
                        {item.name}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <a
                  href="#"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Pricing
                </a>

                <a
                  href="#"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Docs
                </a>
                {resources.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              {!userDetailsFromLocalStorage && (
                <div>
                  <Links
                    href="/auth/signup"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Sign up
                  </Links>
                  <Links
                    href="/auth/login"
                    className="mt-5 flex hover:text-indigo-500 justify-center text-center text-base font-medium text-gray-500"
                  >
                    Existing customer? Login
                  </Links>
                </div>
              )}

              {userDetailsFromLocalStorage && (
                <div>
                  <Links
                    href="#"
                    onClick={() => {
                      localStorage.setItem("user-details", "");
                      setUserDetailsFromLocalStorage("");
                    }}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Logout
                  </Links>
                </div>
              )}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
