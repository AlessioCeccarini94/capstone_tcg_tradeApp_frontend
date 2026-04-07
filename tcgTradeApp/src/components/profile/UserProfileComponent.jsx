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

  const formatCondition = (condition) => {
    if (!condition) return ""

    return condition
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  useEffect(() => {
    dispatch(getUserById(id))
    dispatch(getUserCollection(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id])

  const groupedByGame = collection.reduce((acc, item) => {
    const game = item.card.expansion.game.name

    if (!acc[game]) {
      acc[game] = []
    }

    acc[game].push(item)
    return acc
  }, {})

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
        <div className="text-center mt-3">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {!loading && (
        <>
          {Object.entries(groupedByGame).map(([game, items]) => (
            <div key={game} className="w-100">
              {/* HEADER GAME */}
              <div className="d-flex justify-content-between border-bottom border-3 border-secondary mb-3 w-100">
                <h5 className="mt-3 text-secondary">{game}</h5>
              </div>
              <Row>
                {items.map((item) => {
                  const card = item.card
                  return (
                    <Col
                      key={card.blueprintId}
                      xs={6}
                      md={4}
                      lg={3}
                      className="my-3"
                    >
                      <Card className="m-2 stat-card">
                        <Card.Img
                          src={card.image ? card.image : "/no-image.png"}
                        />
                        <Card.Body>
                          <Card.Title>{card.cardName}</Card.Title>
                          <Card.Text>Quantity: {item.quantity}</Card.Text>
                          <Card.Text>
                            {card.avgPrice
                              ? `lowest sell price: €${card.avgPrice}`
                              : "-"}
                          </Card.Text>
                          <Card.Text className="text-secondary">
                            {formatCondition(item.condition)}
                          </Card.Text>
                        </Card.Body>
                        <div className="mb-3 text-center">
                          <Button
                            className="w-75"
                            href={`mailto:${user?.email}?subject=Trade Request&body=Hi! ${user?.username}. I would like to trade ${item.quantity} ${card.cardName} with you.`}
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
            </div>
          ))}
        </>
      )}
    </Container>
  )
}

export default UserProfileComponent
