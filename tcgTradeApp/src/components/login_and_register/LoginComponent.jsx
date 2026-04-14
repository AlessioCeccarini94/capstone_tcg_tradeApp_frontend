import { useDispatch } from "react-redux"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../redux/actions/userActions"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser(user)).then((result) => {
      if (result?.success) {
        navigate("/")
      } else {
        alert(result?.message || "Login failed")
      }
    })
  }

  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center border border-2 border-secondary w-50 mx-auto py-5"
      >
        <Form className="mt-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group
            as={Link}
            to="/auth/register"
            className="mb-3 text-decoration-none text-secondary"
          >
            <p>Don't have an account? sing-ip here</p>
          </Form.Group>
          <Button variant="secondary" type="submit">
            Login
          </Button>
        </Form>
      </Container>
    </>
  )
}

export default LoginForm
