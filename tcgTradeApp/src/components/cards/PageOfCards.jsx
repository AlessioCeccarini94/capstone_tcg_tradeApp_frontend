import { Container, Row, Col, Spinner, Button, Modal } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import Card from "react-bootstrap/Card"
import { Link, useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"
import {
  addToCollection,
  addToFavorites,
  userFavList,
} from "../../redux/actions/cardsActions"
import { setActiveChat } from "../../redux/actions/chatActions"
import { FaRegHeart } from "react-icons/fa"

const PageOfCards = () => {
  const baseURL = import.meta.env.VITE_API_URL
  const dispatch = useDispatch()
  const cardsState = useSelector((state) => state.card.cardsByGame)
  const cards = Array.isArray(cardsState)
    ? cardsState
    : (cardsState?.content ?? [])
  const currentUser = useSelector((state) => state.user.loggedUser?.username)
  const collection = useSelector((state) => state.card.collection) || []
  const favorites = useSelector((state) => state.card.favorites) || []
  const loading = useSelector((state) => state.card.loading)
  const [params] = useSearchParams()
  const [owners, setOwners] = useState([])
  const [clickedCard, setClickedCard] = useState(null)

  const minPrice = params.get("minPrice")
    ? Number(params.get("minPrice"))
    : undefined
  const maxPrice = params.get("maxPrice")
    ? Number(params.get("maxPrice"))
    : undefined
  const hasMinPrice = Number.isFinite(minPrice)
  const hasMaxPrice = Number.isFinite(maxPrice)

  const excludeWords = [
    "booster box",
    "booster",
    "playmat",
    "deck",
    "sleeves",
    "gift box",
    "art series",
    "intro pack",
    "battle set",
    "tin",
    "pin",
    "binder",
    "vivid potrayals",
    "anniversary set",
    "illustration box",
    "expansion set",
    "legacy of the valiant: deluxe edition",
    "promo set",
    "master collection volume",
    "case",
    "premium gold 2 display",
    "pack blister",
    "pocket binder",
    "promo pack",
    "d20 die",
    "pack bundle",
    "set a",
    "pack vol.",
    "complete set",
    "championship pack",
    "tournament pack",
    "storage box",
  ]

  const filteredCards = cards.filter((card) => {
    const name = card.cardName.toLowerCase()
    const nameMatches = !excludeWords.some((w) => name.includes(w))
    const avgNum =
      typeof card.avgPrice === "string" ? Number(card.avgPrice) : card.avgPrice
    const avgIsValid = Number.isFinite(avgNum)
    if (hasMinPrice || hasMaxPrice) {
      if (!avgIsValid) return false
      if (hasMinPrice && avgNum < minPrice) return false
      if (hasMaxPrice && avgNum > maxPrice) return false
    }
    return nameMatches
  })

  useEffect(() => {
    dispatch(userFavList())
  }, [dispatch])

  useEffect(() => {
    if (!clickedCard?.blueprintId) return
    fetch(`${baseURL}/cards/${clickedCard.blueprintId}/owners`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.status)
        return res.json()
      })
      .then((data) => setOwners(data))
      .catch((err) => console.log(err))
  }, [clickedCard, baseURL])

  const handleContact = (ownerUsername, cardName) => {
    if (!currentUser || !ownerUsername) return

    const chatKey = [currentUser, ownerUsername].sort().join("||")

    dispatch(setActiveChat(chatKey, ownerUsername, cardName))

    setClickedCard(null)
  }

  return (
    <Container>
      {loading && (
        <div className="d-flex justify-content-center">
          <Spinner />
        </div>
      )}

      {!loading && (
        <Row>
          {filteredCards.map((card) => {
            const isInCollection = collection.some(
              (i) => i.card.blueprintId === card.blueprintId,
            )
            const isInFavorites = favorites.some(
              (i) => i.card.blueprintId === card.blueprintId,
            )
            return (
              <Col key={card.blueprintId} className="my-3" xs={6} md={4} lg={3}>
                <Card className="stat-card m-2 w-100">
                  <Card.Img
                    variant="top"
                    src={card.image}
                    loading="lazy"
                    onError={(e) => (e.target.src = "/noImage.png")}
                    onClick={() => setClickedCard(card)}
                  />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <Card.Title className="text-secondary fw-bold card-title">
                      {card.cardName}
                    </Card.Title>
                    <Card.Text>
                      {card.avgPrice
                        ? `lowest sell price: €${card.avgPrice}`
                        : "-"}
                    </Card.Text>
                    <Card.Text
                      as={Link}
                      to={`/expansions/${card.expansion.cardTraderId}`}
                    >
                      {card.expansion.name}
                    </Card.Text>
                    <Row className="d-flex justify-content-center mt-2">
                      <Col xs={12} md={9}>
                        <Button
                          variant={isInCollection ? "secondary" : "primary"}
                          disabled={isInCollection}
                          onClick={() =>
                            dispatch(addToCollection(card.blueprintId))
                          }
                          className="d-flex justify-content-center align-items-center w-100 mt-1"
                        >
                          {isInCollection
                            ? "In Collection"
                            : "Add to Collection"}
                        </Button>
                      </Col>
                      <Col xs={4} md={3}>
                        <Button
                          className="mt-1"
                          variant={isInFavorites ? "secondary" : "primary"}
                          disabled={isInFavorites}
                          onClick={() =>
                            dispatch(addToFavorites(card.blueprintId))
                          }
                        >
                          <FaRegHeart />
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      )}
      <Modal
        show={clickedCard !== null}
        onHide={() => setClickedCard(null)}
        animation={false}
        className="text-secondary"
      >
        <Modal.Header className="bg-primary m-0 border-0" closeButton>
          <Modal.Title className="text-secondary fw-bold text-center">
            {clickedCard?.cardName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column justify-content-center bg-primary m-0">
          <img
            src={clickedCard?.image || "/no-image.png"}
            alt={clickedCard?.cardName}
            className="img-fluid mx-auto"
          />
          <h5 className="text-secondary fw-bold mt-3">Owners:</h5>
          {owners.map((owner) => (
            <div
              className="d-flex justify-content-between align-items-center"
              key={owner.userId}
            >
              <Link
                to={`/profile/${owner.userId}/user/collection`}
                className="text-secondary text-decoration-none"
              >
                {owner.username}
              </Link>
              <Button
                size="sm"
                variant="secondary"
                onClick={() =>
                  handleContact(
                    owner.username,
                    clickedCard?.cardName,
                    console.log("CLICK CARD:", clickedCard?.cardName),
                  )
                }
              >
                Contact
              </Button>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default PageOfCards
