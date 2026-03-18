import { Container, Row, Col, Spinner, Button } from "react-bootstrap"
import Card from "react-bootstrap/Card"
import { useEffect, useState } from "react"
import { orderCardByPrice } from "../../redux/actions/cardsActions"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

const HomeBody = () => {
  const dispatch = useDispatch()

  const cards = useSelector((state) => state.card.topCards) || []
  const loading = useSelector((state) => state.card.loading)
  const [show, setShow] = useState({})
  const game = useSelector((state) => state.card.game)
  const groupedByGame = cards.reduce((acc, card) => {
    const game = card.expansion.game.name

    if (!acc[game]) {
      acc[game] = []
    }

    acc[game].push(card)
    return acc
  }, {})

  useEffect(() => {
    dispatch(orderCardByPrice())
  }, [dispatch])

  return (
    <Container fluid>
      <h3 className="border-bottom border-3 border-secondary mt-3 mb-5">
        Most expensive cards in :
      </h3>
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
              <Row className="mt-3">
                <Col className="d-flex justify-content-between align-items-center">
                  <h4>{game}</h4>

                  <Button
                    variant="secondary"
                    onClick={() =>
                      setShow((prev) => ({
                        ...prev,
                        [game]: !prev[game],
                      }))
                    }
                  >
                    {show[game] ? "Show Less" : "View All"}
                  </Button>
                </Col>
              </Row>

              <Row>
                {visibleCards.map((card) => (
                  <Col xs={6} md={3} className="my-3" key={card.blueprintId}>
                    <Card className="stat-card">
                      <Card.Img src={card.image} />
                      <Card.Body className="d-flex flex-column justify-content-end">
                        <Card.Title>{card.cardName}</Card.Title>
                        <Card.Text>
                          {card.avgPrice ? `${card.avgPrice} €` : "-"}
                        </Card.Text>
                        <Card.Text
                          className="card-text"
                          as={Link}
                          to={`/expansions/${card.expansion.cardTraderId}`}
                        >
                          {card.expansion.name}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )
        })}
    </Container>
  )
}

export default HomeBody
