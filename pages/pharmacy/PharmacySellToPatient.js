import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header";
import styles from "../../public/static/css/pharmacy/PharmacySellToPatient.module.css";
import {
  Form,
  Row,
  Col,
  Container,
  Button,
  Dropdown,
  ListGroup,
  Modal,
  InputGroup,
  Card,
} from "react-bootstrap";
import SideBar from "../../components/sideBar/SideBarPharmacyDash";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineQrcode, AiOutlinePlus } from "react-icons/ai";
import { QrReader } from "react-qr-reader";
import dispense from "../../HardHat/artifacts/contracts/dispense_medicine.sol/DispenseMedicine.json";
import { ethers } from "ethers";
import { dispenseAdd } from "../constants";
const PharmacySellToPatient = () => {
  const [show, setShow] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const handleClosePatientWalletAddress = () => setShow(false);
  const handleShowPatientWalletAddress = () => setShow(true);
  const handleCloseMedicineList = () => setShowListModal(false);
  const handleShowMedicineList = () => setShowListModal(true);
  const [disabledPatientWallet, setDisabledPatientWallet] = useState(false);
  const [SerialID, setSerialID] = useState("");
  const [Price, setPrice] = useState(0);

  const handleErrorPatientWalletAddress = (err) => {
    console.log(err);
  };
  const handleScanPatientWalletAddress = (data) => {
    if (data !== null && data !== undefined) {
      console.log(data);
      let temp = data.text.slice(9);
      temp = data;
      setFormData({ ...formData, PatientWalletAddress: temp });
      setDisabledPatientWallet(true);
      setShow(false);
    }
  };
  const handleErrorMedicineList = (err) => {
    console.log(err);
  };
  const handleScanMedicineList = (data1) => {
    console.log("test");
    if (data1 !== null && data1 !== undefined) {
      console.log(data1);
      let temp = data1.text;
      // setFormData({ ...formData, PatientWalletAddress: temp })
      setFormData({
        ...formData,
        SerialID: [...formData.SerialID, temp],
      });
      console.log("NEW ADDITION ", formData);
      setShowListModal(false);
    }
  };
  // TO FIX THE FUNCTION BELOW
  const handleAddMedicine = (event) => {
    setFormData({
      ...formData,
      SerialID: [...formData.SerialID, SerialID],
      Price: [...formData.Price, Price],
    });
    // add the serial id to the array of SerialID
    console.log(formData);
    // setFormData({ ...formData, SerialID: "" })
    setSerialID("");
    setPrice(0);
  };
  useEffect(() => {
    const requestDataPharmacy = async () => {
      console.log("You in Biatchh");
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
          "http://localhost:5001/api/pharmacyGetDetailByWallet",
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
        var utc = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
        console.log(utc);

        setFormData({
          ...formData,
          PharmacyID: responseData.pharmacyID,
          DateOfDispense: utc,
          PharmacyWalletAddress: address,
        });
        console.log(formData);
      } catch (err) {
        console.log(err);
      }
    };
    const requestDataMedicine = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/medicinelist", {
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
    requestDataPharmacy();
    // requestDataMedicine();
  }, []);
  const [formData, setFormData] = useState({
    PrescriptionID: "",
    DispenseID: "",
    PharmacyID: "",
    DateOfDispense: "",
    PatientWalletAddress: "",
    PharmacyWalletAddress: "",
    SerialID: [],
    Price: [],
  });
  const [loadedMedicine, setLoadedMedicine] = useState([]);
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleChangeSerialID = (event) => {
    setSerialID(event.target.value);
  };
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const dateTemp = new Date().getTime();
    console.log(formData.Price);
    console.log(formData.SerialID);
    console.log(dateTemp);
    try {
      console.log("Contract Called");
      if (typeof window.ethereum !== undefined) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const dispenseContract = new ethers.Contract(
          dispenseAdd,
          dispense.abi,
          signer
        );
        console.log(
          formData.PrescriptionID,
          formData.DispenseID,
          formData.PharmacyID,
          formData.SerialID,
          dateTemp,
          formData.Price,
          formData.PatientWalletAddress
        );
        const transactionResponse = await dispenseContract.dispense(
          formData.PrescriptionID,
          formData.DispenseID,
          formData.PharmacyID,
          formData.SerialID,
          dateTemp,
          formData.Price,
          formData.PatientWalletAddress
        );
        await listenForTransactionMine(transactionResponse, provider);
        console.log("RAN SELL TO PAITENT");
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
  const deleteMedicine = (event) => {
    let SerialID = event.target.value;
    let medicineList = formData.SerialID;
    let index = medicineList.indexOf(SerialID);
    if (index > -1) {
      medicineList.splice(index, 1);
    }
    setFormData({ ...formData, SerialID: medicineList });
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
                  controlId="formbasicPrescriptionID"
                >
                  <Form.Label column sm={4}>
                    Prescription ID
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      placeholder="Enter Prescription ID"
                      name="PrescriptionID"
                      onChange={handleChange}
                      value={formData.PrescriptionID}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formbasicDispenseID"
                >
                  <Form.Label column sm={4}>
                    Dispense ID
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      placeholder="Enter Dispense ID"
                      name="DispenseID"
                      onChange={handleChange}
                      value={formData.DispenseID}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formbasicPharmacyID"
                >
                  <Form.Label column sm={4}>
                    Pharmacy ID
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      placeholder="Enter Pharmacy ID"
                      name="PharmacyID"
                      onChange={handleChange}
                      value={formData.PharmacyID}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formbasicDateOfDispense"
                >
                  <Form.Label column sm={4}>
                    Date of Dispense
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="date"
                      placeholder="Enter Date of Dispense"
                      name="DateOfDispense"
                      onChange={handleChange}
                      value={formData.DateOfDispense}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicPatientWalletAddress"
                >
                  <Form.Label column sm={4}>
                    Patient Wallet Address
                  </Form.Label>
                  <Col sm={8}>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Enter Patient Address"
                        name="PatientWalletAddress"
                        onChange={handleChange}
                        value={formData.PatientWalletAddress}
                        disabled={disabledPatientWallet}
                      />
                      <Button
                        variant="outline-secondary"
                        id="qrButton1"
                        onClick={handleShowPatientWalletAddress}
                      >
                        <AiOutlineQrcode />
                      </Button>
                    </InputGroup>
                  </Col>
                </Form.Group>
                <Modal show={show} onHide={handleClosePatientWalletAddress}>
                  <Modal.Header closeButton>
                    <Modal.Title>Scan QR Code</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <QrReader
                      delay={100}
                      onError={handleErrorPatientWalletAddress}
                      onResult={handleScanPatientWalletAddress}
                    ></QrReader>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={handleClosePatientWalletAddress}
                    >
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Modal show={showListModal} onHide={handleCloseMedicineList}>
                  <Modal.Header closeButton>
                    <Modal.Title>Scan QR Code</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <QrReader
                      delay={100}
                      onError={handleErrorMedicineList}
                      onResult={handleScanMedicineList}
                    ></QrReader>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={handleCloseMedicineList}
                    >
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicPharmacyWalletAddress"
                >
                  <Form.Label column sm={4}>
                    Pharmacy Wallet Address
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      disabled
                      name="PharmacyWalletAddress"
                      type="text"
                      placeholder="Enter Pharmacy Wallet Address"
                      onChange={handleChange}
                      value={formData.PharmacyWalletAddress}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicSellID"
                >
                  <Form.Label column sm={4}>
                    Serial ID
                  </Form.Label>
                  <Col sm={8}>
                    <InputGroup variant="flush">
                      <Form.Control
                        type="text"
                        name="SerialID"
                        placeholder="Enter Serial ID"
                        onChange={handleChangeSerialID}
                        value={SerialID}
                      />
                      <Form.Control
                        name="Price"
                        type="text"
                        placeholder="Enter Price"
                        onChange={handleChangePrice}
                        value={Price}
                      />
                      <Button
                        variant="outline-secondary"
                        id="qrButton2"
                        onClick={handleShowMedicineList}
                      >
                        <AiOutlineQrcode />
                      </Button>
                      <Button
                        variant="outline-success"
                        id="addButton"
                        onClick={handleAddMedicine}
                      >
                        <AiOutlinePlus />
                      </Button>
                    </InputGroup>
                  </Col>
                </Form.Group>

                <Col sm={12} className="text-center">
                  <ListGroup variant="flush">
                    {formData.SerialID.map((item, index) => [
                      <ListGroup.Item key={index}>
                        <Button
                          variant="white"
                          className="deleteMedicine"
                          onClick={deleteMedicine}
                          value={item}
                        >
                          X
                        </Button>{" "}
                        {item}
                      </ListGroup.Item>,
                    ])}
                  </ListGroup>
                </Col>

                <Col sm={12} className="text-center">
                  <Button variant="primary" type="submit">
                    Submit
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

export default PharmacySellToPatient;
