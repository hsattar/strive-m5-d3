import React from "react"
import NavBar from "./components/navbar"
import Footer from "./components/footer"
import Home from "./views/home"
import Blog from "./views/blog"
import NewBlogPost from "./views/new"
import EditBlogPost from "./views/edit"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/auth/login"
import Register from "./components/auth/register"
import PrivateRoute from "./components/auth/PrivateRoute"

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/blog/:blogId" element={<PrivateRoute> <Blog /></PrivateRoute> } />
        <Route path="/blog/:blogId/edit" element={ <PrivateRoute><EditBlogPost /></PrivateRoute>} />
        <Route path="/new" element={<PrivateRoute> <NewBlogPost /> </PrivateRoute>} />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/404" element={ <h2 className='mt-5 pt-5 text-center'>Not Found</h2> } />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
