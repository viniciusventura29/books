import { useState } from "react";
import { api } from "../utils/api";
import CreateCollection from "../components/collections/CreateCollection";
import Link from "next/link";
import { ProfileButton } from "../components/global/ProfileButton";
import { BookCard } from "../components/collections/BookCard";
import { getServerAuthSession } from "../server/auth";
import type { GetServerSidePropsContext } from "next";
import { IconHome2 } from "@tabler/icons-react";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default function Books() {
  const books = api.book.getAll.useQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-gray-100 py-10 transition duration-700 ease-in-out dark:bg-slate-900">
      <ProfileButton />
      <div className="mx-auto min-h-screen w-auto min-w-[70%] max-w-min">
        <div className="flex items-center gap-10">
          <h2 className="text-3xl font-semibold">Collections</h2>
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="mt-2 rounded bg-green-600 px-5 py-2 text-white">
            + New colection
          </button>
        </div>
        <div>
          <CreateCollection isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </div>

        <div className="mt-20 grid grid-flow-row grid-cols-4 gap-4">
          {books.data?.map((book) => (
            <Link key={book.id} href={`/books/${book.id}`}>
              <BookCard book={book} />
            </Link>
          ))}
        </div>
      </div>
      <Link href='/' className="bg-white hover:shadow-purple-500 hover:shadow-lg shadow-sm shadow-gray-300 w-16 h-16 fixed rounded-full left-16 bottom-16 flex justify-center items-center transition-all duration-300"><IconHome2 size={32} /></Link>
    </div>
  );
}
