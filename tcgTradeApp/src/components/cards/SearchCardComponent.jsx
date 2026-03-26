import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { useNavigate, useLocation } from "react-router-dom"

const SearchCard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [query, setQuery] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    // Submitting (Enter) should not change page state.
    // We already navigate on typing; keeping submit as a no-op avoids crashes/double navigations.
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
    const isSearchPage = location.pathname === "/search"
    if (!isSearchPage) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
