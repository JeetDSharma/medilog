import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "../../components/Header"
import styles from "../../public/static/css/admin/AdminDashboard.module.css"
import { Table, Row, Col, Container, Card } from "react-bootstrap"
import SideBar from "../../components/sideBar/SideBarAdminDash"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

const AdminDash = () => {
  const activePharmacy = "100"
  const activeDoctors = "100"
  const activePatients = "100"
  const activeManufacturers = "100"
  const [dataPieChart, setDataPieChart] = useState({
    series: [1, 55, 41, 17, 150],
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
        ],
      },
    },
    series: [
      {
        data: [3000, 4000, 4005, 5000, 4009, 6000, 7000, 9100, 10000],
      },
    ],
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
                    <Card.Title>Doctors</Card.Title>
                    <Card.Text>
                      Active Doctors: { activeDoctors }
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
                    <Card.Title>Pharmacy</Card.Title>
                    <Card.Text>
                      Active Pharmacies: { activePharmacy }
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
                    <Card.Title>Manufacturers</Card.Title>
                    <Card.Text>
                      Active Manufacturers:{ " " }
                      { activeManufacturers }
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
                    <Card.Title>Patients</Card.Title>
                    <Card.Text>
                      Active Patients: { activePatients }
                    </Card.Text>
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
                  <Card.Title>User Base</Card.Title>
                  <Card.Body>
                    <Chart
                      options={ dataPieChart.options }
                      lables={ dataPieChart.labels }
                      series={ dataPieChart.series }
                      type="line"
                      width="400"
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
export default AdminDash
