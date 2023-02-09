import { GetServerSidePropsContext } from "next";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../../utils/api";

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const id = ctx.query;

  return { props: { id } };
};

export default function notes(props: { id: { id: string } }) {
  const util = api.useContext();
  const idBook = props.id.id;

  const [body, setBody] = useState<string>("");

  useEffect(()=>{
    document.addEventListener('keydown', detectKeyDown, true)
  },[])

  api.notes.getNote.useQuery(
    {
      bookId: idBook,
    },
    {
      onSuccess: (updatedNote) => {
        if (updatedNote?.body) {
            setBody(updatedNote.body);
        }
      },
    }
  );

  const updateNoteMutation = api.notes.updateNote.useMutation({
    onSuccess: () => util.notes.getNote.invalidate(),
  });

  const updateNote = useCallback(() => {
    updateNoteMutation.mutate({
      body: body,
      bookId: idBook,
    });
  }, [body, idBook]);

  const detectKeyDown = (e: KeyboardEvent)=>{
    if(e.ctrlKey && e.key === 's' && !e.repeat){
        e.preventDefault()
        updateNote()
    }
  }

  return (
    <div className="bg-gray-100 py-10 transition duration-700 ease-in-out dark:bg-slate-900">
      <div className="mx-auto flex min-h-screen w-auto min-w-[75%] max-w-min justify-center">
        <div id="Notes">
          <h2 className="mb-10 text-3xl font-semibold">Notes</h2>
          <form className="flex flex-col gap-2">
            <textarea
              className="h-[40rem] w-[40rem] resize-none rounded border-2 border-gray-700 p-2"
              placeholder="Write your notes here..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              onBlur={updateNote}
            ></textarea>
            <button
              type="button"
              onClick={updateNote}
              className="w-40 rounded bg-green-600 py-2 px-10 text-white hover:bg-green-700"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
