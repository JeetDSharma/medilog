import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import DashboardLayout from "../../components/DashboardLayout"
import styles from "../../public/static/css/patient/PatientCheckMedicine.module.css"
import {
  Modal,
  Table,
  Form,
  Card,
  Row,
  Col,
  Container,
  Button,
  InputGroup,
} from "react-bootstrap"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AiOutlineQrcode } from "react-icons/ai"
import { QrReader } from "react-qr-reader"
import { IoSearchCircleOutline } from "react-icons/io5"

const sampleData = {
  medicineName: "Paracetamol",
  medicineExpiry: "2021-12-31",
  medicinePrice: "100",
  medicineManufacturer: "Cipla",
  medicineDescription: "This is a sample description",
  medicineManufacturerAddress: "0x1234567890",
}

const PatientCheckMedicine = () => {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [dataqr, setData] = useState({})
  const [validMedicine, setValidMedicine] = useState(false)
  const [formData, setFormData] = useState({ medicineAdd: "" })
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [disabledMedicineAdd, setDisabledWallet] = useState(false)
  const handleError = (err) => {
    console.log(err)
  }
  const handleScan = (data) => {
    if (data !== null && data !== undefined) {
      console.log(data)
      let temp = data.text.slice(9)
      setFormData({ ...formData, medicineAdd: temp })
      setDisabledWallet(true)
      setShow(false)
    }
    setData(data)
    setValidMedicine(true)
  }

  const showMedicineDetails = () => {
    console.log("Verified")
    return (
      <Table className={ styles.resultTableMain }>
        <tbody>
          <tr>
            <th>Medicine Name</th>
            <td>{ sampleData.medicineName }</td>
          </tr>
          <tr>
            <th>Medicine Expiry</th>
            <td>{ sampleData.medicineExpiry }</td>
          </tr>
          <tr>
            <th>Medicine Price</th>
            <td>{ sampleData.medicinePrice }</td>
          </tr>
          <tr>
            <th>Medicine Manufacturer</th>
            <td>{ sampleData.medicineManufacturer }</td>
          </tr>
          <tr>
            <th>Medicine Description</th>
            <td>{ sampleData.medicineDescription }</td>
          </tr>
          <tr>
            <th>Medicine Manufacturer Address</th>
            <td>{ sampleData.medicineManufacturerAddress }</td>
          </tr>
        </tbody>
      </Table>
    )
  }
  const submitHandler = () => {
    if (validMedicine) {
      // document.getElementById("medicineDetails").innerText = showMedicineDetails()
      return showMedicineDetails()
    } else {
      return (
        <div className={ styles.emptySpacePlaceHolder }>
          {/* <h1>Invalid Medicine Address</h1> */ }
          <IoSearchCircleOutline />
        </div>
      )
    }
  }
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }
  useEffect(() => { }, [])
  return (
    <DashboardLayout role="patient">
          <Container className={ styles.mainContainerDash }>
            <Card className={ styles.mainCard }>
              <Form onSubmit={ submitHandler }>
                <Form.Group
                  as={ Row }
                  className="mb-0"
                  controlId="medicineAddressForm"
                >
                  <Form.Label column sm={ 4 }>
                    Enter Address of Medicine
                  </Form.Label>
                  <Col sm={ 8 }>
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Enter Medicine Address"
                        name="medicineAddress"
                        onChange={ handleChange }
                        value={ formData.medicineAddress }
                        disabled={ disabledMedicineAdd }
                      />
                      <Button
                        variant="outline-secondary"
                        id="qrButton"
                        onClick={ handleShow }
                      >
                        <AiOutlineQrcode />
                      </Button>
                    </InputGroup>
                  </Col>
                </Form.Group>
                <Col sm={ 12 } className="text-center">
                  <Button
                    variant="success"
                    onClick={ submitHandler }
                  >
                    Verify Medicine{ " " }
                  </Button>
                </Col>
                <Modal show={ show } onHide={ handleClose }>
                  <Modal.Header closeButton>
                    <Modal.Title>Scan QR Code</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <QrReader
                      delay={ 100 }
                      onError={ handleError }
                      onResult={ handleScan }
                    ></QrReader>
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

                <Container id="medicineDetails" className={ styles.medicineDetailsTable }>
                  { submitHandler() }
                </Container>
              </Form>
            </Card>
          </Container>
    </DashboardLayout>
  )
}

export default PatientCheckMedicine
