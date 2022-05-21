import clsx from "clsx";
import Head from "next/head";
import { Divider } from "../components/elements/Divider";
import { H2, H3 } from "../components/elements/Text";
import Navbar from "../components/Navbar";
import { NextPage } from "next";

interface Props {
  title: string;
  className?: string;
  navbar?: boolean;
  children?: string;
}

const Layout: NextPage<Props> = ({
  title,
  children,
  className,
  navbar = true,
}) => {
  return (
    <>
      <Head children={undefined}>
        <title>{title}</title>
      </Head>
      {navbar && <Navbar />}
      <main className="m-0 bg-black text-white pt-16 min-h-screen md:pt-2">
        <Divider className="block md:hidden my-2" />
        <H3 className="text-xl md:text-3xl text-center md:ml-20" children={undefined}>{title}</H3>
        <Divider className="my-2" />
        <div
          className={clsx(
            "flex flex-col justify-center items-center",
            className
          )}
        >
          {children}
        </div>
      </main>
    </>
  );
};
export default Layout;
