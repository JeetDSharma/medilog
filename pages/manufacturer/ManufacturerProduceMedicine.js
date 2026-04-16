import React from "react"
import styles from "../../public/static/css/manufacturer/AddMedicineMenu.module.css"
import "bootstrap/dist/css/bootstrap.min.css"
import DashboardLayout from "../../components/DashboardLayout"
import { Card, Form, Row, Col, Container, Button } from "react-bootstrap"
import { useEffect, useState } from "react"

const ManufacturerDashProduceMedicine = () => {
  const [formData, setFormData] = useState({
    Srno: "",
    MedicineID: "",
    MedicineName: "",
    MedicinePower: "",
    MedicineDrugs: "",
    SideEffects: "",
  })
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(formData)
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
                  controlId="formBasicPharmacyName"
                >
                  <Form.Label column sm={ 4 }>
                    Medicine ID
                  </Form.Label>
                  <Col sm={ 8 }>
                    <Form.Control
                      type="number"
                      name="MedicineID"
                      placeholder="Enter Id of Medicine"
                      onChange={ handleChange }
                      value={ formData.MedicineID }
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={ Row }
                  className="mb-3"
                  controlId="formBasicWalletAddress"
                >
                  <Form.Label column sm={ 4 }>
                    Medicine Name
                  </Form.Label>
                  <Col sm={ 8 }>
                    <Form.Control
                      name="MedicineName"
                      type="text"
                      placeholder="Enter Name of Medicine"
                      onChange={ handleChange }
                      value={ formData.MedicineName }
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={ Row }
                  className="mb-3"
                  controlId="formBasicemailID"
                >
                  <Form.Label column sm={ 4 }>
                    Medicine Power
                  </Form.Label>
                  <Col sm={ 8 }>
                    <Form.Control
                      name="MedicinePower"
                      type="number"
                      placeholder="Enter Medicine Power"
                      onChange={ handleChange }
                      value={ formData.MedicinePower }
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={ Row }
                  className="mb-3"
                  controlId="formBasicPhoneNumber"
                >
                  <Form.Label column sm={ 4 }>
                    Medicine Drugs
                  </Form.Label>
                  <Col sm={ 8 }>
                    <Form.Control
                      name="MedicineDrugs"
                      type="text"
                      placeholder="Enter Medicine Drugs"
                      onChange={ handleChange }
                      value={ formData.MedicineDrugs }
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={ Row }
                  className="mb-3"
                  controlId="formBasicaddress"
                >
                  <Form.Label column sm={ 4 }>
                    Side Effects
                  </Form.Label>
                  <Col sm={ 8 }>
                    <Form.Control
                      name="SideEffects"
                      type="text"
                      placeholder="Enter Side Effects of Medicine"
                      onChange={ handleChange }
                      value={ formData.SideEffects }
                    />
                  </Col>
                </Form.Group>
                <Col sm={ 12 } className="text-center">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Col>
              </Form>
            </Card>
          </Container>
    </DashboardLayout>
  )
}

export default ManufacturerDashProduceMedicine
