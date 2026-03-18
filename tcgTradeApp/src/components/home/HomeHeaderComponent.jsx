import { Container, Row, Col, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import Carousel from "react-bootstrap/Carousel"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "../../redux/actions/userActions"
import { addGameList } from "../../redux/actions/gameActions"
import { getCarousel, imagePatch } from "../../redux/actions/adminActions"

const HomeHeader = () => {
  const [index, setIndex] = useState(0)

  const [files, setFiles] = useState({})

  const dispatch = useDispatch()

  const user = useSelector((state) => state.user.users)
  const images = useSelector((state) => state.admin.carousel)

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
  }

  useEffect(() => {
    dispatch(addGameList())
    dispatch(getCarousel())
    dispatch(getUser())
    console.log(images)
    console.log(user)
  }, [dispatch])

  return (
    <Container>
      <Row>
        <Col>
          {user && user.role === "ADMIN" && (
            <div className="mb-4 d-flex justify-content-center">
              {images?.map((img) => (
                <div
                  key={img.id}
                  className="mb-3 d-flex flex-column justify-content-between align-items-center"
                >
                  <img
                    src={img.image}
                    alt=""
                    style={{ width: "200px", display: "block" }}
                  />

                  <input
                    type="file"
                    onChange={(e) =>
                      setFiles((prev) => ({
                        ...prev,
                        [img.id]: e.target.files[0],
                      }))
                    }
                  />

                  <Button
                    className="mt-2"
                    variant="secondary"
                    disabled={!files[img.id]}
                    onClick={() => dispatch(imagePatch(files[img.id], img.id))}
                  >
                    Update Image
                  </Button>
                </div>
              ))}
            </div>
          )}
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {images?.map((img) => (
              <Carousel.Item key={img.id}>
                <img
                  src={img.image ? img.image : "https://placecats.com/200/300"}
                  className="d-block w-100"
                  alt="carousel"
                  style={{ height: "500px", objectFit: "cover" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  )
}

export default HomeHeader
