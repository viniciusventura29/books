import type { GetServerSidePropsContext } from "next";
import type { FormEvent } from "react";
import { useState } from "react";
import { api } from "../../../utils/api";
import { Breadcrumb } from "../../../components/global/Breadcrumb";
import { Sidebar } from "../../../components/global/Sidebar";

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const id = ctx.query;

  return { props: { id } };
};

export default function Todo(props: { id: { id: string } }) {
  const util = api.useContext();
  const idBook = props.id.id;

  const [title, setTilte] = useState("");

  const todoList = api.toDo.getAll.useQuery({ bookId: idBook });
  const { mutate } = api.toDo.createToDo.useMutation({
    onSuccess: () => util.toDo.getAll.invalidate(),
  });

  const addTaskLine = (e: FormEvent) => {
    e.preventDefault();
    mutate({
      bookId: idBook,
      title: title,
      check: false,
    });
    setTilte("");
  };

  return (
    <div className="bg-gray-100 transition duration-700 ease-in-out dark:bg-slate-900">
      <Sidebar idBook={idBook} />
      <Breadcrumb idBook={idBook} toolName="Kanban" />
      <div className="mx-auto flex min-h-screen w-auto min-w-[50%] max-w-min justify-center py-10">
        Kanban
      </div>
    </div>
  );
}
