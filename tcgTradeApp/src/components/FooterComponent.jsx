import { Container, Row, Col } from "react-bootstrap"
import { BsInstagram, BsPinterest, BsTwitterX } from "react-icons/bs"

const Footer = () => {
  return (
    <footer className="custom-footer py-3 ">
      <Container fluid>
        <Row className="my-5 w-50 mx-auto">
          <Col className="d-flex justify-content-evenly">
            <BsInstagram />
            <BsTwitterX />
            <BsPinterest />
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <p className="text-center">
              © 2023 TCG Trade App. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
