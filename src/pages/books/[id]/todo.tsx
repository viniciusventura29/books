import { GetServerSidePropsContext } from "next";
import { FormEvent, useState } from "react";
import { api } from "../../../utils/api";
import { Breadcrumb } from "../../../components/Breadcrumb";

interface propsBookId {
  bookId: string;
}

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const id = ctx.query;

	console.log(id)

  return { props: { id } };
};

const ToDoTask = ({ bookId }: propsBookId) => {
  const util = api.useContext();
  const toDoList = api.toDo.getAll.useQuery({ bookId });
  const updateCheck = api.toDo.updateCheck.useMutation({
    onSuccess: async() => {
      await util.toDo.getAll.invalidate();
    },
  });

  const deleteTaskMutation = api.toDo.deleteTask.useMutation({
    onSuccess: async() => {
      await util.toDo.getAll.invalidate();
    },
  });

  function deleteTask(singleTaskId: string) {
    deleteTaskMutation.mutate({
      taskId: singleTaskId,
    });
  }

  function checkboxUpdate(singleTaskId: string, check: boolean) {
    updateCheck.mutate({
      id: singleTaskId,
      check,
    });
  }

  return (
    <div className="flex flex-col gap-4">
      {toDoList.data?.map((task) => (
        <div
          className={`flex gap-2 text-justify ${
            task.check ? "text-gray-400 line-through" : "text-black"
          }`}
          key={task.id}
        >
          <input
            type="checkbox"
            id={task.id}
            onChange={() => checkboxUpdate(task.id, !task.check)}
            defaultChecked={task.check}
          />
          <label className="w-full select-none" htmlFor={task.id}>
            {task.title}
          </label>
          <button
            onClick={() => deleteTask(task.id)}
            className="ml-5 flex h-7 cursor-pointer rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600"
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default function Todo(props: { id: { id: string } }) {
  const util = api.useContext();
  const idBook = props.id.id;

	const [title, setTilte] = useState("");

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
      <Breadcrumb idBook={idBook} toolName="Notes" />
      <div className="mx-auto flex py-10 justify-center min-h-screen w-auto min-w-[50%] max-w-min">
        <div id="ToDo" className="w-[40rem]">
          <h2 className="mb-10 text-3xl font-semibold">To Do</h2>
          <ToDoTask bookId={idBook} />
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
