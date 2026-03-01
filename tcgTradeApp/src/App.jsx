import { Routes, Route } from "react-router-dom"
import "./App.css"
import NavbarComponent from "./components/NavbarComponent"
import ProfileComponent from "./components/ProfileComponent"

function App() {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/profile" element={<ProfileComponent />} />
      </Routes>
    </>
  )
}

export default App
