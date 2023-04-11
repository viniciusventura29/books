import type { GetServerSidePropsContext } from "next";

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
    const id = ctx.query;
  
    return { props: { id } };
  };

export default function TextPage() {
  return (
    <div>OI</div>
  );
}
