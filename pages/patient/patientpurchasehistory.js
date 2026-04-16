import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../../components/Header'
import styles from '../../public/static/css/patient/PatientPurchaseHistory.module.css'
import { Container, Button, Card, Row, Col } from 'react-bootstrap'
import SideBar from '../../components/sideBar/SideBarPatientDash'

const PatientDash = () => {
  return (
    <>
      <Header />
      <Row className={ styles.mainContainerDashRow }>
        <SideBar />
        <Col className={ styles.mainContainerDashCol }>
          <Container className={ styles.mainContainerDash }>
            <Card className={ styles.patientdash_buttoncss }>
              <Card.Header>History</Card.Header>
              <Card.Body>
                <Card.Title>My purchase History</Card.Title>
                <Card.Text>Previous Prescriped Drugs</Card.Text>
                <Button variant="primary">View</Button>
              </Card.Body>
            </Card>
          </Container>
        </Col>
      </Row>
    </>
  )
}

export default PatientDash
