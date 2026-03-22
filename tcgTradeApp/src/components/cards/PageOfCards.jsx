import { Container, Row, Col, Spinner, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import Card from "react-bootstrap/Card"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import Modal from "react-bootstrap/Modal"
import {
  addToCollection,
  addToFavorites,
  userFavList,
} from "../../redux/actions/cardsActions"
import { FaRegHeart } from "react-icons/fa"

const PageOfCards = () => {
  const dispatch = useDispatch()
  const cards = useSelector((state) => state.card.cardsByGame) || []
  const [owners, setOwners] = useState([])
  const loading = useSelector((state) => state.card.loading)
  const collection = useSelector((state) => state.card.collection) || []
  const favorites = useSelector((state) => state.card.favorites) || []

  const excludeWords = [
    "booster box",
    "booster",
    "playmat",
    "deck",
    "sleeves",
    "gift box",
    "art series",
    "intro pack",
    "Vivid Potrayals",
    "storage box",
    "tournament pack",
    "championship pack",
  ]

  const filteredCards = cards.filter((card) => {
    const name = card.cardName.toLowerCase()
    return !excludeWords.some((word) => name.includes(word))
  })
  const [clickedCard, setClickedCard] = useState(null)

  useEffect(() => {
    dispatch(userFavList())
  }, [dispatch])
  useEffect(() => {
    if (!clickedCard?.blueprintId) return
    fetch(
      `https://tgc-tradeapp-be.onrender.com/cards/${clickedCard.blueprintId}/owners`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    )
      .then((res) => {
        if (!res.ok) throw new Error(res.status)
        return res.json()
      })
      .then((data) => setOwners(data))
      .catch((err) => console.log(err))
  }, [clickedCard])
  return (
    <Container>
      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {!loading && (
        <Row>
          {filteredCards.map((card) => {
            const isInCollection = collection.some(
              (item) => item.card.blueprintId === card.blueprintId,
            )
            const isInFavorites = favorites.some(
              (item) => item.card.blueprintId === card.blueprintId,
            )

            return (
              <Col key={card.blueprintId} className="my-3" xs={6} md={4} lg={3}>
                <Card className="stat-card m-2 w-100">
                  <Card.Img
                    variant="top"
                    src={card.image ? card.image : "/no-image.png"}
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
            src={clickedCard?.image ? clickedCard.image : "/no-image.png"}
            alt={clickedCard?.name}
            className="img-fluid mx-auto"
          />
          <h5 className="text-secondary fw-bold mt-3"> Owners:</h5>
          {owners.map((owner) => (
            <div
              className="d-flex justify-content-between align-items-center"
              key={owner.userId}
            >
              <Link
                as={Link}
                to={`/profile/${owner.userId}/user/collection`}
                className="text-secondary text-decoration-none"
              >
                {owner.username}
              </Link>
              <Button
                size="sm"
                variant="secondary"
                href={`mailto:${owner.email}?subject=${encodeURIComponent(
                  `Trade for ${clickedCard.cardName}`,
                )}&body=${encodeURIComponent(
                  `Hi ${owner.username}, I'm interested in your ${clickedCard.cardName}.`,
                )}`}
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
