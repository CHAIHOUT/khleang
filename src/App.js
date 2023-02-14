import React from 'react';
import { Routes , Route } from "react-router-dom";

import Khleang_display from "./khleang_display";
import Khleang_note from './Khleang_note';
import Note_detail from './Note_detail';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Khleang_display />}></Route>
        <Route path='/Khleang_note' element={<Khleang_note />}></Route>
        <Route path='/Khleang_note_detail/:id' element={<Note_detail/>}></Route>
      </Routes>
    </div>
  )
}

export default App
