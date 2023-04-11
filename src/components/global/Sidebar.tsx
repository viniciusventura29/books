import { IconBrandTrello, IconChevronLeft, IconListCheck, IconNote, IconNotebook } from "@tabler/icons-react";
import Link from "next/link";
import { api } from "../../utils/api";

export const Sidebar = (idBook: { idBook: string }) => {
  const bookName = api.book.getOne.useQuery({ bookId: idBook.idBook });
  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="mt-2 ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="h-6 w-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 h-screen 2xl:w-64 w-48 -translate-x-full shadow transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-slate-50 dark:bg-gray-800">
          <div className="flex items-center gap-5">
            <div className="hover:bg-gray-200 rounded ml-6 p-1 cursor-pointer" onClick={()=>window.history.back()}>
              <IconChevronLeft />
            </div>
            <Link
              href={{ pathname: "/books/[id]", query: { id: idBook.idBook } }}
              className="mb-2 py-4 xl:text-2xl text-3xl hover:text-purple-900"
            >
              {bookName.data?.name}
            </Link>
          </div>
          <ul className="mt-6 space-y-2">
            <li>
              <Link
                href={{
                  pathname: "/books/[id]/todo",
                  query: { id: idBook.idBook },
                }}
                className="flex items-center rounded-lg py-2 text-base font-normal text-gray-900 hover:bg-slate-100 dark:text-white dark:hover:bg-gray-700 pl-8"
              >
                <IconListCheck />
                <span className="ml-3">To Do</span>
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: "/books/[id]/notes",
                  query: { id: idBook.idBook },
                }}
                className="flex items-center rounded-lg py-2 text-base font-normal text-gray-900 hover:bg-slate-100 dark:text-white dark:hover:bg-gray-700 pl-8"
              >
                <IconNote />
                <span className="ml-3">Notes</span>
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: "/books/[id]/kanban",
                  query: { id: idBook.idBook },
                }}
                className="flex items-center rounded-lg py-2 text-base font-normal text-gray-900 hover:bg-slate-100 dark:text-white dark:hover:bg-gray-700 pl-8"
              >
                <IconBrandTrello />
                <span className="ml-3">Kanban</span>
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: "/books/[id]/text",
                  query: { id: idBook.idBook },
                }}
                className="flex items-center rounded-lg py-2 text-base font-normal text-gray-900 hover:bg-slate-100 dark:text-white dark:hover:bg-gray-700 pl-8"
              >
                <IconNotebook />
                <span className="ml-3">Text</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};
