import React from "react"
import Header from "../../components/Header"
import styles from "../../public/static/css/doctor/DoctorPatientCheck.module.css"
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
import SideBar from "../../components/sideBar/SideBarDoctorDash"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AiOutlineQrcode } from "react-icons/ai"
import { QrReader } from "react-qr-reader"
import { IoSearchCircleOutline } from "react-icons/io5"

const sampleData = {
  patientName: "Paracetamol",
  walletAddress: "2021-12-31",
  emailID: "100",
  phoneNumber: "Cipla",
}

const DoctorPatientCheck = () => {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [dataqr, setData] = useState({})
  const [validPatient, setValidPatient] = useState(true)
  const [formData, setFormData] = useState({ patientAddress: "" })
  const [patientDetails, setPatientDetails] = useState({})

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [disabledPatientWallet, setDisabledPatientWallet] = useState(false)
  const handleError = (err) => {
    console.log(err)
  }
  const handleScan = (data) => {
    if (data !== null && data !== undefined) {
      console.log(data)
      let temp = data.text.slice(9)
      setFormData({ ...formData, patientAddress: temp })
      setDisabledPatientWallet(true)
      setShow(false)
    }
    setData(data)
    setValidPatient(true)
  }
  const submitHandler = () => {
    requestDataPatient()
    if (validPatient) {
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
  useEffect(() => {

    // requestDataPatient()
  }, [])
  const requestDataPatient = async () => {
    try {
      // const walletAddress = "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
      const response = await fetch(
        `http://localhost:5001/api/patientGetDetailByWallet`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            walletAddress: formData.patientAddress,
          }),
        }
      )
      const responseData = await response.json()
      console.log(responseData)
      setPatientDetails(responseData)
      return responseData
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Header />
      <Row className={ styles.mainContainerDashRow }>
        <SideBar />
        <Col className={ styles.mainContainerDashCol }>
          <Container className={ styles.mainContainerDash }>
            <Card className={ styles.mainCard }>
              <Form onSubmit={ submitHandler }>
                <Form.Group
                  as={ Row }
                  className="mb-0"
                  controlId="patientAddressForm"
                >
                  <Form.Label column sm={ 4 }>
                    Enter Address of Patient
                  </Form.Label>
                  <Col sm={ 8 }>
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Enter Patient Address"
                        name="patientAddress"
                        onChange={ handleChange }
                        value={ formData.patientAddress }
                        disabled={ disabledPatientWallet }
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
                    Get Patient Details{ " " }
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

                <Container id="patientDetails" className={ styles.patientDetailsTable }>
                  <Table className={ styles.resultTableMain }>
                    <tbody>
                      <tr>
                        <th>Patient Name</th>
                        <td>{ patientDetails.patientName }</td>
                      </tr>
                      <tr>
                        <th> Wallet Address</th>
                        <td>{ patientDetails.walletAddress }</td>
                      </tr>
                      <tr>
                        <th>Email ID</th>
                        <td>{ patientDetails.emailID }</td>
                      </tr>
                      <tr>
                        <th>Phone Number</th>
                        <td>{ patientDetails.phoneNumber }</td>
                      </tr>
                    </tbody>
                  </Table>
                </Container>
              </Form>
            </Card>
          </Container>
        </Col>
      </Row>
    </>
  )
}

export default DoctorPatientCheck
