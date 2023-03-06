import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { api } from "../../utils/api";
import { useAlert } from "../global/Alert";

interface IModalSide {
  openSideModal: boolean;
  setOpenSideModal: Dispatch<SetStateAction<boolean>>;
  editing: boolean;
  bookId: string;
  body?: string;
  title?: string;
  color?: string;
  NoteId: string;
  setEditing: Dispatch<SetStateAction<boolean>>;
}

export const SideModal = (modalSideProps: IModalSide) => {
  const util = api.useContext();
  const trigger = useAlert()

  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    setBody(modalSideProps.body ? modalSideProps.body : "");
    setTitle(modalSideProps.title ? modalSideProps.title : "");
    setColor(modalSideProps.color ? modalSideProps.color : "");
  }, [modalSideProps.body]);

  const createNote = api.notes.createNote.useMutation({
    onSuccess: async () => {
      await util.notes.getAllNotes.invalidate();
      setBody("");
      setTitle("");
      setColor("bg-white");
      modalSideProps.setOpenSideModal(false)
      trigger({text:"Sua nota foi criada sem erros!", title:"Nota criada com sucesso", type:"Success"})
    },
  });

  const updateNote = api.notes.updateNote.useMutation({
    onSuccess: async () => {
      await util.notes.getAllNotes.invalidate();
      setBody("");
      setTitle("");
      modalSideProps.setOpenSideModal(false)
      modalSideProps.setEditing(false)
      trigger({text:"Sua nota foi alterada sem erros!", title:"Nota atualizada com sucesso", type:"Success"})
    },
  });

  const saveNote = () => {
    console.log(modalSideProps.editing)
    if (modalSideProps.editing === true) {
      updateNote.mutate({
        body,
        title,
        noteId: modalSideProps.NoteId,
        color,
      })
    }
    else {
      console.log(color)
      createNote.mutate({
        bookId: modalSideProps.bookId,
        title: title,
        body: body,
        color: color ? color : "bg-white",
      });
    }
  };

  return (
    <div
      className={`${modalSideProps.openSideModal
          ? "visible opacity-100 "
          : "invisible opacity-0"
        } fixed bg-white right-0 w-1/4 transition-all py-10 p-6 min-h-screen duration-300`}
    >
        <div
          className="mb-12 flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-red-500 p-2 text-white hover:bg-red-600"
          onClick={() => { modalSideProps.setOpenSideModal(false); modalSideProps.setEditing(false) }}
        >
          X
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="mb-2 text-2xl font-bold">Create Note</h2>
          <input
            value={title}
            className="rounded border p-2"
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="resize-none rounded border p-2"
            placeholder="Write the body here..."
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
          <span className="flex items-center gap-2">
            Color selection:
            <button
              onClick={() => setColor("bg-yellow-50")}
              className="mt-[2px] h-4 w-4 rounded-full border-[1px] border-gray-700 bg-yellow-100"
            ></button>
            <button
              onClick={() => setColor("bg-red-50")}
              className="mt-[2px] h-4 w-4 rounded-full border-[1px] border-gray-700 bg-red-100"
            ></button>
            <button
              onClick={() => setColor("bg-green-50")}
              className="mt-[2px] h-4 w-4 rounded-full border-[1px] border-gray-700 bg-green-100"
            ></button>
            <button
              onClick={() => setColor("bg-purple-50")}
              className="mt-[2px] h-4 w-4 rounded-full border-[1px] border-gray-700 bg-purple-100"
            ></button>
            <button
              onClick={() => setColor("bg-white")}
              className="mt-[2px] h-4 w-4 rounded-full border-[1px] border-gray-700 bg-white"
            ></button>
          </span>
          <button
            onClick={saveNote}
            className="mt-1 rounded bg-green-600 py-1 text-white hover:bg-green-700"
          >
            Save
          </button>
      </div>
    </div>
  );
};
