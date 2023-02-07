import type { GetServerSidePropsContext } from "next";
import type { Dispatch, FormEvent, SetStateAction} from "react";
import { useState } from "react";
import { api } from "../../utils/api";

interface propsToDoTask {
  id: {id: {id:string}};
	setCheck:Dispatch<SetStateAction<boolean>>;
	check: boolean
}

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const id = ctx.query;

  return { props: { id } };
};

const ToDoTask = ({id, setCheck, check}:propsToDoTask) => {
  const toDoList = api.toDo.getAll.useQuery(id.id);
  return (
    <div className="flex flex-col gap-5">
      {toDoList.data?.map((task) => (
        <div className="flex gap-2" key={task.id}>
          <input type="checkbox" name="" id="" onInput={()=>setCheck(!check)} />
          {task.title}
        </div>
      ))}
    </div>
  );
};

export default function TasksBooks(props: { id: {id: string} }) {
  const util = api.useContext();
  const { mutate } = api.toDo.createToDo.useMutation({
    onSuccess: () => util.toDo.getAll.invalidate(),
  });

  const idBook = props.id.id;
  const [title, setTilte] = useState("");
  const [check, setCheck] = useState(false);

  const addTaskLine = (e: FormEvent) => {
    e.preventDefault();
    mutate({
      bookId: idBook,
      title: title,
      check: check,
    });
		setTilte('')
  };

  return (
    <div className="bg-gray-100 py-10 transition duration-700 ease-in-out dark:bg-slate-900">
      <div className="mx-auto min-h-screen w-auto min-w-[75%] max-w-min">
        <h2 className="mb-10 text-3xl font-semibold">To Do</h2>
        <ToDoTask check={check} setCheck={setCheck} id={props} />
        <form onSubmit={addTaskLine}>
          <input
            type="text"
            placeholder="Write your task here..."
            className=" mt-5 w-1/3 rounded px-4 py-2 text-left"
            onChange={(e) => setTilte(e.target.value)}
						value={title}
          />
          <button className="mt-10 flex rounded bg-green-600 px-5 py-1 text-xs text-white transition-all hover:bg-green-500">
            Add task +
          </button>
        </form>
      </div>
    </div>
  );
}
