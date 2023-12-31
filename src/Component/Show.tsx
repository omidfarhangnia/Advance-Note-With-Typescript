import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Note } from "./projectTypes";

type ShowParams = {
  notes: Note[];
  handleDeleteNote: (note: Note) => void;
};

export default function Show({ handleDeleteNote, notes }: ShowParams) {
  const [selectedNote, setSelectedNote] = useState<Note>();
  const { id } = useParams();

  useEffect(() => {
    setSelectedNote(notes.filter((note) => note.id === id)[0]);
  }, [id]);

  return (
    <>
      <div className="w-full h-screen flex flex-col gap-[5vh] px-[10vw] py-[5vh]">
        <div className="flex justify-between items-center h-[20vh] p-5">
          <div className="flex flex-col gap-3">
            <div className="text-[30px] font-bold">{selectedNote?.title}</div>
            <div className="flex gap-2">
              {selectedNote?.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-400 py-1 px-2 text-[13px] font-bold text-white rounded-lg"
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <Link to="edit" state={{ noteId: id }}>
              <button className="font-belanosima font-light capitalize rounded-lg bg-blue-600 text-white px-4 py-2">
                edit
              </button>
            </Link>
            <button
              onClick={() => {
                if (selectedNote === undefined) return;
                handleDeleteNote(selectedNote);
              }}
              className="font-belanosima font-light capitalize rounded-lg bg-red-600 text-white px-4 py-2"
            >
              delete
            </button>
            <Link to="..">
              <button className="font-belanosima font-light capitalize rounded-lg bg-gray-600 text-white px-4 py-2">
                back
              </button>
            </Link>
          </div>
        </div>
        <div className="flex h-[60vh] p-5 text-[25px] font-light">
          {selectedNote?.body}
        </div>
      </div>
    </>
  );
}
