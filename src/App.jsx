import Navbar from "./components/Navbar"
import Singup from "./pages/Singup"
import "./style.css"
import { Routes, Route } from "react-router-dom"
import Profile from "./components/Profile"

function App() {
  return (
    <div className="main">
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Singup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
