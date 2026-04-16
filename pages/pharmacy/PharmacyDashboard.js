import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "../../components/Header"
import styles from "../../public/static/css/pharmacy/PharmacyDashboard.module.css"
import { Table, Row, Col, Container, Card } from "react-bootstrap"
import SideBar from "../../components/sideBar/SideBarPharmacyDash"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

const PharmacyDash = () => {
  const revenue = "$ 10000"
  const inventory = "$ 10000"
  const prescriptionDrugsNumber = 10002
  const nonPrescriptionDrugsNumber = 1002
  const weight = "100 kg"
  const totalProduction = "102"
  const activePharmacy = "100"
  const [dataPieChart, setDataPieChart] = useState({
    series: [1, 55, 41, 17, 150],
    options: {
      labels: ["PharmA", "Kenatebio", "Team C", "Team D", "Other"],
    },
  })
  const [dataTable, setDataTable] = useState([
    {
      key: "1",
      medicineName: "Paracetamol",
      sales: "10",
    },
    {
      key: "2",
      medicineName: "Azythromycine",
      sales: "10",
    },
    {
      key: "3",
      medicineName: "Glycaphase",
      sales: "10",
    },
    {
      key: "4",
      medicineName: "Dolo 650",
      sales: "10",
    },
    {
      key: "5",
      medicineName: "Dolo 350",
      sales: "10",
    },
  ])

  const router = useRouter()
  return (
    <>
      <Header />
      <Row className={ styles.mainContainerDashRow }>
        <SideBar />
        <Col className={ styles.mainContainerDashCol }>
          <Container className={ styles.mainContainerDash }>
            <Container className={ styles.containerForm }></Container>
            <Row>
              <Col md="3">
                <Card
                  className={ styles.cardMain }
                  border="success"
                >
                  <Card.Body>
                    <Card.Title>
                      Variety of Medicines
                    </Card.Title>
                    <Card.Text>
                      Prescription Drugs:{ " " }
                      { prescriptionDrugsNumber } <br />
                      Non-Prescription Drugs:{ " " }
                      { nonPrescriptionDrugsNumber }
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md="3">
                <Card
                  className={ styles.cardMain }
                  border="success"
                >
                  <Card.Body>
                    <Card.Title>
                      Current Inventory
                    </Card.Title>
                    <Card.Text>
                      Worth : { inventory }
                      <br />
                      Weight: { weight }
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md="3">
                <Card
                  className={ styles.cardMain }
                  border="success"
                >
                  <Card.Body>
                    <Card.Title>Patients Served</Card.Title>
                    <Card.Text>
                      Number Of Patients: { activePharmacy }
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md="3">
                <Card
                  className={ styles.cardMain }
                  border="success"
                >
                  <Card.Body>
                    <Card.Title>Revenue</Card.Title>
                    <Card.Text>{ revenue }</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className={ styles.secondRowMain }>
              <Col md="5">
                <Card
                  border="success"
                  className={ styles.graphCard }
                >
                  <Card.Title>Pharmacy Sales</Card.Title>
                  <Card.Body>
                    <Chart
                      options={ dataPieChart.options }
                      lables={ dataPieChart.labels }
                      series={ dataPieChart.series }
                      type="donut"
                      width="400"
                      height="500"
                    />
                  </Card.Body>
                </Card>
              </Col>
              <Col md="7">
                <Card
                  border="danger"
                  className={ styles.CardTable }
                >
                  <Card.Body>
                    <Card.Title>Required Stock</Card.Title>

                    <Table
                      border="danger"
                      striped
                      bordered
                      hover
                    >
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Restock Medicines</th>
                          <th>Units Left</th>
                        </tr>
                      </thead>
                      <tbody>
                        { dataTable.map((item) => (
                          <tr>
                            <td>{ item.key }</td>
                            <td>
                              { item.medicineName }
                            </td>
                            <td>{ item.sales }</td>
                          </tr>
                        )) }
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  )
}
export default PharmacyDash
