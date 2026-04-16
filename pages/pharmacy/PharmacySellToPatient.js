import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardLayout from "../../components/DashboardLayout"
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
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineQrcode, AiOutlinePlus } from "react-icons/ai";
import { QrReader } from "react-qr-reader";
import dispense from "../../HardHat/artifacts/contracts/dispense_medicine.sol/DispenseMedicine.json";
import { ethers } from "ethers";
import { dispenseAdd } from "../../lib/contractAddresses"
import { API_BASE } from "../../lib/apiBase";
import { validateEthAddress, validateRequired } from "../../lib/formValidation";

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
    setFieldErrors((prev) => {
      if (!prev.SerialID) return prev;
      const next = { ...prev };
      delete next.SerialID;
      return next;
    });
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
          `${API_BASE}/api/pharmacyGetDetailByWallet`,
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
  const handleChangeSerialID = (event) => {
    setSerialID(event.target.value);
  };
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };
  const validateForm = () => {
    const e = {};
    const v = (msg, key) => {
      if (msg) e[key] = msg;
    };
    v(validateRequired(formData.PrescriptionID, "Prescription ID"), "PrescriptionID");
    v(validateRequired(formData.DispenseID, "Dispense ID"), "DispenseID");
    v(validateRequired(formData.PharmacyID, "Pharmacy ID"), "PharmacyID");
    const patientAddr =
      typeof formData.PatientWalletAddress === "string"
        ? formData.PatientWalletAddress
        : ""
    v(validateEthAddress(patientAddr), "PatientWalletAddress");
    if (!formData.SerialID || formData.SerialID.length < 1) {
      e.SerialID = "Add at least one serial ID (and price) before submitting.";
    }
    if (
      formData.SerialID &&
      formData.Price &&
      formData.SerialID.length !== formData.Price.length
    ) {
      e.SerialID = "Each serial ID must have a matching price.";
    }
    setFieldErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm() || submitting) return;
    setSubmitting(true);
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
    } finally {
      setSubmitting(false);
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
    <DashboardLayout role="pharmacy">
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
                      isInvalid={!!fieldErrors.PrescriptionID}
                    />
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.PrescriptionID}
                    </Form.Control.Feedback>
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
                      isInvalid={!!fieldErrors.DispenseID}
                    />
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.DispenseID}
                    </Form.Control.Feedback>
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
                      isInvalid={!!fieldErrors.PharmacyID}
                    />
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.PharmacyID}
                    </Form.Control.Feedback>
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
                        placeholder="0x…"
                        name="PatientWalletAddress"
                        onChange={handleChange}
                        value={
                          typeof formData.PatientWalletAddress === "string"
                            ? formData.PatientWalletAddress
                            : ""
                        }
                        disabled={disabledPatientWallet}
                        isInvalid={!!fieldErrors.PatientWalletAddress}
                      />
                      <Button
                        variant="outline-secondary"
                        id="qrButton1"
                        onClick={handleShowPatientWalletAddress}
                      >
                        <AiOutlineQrcode />
                      </Button>
                    </InputGroup>
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {fieldErrors.PatientWalletAddress}
                    </Form.Control.Feedback>
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
                    {fieldErrors.SerialID ? (
                      <div className="invalid-feedback d-block">
                        {fieldErrors.SerialID}
                      </div>
                    ) : null}
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
                  <Button variant="primary" type="submit" disabled={submitting}>
                    {submitting ? "Submitting…" : "Submit"}
                  </Button>
                </Col>
              </Form>
            </Card>
          </Container>
    </DashboardLayout>
  );
};

export default PharmacySellToPatient;
