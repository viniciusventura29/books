import { GetServerSidePropsContext } from "next"
import { useState } from "react"
import { api } from "../../utils/api"

interface propsId {
    id: string
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const id = ctx.query

    return { props: { id: id } }
}

const ToDoTask = (props:propsId) => {
    console.log(props.id)
    const toDoList = api.toDo.getAll.useQuery(props.id)
    console.log(toDoList.data)
    return (
        <div className="flex gap-5">
            <input type="checkbox" name="taskCheckbox" id="taskCheckbox" />
            <input className="bg-gray-100 py-2 pr-20 focus:outline-none w-[30rem] tracking-wider" type="text" placeholder="Escreva sua tarefa aqui..." />
        </div>
    )
}

const addTaskLine = () =>{
    console.log("ADD TASK LINE AND SAVE LAST TASK")
}

export default function TasksBooks(props: propsId) {
    return (
        <div className="bg-gray-100 py-10 transition duration-700 ease-in-out dark:bg-slate-900">
            <div className="mx-auto min-h-screen w-auto min-w-[75%] max-w-min">
                <h2 className="text-3xl mb-10 font-semibold">To Do</h2>
                <ToDoTask id={props.id} />
                <button onClick={addTaskLine} className="flex px-5 py-1 mt-10 rounded text-xs bg-green-600 hover:bg-green-500 transition-all text-white">Add task +</button>
            </div>
        </div>
    )
}