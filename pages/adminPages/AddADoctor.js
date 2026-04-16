import React from "react";
import styles from "../../public/static/css/admin/AddADoctor.module.css";
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

const AdminDashboardAddDoctor = () => {
  const prescribeAddress = prescribeAdd;
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    router.push("/adminPages/DoctorView");
  };
  const [formData, setFormData] = useState({
    DoctorName: "",
    walletAddress: "",
    DOB: "",
    emailID: "",
    phoneNumber: "",
    speciality: "",
    doctorRegNo: "",
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
    v(validateRequired(formData.DoctorName, "Doctor name"), "DoctorName");
    v(validateEthAddress(formData.walletAddress), "walletAddress");
    v(validateRequired(formData.DOB, "Date of birth"), "DOB");
    v(validateRequired(formData.emailID, "Email"), "emailID");
    v(validateRequired(formData.phoneNumber, "Phone number"), "phoneNumber");
    v(validateRequired(formData.speciality, "Speciality"), "speciality");
    v(validateRequired(formData.doctorRegNo, "Registration number"), "doctorRegNo");
    setFieldErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm() || submitting) return;
    setSubmitting(true);
    console.log(formData);
    const res = await addDoctorInContract(formData.walletAddress);
    if (res) {
      try {
        const response = await fetch(`${API_BASE}/api/doctorAdd`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            DoctorName: formData.DoctorName,
            walletAddress: formData.walletAddress,
            DOB: formData.DOB,
            emailID: formData.emailID,
            phoneNumber: formData.phoneNumber,
            speciality: formData.speciality,
            doctorRegNo: formData.doctorRegNo,
          }),
        });
        const responseData = await response.json();
        console.log(responseData);
      } catch (err) {
        console.log(err);
      }
      setShow(true);
    }
    setSubmitting(false);
  };
  const addDoctorInContract = async (walletAddress) => {
    console.log("Contract Called");
    try {
      if (typeof window.ethereum !== undefined) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const prescribeContract = new ethers.Contract(
          prescribeAdd,
          prescribe.abi,
          signer
        );
        const transactionResponse = await prescribeContract.addDoctor(
          walletAddress
        );
        await listenForTransactionMine(transactionResponse, provider);
        console.log("RAN");
        return true;
      }
    } catch (error) {
      console.log(error);
      console.log("DID NOT RUN");
      console.log(window.ethereum);
      return false;
    }
  };
  const listenForTransactionMine = (transactionResponse, provider) => {
    console.log(`Mining ${transactionResponse.hash}...`);
    return new Promise((resolve, reject) => {
      provider.once(transactionResponse.hash, (transactionReceipt) => {
        console.log(
          `Completed with ${transactionReceipt.confirmations} confirmations`
        );
        resolve();
      });
    });
  };

  return (
    <DashboardLayout role="admin">
          <Container className={styles.mainContainerDash}>
            <Container className={styles.containerForm}></Container>
            <Card className={styles.cardFormContainer}>
              <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="formBasicName">
                  <Form.Label column sm={4}>
                    Doctor Name
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="DoctorName"
                      placeholder="Enter Name Of Doctor"
                      onChange={handleChange}
                      value={formData.DoctorName}
                      isInvalid={!!fieldErrors.DoctorName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.DoctorName}
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
                      Must match the wallet enrolled as a prescriber on-chain.
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.walletAddress}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formBasicDOB">
                  <Form.Label column sm={4}>
                    DOB
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="DOB"
                      type="text"
                      placeholder="Enter Date Of Birth"
                      onChange={handleChange}
                      value={formData.DOB}
                      isInvalid={!!fieldErrors.DOB}
                    />
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.DOB}
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
                  controlId="formBasicSpeciality"
                >
                  <Form.Label column sm={4}>
                    Speciality
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="speciality"
                      type="text"
                      placeholder="Enter Speciality"
                      onChange={handleChange}
                      value={formData.speciality}
                      isInvalid={!!fieldErrors.speciality}
                    />
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.speciality}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicDoctorRegNo"
                >
                  <Form.Label column sm={4}>
                    Doctor Registration Number
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="doctorRegNo"
                      type="text"
                      placeholder="Enter Reg No"
                      onChange={handleChange}
                      value={formData.doctorRegNo}
                      isInvalid={!!fieldErrors.doctorRegNo}
                    />
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.doctorRegNo}
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
                  Doctor <strong>{formData.DoctorName} </strong> Added
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

export default AdminDashboardAddDoctor;
