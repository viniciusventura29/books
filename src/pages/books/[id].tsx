import type { GetServerSidePropsContext } from "next";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import { useState } from "react";
import { api } from "../../utils/api";

interface propsToDoTask {
  id: string;
}

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const id = ctx.query;

  return { props: { id } };
};

const ToDoTask = ({ id }: propsToDoTask) => {
  const util = api.useContext();
  const toDoList = api.toDo.getAll.useQuery({ id });
  const updateCheck = api.toDo.updateCheck.useMutation({
    onSuccess: () => {
      util.toDo.getAll.invalidate();
    },
  });

  const deleteTaskMutation = api.toDo.deleteTask.useMutation({
    onSuccess: () => {
      util.toDo.getAll.invalidate();
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

export default function TasksBooks(props: { id: { id: string } }) {
  const idBook = props.id.id;
  const util = api.useContext();
  const { mutate } = api.toDo.createToDo.useMutation({
    onSuccess: () => util.toDo.getAll.invalidate(),
  });

  const [title, setTilte] = useState("");

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
    <div className="bg-gray-100 py-10 transition duration-700 ease-in-out dark:bg-slate-900">
      <div className="flex justify-between mx-auto min-h-screen w-auto min-w-[75%] max-w-min">
        <div id="ToDo" className="w-[40rem]">
          <h2 className="mb-10 text-3xl font-semibold">To Do</h2>
          <ToDoTask id={idBook} />
          <form onSubmit={addTaskLine}>
            <input
              type="text"
              placeholder="Write your task here..."
              className=" mt-5 w-full rounded bg-gray-100 px-2 py-2 text-left border-2 border-gray-700"
              onChange={(e) => setTilte(e.target.value)}
              value={title}
            />
            <button className="mt-10 flex rounded bg-green-600 px-5 py-1 text-xs text-white transition-all hover:bg-green-500">
              Add task +
            </button>
          </form>
        </div>

        <div id="Notes">
          <h2 className="mb-10 text-3xl font-semibold">Notes</h2>
          <div>
            <textarea className="border-2 border-gray-700 rounded resize-none w-[40rem] h-[40rem]" name="" id=""></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
