import React from "react";
import styles from "../../public/static/css/admin/AddAPatient.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header";
import {
  Card,
  Modal,
  Form,
  Row,
  Col,
  Container,
  Button,
} from "react-bootstrap";
import SideBar from "../../components/sideBar/SideBarAdminDash";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import prescribe from "../../HardHat/artifacts/contracts/prescribe_medicine.sol/Prescription.json";
import medicine from "../../HardHat/artifacts/contracts/medicine.sol/Medicine.json";
import { prescribeAdd, medicineAdd } from "../constants";
const AdminDashboardAddPatient = () => {
  const prescribeAddress = prescribeAdd;
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    router.push("/adminPages/PatientView");
  };
  const [formData, setFormData] = useState({
    patientName: "",
    walletAddress: "",
    emailID: "",
    phoneNumber: "",
    aadharCard: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    
      try {
        const response = await fetch("http://localhost:5000/api/patientAdd", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientName: formData.patientName,
            walletAddress: formData.walletAddress,
            emailID: formData.emailID,
            phoneNumber: formData.phoneNumber,
            aadharCard: formData.aadharCard,
          }),
        });
        const responseData = await response.json();
        console.log(responseData);
      } catch (err) {
        console.log(err);
      }
      setShow(true);
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
              <Form onSubmit={handleSubmit}>
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
                      value={formData.patientName}
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
                      value={formData.walletAddress}
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
                      value={formData.emailID}
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
                      value={formData.phoneNumber}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicAadharCard"
                >
                  <Form.Label column sm={4}>
                    Aadhar Card
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="aadharCard"
                      type="number"
                      placeholder="Enter Aadhar Card"
                      onChange={handleChange}
                      value={formData.aadharCard}
                    />
                  </Col>
                </Form.Group>

                <Col sm={12} className="text-center">
                  <Button
                    variant="outline-primary"
                    type="submit"
                    // onClick={submitFormDoctor}
                  >
                    Submit
                  </Button>
                </Col>
              </Form>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Addition Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Patient <strong>{formData.DoctorName} </strong> Added
                  Succesfully
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </Card>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboardAddPatient;
