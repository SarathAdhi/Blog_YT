/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
    BookmarkAltIcon,
    CalendarIcon,
    ChartBarIcon,
    CursorClickIcon,
    LogoutIcon,
    MenuIcon,
    PhoneIcon,
    PlayIcon,
    RefreshIcon,
    ShieldCheckIcon,
    SupportIcon,
    ViewGridIcon,
    XIcon,
} from "@heroicons/react/outline";
import { HomeIcon, PencilAltIcon, TagIcon, LoginIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Image from "next/image";
import { Links } from "./elements/links";
import { H2, H3 } from "./elements/Text";
import { useEffect, useState } from "react";

const solutions = [
    {
        name: "Analytics",
        description:
            "Get a better understanding of where your traffic is coming from.",
        href: "#",
        icon: ChartBarIcon,
    },
    {
        name: "Engagement",
        description: "Speak directly to your customers in a more meaningful way.",
        href: "#",
        icon: CursorClickIcon,
    },
    {
        name: "Security",
        description: "Your customers' data will be safe and secure.",
        href: "#",
        icon: ShieldCheckIcon,
    },
    {
        name: "Integrations",
        description: "Connect with third-party tools that you're already using.",
        href: "#",
        icon: ViewGridIcon,
    },
    {
        name: "Automations",
        description:
            "Build strategic funnels that will drive your customers to convert",
        href: "#",
        icon: RefreshIcon,
    },
];

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
const recentPosts = [
    { id: 1, name: "Boost your conversion rate", href: "#" },
    {
        id: 2,
        name: "How to use search engine optimization to drive traffic to your site",
        href: "#",
    },
    { id: 3, name: "Improve your customer experience", href: "#" },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Navbar() {

    const [userDetailsFromLocalStorage, setUserDetailsFromLocalStorage] = useState('')

    useEffect(() => {
        const isUserLoggedIn = localStorage.getItem('user-details')
        if (isUserLoggedIn != '') {
            setUserDetailsFromLocalStorage(JSON.parse(isUserLoggedIn))
        }
    }, [])


    return (
        <Popover className="fixed z-50 w-full md:w-16 md:h-full bg-black md:border-r-2">
            <div className="mx-auto md:py-2 flex h-full items-center md:justify-center">
                <div className="flex md:flex-col items-center h-16 px-5 md:py-0 md:h-full w-full justify-between ">
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
                    <Popover.Group as="nav" className="hidden md:flex flex-col justify-between items-center md:h-1/3">

                        <Links href="/" className="text-base font-medium text-white duration-300 hover:text-sky-500">
                            <HomeIcon width={40} height={40} />
                            <div className="absolute pl-0 -mt-9 font-bold opacity-0 hover:animate-bounce hover:opacity-100 hover:pl-16">
                                <H2 className="bg-white py-1 px-2 rounded-lg">Home</H2>
                            </div>
                        </Links>
                        <Links href="/create" className="text-base font-medium text-white duration-300 hover:text-sky-500">
                            <PencilAltIcon width={40} height={40} />
                            <div className="absolute pl-0 -mt-9 font-bold opacity-0 hover:animate-bounce hover:opacity-100 hover:pl-16">
                                <H2 className="bg-white py-1 px-2 rounded-lg">Create</H2>
                            </div>
                        </Links>

                        <Popover className="relative">
                            {({ open }) => (
                                <>
                                    <Popover.Button
                                        className={classNames(
                                            open ? "text-gray-400" : "text-white",
                                            "group inline-flex items-center text-base font-medium hover:text-sky-500 focus:outline-none"
                                        )}
                                    >
                                        <span>
                                            <TagIcon width={40} height={40} />
                                            <div className="absolute pl-0 -mt-10 font-bold opacity-0 hover:animate-bounce hover:opacity-100 hover:pl-16">
                                                <H2 className="bg-white py-1 px-2 rounded-lg">Categories</H2>
                                            </div>
                                        </span>
                                    </Popover.Button>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel className="absolute z-10 left-20 mt-3 px-2 w-screen max-w-md sm:px-0">
                                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                <div className="px-5 py-5 bg-gray-50 sm:px-8 sm:py-8">
                                                    <div>
                                                        <h3 className="text-sm tracking-wide font-medium text-gray-500 uppercase">
                                                            Recent Posts
                                                        </h3>
                                                        <ul role="list" className="mt-4 space-y-4">
                                                            {recentPosts.map((post) => (
                                                                <li
                                                                    key={post.id}
                                                                    className="text-base truncate"
                                                                >
                                                                    <a
                                                                        href={post.href}
                                                                        className="font-medium text-gray-900 hover:text-gray-700"
                                                                    >
                                                                        {post.name}
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="mt-5 text-sm">
                                                        <a
                                                            href="#"
                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                        >
                                                            {" "}
                                                            View all posts{" "}
                                                            <span aria-hidden="true">&rarr;</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>
                    </Popover.Group>
                    <div className="hidden md:flex flex-col justify-center">

                        {!userDetailsFromLocalStorage && (
                            <Links href="/auth/login" className="whitespace-nowrap flex justify-center p-1 m-1 text-base font-medium text-white duration-300 hover:text-sky-500">
                                <LoginIcon width={30} height={30} />
                                <div className="absolute pl-0 mt-0 font-bold opacity-0 hover:animate-bounce hover:opacity-100 hover:pl-44">
                                    <H2 className="bg-white py-1 px-2 rounded-lg">Login</H2>
                                </div>
                            </Links>
                        )}

                        {userDetailsFromLocalStorage && (
                            <Links href="#logged-out" onClick={() => {
                                localStorage.setItem('user-details', "");
                                setUserDetailsFromLocalStorage('')
                            }} className="whitespace-nowrap flex justify-center p-1 m-1 text-base font-medium text-white duration-300 hover:text-sky-500">
                                <LogoutIcon width={30} height={30} />
                                <div className="absolute pl-0 mt-0 font-bold opacity-0 hover:animate-bounce hover:opacity-100 hover:pl-52">
                                    <H2 className="bg-white py-1 px-2 rounded-lg">Logout</H2>
                                </div>
                            </Links>
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
                            <div className="flex items-center justify-between">
                                <div className="w-12 h-12">
                                    <Image className="rounded-lg" src={require("../../assets/logo.jpg")} />
                                </div>
                                <div className="-mr-2">
                                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">Close menu</span>
                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                    </Popover.Button>
                                </div>
                            </div>
                            <div className="mt-6">
                                <nav className="grid gap-y-8">
                                    {solutions.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                                        >
                                            <item.icon
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
                                    <Links href="#" className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                        Sign up
                                    </Links>
                                    <Links href="#" className="mt-5 flex text-indigo-600 hover:text-indigo-500 justify-center text-center text-base font-medium text-gray-500">
                                        Existing customer?{" "}Login
                                    </Links>
                                </div>
                            )}

                            {userDetailsFromLocalStorage && (
                                <div>
                                    <Links href="#" onClick={() => {
                                        localStorage.setItem('user-details', "");
                                        setUserDetailsFromLocalStorage('')
                                    }} className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
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
