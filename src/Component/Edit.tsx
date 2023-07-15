import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Note, Tag } from "./projectTypes";
import CreatableSelect from "react-select/creatable";

type EditParams = {
  handleUpdateNote: (note: Note) => void;
  notes: Note[];
  availableTags: string[];
};

export default function Edit({
  handleUpdateNote,
  availableTags,
  notes,
}: EditParams) {
  const [selectedNote, setSelectedNote] = useState<Note>();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedNote(
      notes.filter((note) => note.id === location.state.noteId)[0]
    );
  }, [location]);

  useEffect(() => {
    if (selectedNote === undefined) return;

    setTitle(selectedNote?.title);
    setBody(selectedNote?.body);
    setSelectedTags(selectedNote?.tags);
  }, [selectedNote]);

  return (
    <>
      <div className="flex flex-col px-[10vw] py-[5vh] h-screen gap-5">
        <div className="flex justify-between items-center">
          <div className="capitalize text-[30px] font-bold">edit note</div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                if (selectedNote?.id === undefined) return;

                handleUpdateNote({
                  title: title,
                  body: body,
                  id: selectedNote?.id,
                  tags: selectedTags,
                });

                navigate("..");
              }}
              className="font-belanosima font-light capitalize rounded-lg bg-blue-600 text-white px-4 py-2"
            >
              save
            </button>
            <Link to={"/"}>
              <button className="font-belanosima font-light capitalize rounded-lg bg-gray-600 text-white px-4 py-2">
                cancel
              </button>
            </Link>
          </div>
        </div>
        <div className="flex justify-between h-[15vh]">
          <div className="flex flex-col w-[45%] [&>label]:text-[25px] capitalize font-bold justify-around">
            <label>title</label>
            <input
              className="text-[30px] border-solid border-2 border-blue-400 py-2 px-3 rounded-xl"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col w-[45%] [&>label]:text-[25px] font-bold justify-around">
            <label className="capitalize">tags</label>
            <CreatableSelect
              isMulti
              value={selectedTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              options={availableTags.map((tag) => {
                return { label: tag, value: tag };
              })}
              onChange={(tags) => {
                setSelectedTags(
                  tags.map((tag) => {
                    return { label: tag.label, id: tag.value };
                  })
                );
              }}
              className="[&>div]:bg-transparent border-2 border-solid border-blue-400 rounded-lg min-h-[60px] flex justify-center items-center [&>div]:w-full [&>div]:border-none [&>div>div>div[class*='multiValue']]:bg-white [&>div>div>div[class*='multiValue']]:text-[18px]"
            />
          </div>
        </div>
        <div className="text-[30px] [&>div]:font-bold capitalize flex flex-col gap-3">
          <div>body</div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="h-[50vh] p-5 text-[25px] border-solid border-2 border-blue-400 rounded-xl resize-none"
          />
        </div>
      </div>
    </>
  );
}
