import { Routes, Route } from "react-router-dom"
import "./App.css"
import NavbarComponent from "./components/NavbarComponent"
import Home from "./components/home/HomeComponent"
import ProfileComponent from "./components/profile/ProfileComponent"
import AddCardForm from "./components/profile/AddCardForm"
import LoginComponent from "./components/login_and_register/LoginComponent"
import Footer from "./components/FooterComponent"
import RegistrationComponent from "./components/login_and_register/RegistrationComponent"

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfileComponent />} />
          <Route path="/add-card" element={<AddCardForm />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/auth/register" element={<RegistrationComponent />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
