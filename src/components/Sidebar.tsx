import { IconListCheck, IconNote } from "@tabler/icons-react"
import Link from "next/link"
import { api } from "../utils/api";

export const Sidebar = (idBook:{ idBook: string; }) =>{
   const bookName = api.book.getOne.useQuery({bookId:idBook.idBook})
    return(
        <>
        
<button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span className="sr-only">Open sidebar</span>
   <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>

<aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 shadow" aria-label="Sidebar">
   <div className="h-full px-3 py-4 overflow-y-auto bg-slate-50 dark:bg-gray-800">
      <h2 className="text-3xl py-4">{bookName.data?.name}</h2>
      <ul className="space-y-2">
         <li>
            <Link href={{pathname: '/books/[id]/todo', query: {id: idBook.idBook}}} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-gray-700">
               <IconListCheck />
               <span className="ml-3">To Do</span>
            </Link>
         </li>
         <li>
            <Link href={{pathname: '/books/[id]/notes', query: {id: idBook.idBook}}} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-gray-700">
               <IconNote />
               <span className="ml-3">Notes</span>
            </Link>
         </li>
      
      </ul>
   </div>
</aside>
        </>
    )
}