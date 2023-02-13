import { Key, useState } from "react";
import { RouterOutputs, api } from "../utils/api";
import CreateCollection from "./components/CreateCollection";
import Link from "next/link";
import { ProfileButton } from "./components/ProfileButton";
import { Sidebar } from "./components/Sidebar";
import { BookCard } from "./components/BookCard";

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
            className="mt-2 rounded bg-green-600 px-5 py-2 text-white"
          >
            + New colection
          </button>
        </div>
        <div>
          <CreateCollection isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </div>

        <div className="mt-20 grid grid-flow-row grid-cols-4 gap-4">
          {books.data?.map((book:any) => (
            <Link key={book.id} href={`/books/${book.id}`}>
              <BookCard book={book} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
