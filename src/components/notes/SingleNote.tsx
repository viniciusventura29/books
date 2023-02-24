import { IconPencil } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";
import { api } from "../../utils/api";
import { IconX } from "@tabler/icons-react";

interface INote {
  id: string;
  title: string;
  body: string;
  updatedAt: string;
  color: string;
  idBook: string;
  setEditing: Dispatch<SetStateAction<boolean>>;
  modalSideSetOpen: Dispatch<SetStateAction<boolean>>;
  setBody: Dispatch<SetStateAction<string>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setColor: Dispatch<SetStateAction<string>>;
  setNoteId: Dispatch<SetStateAction<string>>;
}

export const SingleNote = (note: INote) => {
  const util = api.useContext();

  const deleteNote = api.notes.deleteNote.useMutation({
    onSuccess: () => {
      void util.notes.getAllNotes.invalidate();
    },
  });

  return (
    <div
      className={`relative mb-6 flex h-64 w-full flex-col justify-between rounded-lg border shadow-lg bg-${note.color} py-5 px-4 dark:border-gray-700 dark:bg-gray-800`}
    >
      <div className="h-full">
        <h4 className="mb-3 font-bold text-gray-800 dark:text-gray-100">
          {note.title}
        </h4>
        <textarea
          readOnly={true}
          value={note.body}
          className="h-full w-full resize-none bg-transparent text-sm text-gray-800 focus:outline-none dark:text-gray-100"
        />
      </div>
      <div>
        <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
          <p className="text-sm">{note.updatedAt}</p>
          <div className="flex gap-2">
            <button
              onClick={() => deleteNote.mutate({ id: note.id })}
              className="top-4 absolute flex h-8 w-8 items-center justify-center rounded-full hover:bg-red-200  text-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 dark:bg-gray-100  dark:text-gray-800"
              aria-label="edit note"
              role="button"
            >
              <IconX size={20} />
            </button>
            <button
              onClick={() => {
                note.modalSideSetOpen(true);
                note.setBody(note.body);
                note.setTitle(note.title);
                note.setColor(note.color);
                note.setNoteId(note.id);
                note.setEditing(true)
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 hover:bg-gray-800 transition-all duration-200 text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-gray-100  dark:text-gray-800"
              aria-label="edit note"
              role="button"
            >
              <IconPencil size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
