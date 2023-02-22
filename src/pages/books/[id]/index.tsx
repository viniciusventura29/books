import type { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { api } from "../../../utils/api";
import { Breadcrumb } from "../../../components/global/Breadcrumb";
import { Sidebar } from "../../../components/global/Sidebar";
import { IconChevronRight } from "@tabler/icons-react";

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const id = ctx.query;

  return { props: { id } };
};

export default function TasksBooks(props: { id: { id: string } }) {
  const idBook = props.id.id;
  const notesList = api.notes.getAllNotes.useQuery({ bookId: idBook });

  return (
    <div className="flex flex-col bg-gray-100 transition duration-700 ease-in-out dark:bg-slate-900">
      <Breadcrumb idBook={idBook} toolName=""/>      
      
        <div className="mx-auto flex min-h-screen w-auto min-w-[70%] max-w-min flex-col py-10">
          <div  className="mt-20 grid grid-flow-row grid-cols-4 gap-4 relative h-64">
            {notesList.data?.slice(0,4).map((note)=>(
              <div
              className={`mb-6 flex h-full w-full flex-col justify-between rounded-lg border shadow-lg bg-${note.color} py-5 px-4 dark:border-gray-700 dark:bg-gray-800`}
            >
              <div className="h-full">
                <h4 className="mb-3 font-bold text-gray-800 dark:text-gray-100">
                  {note.title}
                </h4>
                <textarea readOnly={true} value={note.body} className="focus:outline-none resize-none text-sm text-gray-800 dark:text-gray-100 w-full h-full bg-transparent" />
              </div>
              <div>
                <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
                  <p className="text-sm">{note.updatedAt.toLocaleDateString()}</p>
                  <div className="flex gap-2">
                  </div>
                </div>
              </div>
            </div>
            ))} 
            <Link className="absolute -right-20 h-full flex items-center" href={{pathname:'/books/[id]/notes', query: {id: idBook}}}><IconChevronRight size={52}/></Link>
          </div>
        </div>

      <Sidebar idBook={idBook} />
    </div>
  );
}
