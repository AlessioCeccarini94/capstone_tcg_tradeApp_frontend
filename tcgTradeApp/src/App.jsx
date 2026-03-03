import { Routes, Route } from "react-router-dom"
import "./App.css"
import NavbarComponent from "./components/NavbarComponent"
import Home from "./components/home/HomeComponent"
import ProfileComponent from "./components/profile/ProfileComponent"
import Footer from "./components/FooterComponent"

function App() {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfileComponent />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
