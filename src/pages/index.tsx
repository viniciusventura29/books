import { type NextPage } from "next";
import { useState } from "react";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const [modalOpen, setModalOpen]= useState(false)
  const [name, setName]= useState('')
  const [category, setCategory]= useState('')
  const [description, setDescription]= useState('')

  function save(){
    const book = api.book.createBook.useQuery({
      name: name,
      author: "oi",
      category: category,
      description: description,
    });
  }

  const AddItem: any =()=>{
    if (modalOpen === true){
    return <div className="absolute z-50 bg-slate-500 p-5 flex flex-col gap-2 w-96 h-96">
      <input className="rounded h-7" type="text" onChange={(e)=>setName(e)} />
      <input className="rounded h-7" type="text" onChange={(e)=>setCategory(e)} />
      <input className="rounded h-7" type="text" value={description} onChange={(e)=>setDescription(e)} />
      <button className="p-2 bg-slate-400 rounded-md mt-5" onClick={save}>save</button>
    </div>;
    }
    else{
      null
    }
  }

  return (
    <>
      <div className="h-screen bg-slate-100">
        <button className="rounded bg-slate-300 p-2" onClick={()=>setModalOpen(!modalOpen)}>
          Add item +
        </button>
        <AddItem />
      </div>
    </>
  );
};

export default Home;
