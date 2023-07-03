import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Component/Home";
import New from "./Component/New";
import Show from "./Component/Show";
import Edit from "./Component/Edit";
import { note } from "./Component/projectTypes";

function App() {
  const [notes, setNotes] = useState<note[]>([]);
  const [tags, setTags] = useState<string[]>(["hello", "its", "me"]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home notes={notes} tags={tags} />} />
        <Route path='/new' element={<New />} />
        <Route path='/:id'>
            <Route index element={< Show/>} />
            <Route path='edit' element={<Edit />} />
        </Route>
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
