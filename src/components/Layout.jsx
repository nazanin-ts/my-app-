import Sidebar from "./Sidebar"
import "../index.css"
import Summarization from "../pages/Summarization"
import Home from "../pages/Home"
import Flashcards from "../pages/Flashcards"
import Chatbot from "../pages/Chatbot"
import { Route, Routes } from "react-router-dom";
import DifficultyPage from "../pages/DifficultyPage";

const Layout = () => {
  return (
    <div className="layout-grid">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/summarization" element={<Summarization />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/difficulty" element={<DifficultyPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default Layout