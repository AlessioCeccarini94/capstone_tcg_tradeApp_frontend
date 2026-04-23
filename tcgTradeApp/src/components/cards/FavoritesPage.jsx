import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Modal,
  Card,
} from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { userFavList, removeFavorite } from "../../redux/actions/cardsActions"
import { setActiveChat } from "../../redux/actions/chatActions"
import { Link } from "react-router-dom"

const FavoritesPage = () => {
  //--------- CONST ------------
  const baseURL = import.meta.env.VITE_API_URL
  const dispatch = useDispatch()
  const favorites = useSelector((state) => state.card.favorites)
  const loading = useSelector((state) => state.card.loading)
  const [show, setShow] = useState({})
  const [owners, setOwners] = useState([])
  const currentUser = useSelector((state) => state.user.loggedUser?.username)
  const [clickedCard, setClickedCard] = useState(null)
  const groupedByGame = favorites.reduce((acc, card) => {
    const game = card.card.expansion.game.name
    if (!acc[game]) {
      acc[game] = []
    }
    acc[game].push(card)
    return acc
  }, {})

  //--------- HOOK ------------

  useEffect(() => {
    dispatch(userFavList())
  }, [dispatch])
  useEffect(() => {
    if (!clickedCard?.blueprintId) return
    fetch(`${baseURL}/cards/${clickedCard.blueprintId}/owners`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.status)
        return res.json()
      })
      .then((data) => setOwners(data))
      .catch((err) => console.log(err))
  }, [clickedCard])
  {
    const handleContact = (ownerUsername, cardName) => {
      if (!currentUser || !ownerUsername) return

      const chatKey = [currentUser, ownerUsername].sort().join("||")

      dispatch(setActiveChat(chatKey, ownerUsername, cardName))

      setClickedCard(null)
    }
    return (
      <Container>
        <h1 className="text-center mb-4">Favorites</h1>
        {loading && <Spinner />}

        {!loading &&
          Object.entries(groupedByGame).map(([game, cards]) => {
            const visibleCards = show[game] ? cards : cards.slice(0, 4)

            return (
              <div key={game}>
                <div className="d-flex justify-content-between align-items-center border-bottom mb-2">
                  <h5>{game}</h5>

                  <Button
                    className="text-secondary align-text-top"
                    size="sm"
                    onClick={() =>
                      setShow((prev) => ({
                        ...prev,
                        [game]: !prev[game],
                      }))
                    }
                  >
                    {show[game] ? "show less" : "view all"}
                  </Button>
                </div>

                <Row>
                  {visibleCards.map((fav) => (
                    <Col key={fav.id} xs={6} md={4} lg={3} className="my-4">
                      <Card className="stat-card">
                        <Card.Img
                          variant="top"
                          src={
                            fav.card.image ? fav.card.image : "/no-image.png"
                          }
                          onClick={() => setClickedCard(fav.card)}
                        />

                        <Card.Body className="d-flex flex-column justify-content-between">
                          <Card.Title>{fav.card.cardName}</Card.Title>

                          <Card.Text>
                            {fav.card.avgPrice ? `€${fav.card.avgPrice}` : "-"}
                          </Card.Text>

                          <Button
                            variant="secondary"
                            onClick={() =>
                              dispatch(removeFavorite(fav.card.blueprintId))
                            }
                          >
                            Remove
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            )
          })}
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
}

export default FavoritesPage
