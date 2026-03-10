import { Container, Row, Col } from "react-bootstrap"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import {
  removeFromCollection,
  userCardList,
} from "../../redux/actions/cardsAction"

const ProfileHero = () => {
  const dispatch = useDispatch()
  const collection = useSelector((state) => state.card.collection)
  const loading = useSelector((state) => state.card.loading)

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
        {!loading && (
          <Row>
            <div className="d-flex justify-content-between border-bottom border-3 border-secondary mb-3">
              <h5>My Collection</h5>
              <Button
                as={Link}
                to="/collection"
                className="text-secondary align-text-top"
              >
                view all
              </Button>
            </div>
            {collection.map((card) => (
              <Col
                xs={6}
                md={4}
                lg={3}
                key={card.card.blueprintId}
                className="d-flex flex-wrap"
              >
                <Card className="stat-card">
                  <Card.Img variant="top" src={card.card.image} />
                  <Card.Body>
                    <Card.Title className="text-secondary">
                      {card.card.cardName}
                    </Card.Title>
                    <Button variant="primary me-2">Trade</Button>
                    <Button
                      onClick={() =>
                        dispatch(removeFromCollection(card.card.blueprintId))
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
        )}
        <Row>
          <Col className="my-3">
            <div className="d-flex justify-content-between border-bottom border-3 border-secondary mb-3">
              <h5>My Trades</h5>
              <Button
                as={Link}
                to="/trades"
                className="text-secondary align-text-top"
              >
                view all
              </Button>
            </div>
            <Col className="d-flex flex-wrap">
              {/* {Card.map((card) => ( */}
              <Card className="stat-card">
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Button variant="primary me-2">Remove from trading</Button>
                </Card.Body>
              </Card>
              {/* ))} */}
            </Col>
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default ProfileHero
