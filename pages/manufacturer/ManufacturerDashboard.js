import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "../../components/Header"
import styles from "../../public/static/css/manufacturer/ManufacturerDashboard.module.css"
import {
  Table,
  Row,
  Col,
  Container,
  Card,
} from "react-bootstrap"
import SideBar from "../../components/sideBar/SideBarManufacturerDash"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

const ManufacturerDash = () => {
  const revenue = "$ 10000"
  const inventory = "$ 10000"
  const weight = "100 kg"
  const totalProduction = "$ 10000"
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
                      Total Production
                    </Card.Title>
                    <Card.Text>{ totalProduction }</Card.Text>
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
                    <Card.Title>
                      Pharmacies Active
                    </Card.Title>
                    <Card.Text>Number: { activePharmacy }</Card.Text>
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
                  border="success"
                  className={ styles.CardTable }
                >
                  <Card.Body>
                    <Card.Title>
                      Grossing Medicines
                    </Card.Title>

                    <Table
                      border="success"
                      striped
                      bordered
                      hover
                    >
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Grossing Medicines</th>
                          <th>Sales</th>
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
export default ManufacturerDash
