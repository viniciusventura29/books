import type { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { api } from "../../../utils/api";
import { Breadcrumb } from "../../components/Breadcrumb";
import { Sidebar } from "../../components/Sidebar";

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const id = ctx.query;

  return { props: { id } };
};

export default function TasksBooks(props: { id: { id: string } }) {
  const idBook = props.id.id;

  return (
    <div className="flex flex-col gap-5">
      <Breadcrumb idBook={idBook} toolName=""/>      

      <Sidebar idBook={idBook} />
    </div>
  );
}
