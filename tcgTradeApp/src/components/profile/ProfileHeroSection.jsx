import { Container, Row, Col } from "react-bootstrap"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

const ProfileHero = () => {
  return (
    <>
      <Container className="my-3 border-1 border-secondary">
        <Row>
          <Col className="my-3">
            <div className="d-flex justify-content-between border-bottom border-3 border-secondary mb-3">
              <h5>My Collection</h5>
              <a>view all</a>
            </div>
            <Col className="d-flex flex-wrap">
              {/* {Card.map((card) => ( */}
              <Card className="stat-card">
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Button variant="primary me-2">Go somewhere</Button>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
              {/* ))} */}
            </Col>
          </Col>
        </Row>
        <Row>
          <Col className="my-3">
            <div className="d-flex justify-content-between border-bottom border-3 border-secondary mb-3">
              <h5>My Trades</h5>
              <a>view all</a>
            </div>
            <Col className="d-flex flex-wrap">
              {/* {Card.map((card) => ( */}
              <Card className="stat-card">
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Button variant="primary me-2">Go somewhere</Button>
                  <Button variant="primary">Go somewhere</Button>
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
