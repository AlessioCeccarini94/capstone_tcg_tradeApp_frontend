import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap"
import { getUserCollection } from "../../redux/actions/cardsActions"
import { getUserById } from "../../redux/actions/userActions"
import { FaLayerGroup } from "react-icons/fa"

const UserProfileComponent = () => {
  const { id } = useParams()
  const user = useSelector((state) => state.user.profileUser)
  const collection = useSelector((state) => state.card.collection)
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.card.loading)

  useEffect(() => {
    dispatch(getUserById(id))
    dispatch(getUserCollection(id))
  }, [dispatch, id])

  return (
    <Container fluid className="d-flex flex-column align-items-center">
      <Row className="w-100 border border-5 border-secondary h-75">
        <Col md={6} className="p-0">
          <Card className="stat-card">
            <Card.Body className="d-flex flex-column justify-content-center">
              <FaLayerGroup size={28} className="stat-icon mx-auto" />
              <h3 className="mt-3 text-secondary">{collection.length}</h3>
              <p className="text-secondary">Total Cards</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="p-0 bg-primary profile-img">
          <Card className="stat-card">
            <Card.Body>
              <img src={user?.image} alt="" />
              <h3 className="text-secondary">{user?.username}</h3>
              <h3 className="text-secondary">
                {user?.firstName} {user?.lastName}
              </h3>
              <p className="text-secondary">
                {typeof user?.city === "string"
                  ? user.city
                  : (user?.city?.cityName ?? "-")}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {!loading && (
        <Row>
          {collection.map((item) => {
            const card = item.card
            return (
              <Col className="my-3" key={card.blueprintId} xs={6} md={4} lg={3}>
                <Card className="m-2 stat-card">
                  <Card.Img src={card.image ? card.image : "/no-image.png"} />
                  <Card.Body>
                    <Card.Title>{card.cardName}</Card.Title>
                    <Card.Text>Quantity: {item.quantity}</Card.Text>
                    <Card.Text>
                      {card.avgPrice
                        ? `lowest sell price: €${card.avgPrice}`
                        : "-"}
                    </Card.Text>
                  </Card.Body>
                  <div className="mb-3">
                    <Button
                      className="w-50"
                      href={`mailto:${user?.email}?subject=Trade Request&body=Hi! ${user?.username}.I would like to trade ${item.quantity} ${card.cardName} for you.`}
                      variant="secondary"
                    >
                      Contact
                    </Button>
                  </div>
                </Card>
              </Col>
            )
          })}
        </Row>
      )}
    </Container>
  )
}
export default UserProfileComponent
