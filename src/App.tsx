import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Component/Home";
import New from "./Component/New";
import Show from "./Component/Show";
import Edit from "./Component/Edit";
import { RawNote, Tag } from "./Component/projectTypes";
import { useLocalStorage } from "./useLocalStorage";

function App() {
  const [notes, setNotes] = useState<RawNote[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string>("");

  
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setSelectedNoteId={setSelectedNoteId}
              notes={notes}
              tags={tags}
              setTags={setTags}
            />
          }
        />
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
          <Route index element={<Show notes={notes} />} />
          <Route path="edit" element={<Edit />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
