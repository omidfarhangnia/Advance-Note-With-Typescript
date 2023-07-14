import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  function handleDeleteNote(note: RawNote) {
    setNotes(notes.filter((member) => member.id !== note.id));
    navigate("/");
  }

  function handleSaveNote(note: RawNote) {
    setNotes([...notes, note]);
    navigate("/");
  }

  function handleUpdateNote(note: RawNote) {
    setNotes(
      notes.map((noteMember) => {
        if (noteMember.id === note.id) {
          return note;
        } else {
          return noteMember;
        }
      })
    );
  }

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
              handleSaveNote={handleSaveNote}
              setTags={setTags}
              tags={tags}
            />
          }
        />
        <Route path="/:id">
          <Route
            index
            element={<Show handleDeleteNote={handleDeleteNote} notes={notes} />}
          />
          <Route
            path="edit"
            element={<Edit handleUpdateNote={handleUpdateNote} />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
