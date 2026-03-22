import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../../redux/actions/userActions"

import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Row from "react-bootstrap/Row"
import { useNavigate } from "react-router-dom"

const Registration = () => {
  // const
  const [cities, setCities] = useState([])
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    cityId: "",
  })

  useEffect(() => {
    fetch("https://tgc-tradeapp-be.onrender.com/cities")
      .then((res) => res.json())
      .then((data) => setCities(data))
  }, [])
  //handle
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
      return
    }
    dispatch(addUser(formData)).then((res) => {
      if (res.success) {
        setError("")
      } else {
        setError(res.message)
      }
      navigate("/auth/login")
    })
    setValidated(true)
  }
  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      className="mt-5 px-5 d-lg-flex flex-column justify-content-between w-50 mx-auto border border-2 border-secondary py-5"
    >
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>

          <Form.Control
            required
            type="text"
            placeholder="First name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group
          as={Col}
          md="8 mx-auto mt-3"
          controlId="validationCustomEmail"
        >
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Email"
              aria-describedby="inputGroupPrepend"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            isInvalid={!!error}
          />
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6">
          <Form.Label>City</Form.Label>

          <Form.Select
            name="cityId"
            value={formData.cityId}
            onChange={handleChange}
            required
          >
            <option value="">Choose city</option>

            {cities?.map((city) => (
              <option key={city.id} value={city.id}>
                {city.cityName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button variant="secondary" type="submit">
        Join
      </Button>
    </Form>
  )
}
export default Registration
