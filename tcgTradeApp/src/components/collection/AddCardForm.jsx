import React, { useState } from "react"
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap"

const addCard = () => {
  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    setValidated(true)
  }

  return (
    <div>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="mt-5 px-5 d-lg-flex flex-column justify-content-between w-50 mx-auto border border-2 border-secondary py-5"
      >
        <Row className="mb-3 align-items-center justify-content-center">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Card Name</Form.Label>
            <Form.Control required type="text" placeholder="Card Name" />
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Card Condition</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Mint</option>
              <option value="1">Near Mint</option>
              <option value="2">Excellent</option>
              <option value="3">Good</option>
              <option value="4">Light Played</option>
              <option value="5">Played</option>
              <option value="6">Poor</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-3 align-items-center justify-content-center">
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Game</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Set</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Button variant="secondary" type="submit" className="mx-auto mt-4">
          Add Card
        </Button>
      </Form>
    </div>
  )
}

export default addCard
