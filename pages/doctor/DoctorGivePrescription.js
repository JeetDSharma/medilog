import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header";
import styles from "../../public/static/css/doctor/DoctorGivePrescription.module.css";
import {
  Button,
  Card,
  InputGroup,
  Form,
  Row,
  Col,
  Container,
  ListGroup,
  Dropdown,
  Modal,
} from "react-bootstrap";
import SideBar from "../../components/sideBar/SideBarDoctorDash";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { AiOutlineQrcode } from "react-icons/ai";
import { QrReader } from "react-qr-reader";
import { ethers } from "ethers";
import { prescribeAdd } from "../constants";
import prescribe from "../../HardHat/artifacts/contracts/prescribe_medicine.sol/Prescription.json";
const DoctorDash = () => {
  const router = useRouter();
  const [loadedDoctor, setLoadedDoctor] = useState([]);
  const [loadedMedicine, setLoadedMedicine] = useState([]);
  const [show, setShow] = useState(false);
  const [dataqr, setData] = useState({});
  const [disabledWallet, setDisabledWallet] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleError = (err) => {
    console.log(err);
  };
  const handleScan = (data) => {
    if (data !== null && data !== undefined) {
      console.log(data);
      let temp = data.text.slice(9);
      setFormData({ ...formData, patientAdd: temp });
      setDisabledWallet(true);
      setShow(false);
    }
    setData(data);
  };

  useEffect(() => {
    const requestDataDoctor = async () => {
      let address = "";
      try {
        if (typeof window.ethereum !== undefined) {
          await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          address = await signer.getAddress();
          // setWalletAddress(address);
          console.log(`fetched address: ${address}`);
        }
        const response = await fetch(
          "http://localhost:5000/api/doctorGetDetailByWallet",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              walletAddress: address,
            }),
          }
        );
        const responseData = await response.json();
        console.log(responseData);
        setLoadedDoctor(responseData);
        var utc = new Date().toJSON().slice(0, 10).replace(/-/g, "/");

        setFormData({
          ...formData,
          doctorID: responseData.doctorRegNo,
          dateOfIssue: utc,
          doctorAdd: address,
        });
        console.log(formData);
      } catch (err) {
        console.log(err);
      }
    };

    const requestDataMedicine = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/medicinelist", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        console.log(responseData);
        setLoadedMedicine(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    requestDataDoctor();
    requestDataMedicine();
  }, []);
  const [formData, setFormData] = useState({
    doctorID: "",
    prescriptionID: "",
    medicineID: [],
    dateOfIssue: "",
    validityPeriod: "",
    patientAdd: "",
    doctorAdd: "",
  });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const deleteMedicine = async (event) => {
    let medicineID = event.target.value;
    let medicineList = formData.medicineID;
    let index = medicineList.indexOf(medicineID);
    if (index > -1) {
      medicineList.splice(index, 1);
    }
    // if (formData !== undefined && formData.length > 0) {
    setFormData({ ...formData, medicineID: medicineList });
    // }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const dateTemp = new Date().getTime();
    console.log(dateTemp);
    try {
      console.log("Contract Called");
      if (typeof window.ethereum !== undefined) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const prescribeContract = new ethers.Contract(
          prescribeAdd,
          prescribe.abi,
          signer
        );
        const transactionResponse = await prescribeContract.addPrescription(
          formData.prescriptionID,
          formData.doctorID,
          formData.medicineID,
          dateTemp,
          formData.validityPeriod,
          formData.patientAdd
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
            <Card className={styles.cardFormContainer}>
              <Form onSubmit={handleSubmit}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="prescriptionIDForm"
                >
                  <Form.Label column sm={4}>
                    Prescription ID
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      placeholder="Enter Prescription ID"
                      name="prescriptionID"
                      onChange={handleChange}
                      value={formData.prescriptionID}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="doctorID">
                  <Form.Label column sm={4}>
                    Doctor ID
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      disabled
                      type="text"
                      placeholder="Doctor ID"
                      name="doctorID"
                      onChange={handleChange}
                      value={formData.doctorID}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="doctorAdd">
                  <Form.Label column sm={4}>
                    Doctor Wallet Address
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      disabled
                      type="text"
                      placeholder="Doctor Wallet Address"
                      name="doctorAdd"
                      onChange={handleChange}
                      value={formData.doctorAdd}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-0"
                  controlId="prescriptionPatientAddressForm"
                >
                  <Form.Label column sm={4}>
                    Enter Wallet Address of Patient
                  </Form.Label>
                  <Col sm={8}>
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Enter Patient Wallet Address"
                        name="patientAdd"
                        onChange={handleChange}
                        value={formData.patientAdd}
                        disabled={disabledWallet}
                      />
                      <Button
                        variant="outline-secondary"
                        id="qrButton"
                        onClick={handleShow}
                      >
                        <AiOutlineQrcode />
                      </Button>
                    </InputGroup>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="dateOfIssueForm"
                >
                  <Form.Label column sm={4}>
                    Date Of Issue
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      disabled
                      type="text"
                      placeholder="Date of Issue"
                      name="dateOfIssue"
                      onChange={handleChange}
                      value={formData.dateOfIssue}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="prescriptionValidityPeriodForm"
                >
                  <Form.Label column sm={4}>
                    Validity Period
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="number"
                      placeholder="Validity Period in Months"
                      name="validityPeriod"
                      onChange={handleChange}
                      value={formData.validityPeriod}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="medicineSelectForm"
                >
                  <Form.Label column sm={4}>
                    Medicine Select
                  </Form.Label>
                  <Col sm={8}>
                    <Dropdown>
                      <Dropdown.Toggle variant="light" id="dropdown-medicine">
                        Select Medicine
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {loadedMedicine.map((medicine) => (
                          <Dropdown.Item key={medicine.MedicineID}>
                            <Form.Check
                              type="checkbox"
                              label={`${medicine.MedicineName}`}
                              value={medicine.MedicineID}
                              onChange={(event) => {
                                const medicineID = event.target.value;
                                if (event.target.checked) {
                                  setFormData({
                                    ...formData,
                                    medicineID: [
                                      ...formData.medicineID,
                                      medicineID,
                                    ],
                                  });
                                } else {
                                  setFormData({
                                    ...formData,
                                    medicineID: formData.medicineID.filter(
                                      (id) => id !== medicineID
                                    ),
                                  });
                                }
                              }}
                              checked={formData.medicineID.includes(
                                medicine.MedicineID
                              )}
                            />
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Form.Group>
                <Col sm={12} className="text-center">
                  <ListGroup variant="flush">
                    {formData.medicineID.map((item, index) => [
                      <ListGroup.Item key={index}>
                        <Button
                          variant="white"
                          className="deleteMedicine"
                          onClick={deleteMedicine}
                          value={item}
                        >
                          X
                        </Button>{" "}
                        {
                          loadedMedicine.find(
                            (medicine) => medicine.MedicineID === item
                          ).MedicineName
                        }
                      </ListGroup.Item>,
                    ])}
                  </ListGroup>
                  {}
                </Col>
                <Col sm={12} className="text-center">
                  <Button variant="primary" type="submit">
                    Give Prescription
                  </Button>
                </Col>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Scan QR Code</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <QrReader
                      delay={100}
                      onError={handleError}
                      onResult={handleScan}
                    ></QrReader>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Form>
            </Card>
          </Container>
        </Col>
      </Row>
    </>
  );
};
export default DoctorDash;
