import { boolean } from "zod";
import { useState } from "react";
import { api } from "../../utils/api";

export function AddItemModal() {
  const util = api.useContext();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const { mutate } = api.book.createBook.useMutation({
    onSuccess: () => {
      util.book.getAll.invalidate();
    }
  });

  const save = () => {
    mutate({
      name,
      category,
      description,
      author:"asd",
    })
  }
  
  return (
    <div className="absolute z-50 flex h-96 w-96 flex-col gap-2 bg-slate-500 p-5">
      <input
        className="h-7 rounded"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="h-7 rounded"
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        className="h-7 rounded"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="mt-5 rounded-md bg-slate-400 p-2" onClick={save}>
        save
      </button>
    </div>
  );
}
