import React from "react";
import styles from "../../public/static/css/admin/AddAPharmacy.module.css";
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
import { prescribeAdd, medicineAdd, dispenseAdd } from "../constants";
import { ethers } from "ethers";
import dispense from "../../HardHat/artifacts/contracts/dispense_medicine.sol/DispenseMedicine.json";
const AdminDashboardAddPharmacy = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const handleClose = () => {
    setShow(false);
    router.push("/adminPages/PharmacyView");
  };
  const [formData, setFormData] = useState({
    pharmacyID: "",
    PharmacyName: "",
    walletAddress: "",
    emailID: "",
    phoneNumber: "",
    address: "",
  });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const res = await addPharmacyInContract(formData.walletAddress);
    if (res) {
      try {
        console.log("CALLED");
        const response = await fetch("http://localhost:5001/api/pharmacyAdd", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pharmacyID: formData.pharmacyID,
            PharmacyName: formData.PharmacyName,
            walletAddress: formData.walletAddress,
            emailID: formData.emailID,
            phoneNumber: formData.phoneNumber,
            address: formData.address,
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
  const addPharmacyInContract = async (walletAddress) => {
    console.log("Contract Called");
    try {
      if (typeof window.ethereum !== undefined) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const dispenseContract = new ethers.Contract(
          dispenseAdd,
          dispense.abi,
          signer
        );
        const transactionResponse = await dispenseContract.addPharmacy(
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
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicpharmacyID"
                >
                  <Form.Label column sm={4}>
                    Pharmacy ID
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="pharmacyID"
                      placeholder="Enter Pharmacy ID"
                      onChange={handleChange}
                      value={formData.pharmacyID}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formBasicName">
                  <Form.Label column sm={4}>
                    Pharmacy Name
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="PharmacyName"
                      placeholder="Enter Name Of Pharmacy"
                      onChange={handleChange}
                      value={formData.PharmacyName}
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
                      name="walletAddress"
                      type="text"
                      placeholder="Enter Wallet Address"
                      onChange={handleChange}
                      value={formData.walletAddress}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicemailID"
                >
                  <Form.Label column sm={4}>
                    Email ID
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="emailID"
                      type="text"
                      placeholder="Enter Enter Email"
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
                  controlId="formBasicaddress"
                >
                  <Form.Label column sm={4}>
                    Address
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="address"
                      type="text"
                      placeholder="Enter Address"
                      onChange={handleChange}
                      value={formData.address}
                    />
                  </Col>
                </Form.Group>
                <Col sm={12} className="text-center">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Col>
              </Form>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Addition Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Pharmacy <strong>{formData.PharmacyName} </strong> Added
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

export default AdminDashboardAddPharmacy;
