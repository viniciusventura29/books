import type { GetServerSidePropsContext } from "next";
import { useState } from "react";
import { api } from "../../../utils/api";
import { Breadcrumb } from "../../../components/global/Breadcrumb";
import { IconPlus } from "@tabler/icons-react";
import { Sidebar } from "../../../components/global/Sidebar";
import { SideModal } from "../../../components/notes/ModalSide";
import { SingleNote } from "../../../components/notes/SingleNote";

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const id = ctx.query;

  return { props: { id } };
};

export default function Notes(props: { id: { id: string } }) {
  const idBook = props.id.id;
  const notesList = api.notes.getAllNotes.useQuery({ bookId: idBook });

  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [noteId, setNoteId] = useState("");
  const [editing, setEditing] = useState(false);
  const [openSideModal, setOpenSideModal] = useState(false);

  return (
    <div className="flex flex-col bg-gray-100 transition duration-700 ease-in-out dark:bg-slate-900">
      <Sidebar idBook={idBook} />
      <Breadcrumb idBook={idBook} toolName="Notes" />
      <div className="mx-auto flex min-h-screen w-auto 2xl:min-w-[65%] min-w-[55%] max-w-min flex-col gap-20 py-10">
        <h2 className="mb-10 text-3xl font-semibold">Notes</h2>
        <div className="mt-20 grid grid-flow-row grid-cols-4 gap-4">
          {notesList.data?.map((note) => (
            <SingleNote
              modalSideSetOpen={setOpenSideModal}
              setBody={setBody}
              setTitle={setTitle}
              setColor={setColor}
              key={note.id}
              color={note.color}
              title={note.title}
              updatedAt={note.updatedAt.toLocaleDateString()}
              id={note.id}
              body={note.body}
              idBook={note.bookId}
              setNoteId={setNoteId}
              setEditing={setEditing}
            />
          ))}
          <div
            onClick={() => {
              setOpenSideModal(true);
              setBody("");
              setTitle("");
              setColor("");
              setNoteId("");
            }}
            className="mb-6 flex h-64 w-full cursor-pointer flex-col justify-between rounded-lg border bg-white py-5 px-4 opacity-70 shadow-lg transition-all duration-200 hover:shadow-lg hover:shadow-purple-500 dark:border-gray-700 dark:bg-gray-800"
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
        body={body}
        title={title}
        color={color}
        NoteId={noteId}
        editing={editing}
        setEditing={setEditing}
      />
    </div>
  );
}
