import type { GetServerSidePropsContext } from "next";
import type { FormEvent } from "react";
import { useState } from "react";
import { api } from "../../../utils/api";
import { Breadcrumb } from "../../../components/global/Breadcrumb";
import { Sidebar } from "../../../components/global/Sidebar";
import { ToDoTask } from "../../../components/todo/TodoTask";

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const id = ctx.query;

  return { props: { id } };
};

export default function Todo(props: { id: { id: string } }) {
  const util = api.useContext();
  const idBook = props.id.id;

  const [title, setTilte] = useState("");

  const todoList = api.toDo.getAll.useQuery({ bookId: idBook });
  const { mutate } = api.toDo.createToDo.useMutation({
    onSuccess: () => util.toDo.getAll.invalidate(),
  });

  const addTaskLine = (e: FormEvent) => {
    e.preventDefault();
    mutate({
      bookId: idBook,
      title: title,
      check: false,
    });
    setTilte("");
  };

  return (
    <div className="bg-gray-100 transition duration-700 ease-in-out dark:bg-slate-900">
      <Sidebar idBook={idBook} />
      <Breadcrumb idBook={idBook} toolName="Notes" />
      <div className="mx-auto flex min-h-screen w-auto min-w-[50%] max-w-min justify-center py-10">
        <div id="ToDo" className="w-[40rem]">
          <h2 className="mb-10 text-3xl font-semibold ">To Do</h2>
          <div className="flex flex-col gap-4">
            {todoList.data?.map((todo) => (
              <ToDoTask
                TaskCheck={todo.check}
                taskId={todo.id}
                title={todo.title}
                key={todo.id}
                bookId={todo.bookId}
              />
            ))}
          </div>
          <form onSubmit={addTaskLine}>
            <input
              type="text"
              placeholder="Write your task here..."
              className=" mt-5 w-full rounded border-2 border-gray-700 bg-gray-100 px-2 py-2 text-left"
              onChange={(e) => setTilte(e.target.value)}
              value={title}
            />
            <button className="mt-10 flex rounded bg-green-600 px-5 py-1 text-xs text-white transition-all hover:bg-green-500">
              Add task +
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
