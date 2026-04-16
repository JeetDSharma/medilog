import React from "react";
import styles from "../../public/static/css/admin/AddAManufacturer.module.css";
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
import medicine from "../../HardHat/artifacts/contracts/medicine.sol/Medicine.json";
import { medicineAdd, prescribeAdd } from "../../lib/contractAddresses"
import { resolve } from "styled-jsx/css";
const AdminDashboardAddManufacturer = () => {
  //lcoalhost address
  console.log(medicineAdd);
  const medicineAddress = medicineAdd;
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    router.push("/adminPages/ManufacturerView");
  };
  const [formData, setFormData] = useState({
    manufacturerID: "",
    ManufacturerName: "",
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
    const res = await addManufacturerInContract(formData.walletAddress);
    if (res) {
      try {
        console.log("CALLED");
        const response = await fetch(
          "http://localhost:5001/api/manufacturerAdd",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              manufacturerID: formData.manufacturerID,
              ManufacturerName: formData.ManufacturerName,
              walletAddress: formData.walletAddress,
              emailID: formData.emailID,
              phoneNumber: formData.phoneNumber,
              address: formData.address,
            }),
          }
        );
        const responseData = await response.json();
        console.log(responseData);
      } catch (err) {
        console.log(err);
      }
      setShow(true);
    }
  };
  //add manufacturer contract
  const addManufacturerInContract = async (walletAddress) => {
    console.log("Contract Called");
    try {
      if (typeof window.ethereum !== undefined) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log(signer);
        const medicineContract = new ethers.Contract(
          medicineAddress,
          medicine.abi,
          signer
        );
        const transactionResponse = await medicineContract.addManufacturer(
          walletAddress
        );
        await listenForTransactionMine(transactionResponse, provider);

        // const result = await medicineContract.getvalidManufacturer(
        //   walletAddress
        // );
        // console.log("HELLOOo");
        // console.log(`This is result: ${result}`);
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
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicManufacturerID"
                >
                  <Form.Label column sm={4}>
                    Manufacturer ID
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="ManufacturerID"
                      type="text"
                      placeholder="Enter Manufacturer ID"
                      onChange={handleChange}
                      value={formData.ManufacturerID}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formBasicName">
                  <Form.Label column sm={4}>
                    Manufacturer Name
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="ManufacturerName"
                      placeholder="Enter Name Of Manufacturer"
                      onChange={handleChange}
                      value={formData.ManufacturerName}
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
                  Manufacturer <strong>{formData.ManufacturerName} </strong>{" "}
                  Added Succesfully
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

export default AdminDashboardAddManufacturer;
