import type { GetServerSidePropsContext } from "next";
import Link from "next/link";

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const id = ctx.query;

  return { props: { id } };
};

export default function TasksBooks(props: { id: { id: string } }) {
  const idBook = props.id.id;

  return <div className="flex flex-col items-center py-40 gap-5">
    <Link className="py-2 px-6 bg-blue-500 rounded w-28 text-white" href={idBook+'/notes'}>Notes</Link>
    <Link className="py-2 px-6 bg-blue-500 rounded w-28 text-white" href={idBook+'/todo'}>To Dos</Link>
  </div>;
}
