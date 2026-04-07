import { Container, Row, Col } from "react-bootstrap"
import { BsInstagram, BsPinterest, BsTwitterX } from "react-icons/bs"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="custom-footer py-3 ">
      <Container fluid>
        <Row className="my-5 w-50 mx-auto">
          <Col className="d-flex justify-content-evenly">
            <BsInstagram
              style={{ cursor: "pointer" }}
              onClick={() => {
                window.open("https://www.instagram.com/tcg_tradeapp/")
              }}
            />
            <BsTwitterX />
            <BsPinterest />
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <p className="text-center">
              © {new Date().getFullYear()} TCG Trade App. All rights reserved.
              <br /> Questo progetto è a scopo puramente didattico. Tutti i
              contenuti (immagini, marchi, carte) appartengono ai rispettivi
              proprietari. Non è affiliato né supportato da Wizards of the
              Coast, Bandai o altri. Nessun dato reale viene utilizzato. Non
              iserire dati personali.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
