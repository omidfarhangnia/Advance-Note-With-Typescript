import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RawNote } from "./projectTypes";

type ShowParams = {
  notes: RawNote[];
};

export default function Show({ notes }: ShowParams) {
  const { id } = useParams();
  const [selectedNote, setSelectedNote] = useState<RawNote>();

  useEffect(() => {
    setSelectedNote(notes.filter((note) => note.id === id)[0]);
  }, [id]);

  return (
    <>
      <h1>hello there</h1>
      <h1>{selectedNote?.title}</h1>
      <h1>{selectedNote?.body}</h1>
    </>
  );
}
