import { PiGhostFill } from "react-icons/pi";
import { note } from "./projectTypes";
import { Link } from "react-router-dom";
import { ButtonHTMLAttributes, useRef, useState } from "react";

type homeProps = {
  notes: note[];
  tags: string[];
};

export default function Home({ notes, tags }: homeProps) {
  const [chosenTitle, setChosenTitle] = useState<string>("");
  
  return (
    <>
      <div className="w-full h-screen bg-gray-400/30 flex gap-[7vh] flex-col px-[10vw] py-[5vh]">
        <div className="flex items-center justify-between p-5">
          <h1 className="text-6xl font-belanosima capitalize">Note</h1>
          <div className="flex gap-3 text-[25px]">
            <Link to={"/new"}>
              <button className="font-belanosima font-light capitalize rounded-lg bg-blue-600 text-white px-4 py-2">
                create
              </button>
            </Link>
            <button className="font-belanosima font-light capitalize rounded-lg bg-white text-blue-600 px-4 py-2">
              edit tags
            </button>
          </div>
        </div>
        <div>
          <form className="flex justify-between">
            <div className="w-[43%] flex flex-col gap-3 p-3">
              <label
                htmlFor="searchTitleInput"
                className="text-[28px] capitalize"
              >
                title
              </label>
              <input
                id="searchTitleInput"
                type="text"
                className="p-3 text-[20px] bg-transparent outline-none border-2 border-solid border-blue-400 rounded-lg"
                spellCheck={false}
                onChange={(e) => {
                  setChosenTitle(e.target.value);
                }}
              />
            </div>
            <div className="w-[43%] flex flex-col gap-3 p-3">
              <label
                htmlFor="searchTagsInput"
                className="text-[28px] capitalize"
              >
                tags
              </label>
              <select
                id="searchTagsInput"
                className="p-3 text-[20px] bg-transparent outline-none border-2 border-solid border-blue-400 rounded-lg"
              >
                {tags.map((tag, index) => (
                  <option key={index} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
        <div className="border-2 flex flex-wrap overflow-y-scroll items-center justify-around border-solid border-blue-600 rounded-xl min-h-[40vh] gap-5 p-5">
          {notes.length > 0 ? (
            chosenTitle.length === 0 ? (
              notes.map((note, index) => <NoteCards note={note} key={index} />)
            ) : (
              notes
                .filter((note) => note.title.startsWith(chosenTitle))
                .map((note, index) => <NoteCards note={note} key={index} />)
            )
          ) : (
            <EmptyNoteList />
          )}
        </div>
      </div>
    </>
  );
}

type NoteCardsProps = {
  note: note;
};

function NoteCards({ note }: NoteCardsProps) {
  return (
    <Link
      to={`/${note.id}`}
      className="w-[30%] flex flex-col gap-2 py-3 rounded-2xl items-center border-2 border-solid border-blue-400"
    >
      <div className="font-bold">{note.title}</div>
      <div>
        {note.tags.map((tag) => (
          <span className="bg-blue-400 py-1 px-2 text-[13px] font-bold text-white rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

function EmptyNoteList() {
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <PiGhostFill size={90} className="opacity-70 animatedGhost" />
      <span className="text-[25px] capitalize">there is no note</span>
    </div>
  );
}
