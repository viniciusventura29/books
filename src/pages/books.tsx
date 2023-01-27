import { useState } from "react";
import { api } from "../utils/api";
import CreateCollection from "./components/CreateCollection";

export default function Books() {
  const books = api.book.getAll.useQuery();
  const [modal, setModal] = useState(false);

  const modalComponent = () => {
    if (modal === true) {
      return <CreateCollection props={setModal} />;
    }
    return null;
  };

  return (
    <div className="bg-gray-100 py-10 transition duration-700 ease-in-out dark:bg-slate-900">
      <div className="mx-auto min-h-screen w-auto min-w-[75%] max-w-min">
        <h2 className="text-3xl font-semibold">Colections</h2>
        <button
          onClick={() => setModal(true)}
          className="mt-2 rounded bg-green-600 px-5 py-2 text-white"
        >
          + New colection
        </button>
        <div>{modalComponent()}</div>

        <div className="mt-20 grid grid-flow-col grid-cols-4 gap-4">
          {books.data?.map((book) => (
            <div key={book.id} className="border-500-gray rounded border-2 p-5">
              <h2 className="text-2xl font-semibold">{book.name}</h2>
              <p className="mt-1">{book.description}</p>
              <p className="mt-4 flex justify-end italic text-gray-400">
                {book.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
