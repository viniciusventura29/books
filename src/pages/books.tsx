import { Key, useState } from "react";
import { RouterOutputs, api } from "../utils/api";
import CreateCollection from "./components/CreateCollection";

const OptionsComponent = ({ id, showOptions }: { id: string, showOptions: boolean }) => {
  const util = api.useContext();
  const deleteBook = api.book.deleteBook.useMutation({
    onSuccess: () => {
      util.book.getAll.invalidate()
    }
  });

  return (
    <div key={id} className={`${showOptions ? '' : "invisible"} absolute bg-gray-200 rounded flex flex-col items-end z-10 top-5 right-0`}>
      <button className="px-4 py-2 text-sm hover:bg-gray-300 hover:rounded-t w-full" onClick={() => {
        deleteBook.mutate({ bookId: id })
      }}>Delete</button>
      <button className="px-4 py-2 text-sm hover:bg-gray-300 hover:rounded-b w-full">Edit</button>
    </div>
  );
};

function BookCard({ book }: { book: RouterOutputs['book']['getAll'][number] }) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div key={book.id} className="bg-gray-100 border-900-gray cursor-pointer rounded border-2 p-5">
      <div className="flex justify-between align-top items-start">
        <h2 className="text-2xl font-semibold">{book.name}</h2>
        <div className="relative flex items-center">
          <button onBlur={()=>setShowOptions(false)} onClick={() => setShowOptions(p => !p)} className="text-xs flex justify-end tracking-widest rounded-full px-2 hover:bg-gray-200">●●●</button>
          <OptionsComponent id={book.id} showOptions={showOptions} />
        </div>
      </div>
      <p className="mt-1">{book.description}</p>
      <p className="mt-4 flex justify-end italic text-gray-400">
        {book.category}
      </p>
    </div>
  )
}

export default function Books() {
  const books = api.book.getAll.useQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-gray-100 py-10 transition duration-700 ease-in-out dark:bg-slate-900">
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

        <div className="grid grid-cols-4 grid-flow-row gap-4 mt-20">
          {books.data?.map((book) => <BookCard key={book.id} book={book} />)}
        </div>
      </div>
    </div>
  );
}
