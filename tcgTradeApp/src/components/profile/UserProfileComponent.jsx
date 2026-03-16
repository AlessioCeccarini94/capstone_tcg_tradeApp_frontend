import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getUserById } from "../../redux/actions/userActions"
import { useParams } from "react-router"
import { Container, Row, Col } from "react-bootstrap"

const UserProfileComponent = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const user = useSelector((state) => state.user.profileUser)
  useEffect(() => {
    dispatch(getUserById(id))
  }, [dispatch, id])
  return (
    <Container fluid>
      <Row className="d-flex justify-content-center w-50 mx-auto">
        <Col className="d-flex flex-column justify-content-center align-items-center">
          <img className="rounded-circle w-25" src={user?.image} alt="" />
          <p className="mt-3">{user?.username}</p>
          <p>{user?.email}</p>
          <p>{user?.city}</p>
        </Col>
      </Row>
    </Container>
  )
}
export default UserProfileComponent
