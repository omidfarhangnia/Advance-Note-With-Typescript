import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Component/Home";
import New from "./Component/New";
import Show from "./Component/Show";
import Edit from "./Component/Edit";

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
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
