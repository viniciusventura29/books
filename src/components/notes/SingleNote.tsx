import { IconPencil, IconTrash } from "@tabler/icons-react";
import { Dispatch, SetStateAction, useState } from "react";
import { api } from "../../utils/api";

interface INote {
    id: string;
    title: string;
    body: string;
    updatedAt: string;
    color: string;
    idBook: string;
    modalSideSetOpen:  Dispatch<SetStateAction<boolean>>;
  }

export const SingleNote = (note: INote) => {
    const [openSideModal,setOpenSideModal] = useState(false)

    const util = api.useContext();
  
    const deleteNote = api.notes.deleteNote.useMutation({onSuccess: ()=>{
      void util.notes.getAllNotes.invalidate()
    }})
  
    return (
      <div
        className={`mb-6 flex h-64 w-full flex-col justify-between rounded-lg border shadow-lg bg-${note.color} py-5 px-4 dark:border-gray-700 dark:bg-gray-800`}
      >
        <div className="h-full">
          <h4 className="mb-3 font-bold text-gray-800 dark:text-gray-100">
            {note.title}
          </h4>
          <textarea readOnly={true} value={note.body} className="focus:outline-none resize-none text-sm text-gray-800 dark:text-gray-100 w-full h-full bg-transparent" />
        </div>
        <div>
          <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
            <p className="text-sm">{note.updatedAt}</p>
            <div className="flex gap-2">
              <button
              onClick={()=>deleteNote.mutate({id:note.id})}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 dark:bg-gray-100  dark:text-gray-800"
                aria-label="edit note"
                role="button"
              >
                <IconTrash size={20} />
              </button>
              <button
                onClick={()=>{note.modalSideSetOpen(true)}}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-gray-100  dark:text-gray-800"
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