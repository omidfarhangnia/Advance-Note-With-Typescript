import { useRef } from "react";
import { note } from "./projectTypes";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

type newProps = {
  notes: note[];
  setNotes: (arg: note[]) => void;
  setTags: (arg: string[]) => void;
  tags: string[];
};

export default function New({ notes, setNotes, setTags, tags }: newProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLSelectElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  function handleClickSave() {
    if (
      titleRef.current?.value === "" ||
      titleRef.current?.value === undefined
    ) {
      alert("please enter a name");
      return;
    } else if (
      bodyRef.current?.value === "" ||
      bodyRef.current?.value === undefined
    ) {
      alert("please enter a description");
      return;
    }

    setNotes([
      ...notes,
      {
        title: titleRef.current?.value,
        tags: ["helloo"],
        body: bodyRef.current?.value,
        id: uuidv4()
      },
    ]);

    navigate("/");
  }

  return (
    <div className="w-full h-screen flex flex-col gap-[7vh] bg-gray-400/30 px-[10vw] py-[5vh]">
      <div className="flex items-center justify-between p-5">
        <h1 className="text-6xl font-belanosima capitalize">new note</h1>
        <div className="flex gap-3 text-[25px]">
          <button
            onClick={handleClickSave}
            className="font-belanosima font-light capitalize rounded-lg bg-blue-600 text-white px-4 py-2"
          >
            save
          </button>
          <Link to={"/"}>
            <button className="font-belanosima font-light capitalize rounded-lg bg-white text-blue-600 px-4 py-2">
              cancel
            </button>
          </Link>
        </div>
      </div>
      <form className="flex flex-wrap justify-between gap-5">
        <div className="w-[43%] flex flex-col gap-3">
          <label htmlFor="createInputTitle" className="text-[28px] capitalize">
            title
          </label>
          <input
            id="createInputTitle"
            className="p-3 text-[20px] bg-transparent outline-none border-2 border-solid border-blue-400 rounded-lg min-h-[60px]"
            type="text"
            ref={titleRef}
          />
        </div>
        <div className="w-[43%] flex flex-col gap-3">
          <label htmlFor="createInputTags" className="text-[28px] capitalize">
            tags
          </label>
          <select
            id="createInputTags"
            className="p-3 text-[20px] bg-transparent outline-none border-2 border-solid border-blue-400 rounded-lg min-h-[60px]"
            ref={tagRef}
          >
            {tags.map((tag, index) => (
              <option value={tag} key={index}>
                {tag}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full flex flex-col gap-3">
          <label htmlFor="createInputBody" className="text-[28px] capitalize">
            body
          </label>
          <textarea
            id="createInputBody"
            className="p-3 text-[20px] bg-transparent outline-none border-2 border-solid border-blue-400 rounded-lg resize-none"
            ref={bodyRef}
          ></textarea>
        </div>
      </form>
    </div>
  );
}
