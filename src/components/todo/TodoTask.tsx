import { GetServerSidePropsContext } from "next";
import { api } from "../../utils/api";

interface ITodoTask {
    taskId:string;
    bookId: string;
    TaskCheck: boolean
    title:string
  }

export const ToDoTask = (toDo: ITodoTask) => {
    const util = api.useContext();
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
          <div
            className={`flex gap-4 text-justify `}
            key={toDo.taskId}
          >
            <input
              type="checkbox"
              id={toDo.taskId}
              onChange={() => checkboxUpdate(toDo.taskId, !toDo.TaskCheck)}
              defaultChecked={toDo.TaskCheck}
              className={`accent-green-700 ${toDo.TaskCheck ? "opacity-50" : ""}`}
            />
            <label className={`w-full select-none ${toDo.TaskCheck ? "text-gray-400 line-through" : "text-black"}`} htmlFor={toDo.taskId}>
              {toDo.title}
            </label>
            <button
              onClick={() => deleteTask(toDo.taskId)}
              className="ml-5 flex h-7 cursor-pointer rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600"
            >
              X
            </button>
          </div>
      </div>
    );
  };