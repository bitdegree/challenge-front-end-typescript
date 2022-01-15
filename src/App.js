import React from "react";
import Homepage from "./pages/homepage";
import GlobalStyle from "./styles/globalStyles";
import PostPage from "./pages/postPage";
import { Route, Routes } from "react-router";
import EditPost from "./pages/editPost";
import CreatePost from "./pages/createPost";
function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
      <Routes>
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
      <Routes>
        <Route path="/post/:id/edit" element={<EditPost />} />
      </Routes>
      <Routes>
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </div>
  );
}

export default App;
