import { PiGhostFill } from "react-icons/pi";
import { Note, Tag } from "./projectTypes";
import { Link } from "react-router-dom";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";

type homeProps = {
  notes: Note[];
  tags: Tag[];
  setTags: (arg: Tag[]) => void;
  setSelectedNoteId: (arg: string) => void;
  availableTags: string[];
};

export default function Home({
  notes,
  tags,
  setTags,
  setSelectedNoteId,
  availableTags,
}: homeProps) {
  const [chosenTitle, setChosenTitle] = useState<string>("");

  function handleClick(id: string) {
    setSelectedNoteId(id);
  }

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
            <Link to={"/edittags"}>
              <button className="font-belanosima font-light capitalize rounded-lg bg-white text-blue-600 px-4 py-2">
                edit tags
              </button>
            </Link>
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
              <CreatableSelect
                isMulti
                className="[&>div]:bg-transparent border-2 border-solid border-blue-400 rounded-lg min-h-[60px] flex justify-center items-center [&>div]:w-full [&>div]:border-none [&>div>div>div[class*='multiValue']]:bg-white [&>div>div>div[class*='multiValue']]:text-[18px]"
                value={tags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag, value: tag };
                })}
                onChange={(tags) => {
                  setTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
              />
            </div>
          </form>
        </div>
        <div className="border-2 flex flex-wrap overflow-y-scroll items-center justify-around border-solid border-blue-600 rounded-xl min-h-[40vh] gap-5 p-5">
          {notes.length > 0 ? (
            chosenTitle.length === 0 ? (
              notes.map((note, index) => (
                <NoteCards handleClick={handleClick} note={note} key={index} />
              ))
            ) : (
              notes
                .filter((note) => note.title.startsWith(chosenTitle))
                .map((note, index) => (
                  <NoteCards
                    handleClick={handleClick}
                    note={note}
                    key={index}
                  />
                ))
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
  note: Note;
  handleClick: (arg: string) => void;
};

function NoteCards({ note, handleClick }: NoteCardsProps) {
  return (
    <Link
      onClick={() => handleClick(note.id)}
      to={`/${note.id}`}
      className="w-[30%] flex flex-col gap-2 py-3 rounded-2xl items-center border-2 border-solid border-blue-400"
    >
      <div className="font-bold">{note.title}</div>
      <div className="flex gap-2">
        {note.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-400 py-1 px-2 text-[13px] font-bold text-white rounded-lg"
          >
            {tag.label}
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
