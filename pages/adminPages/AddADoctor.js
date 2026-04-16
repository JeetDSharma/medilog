import React from "react";
import styles from "../../public/static/css/admin/AddADoctor.module.css";
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

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const res = await addDoctorInContract(formData.walletAddress);
    if (res) {
      try {
        const response = await fetch("http://localhost:5001/api/doctorAdd", {
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
                    Doctor Name
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="DoctorName"
                      placeholder="Enter Name Of Doctor"
                      onChange={handleChange}
                      value={formData.DoctorName}
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
                    />
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
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboardAddDoctor;
