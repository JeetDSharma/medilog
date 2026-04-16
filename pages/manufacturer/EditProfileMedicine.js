import React from "react"
import styles from "../../public/static/css/manufacturer/EditProfileMedicine.module.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "../../components/Header"
import { Card, Form, Row, Col, Container, Button } from "react-bootstrap"
import SideBar from "../../components/sideBar/SideBarManufacturerDash"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { AiOutlineReload } from "react-icons/ai"

const EditProfileMedicine = () => {
  const router = useRouter()
  const [loadedMedicine, setLoadedMedicine] = useState([])
  useEffect(() => {
    const requestData = async () => {
      try {
        const { id } = router.query
        const response = await fetch(
          "http://localhost:5000/api/medicineGetDetails",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              _id: router.query.id,
            }),
          }
        )
        const responseData = await response.json()
        console.log(responseData)
        setLoadedMedicine(responseData)
      } catch (err) {
        console.log(err)
      }
    }
    requestData()
  }, [])
  const [formData, setFormData] = useState({
    MedicineID: "",
    MedicineName: "",
    MedicinePower: "",
    MedicineDrugs: "",
    MRP: "",
    SideEffects: "",
  })

  const handleChange = (event) => {
    setLoadedMedicine({
      ...loadedMedicine,
      [event.target.name]: event.target.value,
    })
  }
  const handleUpdate = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch(
        "http://localhost:5000/api/medicineUpdate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: router.query.id,
            MedicineID: loadedMedicine.MedicineID,
            MedicinenName: loadedMedicine.MedicineName,
            MedicinePower: loadedMedicine.MedicinePower,
            MedicineDrugs: loadedMedicine.MedicineDrugs,
            MRP: loadedMedicine.MRP,
            SideEffects: loadedMedicine.SideEffects,
          }),
        }
      )
      const responseData = await response.json()
      // console.log(responseData)
    } catch (err) {
      console.log(err)
    }
    router.push("/manufacturer/ManufacturerViewMedicine")
  }
  return (
    <>
      <Header />
      <Row className={styles.mainContainerDashRow}>
        <SideBar />
        <Col className={styles.mainContainerDashCol}>
          <Container className={styles.mainContainerDash}>
            <Container className={styles.containerForm}></Container>
            <Card className={styles.cardFormContainer}>
              <Form onSubmit={handleUpdate}>
                <Form.Group as={Row} className="mb-3" controlId="formBasicid">
                  <Form.Label column sm={4}>
                    Medicine ID
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="MedicineID"
                      placeholder="Enter Medicine ID"
                      onChange={handleChange}
                      value={loadedMedicine.MedicineID}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicMedicineName"
                >
                  <Form.Label column sm={4}>
                    Medicine Name
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="MedicineName"
                      placeholder="Enter Medicine Name"
                      onChange={handleChange}
                      value={loadedMedicine.MedicineName}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicMedicinePower"
                >
                  <Form.Label column sm={4}>
                    Medicine Power
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="MedicinePower"
                      type="number"
                      placeholder="Enter Power Of Medicine"
                      onChange={handleChange}
                      value={loadedMedicine.MedicinePower}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicDrugs"
                >
                  <Form.Label column sm={4}>
                    Medicine Drugs
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="MedicineDrugs"
                      type="text"
                      placeholder="Enter Medicine Drugs"
                      onChange={handleChange}
                      value={loadedMedicine.MedicineDrugs}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicSideEffects"
                >
                  <Form.Label column sm={4}>
                    Side Effects
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="SideEffects"
                      type="text"
                      placeholder="Enter Side Effects"
                      onChange={handleChange}
                      value={loadedMedicine.SideEffects}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicaddress"
                >
                  <Form.Label column sm={4}>
                    MRP
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="MRP"
                      type="number"
                      placeholder="Enter Price"
                      onChange={handleChange}
                      value={loadedMedicine.MRP}
                    />
                  </Col>
                </Form.Group>
                <Col sm={12} className="text-center">
                  <Button variant="primary" type="submit">
                    <AiOutlineReload /> Update
                  </Button>
                </Col>
              </Form>
            </Card>
          </Container>
        </Col>
      </Row>
    </>
  );
}

export default EditProfileMedicine
