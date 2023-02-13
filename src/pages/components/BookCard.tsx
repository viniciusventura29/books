import { useState } from "react";
import { api } from "../../utils/api";
import { RouterOutputs } from "../api/trpc/[trpc]";

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


export function BookCard({ book }: { book: RouterOutputs["book"]["getAll"][number] }) {
    const [showOptions, setShowOptions] = useState(false);
  
    return (
      <div
        key={book.id}
        className="border-900-gray cursor-pointer rounded bg-gray-50 shadow p-5"
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