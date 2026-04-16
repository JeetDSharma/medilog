import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "../../components/Header"
import styles from "../../public/static/css/admin/AdminDashboard.module.css"
import { Table, Row, Col, Container, Card } from "react-bootstrap"
import SideBar from "../../components/sideBar/SideBarAdminDash"
import dynamic from "next/dynamic"
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

const AdminDash = () => {
  const activePharmacy = "100"
  const activeDoctors = "100"
  const activePatients = "100"
  const activeManufacturers = "100"
  const [dataPieChart, setDataPieChart] = useState({
    options: {
      chart: {
        id: "basic-bar",
        toolbar: { show: false },
        fontFamily: "Inter, system-ui, sans-serif",
        foreColor: "#111",
      },
      colors: ["#000000"],
      stroke: { curve: "smooth", width: 2.5 },
      grid: {
        borderColor: "#e0e0e0",
        strokeDashArray: 4,
      },
      xaxis: {
        categories: [
          2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
        ],
        labels: { style: { fontWeight: 500 } },
      },
      yaxis: { labels: { style: { fontWeight: 500 } } },
      markers: {
        size: 4,
        colors: ["#e9f59d"],
        strokeColors: "#000",
        strokeWidth: 2,
      },
      dataLabels: { enabled: false },
      tooltip: { theme: "light" },
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

  return (
    <>
      <Header />
      <Row className={ styles.mainContainerDashRow }>
        <SideBar />
        <Col className={ styles.mainContainerDashCol }>
          <Container className={ styles.mainContainerDash } fluid>
            <header className={ styles.pageHeader }>
              <span className={ styles.pageKicker }>Overview</span>
              <h1 className={ styles.pageTitle }>
                Supply chain at a glance
              </h1>
              <p className={ styles.pageSubtitle }>
                Track active participants and medicine performance across the
                MediLog network.
              </p>
            </header>
            <Row className={ styles.statRow }>
              <Col md="3" className={ styles.statCol }>
                <Card className={ styles.cardMain }>
                  <Card.Body>
                    <Card.Title>Doctors</Card.Title>
                    <Card.Text>{ activeDoctors }</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md="3" className={ styles.statCol }>
                <Card className={ styles.cardMain }>
                  <Card.Body>
                    <Card.Title>Pharmacy</Card.Title>
                    <Card.Text>{ activePharmacy }</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md="3" className={ styles.statCol }>
                <Card className={ styles.cardMain }>
                  <Card.Body>
                    <Card.Title>Manufacturers</Card.Title>
                    <Card.Text>{ activeManufacturers }</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md="3" className={ styles.statCol }>
                <Card className={ styles.cardMain }>
                  <Card.Body>
                    <Card.Title>Patients</Card.Title>
                    <Card.Text>{ activePatients }</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className={ styles.secondRowMain }>
              <Col md="5">
                <Card className={ styles.graphCard }>
                  <Card.Title>User base</Card.Title>
                  <Card.Body>
                    <Chart
                      options={ dataPieChart.options }
                      series={ dataPieChart.series }
                      type="line"
                      width="100%"
                    />
                  </Card.Body>
                </Card>
              </Col>
              <Col md="7">
                <Card className={ styles.CardTable }>
                  <Card.Title>Grossing medicines</Card.Title>
                  <Card.Body>
                    <Table className={ styles.dataTable } hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Medicine</th>
                          <th>Sales</th>
                        </tr>
                      </thead>
                      <tbody>
                        { dataTable.map((item) => (
                          <tr key={ item.key }>
                            <td>{ item.key }</td>
                            <td>{ item.medicineName }</td>
                            <td>
                              <span className={ styles.salesPill }>
                                { item.sales }
                              </span>
                            </td>
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
