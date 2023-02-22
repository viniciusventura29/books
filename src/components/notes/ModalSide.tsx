import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { api } from "../../utils/api";

interface IModalSide {
  openSideModal: boolean;
  setOpenSideModal: Dispatch<SetStateAction<boolean>>;
  bookId: string;
  body?: string;
  title?: string;
  color?: string;
	NoteId: string
}

export const SideModal = (modalSideProps: IModalSide) => {
  const util = api.useContext();

  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    setBody(modalSideProps.body ? modalSideProps.body : "");
    setTitle(modalSideProps.title ? modalSideProps.title : "");
    setColor(modalSideProps.color ? modalSideProps.color : "");
  },[modalSideProps.openSideModal]);

  const createNote = api.notes.createNote.useMutation({
    onSuccess: async () => {
      await util.notes.getAllNotes.invalidate();
      setBody("");
      setTitle("");
      setColor("white");
    },
  });

	const updateNote = api.notes.updateNote.useMutation({
    onSuccess: async () => {
      await util.notes.getAllNotes.invalidate();
      setBody("");
      setTitle("");
      setColor("white");
			modalSideProps.setOpenSideModal(false)
    },
  });

  const saveNote = () => {
    if (body !== ""){
			updateNote.mutate({
				body,
				title,
				noteId: modalSideProps.NoteId,
				color,
			})
		}
		else{
			createNote.mutate({
				bookId: modalSideProps.bookId,
				title: title,
				body: body,
				color: color,
			});
		}
  };

  return (
    <div
      className={`${
        modalSideProps.openSideModal
          ? "visible opacity-100 "
          : "invisible opacity-0"
      } absolute right-0 min-h-screen w-1/4 bg-white p-6 shadow-lg backdrop-brightness-50 transition-all duration-300`}
    >
      <div
        className="mb-12 flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-red-500 p-2 text-white hover:bg-red-600"
        onClick={() => modalSideProps.setOpenSideModal(false)}
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
            onClick={() => setColor("yellow-50")}
            className="mt-[2px] h-4 w-4 rounded-full border-[1px] border-gray-700 bg-yellow-100"
          ></button>
          <button
            onClick={() => setColor("red-50")}
            className="mt-[2px] h-4 w-4 rounded-full border-[1px] border-gray-700 bg-red-100"
          ></button>
          <button
            onClick={() => setColor("green-50")}
            className="mt-[2px] h-4 w-4 rounded-full border-[1px] border-gray-700 bg-green-100"
          ></button>
          <button
            onClick={() => setColor("purple-50")}
            className="mt-[2px] h-4 w-4 rounded-full border-[1px] border-gray-700 bg-purple-100"
          ></button>
          <button
            onClick={() => setColor("white")}
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
