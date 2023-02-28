import type { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { api } from "../../../utils/api";
import { Breadcrumb } from "../../../components/global/Breadcrumb";
import { Sidebar } from "../../../components/global/Sidebar";
import { IconChevronRight } from "@tabler/icons-react";
import { ToDoTask } from "../../../components/todo/TodoTask";

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const id = ctx.query;

  return { props: { id } };
};

export default function TasksBooks(props: { id: { id: string } }) {
  const idBook = props.id.id;
  const notesList = api.notes.getAllNotes.useQuery({ bookId: idBook });
  const todoList = api.toDo.getAll.useQuery({ bookId: idBook });

  return (
    <div className="flex flex-col bg-gray-100 transition duration-700 ease-in-out dark:bg-slate-900">
      <Breadcrumb idBook={idBook} toolName="" />

      <div className="mx-auto flex min-h-screen w-auto 2xl:min-w-[65%] min-w-[55%] max-w-min flex-col gap-20 py-10">
        <section>
          <Link
            href={{ pathname: "/books/[id]/notes", query: { id: idBook } }}
            className="relative mb-5 flex items-center"
          >
            <h2 className="text-2xl ">Your notes</h2>
          </Link>
          <div className="relative grid h-64 grid-flow-row grid-cols-4 gap-4 hover:shadow-purple-500 hover:drop-shadow-lg">
            {notesList.data?.slice(0, 4).map((note) => (
              <div
                key={note.id}
                className={`mb-6 flex h-full w-full flex-col justify-between rounded-lg border shadow-lg ${note.color} py-5 px-4 dark:border-gray-700 dark:bg-gray-800`}
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
                    <p className="text-sm">
                      {note.updatedAt.toLocaleDateString()}
                    </p>
                    <div className="flex gap-2"></div>
                  </div>
                </div>
              </div>
            ))}
            <Link
              className="absolute -right-20 flex h-full items-center"
              href={{ pathname: "/books/[id]/notes", query: { id: idBook } }}
            >
              <IconChevronRight size={52} />
            </Link>
          </div>
        </section>

        <section className="relative h-full">
          <Link
            href={{ pathname: "/books/[id]/todo", query: { id: idBook } }}
            className="relative mb-5 flex items-center"
          >
            <h2 className="text-2xl ">Your To do</h2>
          </Link>
          <div className="flex flex-col gap-2">
            {todoList.data?.map((todo) => (
              <ToDoTask
                TaskCheck={todo.check}
                taskId={todo.id}
                title={todo.title}
                key={todo.id}
                bookId={todo.bookId}
              />
            ))}
            <Link
              className="absolute -right-20 flex h-full items-center"
              href={{ pathname: "/books/[id]/todo", query: { id: idBook } }}
            >
              <IconChevronRight size={52} />
            </Link>
          </div>
        </section>
      </div>

      <Sidebar idBook={idBook} />
    </div>
  );
}
