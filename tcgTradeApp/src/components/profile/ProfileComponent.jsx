import { useEffect } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { getUser } from "../../redux/actions/userActions"

const ProfileComponent = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.users)
  useEffect(() => {
    dispatch(getUser())
  }, [])
  return (
    <>
      <h1 className="text-center">Profile</h1>
      <Container className="border border-5 border-secondary w-50 mb-4">
        <Row>
          <Col className="d-flex flex-column justify-content-evenly">
            <p>Firstname:</p>
            <p>Lastname: </p>
            <p>Username: </p>
            <p>Email: </p>
            <p>Image: </p>
          </Col>
          <Col>
            <p className="d-flex justify-content-between align-items-center my-5">
              {user?.firstName}
              <Button>Edit</Button>
            </p>
            <p className="d-flex justify-content-between align-items-center my-5">
              {user?.lastName}
              <Button>Edit</Button>
            </p>
            <p className="d-flex justify-content-between align-items-center my-5">
              {user?.username}
              <Button>Edit</Button>
            </p>
            <p className="d-flex justify-content-between align-items-center my-5">
              {user?.email}
              <Button>Edit</Button>
            </p>
            <p className="d-flex justify-content-between align-items-center my-5">
              <img src={user?.image} alt="" />
              <Button>Edit</Button>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ProfileComponent
