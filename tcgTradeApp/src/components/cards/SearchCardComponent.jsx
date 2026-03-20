import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const SearchCard = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")

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
    <div className="d-flex w-100">
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        value={query}
        onChange={handleChange}
      />
    </div>
  )
}

export default SearchCard
