import { useSession } from "next-auth/react"
import { FormEvent, useState } from "react"
import { api } from "../utils/api"

interface IBook{
  name: string;
  description: string;
  category: string;
  userId: string
}

export default function Books(){
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const {mutate} = api.book.createBook.useMutation();
    const {data: sessionData} = useSession()
    const books = api.book.getAll.useQuery();

    const createBook =(e: FormEvent)=>{
        console.log(sessionData)
        console.log(sessionData?.user?.id)
        e.preventDefault()
        // mutate({
        //     name,
        //     description,
        //     category,
        //     userId: "cldd0c35t0000nv5cpek1xee9",
        // })
      }

    return(
        <div className="transition duration-700 ease-in-out min-h-screen bg-gray-100 dark:bg-slate-900">
            <form onSubmit={createBook} className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch">
            <input onChange={(e)=>{setName(e.target.value)}} value={name} type="text" placeholder="title" className="transition duration-700 ease-in-out border-2 rounded p-2 border-gray-600 dark:text-gray-200 dark:bg-slate-800" />
            <input onChange={(e)=>{setDescription(e.target.value)}} value={description} type="text" placeholder="description" className="transition duration-700 ease-in-out border-2 rounded p-2 border-gray-600 dark:text-gray-200 dark:bg-slate-800" />
            <input onChange={(e)=>{setCategory(e.target.value)}} value={category} type="text" placeholder="category" className="transition duration-700 ease-in-out border-2 rounded p-2 border-gray-600 dark:text-gray-200 dark:bg-slate-800" />
            <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 duration-500 text-white rounded p-1"
          >
            Add +
          </button>
            </form>
            <div className="grid grid-cols-4 grid-flow-col gap-4">
            {books.data?.map((book)=>(
              <div className="border-2 border-500-gray rounded p-5"><h2 className="text-2xl font-semibold">{book.name}</h2>
              <p className="mt-1">{book.description}</p>
              <p className="mt-4 text-gray-400 italic flex justify-end">{book.category}</p>
              </div>
            ))}
            </div>
        </div>
    )
}