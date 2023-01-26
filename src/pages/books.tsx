import { useState } from "react";
import { api } from "../utils/api"
import CreateCollection from "./components/CreateCollection";

export default function Books(){
    const books = api.book.getAll.useQuery();
    const [modal, setModal] = useState(false)

    const modalComponent = () =>{
      if(modal === true){
      return(
      <CreateCollection />
      )}
      return null
    }

    return(
        <div className="transition duration-700 ease-in-out min-h-screen bg-gray-100 dark:bg-slate-900 w-auto min-w-[75%] max-w-min mx-auto">
          <h2 className="text-3xl font-semibold my-10">Colections</h2>
          <button onClick={()=>setModal(true)} className="bg-green-600 px-5 py-2 text-white rounded-sm">+ New colection</button>
          <div>{modalComponent()}</div>
            
            <div className="grid grid-cols-4 grid-flow-col gap-4 mt-20">
            {books.data?.map((book)=>(
              <div className="border-2 border-500-gray rounded p-5">
              <h2 className="text-2xl font-semibold">{book.name}</h2>
              <p className="mt-1">{book.description}</p>
              <p className="mt-4 text-gray-400 italic flex justify-end">{book.category}</p>
              </div>
            ))}
            </div>
        </div>
    )
}