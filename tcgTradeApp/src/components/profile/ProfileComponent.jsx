import { useRef, useEffect, useState } from "react"
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  Form,
  Modal,
} from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { GoPencil } from "react-icons/go"
import { getUser, imagePatch, editUser } from "../../redux/actions/userActions"

const ProfileComponent = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.users)
  const fileInputRef = useRef(null)
  const [cities, setCities] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    cityId: "",
  })

  //---------------- HANDLES ------------------

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImg = (e) => {}

  const handleSave = () => {
    dispatch(editUser(formData, user.userId))
    setIsEditing(false)
  }

  const handleClick = () => {
    fileInputRef.current.click()
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0]

    // -------------------------------------------

    if (file) {
      dispatch(imagePatch(file, user.userId))
    }
  }
  useEffect(() => {
    dispatch(getUser())
  }, [])
  useEffect(() => {
    if (user && cities.length > 0) {
      const selectedCity = cities.find((city) => city.cityName === user.city)
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        cityId: selectedCity?.id || "",
      })
    }
  }, [user, cities])
  useEffect(() => {
    fetch("http://localhost:3023/cities")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setCities(data)
      })
  }, [])
  return (
    <>
      <h1 className="text-center">Profile</h1>
      <Container className="border border-5 border-secondary mb-4">
        <Row>
          <Col className="d-flex flex-column justify-content-evenly">
            Firstname:
          </Col>
          <Col className="text-muted">
            <p className="d-flex justify-content-between align-items-center my-5">
              {isEditing ? (
                <input
                  name="firstName"
                  onChange={handleChange}
                  value={formData.firstName}
                />
              ) : (
                user?.firstName
              )}
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex flex-column justify-content-evenly">
            Lastname:
          </Col>
          <Col className="text-muted">
            <p className="d-flex justify-content-between align-items-center my-5">
              {isEditing ? (
                <input
                  name="lastName"
                  onChange={handleChange}
                  value={formData.lastName}
                />
              ) : (
                user?.lastName
              )}
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex flex-column justify-content-evenly">
            Username:
          </Col>
          <Col className="text-muted d-flex flex-column justify-content-evenly">
            <p className="d-flex justify-content-between align-items-center my-5">
              {isEditing ? (
                <input
                  name="username"
                  onChange={handleChange}
                  value={formData.username}
                />
              ) : (
                user?.username
              )}
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex flex-column justify-content-evenly">
            Email:
          </Col>
          <Col className="text-muted d-flex flex-column justify-content-evenly">
            <p className="d-flex justify-content-between align-items-center my-5 overflow-auto">
              {isEditing ? (
                <input
                  className="email-input"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                />
              ) : (
                user?.email
              )}
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex flex-column justify-content-evenly">City:</Col>
          <Col className="text-muted d-flex flex-column justify-content-evenly">
            <p className="d-flex justify-content-between align-items-center my-5 overflow-auto">
              {isEditing ? (
                <Form>
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
                </Form>
              ) : (
                user?.city
              )}
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex flex-column justify-content-evenly">Image</Col>
          <Col className="text-muted d-flex flex-column justify-content-evenly">
            <p className="profile-img d-flex justify-content-between align-items-center my-5 ">
              <img
                onClick={() => {
                  setShowModal(true)
                }}
                src={user?.image}
                alt=""
              />
              <Badge onClick={handleClick} as={Button} bg="secondary">
                <GoPencil />
              </Badge>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </p>
          </Col>
        </Row>
        <div className="d-flex justify-content-center">
          <Button
            className="text-center w-50 my-3"
            variant="secondary"
            onClick={() => {
              if (isEditing) {
                handleSave()
              } else {
                setIsEditing(true)
              }
            }}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        </div>
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          size="lg"
        >
          <Modal.Body className="text-center bg-dark p-0">
            <img
              src={user?.image}
              alt=""
              style={{
                width: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
              }}
            />
          </Modal.Body>
        </Modal>
      </Container>
    </>
  )
}

export default ProfileComponent
