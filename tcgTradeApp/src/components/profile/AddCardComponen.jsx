import { Button } from "react-bootstrap"

const AddCardComponent = () => {
  return (
    <div className="d-flex justify-content-center my-5">
      <Button variant="secondary" size="lg" className="text-center me-4">
        Add Card
      </Button>
      <Button variant="secondary" size="lg" className="text-center fs-6 ms-4">
        Manage Items
      </Button>
    </div>
  )
}

export default AddCardComponent
