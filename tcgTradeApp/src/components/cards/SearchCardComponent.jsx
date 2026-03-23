import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { useNavigate, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { searchCards } from "../../redux/actions/cardsActions"

const SearchCard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [query, setQuery] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query || query.trim().length < 3) return

    dispatch(searchCards(query))
    navigate(`/search?query=${query}`)
  }

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)

    if (value.length >= 3) {
      navigate(`/search?query=${value}`)
    }
  }

  useEffect(() => {
    const isSearchPage = location.pathname === "/search"
    if (!isSearchPage) {
      setQuery("")
    }
  }, [location.pathname])

  return (
    <Form onSubmit={handleSearch} className="d-flex w-100">
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2 search-input"
        aria-label="Search"
        value={query}
        onChange={handleChange}
      />
    </Form>
  )
}

export default SearchCard
