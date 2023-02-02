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

const ToDoTask = ({id}:any) => {
    console.log(id.id)
    const toDoList = api.toDo.getAll.useQuery(id)
    console.log(toDoList.data)
    return (
        <div className="flex gap-5 mt-10">
            <input type="checkbox" name="" id="" />
            <input className="bg-gray-100 py-2 pr-20 focus:outline-none" type="text" placeholder="Escreva sua tarefa aqui..." />
        </div>
    )
}

export default function TasksBooks(props: propsId) {
    return (
        <div className="bg-gray-100 py-10 transition duration-700 ease-in-out dark:bg-slate-900">
            <div className="mx-auto min-h-screen w-auto min-w-[75%] max-w-min">
                <h2 className="text-3xl font-semibold">To Do</h2>
                <ToDoTask id={props.id} />
            </div>
        </div>
    )
}