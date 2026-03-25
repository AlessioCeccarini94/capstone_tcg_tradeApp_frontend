import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { searchCard } from "../../redux/actions/cardsActions"

const SearchCard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [selectedGame, setSelectedGame] = useState(null)
  const gameId = selectedGame ? Number(selectedGame) : null

  const handleChange = (e) => {
    setQuery(e.targetvalue)
  }
  useEffect(() => {
    const delay = setTimeout(() => {
      const trimmed = query.trim()

    if (trimmed === "") {
  dispatch({ type: "SEARCH_CARD", payload: [] })
  return
}
    <Form onSubmit={(e) => e.preventDefault()} className="d-flex w-100">
      <select
        className="me-2"
        onChange={(e) => setSelectedGame(e.target.value)}
      >
        <option value="">All games</option>
        <option value="1">Magic The Gathering</option>
        <option value="5">Pokémon</option>
        <option value="15">One Piece</option>
        <option value="9">Dragon Ball Super</option>
        <option value="4">Yu-Gi-Oh!</option>
        <option value="18">Lorcana</option>
      </select>
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2 search-input"
        aria-label="Search"
        value={query}
        onChange={handleChange}
      />
    </Form>)
  
}}
export default SearchCard