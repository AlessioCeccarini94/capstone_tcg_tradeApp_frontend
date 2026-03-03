import { Container, Row, Col } from "react-bootstrap"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"
import Carousel from "react-bootstrap/Carousel"
import { useState } from "react"

const HomeBody = () => {
  const [index, setIndex] = useState(0)
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
  }
  return (
    <>
      <Container fluid>
        <Row>
          <div className="d-flex justify-content-between mt-3">
            <h6 className="text-center">Best Seller:</h6>
            <p>view all</p>
          </div>
          <Col
            xs={12}
            md={6}
            className="mb-4 d-flex overflow-auto gap-3 horizontal-scroll"
          >
            <div className="d-flex flex-wrap mt-3">
              {/* {Card.map((card) => ( */}
              <Card className="stat-card flex-shrink-0">
                <Card.Img
                  // onClick= {() => setModalShow(true)} TODO: add card zoom
                  variant="top"
                  src="https://www.placebear.com/200/200"
                />
                <Card.Body>
                  <div>
                    <Card.Title
                      as={Link}
                      to={"/card"}
                      className="text-secondary text-decoration-none py-2"
                    >
                      Card Title
                    </Card.Title>
                  </div>
                  <Button variant="primary" className="me-2 mt-2">
                    Trade
                  </Button>
                  <Button variant="primary" className="mt-2">
                    Remove
                  </Button>
                </Card.Body>
              </Card>
              {/* ))} */}
            </div>
          </Col>
          <div className="d-flex justify-content-between">
            <h6 className="text-center">Top Rated:</h6>
            <p>view all</p>
          </div>
          <Col
            xs={12}
            md={6}
            className="mt-3 d-flex overflow-auto gap-3 horizontal-scroll"
          >
            {/* {Card.map((card) => ( */}
            <Card className="stat-card flex-shrink-0">
              <Card.Img
                // onClick= {() => setModalShow(true)} TODO: add card zoom
                variant="top"
                src="https://www.placebear.com/200/200"
              />
              <Card.Body>
                <div>
                  <Card.Title
                    as={Link}
                    to="/card"
                    className="text-secondary text-decoration-none py-2"
                  >
                    Card Title
                  </Card.Title>
                </div>
                <Button variant="primary" className="mt-2 me-2">
                  Trade
                </Button>
                <Button variant="primary" className="mt-2">
                  Remove
                </Button>
              </Card.Body>
            </Card>
            {/* ))} */}
          </Col>
        </Row>
        <Row>
          <Col className="my-4">
            <h4 className="text-center">News & Events:</h4>
            <Carousel activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item>
                <img src="https://placecats.com/1300/500" alt="" />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src="https://placecats.com/1300/500" alt="" />
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src="https://placecats.com/1300/500" alt="" />
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default HomeBody
