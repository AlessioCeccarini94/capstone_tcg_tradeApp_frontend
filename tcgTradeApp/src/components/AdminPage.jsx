import { use, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from "../redux/actions/adminActions"
import { ListGroup, Button } from "react-bootstrap"

const AdminPage = () => {
  const dispatch = useDispatch()

  const users = useSelector((state) => state.admin.users)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  return (
    <div>
      <h1>Admin Page</h1>

      <>
        <ListGroup>
          {Array.isArray(users) &&
            users?.map((user) => (
              <div key={user.id} className="border border-5 border-secondary">
                <ListGroup.Item className="d-flex justify-content-between">
                  {user.firstName} <Button>Update</Button>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  {user.lastName}
                  <Button>Update</Button>{" "}
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  {user.username}
                  <Button>Update</Button>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  {user.email}
                  <Button>Update</Button>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  {user.city.cityName}
                  <Button>Update</Button>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  {user.role}
                  <Button>Update</Button>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  {user.userId}
                  <Button>Update</Button>
                </ListGroup.Item>
              </div>
            ))}
        </ListGroup>
      </>
    </div>
  )
}

export default AdminPage
