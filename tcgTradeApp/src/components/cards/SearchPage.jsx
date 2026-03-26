import { useEffect } from "react"
import { Button, Container, Form, Spinner } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { searchCard } from "../../redux/actions/cardsActions"
import PageOfCards from "./PageOfCards"

const SearchPage = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.card.loading)
  const games = useSelector((state) => state.game.games) || []
  const [params, setParams] = useSearchParams()
  const query = params.get("query")
  const gameIdParam = params.get("gameId")
  const gameId = gameIdParam ? Number(gameIdParam) : undefined
  const minPriceParam = params.get("minPrice")
  const maxPriceParam = params.get("maxPrice")
  const selectedGameId = gameIdParam ?? ""
  const minPrice = minPriceParam ?? ""
  const maxPrice = maxPriceParam ?? ""
  const canSearch = Boolean(query && query.trim().length >= 3)

  useEffect(() => {
    if (canSearch) dispatch(searchCard(query, gameId))
  }, [dispatch, query, gameId, canSearch])

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (value === "" || value === null || value === undefined) next.delete(key)
    else next.set(key, value)
    setParams(next)
  }
  return (
    <Container>
      {loading && (
        <div className="d-flex justify-content-center">
          <Spinner />
        </div>
      )}

      <div className="d-flex flex-wrap gap-2 align-items-end mb-3">
        <Form.Group style={{ minWidth: 220 }}>
          <Form.Label>Game</Form.Label>
          <Form.Select
            className="bg-primary text-secondary border-secondary"
            value={selectedGameId}
            onChange={(e) => updateParam("gameId", e.target.value)}
          >
            <option value="">All games</option>
            {games.map((g) => (
              <option key={g.id} value={String(g.id)}>
                {g.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group style={{ minWidth: 180 }}>
          <Form.Label>Min price</Form.Label>
          <Form.Control
            className="bg-primary text-secondary border-secondary"
            type="number"
            step="0.01"
            value={minPrice}
            onChange={(e) => updateParam("minPrice", e.target.value)}
            placeholder="0"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Max price</Form.Label>
          <Form.Control
            className="bg-primary text-secondary border-secondary"
            type="number"
            step="0.01"
            value={maxPrice}
            onChange={(e) => updateParam("maxPrice", e.target.value)}
            placeholder="200"
          />
        </Form.Group>

        <Button
          variant="outline-secondary"
          onClick={() => {
            const next = new URLSearchParams(params)
            next.delete("gameId")
            next.delete("minPrice")
            next.delete("maxPrice")
            setParams(next)
          }}
        >
          Clear
        </Button>
      </div>
      {!loading && <PageOfCards />}
    </Container>
  )
}

export default SearchPage
