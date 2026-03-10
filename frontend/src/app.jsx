import { Routes, Route } from "react-router-dom"

import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"

import Home from "./pages/Home"
import ArticlePage from "./pages/ArticlePage"
import CategoryPage from "./pages/CategoryPage"
import VideoPage from "./pages/VideoPage"
import Login from "./pages/Login"

import Dashboard from "./admin/Dashboard"
import Editor from "./admin/Editor"

function App(){

  return(

    <div className="flex flex-col min-h-screen">

      <Navbar/>

      <main className="flex-grow">

        <Routes>

          <Route path="/" element={<Home/>}/>
          <Route path="/article/:slug" element={<ArticlePage/>}/>
          <Route path="/category/:name" element={<CategoryPage/>}/>
          <Route path="/videos" element={<VideoPage/>}/>

          <Route path="/admin" element={<Login/>}/>
          <Route path="/admin/dashboard" element={<Dashboard/>}/>
          <Route path="/admin/editor" element={<Editor />} />
          <Route path="/admin/editor/:id" element={<Editor />} />
          <Route path="*" element={<Home />} />

        </Routes>

      </main>

      <Footer/>

    </div>

  )

}

export default App