import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { RawNote } from "./projectTypes";
import CreatableSelect from "react-select/creatable";

type EditParams = {
  handleUpdateNote: (note: RawNote) => void;
  notes: RawNote[];
};

export default function Edit({ handleUpdateNote, notes }: EditParams) {
  const [selectedNote, setSelectedNote] = useState<RawNote>();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>();
  const location = useLocation();

  useEffect(() => {
    setSelectedNote(
      notes.filter((note) => note.id === location.state.noteId)[0]
    );
  }, [location]);

  useEffect(() => {
    if (selectedNote === undefined) return;

    setTitle(selectedNote?.title);
    setBody(selectedNote?.body);
    setSelectedTags(selectedNote?.tagsId);
  }, [selectedNote]);

  return (
    <>
      <div>
        <div>edit note</div>
        <div>
          <div>
            <label>title</label>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div>
            <label>tags</label>
            <CreatableSelect
              isMulti
              className="[&>div]:bg-transparent border-2 border-solid border-blue-400 rounded-lg min-h-[60px] flex justify-center items-center [&>div]:w-full [&>div]:border-none [&>div>div>div[class*='multiValue']]:bg-white [&>div>div>div[class*='multiValue']]:text-[18px]"
            />
          </div>
        </div>
        {selectedNote?.title}
        {selectedNote?.title}
        {selectedNote?.body}
      </div>
    </>
  );
}
