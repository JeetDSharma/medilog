import React from "react";
import styles from "../../public/static/css/admin/EditProfilePatient.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header";
import { Card, Form, Row, Col, Container, Button } from "react-bootstrap";
import SideBar from "../../components/sideBar/SideBarAdminDash";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineReload } from "react-icons/ai";

const EditProfilePatient = () => {
  const router = useRouter();
  const [loadedPatient, setLoadedPatient] = useState([]);
  useEffect(() => {
    const requestData = async () => {
      try {
        const { id } = router.query;
        const response = await fetch(
          "http://localhost:5001/api/patientGetDetails",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              _id: router.query.id,
            }),
          }
        );
        const responseData = await response.json();
        console.log(responseData);
        setLoadedPatient(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    requestData();
  }, []);
  const [formData, setFormData] = useState({
    patientName: "",
    walletAddress: "",
    emailID: "",
    phoneNumber: "",
    aadharCard: "",
  });

  const handleChange = (event) => {
    setLoadedPatient({
      ...loadedPatient,
      [event.target.name]: event.target.value,
    });
  };
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/patientUpdate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: router.query.id,
          patientName: loadedPatient.patientName,
          walletAddress: loadedPatient.walletAddress,
          emailID: loadedPatient.emailID,
          phoneNumber: loadedPatient.phoneNumber,
          aadharCard: loadedPatient.aadharCard,
        }),
      });
      const responseData = await response.json();
    } catch (err) {
      console.log(err);
    }
    router.push("/adminPages/PatientView");
  };
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
                <Form.Group as={Row} className="mb-3" controlId="formBasicName">
                  <Form.Label column sm={4}>
                    Patient Name
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="patientName"
                      placeholder="Enter Name Of Patient"
                      onChange={handleChange}
                      value={loadedPatient.patientName}
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
                      value={loadedPatient.walletAddress}
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
                      value={loadedPatient.emailID}
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
                      value={loadedPatient.phoneNumber}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicSpeciality"
                >
                  <Form.Label column sm={4}>
                    Aadhar Card
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="aadharCard"
                      type="number"
                      placeholder="Enter Aadhar Card Number"
                      onChange={handleChange}
                      value={loadedPatient.speciality}
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
};

export default EditProfilePatient;
