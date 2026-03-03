import { Routes, Route } from "react-router-dom"
import "./App.css"
import NavbarComponent from "./components/NavbarComponent"
import Home from "./components/home/HomeComponent"
import ProfileComponent from "./components/profile/ProfileComponent"
import LoginComponent from "./components/login/LoginComponent"
import Footer from "./components/FooterComponent"

function App() {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfileComponent />} />
        <Route path="/login" element={<LoginComponent />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
