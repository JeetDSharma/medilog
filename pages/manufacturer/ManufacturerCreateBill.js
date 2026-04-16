import React from "react"
import DashboardLayout from "../../components/DashboardLayout"
import styles from "../../public/static/css/manufacturer/ManufacturerCreateBill.module.css"
import {
  Card,
  Form,
  Row,
  Col,
  Container,
  Modal,
  Button,
} from "react-bootstrap"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

const ManufacturerDashAddDrug = () => {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
    router.push("/manufacturer/ManufacturerCreateBill")
  }
  useEffect(() => { }, [])
  const [formData, setFormData] = useState({
    SellID: "",
    MedicineSrNoList: "",
    Price: "",
    PharmacyWalletAddress: "",
    ManufacturerWalletAddress: "",
  })
  const [loadedMedicine, setLoadedMedicine] = useState([])
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(formData)
    setShow(true)
  }
  return (
    <DashboardLayout role="manufacturer">
          <Container className={ styles.mainContainerDash }>
            <Container className={ styles.containerForm }></Container>
            <Card className={ styles.cardFormContainer }>
              <Form onSubmit={ handleSubmit }>
                <Form.Group
                  as={ Row }
                  className="mb-3"
                  controlId="formBasicSellID"
                >
                  <Form.Label column sm={ 4 }>
                    Sell ID
                  </Form.Label>
                  <Col sm={ 8 }>
                    <Form.Control
                      type="text"
                      name="SellID"
                      placeholder="Enter Sell ID"
                      onChange={ handleChange }
                      value={ formData.SellID }
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={ Row }
                  className="mb-3"
                  controlId="formBasicMedicineSrNoList"
                >
                  <Form.Label column sm={ 4 }>
                    Medicine
                  </Form.Label>
                  <Col sm={ 8 }>
                    <Form.Control
                      name="MedicineSrNoList"
                      type="number"
                      placeholder="Medicine Sr No"
                      onChange={ handleChange }
                      value={ formData.MedicineSrNoList }
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={ Row }
                  className="mb-3"
                  controlId="formBasicPrice"
                >
                  <Form.Label column sm={ 4 }>
                    Price
                  </Form.Label>
                  <Col sm={ 8 }>
                    <Form.Control
                      name="Price"
                      type="text"
                      placeholder="Enter Price"
                      onChange={ handleChange }
                      value={ formData.Price }
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={ Row }
                  className="mb-3"
                  controlId="formBasicPharmacyWalletAddress"
                >
                  <Form.Label column sm={ 4 }>
                    Pharmacy Wallet Address
                  </Form.Label>
                  <Col sm={ 8 }>
                    <Form.Control
                      name="PharmacyWalletAddress"
                      type="text"
                      placeholder="Enter Pharmacy Wallet Address"
                      onChange={ handleChange }
                      value={ formData.PharmacyWalletAddress }
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={ Row }
                  className="mb-3"
                  controlId="formBasicManufacturerWalletAddress"
                >
                  <Form.Label column sm={ 4 }>
                    Manufacturer Wallet Address
                  </Form.Label>
                  <Col sm={ 8 }>
                    <Form.Control
                      name="ManufacturerWalletAddress"
                      type="text"
                      placeholder="Enter Manufacturer Wallet Address"
                      onChange={ handleChange }
                      value={
                        formData.ManufacturerWalletAddress
                      }
                    />
                  </Col>
                </Form.Group>

                <Col sm={ 12 } className="text-center">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Col>
                <Modal show={ show } onHide={ handleClose }>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      Addition Successful
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Medicine Added Successfully
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
              </Form>
            </Card>
          </Container>
    </DashboardLayout>
  )
}

export default ManufacturerDashAddDrug
