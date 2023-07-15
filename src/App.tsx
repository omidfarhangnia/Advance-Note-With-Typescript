import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./Component/Home";
import New from "./Component/New";
import Show from "./Component/Show";
import Edit from "./Component/Edit";
import { Note, Tag } from "./Component/projectTypes";
import { useLocalStorage } from "./useLocalStorage";
import EditTags from "./Component/EditTags";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const tags: string[] = [];

    notes.map((note) => {
      note.tags.map((tag) => {
        if (!tags.includes(tag.id)) {
          tags.push(tag.id);
        }
      });
    });

    setAvailableTags(tags);
  }, [notes]);

  function handleDeleteNote(note: Note) {
    setNotes(notes.filter((member) => member.id !== note.id));
    navigate("/");
  }

  function handleSaveNote(note: Note) {
    setNotes([...notes, note]);
    navigate("/");
  }

  function handleUpdateNote(note: Note) {
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

  function handleDeleteTag(paramTag: string) {
    setAvailableTags(availableTags.filter((tag) => tag !== paramTag));

    setNotes(
      notes.map((note) => {
        const newTags = note.tags.filter((tag) => tag.label !== paramTag);

        return {
          ...note,
          tags: newTags,
        };
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
              availableTags={availableTags}
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
              availableTags={availableTags}
              handleSaveNote={handleSaveNote}
              setTags={setTags}
              tags={tags}
            />
          }
        />
        <Route
          path="/edittags"
          element={
            <EditTags
              handleDeleteTag={handleDeleteTag}
              availableTags={availableTags}
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
            element={
              <Edit
                handleUpdateNote={handleUpdateNote}
                notes={notes}
                availableTags={availableTags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
