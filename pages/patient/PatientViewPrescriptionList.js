import React, { useEffect, useState } from "react"
import DashboardLayout from "../../components/DashboardLayout"
import styles from "../../public/static/css/patient/PatientViewPrescriptionList.module.css"
import { Accordion, Container, Button, Card, Row, Col } from "react-bootstrap"
const prescriptionSample = [
  {
    id: 1,
    name: "Paracetamol",
    quantity: 10,
    date: "2020-10-10",
    status: "outline-danger",
    doctor: "Dr. John Doe",
    doctorId: 1,
    prescriptionId: 1,
    prescription: "https://www.google.com",
  },
  {
    id: 2,
    name: "Paracetamol",
    quantity: 10,
    date: "2020-10-10",
    status: "outline-danger",
    doctor: "Dr. John Doe",
    doctorId: 1,
    prescriptionId: 1,
    prescription: "https://www.google.com",
  },
  {
    id: 3,
    name: "Paracetamol",
    quantity: 10,
    date: "2020-10-10",
    status: "outline-success",
    doctor: "Dr. John Doe",
    doctorId: 1,
    prescriptionId: 1,
    prescription: "https://www.google.com",
  },
]
const PatientViewPrescription = () => {
  const [prescriptionList, setPrescriptionList] = useState([])
  useEffect(() => {
    setPrescriptionList(prescriptionSample)
  }, [])

  return (
    <DashboardLayout role="patient">
          <Container className={ styles.mainContainerDash }>
            <Card className={ styles.mainCardContainer }>
              Prescriptions For Wallet Address : 0x1234567890
              <Accordion flush className={ styles.AccordianMainContainer }>
                { prescriptionList
                  .map((prescription, index) => (
                    <Accordion.Item className={ styles.AccordianItem } eventKey={ index }>
                      <Accordion.Header  className={ styles.AccordianItem }>
                        Prescription ID : { index }
                      </Accordion.Header>
                      <Accordion.Body >
                        Prescription Details
                      </Accordion.Body>
                    </Accordion.Item>
                  ))
                  .reverse() }
              </Accordion>
            </Card>
          </Container>
    </DashboardLayout>
  )
}

export default PatientViewPrescription
