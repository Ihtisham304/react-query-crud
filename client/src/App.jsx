import React, { useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllPosts from "./pages/all-posts";
import EditPosts from "./pages/edit-posts";
import AddPosts from "./pages/add-posts";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllPosts />}></Route>
        <Route path="/add-post" element={<AddPosts />}></Route>
        <Route path="/edit/:id" element={<EditPosts />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
