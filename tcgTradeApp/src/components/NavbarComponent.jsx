import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import Offcanvas from "react-bootstrap/Offcanvas"
import Dropdown from "react-bootstrap/Dropdown"
import logo from "../assets/images/logo.png"
import { Link } from "react-router-dom"

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" className=" custom-navbar mb-3">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          <img
            src={logo}
            width="90"
            height="90"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="offcanvasNavbar"
          className="bg-primary border-0"
        />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton className="custom-offcanvas">
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="custom-offcanvas">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
            </Nav>
            <Nav className="justify-content-end flex-grow-1 pe-3 d-md-none">
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </Nav>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <NavDropdown
                title="Cards"
                id="offcanvasNavbarDropdown"
                className="offcanvas-dropdown"
              >
                <NavDropdown.Item as={Link} to="/collection">
                  My Collection
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/trades">
                  Trades
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <Form className="d-flex w-100 mt-2">
          <Dropdown className="border-0 radius-0">
            <Dropdown.Toggle id="dropdown-basic">
              <i className="bi bi-filter-left"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {/* {games.map((game) => (
                <Dropdown.Item key={game}onClick={() => handleFilter(game)}>{game}</Dropdown.Item>
              ))} */}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            type="search"
            placeholder="Search cards"
            className="me-2"
          />
          <Button className="text-secondary">Search</Button>
          <Nav className="justify-content-end flex-grow-1 pe-3 d-sm-none d-lg-flex ps-3">
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          </Nav>
        </Form>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent
