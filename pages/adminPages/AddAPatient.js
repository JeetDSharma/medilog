import React from "react";
import styles from "../../public/static/css/admin/AddAPatient.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardLayout from "../../components/DashboardLayout"
import {
  Card,
  Modal,
  Form,
  Row,
  Col,
  Container,
  Button,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import prescribe from "../../HardHat/artifacts/contracts/prescribe_medicine.sol/Prescription.json";
import medicine from "../../HardHat/artifacts/contracts/medicine.sol/Medicine.json";
import { prescribeAdd, medicineAdd } from "../../lib/contractAddresses"
import { API_BASE } from "../../lib/apiBase";
import { validateEthAddress, validateRequired } from "../../lib/formValidation";

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
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name } = event.target;
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
    setFormData({ ...formData, [name]: event.target.value });
  };

  const validateForm = () => {
    const e = {};
    const v = (msg, key) => {
      if (msg) e[key] = msg;
    };
    v(validateRequired(formData.patientName, "Patient name"), "patientName");
    v(validateEthAddress(formData.walletAddress), "walletAddress");
    v(validateRequired(formData.emailID, "Email"), "emailID");
    v(validateRequired(formData.phoneNumber, "Phone number"), "phoneNumber");
    v(validateRequired(formData.aadharCard, "Aadhar card"), "aadharCard");
    setFieldErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm() || submitting) return;
    setSubmitting(true);
    console.log(formData);

      try {
        const response = await fetch(`${API_BASE}/api/patientAdd`, {
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
    setSubmitting(false);
  };
  
  return (
    <DashboardLayout role="admin">
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
                      isInvalid={!!fieldErrors.patientName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.patientName}
                    </Form.Control.Feedback>
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
                      placeholder="0x…"
                      onChange={handleChange}
                      value={formData.walletAddress}
                      isInvalid={!!fieldErrors.walletAddress}
                    />
                    <Form.Text className="text-muted">
                      Patient’s wallet used for prescriptions and dispensing.
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.walletAddress}
                    </Form.Control.Feedback>
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
                      type="email"
                      placeholder="Enter Email"
                      onChange={handleChange}
                      value={formData.emailID}
                      isInvalid={!!fieldErrors.emailID}
                    />
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.emailID}
                    </Form.Control.Feedback>
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
                      type="text"
                      inputMode="numeric"
                      placeholder="Enter Phone Number"
                      onChange={handleChange}
                      value={formData.phoneNumber}
                      isInvalid={!!fieldErrors.phoneNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.phoneNumber}
                    </Form.Control.Feedback>
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
                      type="text"
                      inputMode="numeric"
                      placeholder="Enter Aadhar Card"
                      onChange={handleChange}
                      value={formData.aadharCard}
                      isInvalid={!!fieldErrors.aadharCard}
                    />
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.aadharCard}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Col sm={12} className="text-center">
                  <Button
                    variant="outline-primary"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting…" : "Submit"}
                  </Button>
                </Col>
              </Form>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Addition Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Patient <strong>{formData.patientName} </strong> Added
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
    </DashboardLayout>
  );
};

export default AdminDashboardAddPatient;
