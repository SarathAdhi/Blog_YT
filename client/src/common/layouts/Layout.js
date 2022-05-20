import clsx from "clsx";
import Head from "next/head";
import { Divider } from "../components/elements/Divider";
import { H2, H3 } from "../components/elements/Text";
import Navbar from "../components/Navbar";

export const Layout = ({ title, children, className, navbar }) => {

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            {(navbar) && <Navbar />}
            <main className="m-0 bg-black text-white pt-16 min-h-screen md:pt-2">
                <Divider className="block md:hidden my-2" />
                <H3 className="text-xl md:text-3xl text-center md:ml-20">{title}</H3>
                <Divider className="my-2" />
                <div className={clsx("flex flex-col justify-center items-center", className)}>
                    {children}
                </div>
            </main>
        </>
    )
}
