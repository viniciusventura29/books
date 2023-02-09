import type { GetServerSidePropsContext } from "next";
import { Dispatch, FormEvent, SetStateAction, useEffect } from "react";
import { useState } from "react";
import { api } from "../../../utils/api";

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const id = ctx.query;

  return { props: { id } };
};

export default function TasksBooks(props: { id: { id: string } }) {
  const idBook = props.id.id;

  return <div>olá</div>;
}
