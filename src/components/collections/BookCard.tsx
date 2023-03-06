import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { api } from "../../utils/api";
import { RouterOutputs } from "../../pages/api/trpc/[trpc]";
import { useAlert } from "../global/Alert";

const OptionsComponent = ({
  id,
  showOptions,
}: {
  id: string;
  showOptions: boolean;
}) => {
  const util = api.useContext();
  const trigger = useAlert()
  const deleteBook = api.book.deleteBook.useMutation({
    onSuccess: () => {
      void util.book.getAll.invalidate();
      trigger({text:"Sua coleção foi deletada!", title:"coleção deletada com sucesso", type:"Success"})
    },
  });

  return (
    <div
      key={id}
      className={`${
        showOptions ? "" : "invisible"
      } absolute top-5 right-0 z-50 flex flex-col items-end shadow`}
    >
      <button
        className="flex w-full items-center justify-between gap-2 px-4 py-2 text-sm rounded-t bg-red-50 hover:bg-red-100 text-red-700"
        onClick={(ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          deleteBook.mutate({ bookId: id });
        }}
      >
        Delete
        <IconTrash size={18}/>
      </button>
      <button className="flex w-full items-center justify-between gap-2 px-4 py-2 text-sm rounded-b bg-slate-100 hover:bg-blue-100 text-blue-700">
        Edit
        <IconEdit size={18} />
      </button>
    </div>
  );
};

export function BookCard({
  book,
}: {
  book: RouterOutputs["book"]["getAll"][number];
}) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div
      key={book.id}
      className="border-900-gray cursor-pointer rounded bg-gray-50 p-5 shadow hover:shadow-purple-400 hover:shadow-lg transition-all duration-300"
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
