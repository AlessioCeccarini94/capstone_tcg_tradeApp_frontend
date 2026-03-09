import { Container, Row, Col } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import Card from "react-bootstrap/Card"
import { useEffect } from "react"
import { addCardList } from "../../redux/actions/cardsAction"
import { Link } from "react-router-dom"

const PageOfCardsByGame = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const cards = useSelector((state) => state.game.cards) || []

  useEffect(() => {
    dispatch(addCardList(id))
  }, [dispatch, id])

  return (
    <Container>
      <Row>
        {[...cards]
          .sort(() => Math.random() - 1)
          .slice(0, 12)
          .map(
            (card) => (
              console.log(card),
              (
                <Col key={card.id} className="d-flex" xs={6} md={4} lg={3}>
                  <Card className="stat-card m-2 w-100">
                    <Card.Img
                      variant="top"
                      src={card.image ? card.image : "/no-image.png"}
                    />
                    <Card.Body className="d-flex flex-column justify-content-end">
                      <Card.Title
                        className="text-secondary fw-bold card-title"
                        as={Link}
                        onClick={() => console.log(card)}
                      >
                        {card.cardName}
                      </Card.Title>
                      <Card.Text className="text-secondary fs-6">
                        {card.expansion.name}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              )
            ),
          )}
      </Row>
    </Container>
  )
}

export default PageOfCardsByGame
