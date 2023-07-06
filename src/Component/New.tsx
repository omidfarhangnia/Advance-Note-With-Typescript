import { useRef, useState } from "react";
import { RawNote, Tag } from "./projectTypes";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import CreatableSelect from "react-select/creatable";

type newProps = {
  notes: RawNote[];
  setNotes: (arg: RawNote[]) => void;
  setTags: (arg: Tag[]) => void;
  tags: Tag[];
};

export default function New({ notes, setNotes, setTags, tags }: newProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const navigate = useNavigate();

  function handleClickSave() {
    setNotes([
      ...notes,
      {
        title: titleRef.current!.value,
        tagsId: [],
        body: bodyRef.current!.value,
        id: uuidv4(),
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
          <Link to={".."}>
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
            required
          />
        </div>
        <div className="w-[43%] flex flex-col gap-3">
          <label htmlFor="createInputTags" className="text-[28px] capitalize">
            tags
          </label>
          <CreatableSelect
            value={selectedTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            onChange={(tags) => {
              setSelectedTags(
                tags.map((tag) => {
                  return { label: tag.label, id: tag.value };
                })
              );
            }}
            isMulti
          />
        </div>
        <div className="w-full flex flex-col gap-3">
          <label htmlFor="createInputBody" className="text-[28px] capitalize">
            body
          </label>
          <textarea
            id="createInputBody"
            className="p-3 text-[20px] bg-transparent outline-none border-2 border-solid border-blue-400 rounded-lg resize-none"
            ref={bodyRef}
            required
          ></textarea>
        </div>
      </form>
    </div>
  );
}
