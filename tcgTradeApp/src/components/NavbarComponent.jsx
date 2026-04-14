import { Container, Nav, Navbar, NavDropdown, Dropdown } from "react-bootstrap"
import Offcanvas from "react-bootstrap/Offcanvas"
import logo from "../assets/images/logo.png"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { addGameList } from "../redux/actions/gameActions"
import { logoutUser, getUser } from "../redux/actions/userActions"
import SearchCard from "./cards/SearchCardComponent"

const NavbarComponent = () => {
  const user = useSelector((state) => state.user.loggedUser)
  const games = useSelector((state) => state.game.games)
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const handleclose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate("/")
  }

  useEffect(() => {
    dispatch(addGameList())
    dispatch(getUser())
  }, [dispatch])

  return (
    <Navbar expand="lg" className=" custom-navbar mb-3">
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
      >
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
          onClick={handleShow}
        />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          show={show}
          onHide={handleclose}
        >
          <Offcanvas.Header closeButton className="custom-offcanvas">
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="custom-offcanvas">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link onClick={handleclose} as={Link} to="/">
                Home
              </Nav.Link>
            </Nav>
            {user?.role === "ADMIN" && (
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link onClick={handleclose} as={Link} to="/admin">
                  Admin
                </Nav.Link>
                <Nav.Link onClick={handleLogout} className="d-md-none">
                  Logout
                </Nav.Link>
              </Nav>
            )}
            {!token && (
              <Nav className="justify-content-end flex-grow-1 pe-3 d-md-none">
                <Nav.Link onClick={handleclose} as={Link} to="/auth/login">
                  Login
                </Nav.Link>
              </Nav>
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <div className="d-flex w-100 mt-2">
          <Dropdown className="border-0">
            <Dropdown.Toggle id="dropdown-basic">
              <i className=" bi bi-filter-left">TCG</i>
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
              <NavDropdown.Item as={Link} to={`/profile/${user?.userId}`}>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={`/favorites/${user?.userId}`}>
                Favorites
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={`/collection/${user?.userId}`}>
                Collection
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          )}
        </div>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent
