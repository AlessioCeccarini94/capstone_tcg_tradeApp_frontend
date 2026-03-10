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
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { addGameList } from "../redux/actions/gameActions"

const NavbarComponent = () => {
  const games = useSelector((state) => state.game.games)
  console.log(games)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(addGameList())
  }, [dispatch])

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
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
            </Nav>
            <Nav className="justify-content-end flex-grow-1 pe-3 d-md-none">
              <Nav.Link as={Link} to="/auth/login">
                Login
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
              {games?.map((game) => (
                <Dropdown.Item
                  as={Link}
                  to={`/games/${game.id}/cards`}
                  key={game.id}
                >
                  {game.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            type="search"
            placeholder="Search cards"
            className="me-2"
          />
          <Button className="text-secondary">Search</Button>
          <Nav className="justify-content-end flex-grow-1 pe-3 d-none d-lg-flex">
            <Nav.Link as={Link} to="/auth/login">
              Login
            </Nav.Link>
          </Nav>
        </Form>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent
