import { Key, useState } from "react";
import { RouterOutputs, api } from "../utils/api";
import CreateCollection from "./components/CreateCollection";
import Link from "next/link";
import { ProfileButton } from "./components/ProfileButton";

const OptionsComponent = ({
  id,
  showOptions,
}: {
  id: string;
  showOptions: boolean;
}) => {
  const util = api.useContext();
  const deleteBook = api.book.deleteBook.useMutation({
    onSuccess: () => {
      void util.book.getAll.invalidate();
    },
  });

  return (
    <div
      key={id}
      className={`${
        showOptions ? "" : "invisible"
      } absolute top-5 right-0 z-50 flex flex-col items-end rounded bg-gray-200`}
    >
      <button
        className="w-full px-4 py-2 text-sm hover:rounded-t hover:bg-gray-300"
        onClick={(ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          deleteBook.mutate({ bookId: id });
        }}
      >
        Delete
      </button>
      <button className="w-full px-4 py-2 text-sm hover:rounded-b hover:bg-gray-300">
        Edit
      </button>
    </div>
  );
};

function BookCard({ book }: { book: RouterOutputs["book"]["getAll"][number] }) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div
      key={book.id}
      className="border-900-gray cursor-pointer rounded border-2 bg-gray-100 p-5"
    >
      <div className="flex items-start justify-between align-top">
        <h2 className="text-2xl font-semibold">{book.name}</h2>
        <div className="relative flex items-center">
          <button
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setShowOptions((p) => !p);
            }}
            className="flex justify-end rounded-full px-2 text-xs tracking-widest hover:bg-gray-200"
          >
            ●●●
          </button>
          <OptionsComponent id={book.id} showOptions={showOptions} />
        </div>
      </div>
      <p className="mt-1">{book.description}</p>
      <p className="mt-4 flex justify-end italic text-gray-400">
        {book.category}
      </p>
    </div>
  );
}

export default function Books() {
  const books = api.book.getAll.useQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-gray-100 py-10 transition duration-700 ease-in-out dark:bg-slate-900">
      <ProfileButton />
      <div className="mx-auto min-h-screen w-auto min-w-[75%] max-w-min">
        <h2 className="text-3xl font-semibold">Colections</h2>
        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="mt-2 rounded bg-green-600 px-5 py-2 text-white"
        >
          + New colection
        </button>
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
    </div>
  );
}
