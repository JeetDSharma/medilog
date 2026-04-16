import React from "react"
import Header from "../../components/Header"
import styles from "../../public/static/css/manufacturer/ManufacturerSellToPharmacy.module.css"
import {
  Modal,
  Form,
  Row,
  Col,
  Container,
  Button,
  Dropdown,
} from "react-bootstrap"
import SideBar from "../../components/sideBar/SideBarManufacturerDash"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { AiOutlineQrcode } from "react-icons/ai"

const ManufacturerDash = () => {
  const router = useRouter()
  const [loadedPharmacies, setLoadedPharmacies] = useState([])
  const [manufacturerInfo, setManufacturerInfo] = useState([])
  const [loadedMedicines, setLoadedMedicines] = useState([])
  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
    router.push("/manufacturer/ManufacturerDashboard")
  }
  const [formData, setFormData] = useState({
    manufacturerAddress: "", // Taken from metamask
    saleID: "",
    medicineSerialNoList: [],
    priceOfSale: [],
    pharmacyAddress: "",
  })
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    console.log(formData)
  }
  useEffect(() => {
    // JEET WRITE CODE FOR ETHERSIGNERS HERE
    const walletAddress = "0xfa3a6089C317868655f9B15433B62F3f682D2691"
    const sendrequestPharmacy = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/pharmacylist"
        )
        const responseData = await response.json()
        console.log(responseData)
        setLoadedPharmacies(responseData)
      } catch (err) {
        console.log(err)
      }
    }
    const sendrequestMedicine = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/medicinelist"
        )
        const responseData = await response.json()
        console.log(responseData)
        setLoadedMedicines(responseData)
      } catch (err) {
        console.log(err)
      }
    }
    sendrequestPharmacy()
    sendrequestMedicine()
    setFormData({ ...formData, manufacturerAddress: walletAddress })
  }, [])
  const handleSubmit = async () => {
    console.log(formData)
    console.log("Called")
    alert("Sale Successfull")
    // setShow(true)
  }
  return (
    <>
      <Header />
      <Row className={ styles.mainContainerDashRow }>
        <SideBar />
        <Col className={ styles.mainContainerDashCol }>
          <Container className={ styles.mainContainerDash }>
            <Form onSubmit={ handleSubmit }>
              <Form.Group as={ Row } className="mb-3">
                <Form.Label column sm={ 4 }>
                  Manufacturer Address
                </Form.Label>
                <Col sm={ 8 }>
                  <Form.Control
                    type="text"
                    name="manufacturerAddress"
                    value={ formData.manufacturerAddress }
                    onChange={ handleChange }
                    disabled
                    placeholder="Enter Manufacturer Address"
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={ Row }
                className="mb-3"
                controlId="PharmacySelectForm"
              >
                <Form.Label column sm={ 4 }>
                  Pharmacy Select
                </Form.Label>
                <Col sm={ 8 }>
                  <Form.Select
                    name="pharmacyAddress"
                    as="select"
                    onChange={ handleChange }
                    value={ formData.pharmacyAddress }
                  >
                    <option value="">
                      Select Pharmacy
                    </option>
                    { loadedPharmacies.map((pharmacy) => (
                      <option
                        key={ pharmacy._id }
                        value={ pharmacy.walletAddress }
                      >
                        { pharmacy.PharmacyName } -
                        { pharmacy.walletAddress }
                      </option>
                    )) }
                  </Form.Select>
                </Col>
              </Form.Group>
              <Col sm={ 12 } className="text-center">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Form>
            <Modal show={ show } onHide={ handleClose }>
              <Modal.Header closeButton>
                <Modal.Title>Sale Successfull</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Pharmacy <strong> </strong> Sale Succesfull
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={ handleClose }
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Container>
        </Col>
      </Row>
    </>
  )
}

export default ManufacturerDash
