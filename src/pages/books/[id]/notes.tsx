import type { GetServerSidePropsContext } from "next";
import type {
  Dispatch,
  SetStateAction} from "react";
import {
  useState,
} from "react";
import { api } from "../../../utils/api";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { IconPencil, IconPlus } from "@tabler/icons-react";

interface INote {
  id: string;
  title: string;
  body: string;
  updatedAt: string;
  color: string;
}

interface IModalSide {
  openSideModal: boolean;
  setOpenSideModal: Dispatch<SetStateAction<boolean>>;
  bookId:string
}

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const id = ctx.query;

  return { props: { id } };
};

const SingleNote = (note: INote) => {
  return (
    <div className="mb-6 flex h-64 w-full flex-col justify-between rounded-lg border border-gray-400 bg-white py-5 px-4 dark:border-gray-700 dark:bg-gray-800">
      <div>
        <h4 className="mb-3 font-bold text-gray-800 dark:text-gray-100">
          {note.title}
        </h4>
        <p className="text-sm text-gray-800 dark:text-gray-100">{note.body}</p>
      </div>
      <div>
        <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
          <p className="text-sm">{note.updatedAt}</p>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-gray-100  dark:text-gray-800"
            aria-label="edit note"
            role="button"
          >
            <IconPencil size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const SideModal = (modalSideProps: IModalSide) => {
  const util = api.useContext()
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");

  const createNote = api.notes.createNote.useMutation({onSuccess: async()=>{
    await util.notes.getAllNotes.invalidate()
    setBody('')
    setTitle('')
  }})

  const saveNote = ()=>{
    createNote.mutate({
      bookId: modalSideProps.bookId,
      title:title,
      body:body
    })
    
  }

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
        <input value={title} className="rounded border p-2" type="text" placeholder="Title" onChange={(e)=>setTitle(e.target.value)} />
        <textarea
          className="resize-none rounded border p-2"
          placeholder="Write the body here..."
          onChange={(e)=>setBody(e.target.value)}
          value={body}
        ></textarea>
        <span className="flex items-center gap-2">
          Color selection:
          <input
            className="h-6 w-6 border-none outline-none"
            type="color"
            name=""
            id=""
          />
        </span>
        <button onClick={saveNote} className="mt-1 rounded bg-green-600 py-1 text-white hover:bg-green-700">
          Save
        </button>
      </div>
    </div>
  );
};

export default function Notes(props: { id: { id: string } }) {
  const idBook = props.id.id;
  const notesList = api.notes.getAllNotes.useQuery({ bookId: idBook });

  const [openSideModal, setOpenSideModal] = useState(false);

  return (
    <div className="flex flex-col bg-gray-100 transition duration-700 ease-in-out dark:bg-slate-900">
      <Breadcrumb idBook={idBook} toolName="Notes" />
      <div className="mx-auto flex min-h-screen w-auto min-w-[75%] max-w-min flex-col py-10">
        <h2 className="mb-10 text-3xl font-semibold">Notes</h2>
        <div className="mt-20 grid grid-flow-row grid-cols-4 gap-4">
          {notesList.data?.map((note) => (
            <SingleNote
              key={note.id}
              color="white"
              title={note.title}
              updatedAt={note.updatedAt.getDate().toString()}
              id={note.id}
              body={note.body}
            />
          ))}
          <div
            onClick={() => setOpenSideModal(true)}
            className="cursor-pointer mb-6 flex h-64 w-full flex-col justify-between rounded-lg border border-gray-400 bg-white py-5 px-4 opacity-70 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500 dark:border-gray-700 dark:bg-gray-800"
          >
            <div>
              <h4 className="mb-3 font-bold text-gray-800 dark:text-gray-100">
                New note title
              </h4>
              <p className="text-sm text-gray-800 dark:text-gray-100">
                New note body
              </p>
            </div>
            <div>
              <div className="flex cursor-pointer items-center justify-between text-gray-800 dark:text-gray-100">
                <p className="text-sm">New note date</p>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-gray-100  dark:text-gray-800"
                  aria-label="edit note"
                  role="button"
                >
                  <IconPlus size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SideModal
        openSideModal={openSideModal}
        setOpenSideModal={setOpenSideModal}
        bookId={idBook}
      />
    </div>
  );
}
