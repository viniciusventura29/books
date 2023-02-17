import { GetServerSidePropsContext } from "next";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { api } from "../../../utils/api";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { IconPencil, IconPlus } from "@tabler/icons-react";

interface INote {
  id: string
  title: string
  body: string
  updatedAt: string
  color: string
}

interface IModalSide{
    openSideModal: boolean
    setOpenSideModal: Dispatch<SetStateAction<boolean>>

}

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const id = ctx.query;

  return { props: { id } };
};

const SingleNote = (note: INote) => {
  return (
    <div className="w-full h-64 flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
      <div>
        <h4 className="text-gray-800 dark:text-gray-100 font-bold mb-3">{note.title}</h4>
        <p className="text-gray-800 dark:text-gray-100 text-sm">{note.body}</p>
      </div>
      <div>
        <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
          <p className="text-sm">{note.updatedAt}</p>
          <button className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-100 dark:text-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black" aria-label="edit note" role="button">
            <IconPencil size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

const SideModal = (modalSideProps: IModalSide) => {
  console.log(modalSideProps.openSideModal)
  return (
    <div className={`${modalSideProps.openSideModal ? 'visible opacity-100 ' : 'invisible opacity-0'} p-6 backdrop-brightness-50 bg-white shadow-lg absolute min-h-screen right-0 w-1/4 transition-all duration-300`}>
      <div className="cursor-pointer bg-red-500 hover:bg-red-600 rounded p-2 flex items-center justify-center w-6 h-6 text-white" onClick={()=>modalSideProps.setOpenSideModal(false)}>X</div>
    </div>
  )
}

export default function Notes(props: { id: { id: string } }) {
  const util = api.useContext();
  const idBook = props.id.id;
  const notesList = api.notes.getAllNotes.useQuery({ bookId: idBook })

  const [body, setBody] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const [openSideModal, setOpenSideModal] = useState(false)
  console.log(openSideModal)

  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown, true)
  }, [])

  api.notes.getOneNote.useQuery(
    {
      bookId: idBook,
    },
    {
      onSuccess: (updatedNote) => {
        if (updatedNote?.body) {
          setBody(updatedNote.body);
        }
      },
    }
  );

  const updateNoteMutation = api.notes.updateNote.useMutation({
    onSuccess: () => util.notes.getOneNote.invalidate(),
  });

  const updateNote = useCallback(() => {
    updateNoteMutation.mutate({
      title: title,
      body: body,
      bookId: idBook,
    });
  }, [title, body, idBook]);

  const detectKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 's' && !e.repeat) {
      e.preventDefault()
      updateNote()
    }
  }

  return (
    <div className="bg-gray-100 transition duration-700 ease-in-out dark:bg-slate-900 flex flex-col">
      <Breadcrumb idBook={idBook} toolName="Notes" />
      <div className="mx-auto flex flex-col py-10 min-h-screen w-auto min-w-[75%] max-w-min">
        <h2 className="mb-10 text-3xl font-semibold">Notes</h2>
        <div className="mt-20 grid grid-flow-row grid-cols-4 gap-4">
          {notesList.data?.map((note) => (
            <SingleNote key={note.id} color="white" title={note.title} updatedAt={note.updatedAt.getDate().toString()} id={note.id} body={note.body} />
          ))}
          <div onClick={() => setOpenSideModal(true)} className="transition-all duration-200 hover:shadow-lg hover:shadow-purple-500 w-full h-64 opacity-70 flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
            <div>
              <h4 className="text-gray-800 dark:text-gray-100 font-bold mb-3">New note title</h4>
              <p className="text-gray-800 dark:text-gray-100 text-sm">New note body</p>
            </div>
            <div>
              <div className="flex items-center justify-between cursor-pointer text-gray-800 dark:text-gray-100">
                <p className="text-sm">New note date</p>
                <button className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-100 dark:text-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black" aria-label="edit note" role="button">
                  <IconPlus size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SideModal openSideModal={openSideModal} setOpenSideModal={setOpenSideModal} />
    </div>
  );
}
