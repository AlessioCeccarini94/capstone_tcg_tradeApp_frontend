import { Routes, Route } from "react-router-dom"
import "./App.css"
import NavbarComponent from "./components/NavbarComponent"
import Home from "./components/home/HomeComponent"
import CollectionComponent from "./components/collection/CollectionComponent"
import ProfileComponent from "./components/profile/ProfileComponent"
import LoginComponent from "./components/login_and_register/LoginComponent"
import Footer from "./components/FooterComponent"
import RegistrationComponent from "./components/login_and_register/RegistrationComponent"
import PageOfCardsByGame from "./components/cards/PageOfCardsByGame"
import SearchPage from "./components/cards/SearchPage"
import ExpansioCardsPage from "./components/cards/ExpansionCardsPage"
import UserProfileComponent from "./components/profile/UserProfileComponent"

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<CollectionComponent />} />
          <Route path="/auth/login" element={<LoginComponent />} />
          <Route path="/auth/register" element={<RegistrationComponent />} />
          <Route path="/games/:id/cards" element={<PageOfCardsByGame />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/expansions/:id" element={<ExpansioCardsPage />} />
          <Route path="/profile" element={<ProfileComponent />} />

          <Route
            path="/profile/:id/user/collection"
            element={<UserProfileComponent />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
