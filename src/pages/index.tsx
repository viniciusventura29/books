import { useState } from "react";
import { AddItemModal } from "./components/AddItemModal";

import { api } from "../utils/api";

interface modalProps{
    state: boolean
}

function Home ({state}: modalProps) {
  const [modalOpen, setModalOpen]= useState(false)
  const books = api.book.getAll.useQuery();

  return (
    <>
      <div className="h-screen bg-slate-100">
        <button className="rounded bg-slate-300 p-2" onClick={()=>setModalOpen(!modalOpen)}>
          Add item +
        </button>
        <div>
          {JSON.stringify(books.data)}
        </div>
        {modalOpen ? <AddItemModal /> : null}
      </div>
    </>
  );
};

export default Home;
