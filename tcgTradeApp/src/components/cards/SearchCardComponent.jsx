import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { useNavigate, useLocation } from "react-router-dom"

const SearchCard = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    if (location.pathname === "/search") return
    if (!query || query.trim().length < 3) return

    const params = new URLSearchParams()
    params.set("query", query)
    navigate(`/search?${params.toString()}`)
  }

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)

    if (value.length >= 3) {
      const params = new URLSearchParams()
      params.set("query", value)
      navigate(`/search?${params.toString()}`)
    }
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