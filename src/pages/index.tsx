import { IconPencil } from "@tabler/icons-react";
import type { GetServerSidePropsContext} from "next";
import { type NextPage } from "next";
import Head from "next/head";
import { Footer } from "../components/global/Footer";
import { Navbar } from "../components/global/Navbar";
import { getServerAuthSession } from "../server/auth";
import Link from "next/link";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);

  return {
    props: {
      session,
    },
  };
}

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>The Books</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex min-h-screen flex-col bg-gray-100 bg-gradient-to-br from-gray-100 to-slate-200">
        <div className="flex h-screen w-full flex-col items-center justify-center">
          <img className="absolute z-0 h-full opacity-30" src="./bg-2.svg" />
          <div className="z-30 flex flex-col">
            <span className="mb-2 text-xl">Welcome to</span>
            <div className="flex items-center">
              <h1 className="text-6xl font-bold">The Books</h1>
              <h1 className="absolute text-[8rem] text-purple-900 font-bold opacity-10">
                The Books
              </h1>
            </div>
            <span className="mt-8 text-3xl">
              This is a website developed to help you with your self tasks.
            </span>
          </div>
          <Link href='/books' className="z-30 mt-20 flex items-center gap-2 rounded bg-purple-600 hover:shadow-lg hover:shadow-purple-500 hover:bg-purple-700 transition-all duration-200 px-4 py-2 text-white">
            Get started
            <IconPencil size={18} />
          </Link>
        </div>
        <div className="flex flex-col md:px-72 px-96 md:gap-20 gap-28">
          <div className="bg-gray-300 rounded-lg w-full md:h-44 h-52"></div>
          <div className="bg-gray-300 rounded-lg w-full md:h-44 h-52"></div>
          <div className="bg-gray-300 rounded-lg w-full md:h-44 h-52"></div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Home;
