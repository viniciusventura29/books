import { useSession } from "next-auth/react";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import { useState } from "react";
import { api } from "../../utils/api";

export interface ICreateCollectionProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function CreateCollection({ setIsOpen, isOpen }: ICreateCollectionProps) {
  const utils = api.useContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const { mutate } = api.book.createBook.useMutation({
    onSuccess() {
      utils.book.getAll.invalidate();
    }
  });

  const { data: sessionData } = useSession();

  const createBook = (e: FormEvent) => {
    console.log(sessionData);
    console.log(sessionData?.user?.id);
    e.preventDefault();
    mutate({
      name,
      description,
      category,
    });
    setName('')
    setDescription('')
    setCategory('')
  };

  return (
    <div className={`${isOpen ? 'visible' : 'invisible'} mt-2 w-2/3 items-stretch rounded bg-slate-200 p-5`}>
      <form
        onSubmit={createBook}
        className="space-x-3"
      >
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          type="text"
          placeholder="title"
          className="rounded border-2 border-gray-600 p-2 transition duration-700 ease-in-out dark:bg-slate-800 dark:text-gray-200"
        />
        <input
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
          type="text"
          placeholder="description"
          className="rounded border-2 border-gray-600 p-2 transition duration-700 ease-in-out dark:bg-slate-800 dark:text-gray-200"
        />
        <input
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          value={category}
          type="text"
          placeholder="category"
          className="rounded border-2 border-gray-600 p-2 transition duration-700 ease-in-out dark:bg-slate-800 dark:text-gray-200"
        />
        <button
          type="submit"
          className="rounded bg-blue-500 p-2 px-10 text-white hover:bg-blue-600"
        >
          Add +
        </button>
        <button type="button" onClick={() => setIsOpen(false)} className="h-10 border-2 rounded border-red-500 p-1 px-10 text-red-600 hover:bg-red-100">Cancel</button>
      </form>
    </div>
  );
}
