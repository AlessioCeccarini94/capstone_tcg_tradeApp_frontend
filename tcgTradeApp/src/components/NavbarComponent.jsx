import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import Offcanvas from "react-bootstrap/Offcanvas"

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" className=" custom-navbar mb-3">
      <Container fluid>
        <Navbar.Brand href="./images/logo.png"></Navbar.Brand>
        <Navbar.Toggle
          aria-controls="offcanvasNavbar"
          className="bg-primary border-0"
        />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header
            closeButton
            className="custom-offcanvas"
            variant="primary"
          >
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="custom-offcanvas">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <NavDropdown title="Cards" id="offcanvasNavbarDropdown">
              <NavDropdown.Item href="/collection">
                My Collection
              </NavDropdown.Item>
              <NavDropdown.Item href="/trades">Trades</NavDropdown.Item>
            </NavDropdown>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <Form className="d-flex w-100 mt-2">
          <Form.Control
            type="search"
            placeholder="Search cards"
            className="me-2"
          />
          <Button className="text-secondary" variant="primary">
            Search
          </Button>
        </Form>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent
