import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import { Link } from "react-router-dom"

const LoginForm = () => {
  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center border border-2 border-secondary w-50 mx-auto py-5"
      >
        <Form className="mt-5">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group
            as={Link}
            to="/register"
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
