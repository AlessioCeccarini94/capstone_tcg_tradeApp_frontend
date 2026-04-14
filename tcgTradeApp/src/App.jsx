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
import FavoritesPage from "./components/cards/FavoritesPage"
import AdminPage from "./components/AdminPage"
import ChatComponent from "./components/chat/ChatComponent"
import ChatWidget from "./components/chat/ChatWidget"
import ChatList from "./components/chat/ChatList"
import { useSelector } from "react-redux"
import { useState } from "react"

function App() {
  const [openList, setOpenList] = useState(false)
  const activeChat = useSelector((state) => state.chat.activeChat)
  const currentUser = useSelector((state) => state.user.loggedUser)

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection/:id" element={<CollectionComponent />} />
          <Route path="/auth/login" element={<LoginComponent />} />
          <Route path="/auth/register" element={<RegistrationComponent />} />
          <Route path="/games/:id/cards" element={<PageOfCardsByGame />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/expansions/:id" element={<ExpansioCardsPage />} />
          <Route path="/profile/:userId" element={<ProfileComponent />} />
          <Route path="/favorites/:id" element={<FavoritesPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route
            path="/profile/:id/user/collection"
            element={<UserProfileComponent />}
          />
        </Routes>
      </div>
      <Footer />
      {currentUser && (
        <ChatWidget onClick={() => setOpenList((prev) => !prev)} />
      )}
      {openList && !activeChat && <ChatList />}
      {currentUser && <ChatComponent />}
    </div>
  )
}

export default App
