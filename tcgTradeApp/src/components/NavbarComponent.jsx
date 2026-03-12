import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  Dropdown,
} from "react-bootstrap"
import Offcanvas from "react-bootstrap/Offcanvas"
import logo from "../assets/images/logo.png"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { addGameList } from "../redux/actions/gameActions"
import SearchCard from "./cards/SearchCardComponent"
import { getUser } from "../redux/actions/userActions"

const NavbarComponent = () => {
  const user = useSelector((state) => state.user.users)
  const games = useSelector((state) => state.game.games)
  console.log(games)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(addGameList(), dispatch(getUser()))
  }, [dispatch])

  const token = localStorage.getItem("token")

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
            {!token && (
              <Nav className="justify-content-end flex-grow-1 pe-3 d-md-none">
                <Nav.Link as={Link} to="/auth/login">
                  Login
                </Nav.Link>
              </Nav>
            )}
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
          <SearchCard />
          {!token && (
            <Nav className="justify-content-end flex-grow-1 pe-3 d-none d-lg-flex">
              <Nav.Link as={Link} to="/auth/login">
                Login
              </Nav.Link>
            </Nav>
          )}
          {token && (
            <NavDropdown
              align="end"
              className="custom-dropdown"
              title={<img src={user?.image} />}
            >
              <NavDropdown.Item as={Link} to="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/collection">
                Collection
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/auth/logout">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Form>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent
