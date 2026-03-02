import { Routes, Route } from "react-router-dom"
import "./App.css"
import NavbarComponent from "./components/NavbarComponent"
import ProfileComponent from "./components/profile/ProfileComponent"
import Footer from "./components/FooterComponent"

function App() {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/profile" element={<ProfileComponent />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
