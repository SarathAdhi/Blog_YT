import clsx from "clsx";
import Head from "next/head";
import React from "react";
import { SideNavbar } from "../components/Navbar/SideNavbar";
import { TopNavbar } from "../components/Navbar/TopNavbar";

const Layout = ({ title, children, className, navbar = true }) => {
  return (
    <>
      <Head children={null}>
        <title>{title}</title>
      </Head>
      <main className="flex">
        {navbar && <SideNavbar />}
        <div className="w-full h-screen bg-black text-white overflow-x-auto">
          <TopNavbar title={title} />
          <div
            className={clsx(
              "w-full py-5 flex flex-col items-center",
              className
            )}
          >
            {children}
          </div>
        </div>
      </main>
    </>
  );
};
export default Layout;
