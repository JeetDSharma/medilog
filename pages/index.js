import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "../components/Header"
import { Card, Row, Col, Container, Button } from "react-bootstrap"
import styles from "../public/static/css/index.module.css"
import Footer from "../components/Footer"
import Link from "next/link"
// const web3 = require("../ethereum/web3")

const Index = () => {
  const handleClickScroll = () => {
    const element = document.getElementById("abstract")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }
  return (
    <>
      <Header />
      <Container className={ styles.mainContainer }>
        <Container fluid className={ styles.indexdash }>
          <div className={ styles.indexcontent }>
            <h1 className={ styles.indexheading }>MediLog</h1>
            <p className={ styles.indexpara }>
              Revolutionizing Medicine Supply Chain With Secure
              Blockchain Logistics.
            </p>
            <p className={ styles.indexversion }>
              Current Version: 1.0
            </p>
            <Button
              className={ styles.doctordash_buttoncss }
              variant="outline-dark"
              onClick={ handleClickScroll }
            >
              Get Started
            </Button>{ " " }
          </div>{ " " }
        </Container>

        <Container className={ styles.abstractInfo } id="abstract">
          <Row xs={ 1 } md={ 4 }>
            <Col>
              <Link
                className={ styles.linkTag }
                href="/manufacturer/ManufacturerDashboard"
              >
                <Card className={ styles.cardMain }>
                  <Card.Img
                    variant="top"
                    src="/static/images/manufacturerIMG.jpg"
                  />
                  <Card.Body>
                    <Card.Text>Manufacturer</Card.Text>
                    <Card.Text className={ styles.cardtext }>
                      Blockchain provides a tamper-proof
                      and transparent supply chain
                      network, enabling efficient tracking
                      of products, addressing issues and
                      delays, and ensuring authenticity.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col>
              <Link
                className={ styles.linkTag }
                href="/pharmacy/PharmacyDashboard"
              >
                <Card className={ styles.cardMain }>
                  <Card.Img
                    variant="top"
                    src="/static/images/pharmacistIMG.jpg"
                  />
                  <Card.Body>
                    <Card.Text>Pharmacist</Card.Text>
                    <Card.Text className={ styles.cardtext }>
                      Blockchain streamlines logistics and
                      provides greater supply chain
                      visibility, allowing pharmacists to
                      manage inventory efficiently and
                      ensure authenticity, ensuring
                      patient safety.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col>
              <Link
                className={ styles.linkTag }
                href="/doctor/DoctorDashboard"
              >
                <Card className={ styles.cardMain }>
                  <Card.Img
                    variant="top"
                    src="/static/images/doctorIMG.jpg"
                  />
                  <Card.Body>
                    <Card.Text>Doctor</Card.Text>
                    <Card.Text className={ styles.cardtext }>
                      Blockchain ensures authenticity of
                      medications, reducing counterfeit
                      risks and improving inventory
                      management, leading to enhanced
                      patient safety and quality
                      healthcare.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col>
              <Link
                className={ styles.linkTag }
                href="/patient/PatientDashboard"
              >
                <Card className={ styles.cardMain }>
                  <Card.Img
                    variant="top"
                    src="/static/images/patientIMG.jpg"
                  />
                  <Card.Body>
                    <Card.Text>Patient</Card.Text>
                    <Card.Text className={ styles.cardtext }>
                      Blockchain ensures authenticity of
                      medications and provides greater
                      transparency, leading to improved
                      safety and trust in the healthcare
                      system.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer></Footer>
    </>
  )
}

export default Index
