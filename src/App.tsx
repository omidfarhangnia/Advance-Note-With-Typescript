import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Component/Home";
import New from "./Component/New";
import Show from "./Component/Show";
import Edit from "./Component/Edit";
import { note } from "./Component/projectTypes";

function App() {
  const [notes, setNotes] = useState<note[]>([
    {
      title: "gsgsgs",
      tags: ["helloo"],
      body: "gsgsgsgs",
      id: "0b883178-7c81-4c32-aeec-0eb77e6be4c3",
    },
    {
      title: "sssssssssssss",
      tags: ["helloo"],
      body: "sggggggggggggg",
      id: "90201a43-8a90-4fd7-8f86-da6f26617641",
    },
    {
      title: "hello there",
      tags: ["helloo"],
      body: "general kenobi\n",
      id: "1407e31e-a870-4970-a615-9854f617c460",
    },
  ]);
  const [tags, setTags] = useState<string[]>(["hello", "its", "me"]);
  const [selectedNoteId, setSelectedNoteId] = useState<string>("");

  return (
    <>
      <Routes>
        <Route path="/" element={<Home setSelectedNoteId={setSelectedNoteId} notes={notes} tags={tags} />} />
        <Route
          path="/new"
          element={
            <New
              notes={notes}
              setNotes={setNotes}
              setTags={setTags}
              tags={tags}
            />
          }
        />
        <Route path="/:id">
          <Route index element={<Show selectedNote={notes.filter((note) => note.id = selectedNoteId)[0]} />} />
          <Route path="edit" element={<Edit />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
