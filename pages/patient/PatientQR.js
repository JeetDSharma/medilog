import React from 'react'
import DashboardLayout from "../../components/DashboardLayout"
import styles from '../../public/static/css/patient/PatientQR.module.css'
import { Container, Button, Card, Row, Col } from 'react-bootstrap'
import QRCodeGenerator from '../../components/QR/QRCodeGenerator'

const PatientDash = () => {
  return (
    <DashboardLayout role="patient">
          <Container className={ styles.mainContainerDash }>
            <Card className={ styles.mainCard }>
              <Container className={ styles.qrcodeMain }>
                { <QRCodeGenerator /> }
              </Container>
            </Card>
          </Container>
    </DashboardLayout>
  )
}

export default PatientDash
