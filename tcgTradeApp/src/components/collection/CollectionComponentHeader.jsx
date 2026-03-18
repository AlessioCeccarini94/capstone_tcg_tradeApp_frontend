import Card from "react-bootstrap/Card"
import { Container, Row, Col } from "react-bootstrap"
import { FaLayerGroup, FaExchangeAlt, FaClock } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { userCardList } from "../../redux/actions/cardsActions"
import { getUser } from "../../redux/actions/userActions"

const ProfileHeader = () => {
  const dispatch = useDispatch()
  const collection = useSelector((state) => state.card.collection)
  const user = useSelector((state) => state.user.users)

  useEffect(() => {
    dispatch(userCardList(), dispatch(getUser()))
  }, [dispatch])

  return (
    <>
      <h1 className="text-center mb-4">Welcome {user?.username} !</h1>
      <Container fluid className="d-flex justify-content-center">
        <Row className="w-100 border border-5 border-secondary h-75">
          <Col md={6} className="p-0">
            <Card className="stat-card">
              <Card.Body>
                <FaLayerGroup size={28} className="stat-icon" />
                <h3 className="mt-3 text-secondary">{collection.length}</h3>
                <p className="text-secondary">Total Cards</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="p-0">
            <Card className="stat-card">
              <Card.Body>
                <FaClock size={28} className="stat-icon" />
                <h3 className="mt-3 text-secondary">5</h3>
                <p className="text-secondary">Wanted cards</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ProfileHeader
