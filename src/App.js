import React from "react";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./views/home";
import Blog from "./views/blog";
import NewBlogPost from "./views/new";
import EditBlogPost from "./views/edit";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/blog/:blogId" element={ <Blog /> } />
        <Route path="/blog/:blogId/edit" element={ <EditBlogPost /> } />
        <Route path="/new" element={ <NewBlogPost /> } />
        <Route path="/404" element={ <h2 className='mt-5 pt-5 text-center'>Not Found</h2> } />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
