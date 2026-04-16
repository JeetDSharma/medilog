import React from "react";
import styles from "../../public/static/css/manufacturer/AddMedicineMenu.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header";
import { Card, Modal, Form, Row, Col, Container, Button } from "react-bootstrap";
import SideBar from "../../components/sideBar/SideBarManufacturerDash";
import { useEffect, useState } from "react";

const ManufacturerDashAddMedicine = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    router.push("/manufacturer/ManufacturerViewMedicine");
  };
  const [formData, setFormData] = useState({
    MedicineID: "",
    MedicineName: "",
    MedicinePower: "",
    MedicineDrugs: "",
    MRP: "",
    SideEffects: "",
  });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      console.log("CALLED");
      const response = await fetch("http://localhost:5001/api/medicineAdd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          MedicineID: formData.MedicineID,
          MedicineName: formData.MedicineName,
          MedicinePower: formData.MedicinePower,
          MedicineDrugs: formData.MedicineDrugs,
          MRP: formData.MRP,
          SideEffects: formData.SideEffects,
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
                <Form.Group as={Row} className="mb-3" controlId="formBasicid">
                  <Form.Label column sm={4}>
                    Medicine ID
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="MedicineID"
                      placeholder="Enter Medicine ID"
                      onChange={handleChange}
                      value={formData.MedicineID}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicMedicineName"
                >
                  <Form.Label column sm={4}>
                    Medicine Name
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="MedicineName"
                      placeholder="Enter Medicine Name"
                      onChange={handleChange}
                      value={formData.MedicineName}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicMedicinePower"
                >
                  <Form.Label column sm={4}>
                    Medicine Power
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="MedicinePower"
                      type="number"
                      placeholder="Enter Power Of Medicine"
                      onChange={handleChange}
                      value={formData.MedicinePower}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicDrugs"
                >
                  <Form.Label column sm={4}>
                    Medicine Drugs
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="MedicineDrugs"
                      type="text"
                      placeholder="Enter Medicine Drugs"
                      onChange={handleChange}
                      value={formData.MedicineDrugs}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicSideEffects"
                >
                  <Form.Label column sm={4}>
                    Side Effects
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="SideEffects"
                      type="text"
                      placeholder="Enter Side Effects"
                      onChange={handleChange}
                      value={formData.SideEffects}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicaddress"
                >
                  <Form.Label column sm={4}>
                    MRP
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="MRP"
                      type="number"
                      placeholder="Enter Price"
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
              </Form>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Addition Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Medicine <strong>{formData.MedicineName} </strong> Added
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

export default ManufacturerDashAddMedicine;
