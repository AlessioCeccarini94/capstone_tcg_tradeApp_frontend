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
                <p className="text-secondary text-center p-1 align-middle d-flex justify-content-between align-items-center mx-3">
                  USER:
                  <Button>Delete User</Button>
                </p>
                <ListGroup.Item className="d-flex justify-content-between bg-primary text-secondary border-secondary">
                  First name: <br /> {user.firstName} <Button>Update</Button>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between bg-primary text-secondary border-secondary">
                  Last name: <br /> {user.lastName}
                  <Button>Update</Button>{" "}
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between bg-primary text-secondary border-secondary">
                  Username: <br /> {user.username}
                  <Button>Update</Button>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between bg-primary text-secondary border-secondary">
                  Email: <br /> {user.email}
                  <Button>Update</Button>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between bg-primary text-secondary border-secondary">
                  City: <br /> {user.city.cityName}
                  <Button>Update</Button>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between bg-primary text-secondary border-secondary">
                  Role: <br /> {user.role}
                  <Button>Update</Button>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between bg-primary text-secondary border-secondary">
                  User id: <br /> {user.userId}
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
