import React from "react";
import DashboardLayout from "../../components/DashboardLayout"
import styles from "../../public/static/css/manufacturer/ManufacturerDashAddDrug.module.css";
import {
  Form,
  Row,
  Col,
  Container,
  Button,
  Modal,
  Dropdown,
  Card,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { medicineAdd } from "../../lib/contractAddresses"
import medicine from "../../HardHat/artifacts/contracts/medicine.sol/Medicine.json";

const ManufacturerDashAddDrug = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    router.push("/manufacturer/ManufacturerAddDrug");
  };
  useEffect(() => {
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
    requestDataMedicine();
  }, []);
  const [formData, setFormData] = useState({
    Srno: "",
    MedicineID: "",
    ManufacturerID: "",
    ManufacturingDate: "",
    ExpiryDate: "",
    MRP: "",
  });
  const [loadedMedicine, setLoadedMedicine] = useState([]);
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const dateTemp = new Date().getTime();
    try {
      if (typeof window.ethereum !== undefined) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log(signer);
        const medicineContract = new ethers.Contract(
          medicineAdd,
          medicine.abi,
          signer
        );
        const transactionResponse = await medicineContract.addMedicine(
          formData.Srno,
          formData.MedicineID,
          formData.ManufacturerID,
          dateTemp,
          dateTemp,
          formData.MRP
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
    setShow(true);
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
    <DashboardLayout role="manufacturer">
          <Container className={styles.mainContainerDash}>
            <Container className={styles.containerForm}></Container>
            <Card className={styles.cardFormContainer}>
              <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="formBasicSrNo">
                  <Form.Label column sm={4}>
                    Sr No
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="Srno"
                      placeholder="Enter serial no"
                      onChange={handleChange}
                      value={formData.Srno}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicMedicineID"
                >
                  <Form.Label column sm={4}>
                    Medicine ID
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Select
                      onChange={(event) => {
                        const MedicineID = event.target.value;
                        setFormData({
                          ...formData,
                          MedicineID: MedicineID,
                        });
                      }}
                      value={formData.MedicineID}
                    >
                      <option>Select Medicine</option>
                      {loadedMedicine.map((medicine) => (
                        <option
                          key={medicine.MedicineID}
                          value={medicine.MedicineID}
                        >
                          {medicine.MedicineName}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>

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
                      type="number"
                      placeholder="Manufacturer ID"
                      onChange={handleChange}
                      value={formData.ManufacturerID}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicManufacturingID"
                >
                  <Form.Label column sm={4}>
                    Manufacturing Date
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="ManufacturingDate"
                      type="date"
                      placeholder="Enter Manufacturing Date"
                      onChange={handleChange}
                      value={formData.ManufacturingDate}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicExpiryDate"
                >
                  <Form.Label column sm={4}>
                    Expiry Date
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="ExpiryDate"
                      type="date"
                      placeholder="Enter Expiry Date"
                      onChange={handleChange}
                      value={formData.ExpiryDate}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formBasicMRP">
                  <Form.Label column sm={4}>
                    MRP
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="MRP"
                      placeholder="Enter MRP"
                      onChange={handleChange}
                      value={formData.MRP}
                    />
                  </Col>
                </Form.Group>
                <Col sm={12} className="text-center">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Col>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Addition Successful</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Medicine Added Successfully</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Form>
            </Card>
          </Container>
    </DashboardLayout>
  );
};

export default ManufacturerDashAddDrug;
