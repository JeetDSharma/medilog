import React from "react";
import styles from "../../public/static/css/admin/EditProfileDoctor.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header";
import { Card, Form, Row, Col, Container, Button } from "react-bootstrap";
import SideBar from "../../components/sideBar/SideBarAdminDash";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineReload } from "react-icons/ai";

const EditProfileDoctor = () => {
  const router = useRouter();
  const [loadedDoctor, setLoadedDoctor] = useState([]);
  useEffect(() => {
    const requestData = async () => {
      try {
        const { id } = router.query;
        const response = await fetch(
          "http://localhost:5001/api/doctorGetDetails",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              _id: router.query.id,
            }),
          }
        );
        const responseData = await response.json();
        console.log(responseData);
        setLoadedDoctor(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    requestData();
  }, []);
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
    setLoadedDoctor({
      ...loadedDoctor,
      [event.target.name]: event.target.value,
    });
  };
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/doctorUpdate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: router.query.id,
          DoctorName: loadedDoctor.DoctorName,
          walletAddress: loadedDoctor.walletAddress,
          DOB: loadedDoctor.DOB,
          emailID: loadedDoctor.emailID,
          phoneNumber: loadedDoctor.phoneNumber,
          speciality: loadedDoctor.speciality,
          doctorRegNo: loadedDoctor.doctorRegNo,
        }),
      });
      const responseData = await response.json();
    } catch (err) {
      console.log(err);
    }
    router.push("/adminPages/DoctorView");
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
              <Form onSubmit={handleUpdate}>
                <Form.Group as={Row} className="mb-3" controlId="formBasicName">
                  <Form.Label column sm={4}>
                    Doctor Name
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      name="doctorName"
                      placeholder="Enter Name Of Doctor"
                      onChange={handleChange}
                      value={loadedDoctor.DoctorName}
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
                      value={loadedDoctor.walletAddress}
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
                      value={loadedDoctor.DOB}
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
                      value={loadedDoctor.emailID}
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
                      value={loadedDoctor.phoneNumber}
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
                      value={loadedDoctor.speciality}
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
                      value={loadedDoctor.doctorRegNo}
                    />
                  </Col>
                </Form.Group>
                <Col sm={12} className="text-center">
                  <Button variant="primary" type="submit">
                    <AiOutlineReload /> Update
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

export default EditProfileDoctor;
