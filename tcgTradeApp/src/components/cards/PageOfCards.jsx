import { Container, Row, Col, Spinner, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import Card from "react-bootstrap/Card"
import { Link } from "react-router-dom"
import { useState } from "react"
import Modal from "react-bootstrap/Modal"
import { addToCollection } from "../../redux/actions/cardsAction"

const PageOfCards = () => {
  const dispatch = useDispatch()
  const cards = useSelector((state) => state.card.cards) || []
  const loading = useSelector((state) => state.card.loading)
  const collection = useSelector((state) => state.card.collection) || []

  const [clickedCard, setClickedCard] = useState(null)
  return (
    <Container>
      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {!loading && (
        <Row>
          {cards.map((card) => {
            const isInCollection = collection.some(
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

                  <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title className="text-secondary fw-bold card-title">
                      {card.cardName}
                    </Card.Title>
                    <Card.Text>
                      {card.avgPrice ? `€${card.avgPrice}` : "-"}
                    </Card.Text>
                    <Card.Text
                      as={Link}
                      to={`/expansions/${card.expansion.cardTraderId}`}
                      className="text-secondary fs-6 d-none d-md-block text-decoration-none my-2"
                    >
                      {card.expansion.name}
                    </Card.Text>

                    <Button
                      variant={isInCollection ? "secondary" : "primary"}
                      disabled={isInCollection}
                      onClick={() =>
                        dispatch(addToCollection(card.blueprintId))
                      }
                      className="d-flex justify-content-center align-items-center"
                    >
                      {isInCollection ? "In Collection" : "Add to Collection"}
                    </Button>
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
        <Modal.Body className="d-flex justify-content-center bg-primary m-0">
          <img
            src={clickedCard?.image ? clickedCard.image : "/no-image.png"}
            alt={clickedCard?.name}
            className="img-fluid mx-auto"
          />
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default PageOfCards
