import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editUserAdmin, getAllUsers } from "../redux/actions/adminActions"
import { ListGroup, Button, Form } from "react-bootstrap"
import { deleteUser } from "../redux/actions/adminActions"
import { useNavigate } from "react-router-dom"

const AdminPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const users = useSelector((state) => state.admin.users)
  const [editingUserId, setEditingUserId] = useState(null)
  const [formData, setFormData] = useState({})
  const [cities, setCities] = useState([])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSave = () => {
    dispatch(editUser(formData, user.userId))
    setIsEditing(false)
  }
  useEffect(() => {
    fetch("http://localhost:3023/cities")
      .then((res) => res.json())
      .then((data) => setCities(data))
  }, [])
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
                <p className="text-secondary text-center p-1 align-middle d-flex justify-content-between align-content-center">
                  USER:
                  <div>
                    <Button
                      onClick={() => dispatch(deleteUser(user.userId))}
                      className="mx-2"
                      variant="secondary"
                    >
                      Delete User
                    </Button>
                    {editingUserId === user.userId && (
                      <Button
                        className="m-2"
                        onClick={() => {
                          dispatch(editUserAdmin(formData, user.userId))
                          setEditingUserId(null)
                          window.location.reload()
                        }}
                      >
                        Save
                      </Button>
                    )}
                    <Button
                      onClick={() => {
                        dispatch(editUserAdmin(user, user.userId))
                        setEditingUserId(user.userId)
                        setFormData({
                          firstName: user.firstName,
                          lastName: user.lastName,
                          username: user.username,
                          email: user.email,
                          cityId: user.cityId,
                          role: user.role,
                        })
                      }}
                      className="mx-2"
                      variant="secondary"
                    >
                      Edit User
                    </Button>
                  </div>
                </p>
                <ListGroup.Item className="d-flex justify-content-between bg-primary text-secondary border-secondary">
                  First name: <br />{" "}
                  {editingUserId === user.userId ? (
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  ) : (
                    user.firstName
                  )}
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between bg-primary text-secondary border-secondary">
                  Last name: <br />{" "}
                  {editingUserId === user.userId ? (
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  ) : (
                    user.lastName
                  )}{" "}
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between bg-primary text-secondary border-secondary">
                  Username: <br />{" "}
                  {editingUserId === user.userId ? (
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  ) : (
                    user.username
                  )}
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between bg-primary text-secondary border-secondary">
                  Email: <br />{" "}
                  {editingUserId === user.userId ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  ) : (
                    user.email
                  )}
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between bg-primary text-secondary border-secondary">
                  Role: <br />{" "}
                  {editingUserId === user.userId ? (
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    />
                  ) : (
                    user.role
                  )}
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between bg-primary text-secondary border-secondary">
                  {editingUserId === user.userId ? (
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
                    user?.city?.cityName
                  )}
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between bg-primary text-secondary border-secondary">
                  User id: <br /> {user.userId}
                </ListGroup.Item>
              </div>
            ))}
        </ListGroup>
      </>
    </div>
  )
}

export default AdminPage
