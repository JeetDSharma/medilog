import React from "react"
import styles from "../../public/static/css/admin/EditProfilePharmacy.module.css"
import "bootstrap/dist/css/bootstrap.min.css"
import DashboardLayout from "../../components/DashboardLayout"
import { Card, Form, Row, Col, Container, Button } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { AiOutlineReload } from "react-icons/ai"

const EditProfilePharmacy = () => {
  const router = useRouter()
  const [loadedPharmacy, setLoadedPharmacy] = useState([])
  useEffect(() => {
    const requestData = async () => {
      try {
        const { id } = router.query
        const response = await fetch(
          "http://localhost:5001/api/pharmacyGetDetails",
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
        setLoadedPharmacy(responseData)
      } catch (err) {
        console.log(err)
      }
    }
    requestData()
  }, [])
  const [formData, setFormData] = useState({
    PharmacyName: "",
    walletAddress: "",
    emailID: "",
    phoneNumber: "",
    address: "",
  })

  const handleChange = (event) => {
    setLoadedPharmacy({
      ...loadedPharmacy,
      [event.target.name]: event.target.value,
    })
  }
  const handleUpdate = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch(
        "http://localhost:5001/api/pharmacyUpdate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: router.query.id,
            PharmacyName: loadedPharmacy.PharmacyName,
            walletAddress: loadedPharmacy.walletAddress,
            emailID: loadedPharmacy.emailID,
            phoneNumber: loadedPharmacy.phoneNumber,
            address: loadedPharmacy.address,
          }),
        }
      )
      const responseData = await response.json()
      // console.log(responseData)
    } catch (err) {
      console.log(err)
    }
    router.push("/adminPages/PharmacyView")
  }
  return (
    <DashboardLayout role="admin">
          <Container className={styles.mainContainerDash}>
            <Container className={styles.containerForm}></Container>
            <Card className={styles.cardFormContainer}>
              <Form onSubmit={handleUpdate}>
                <Form.Group as={Row} className="mb-3" controlId="formBasicName">
                  <Form.Label column sm={4}>
                    Pharmacy Name
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="pharmacyName"
                      placeholder="Enter Name Of Pharmacy"
                      onChange={handleChange}
                      value={loadedPharmacy.PharmacyName}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicWalletAddress"
                >
                  <Form.Label column sm={4}>
                    Wallet Address
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="walletAddress"
                      placeholder="Enter Wallet Address"
                      onChange={handleChange}
                      value={loadedPharmacy.walletAddress}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicEmail"
                >
                  <Form.Label column sm={4}>
                    Email ID
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="emailID"
                      type="text"
                      placeholder="Enter Email"
                      onChange={handleChange}
                      value={loadedPharmacy.emailID}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicPhoneNumber"
                >
                  <Form.Label column sm={4}>
                    Phone Number
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="phoneNumber"
                      type="number"
                      placeholder="Enter Phone Number"
                      onChange={handleChange}
                      value={loadedPharmacy.phoneNumber}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicpharmacyAddress"
                >
                  <Form.Label column sm={4}>
                    Address
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="pharmacyRegNo"
                      type="text"
                      placeholder="Enter Reg No"
                      onChange={handleChange}
                      value={loadedPharmacy.address}
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
    </DashboardLayout>
  );
}

export default EditProfilePharmacy
