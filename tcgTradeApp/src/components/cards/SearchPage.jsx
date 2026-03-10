import { useEffect } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import Card from "react-bootstrap/Card"
import { addToCollection, searchCard } from "../../redux/actions/cardsAction"

const SearchPage = () => {
  const dispatch = useDispatch()
  const [params] = useSearchParams()
  const query = params.get("query")

  const collection = useSelector((state) => state.card.collection) || []
  const cards = useSelector((state) => state.card.cards)

  useEffect(() => {
    if (query) dispatch(searchCard(query))
  }, [dispatch, query])

  return (
    <Container>
      <Row>
        {cards?.map((card) => {
          const isInCollection = collection.some(
            (item) => item.card.blueprintId === card.blueprintId,
          )
          return (
            <Col key={card.blueprintId} xs={6} md={4} lg={3}>
              <Card className="stat-card m-2 w-100">
                <Card.Img variant="top" src={card.image || "/no-image.png"} />

                <Card.Body>
                  <Card.Title>{card.cardName}</Card.Title>

                  <Card.Text>{card.expansion.name}</Card.Text>

                  <Button
                    onClick={() => dispatch(addToCollection(card.blueprintId))}
                    variant={isInCollection ? "secondary" : "primary"}
                    disabled={isInCollection}
                  >
                    {isInCollection ? "In Collection" : "Add to Collection"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default SearchPage
