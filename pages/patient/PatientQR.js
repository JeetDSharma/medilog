import React from 'react'
import Header from '../../components/Header'
import styles from '../../public/static/css/patient/PatientQR.module.css'
import { Container, Button, Card, Row, Col } from 'react-bootstrap'
import SideBar from '../../components/sideBar/SideBarPatientDash'
import QRCodeGenerator from '../../components/QR/QRCodeGenerator'

const PatientDash = () => {
  return (
    <>
      <Header />
      <Row className={ styles.mainContainerDashRow }>
        <SideBar />
        <Col className={ styles.mainContainerDashCol }>
          <Container className={ styles.mainContainerDash }>
            <Card className={ styles.mainCard }>
              <Container className={ styles.qrcodeMain }>
                { <QRCodeGenerator /> }
              </Container>
            </Card>
          </Container>
        </Col>
      </Row>
    </>
  )
}

export default PatientDash
