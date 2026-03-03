import { Routes, Route } from "react-router-dom"
import "./App.css"
import NavbarComponent from "./components/NavbarComponent"
import Home from "./components/home/HomeComponent"
import ProfileComponent from "./components/profile/ProfileComponent"
import LoginComponent from "./components/login_and_register/LoginComponent"
import Footer from "./components/FooterComponent"
import RegistrationComponent from "./components/login_and_register/RegistrationComponent"

function App() {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfileComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegistrationComponent />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
