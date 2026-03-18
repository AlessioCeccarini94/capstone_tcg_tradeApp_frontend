import { Container, Row, Col, Spinner } from "react-bootstrap"
import Modal from "react-bootstrap/Modal"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import {
  removeFromCollection,
  userCardList,
} from "../../redux/actions/cardsActions"
import { useState } from "react"

const ProfileHero = () => {
  const dispatch = useDispatch()
  const collection = useSelector((state) => state.card.collection)
  const loading = useSelector((state) => state.card.loading)
  const [clickedCard, setClickedCard] = useState(null)
  const [show, setShow] = useState({})

  const groupedByGame = collection.reduce((acc, card) => {
    const game = card.card.expansion.game.name
    if (!acc[game]) {
      acc[game] = []
    }
    acc[game].push(card)
    return acc
  }, {})

  useEffect(() => {
    dispatch(userCardList())
  }, [dispatch])

  return (
    <>
      <Container className="my-3 border-1 border-secondary">
        {loading && (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        {!loading &&
          Object.entries(groupedByGame).map(([game, cards]) => {
            const visibleCards = show[game] ? cards : cards.slice(0, 4)
            return (
              <div key={game}>
                <div className="d-flex justify-content-between border-bottom border-3 border-secondary mb-3 w-100">
                  <h5 className="mt-3">{game}</h5>
                  <Button
                    className="text-secondary align-text-top"
                    onClick={() =>
                      setShow((prev) => ({ ...prev, [game]: !prev[game] }))
                    }
                  >
                    {show[game] ? "show less" : "view all"}
                  </Button>
                </div>
                <Row className="stat-row">
                  {visibleCards.map((card) => (
                    <Col
                      xs={6}
                      md={4}
                      lg={3}
                      key={card.card.blueprintId}
                      className="d-flex mb-3"
                    >
                      <Card className="stat-card">
                        <Card.Img
                          variant="top"
                          src={card.card.image}
                          onClick={() => setClickedCard(card.card)}
                        />
                        <Card.Body className="d-flex flex-column justify-content-around">
                          <Card.Title className="text-secondary">
                            {card.card.cardName}
                          </Card.Title>
                          <Card.Text>
                            {card.card.avgPrice
                              ? `lowest sell price: €${card.card.avgPrice}`
                              : "-"}
                          </Card.Text>
                          <Card.Text
                            as={Link}
                            to={`/expansions/${card.card.expansion.cardTraderId}`}
                          >
                            {card.card.expansion.name}
                          </Card.Text>
                          <Button
                            className="text-center my-2"
                            onClick={() =>
                              dispatch(
                                removeFromCollection(card.card.blueprintId),
                              )
                            }
                            variant="primary"
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
          <Modal.Body className="d-flex justify-content-center bg-primary m-0">
            <img
              src={clickedCard?.image ? clickedCard.image : "/no-image.png"}
              alt={clickedCard?.name}
              className="img-fluid mx-auto"
            />
          </Modal.Body>
        </Modal>
      </Container>
    </>
  )
}
export default ProfileHero
