import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import DashboardLayout from "../../components/DashboardLayout"
import styles from "../../public/static/css/patient/PatientDashboard.module.css"
import { Table, Row, Col, Container } from "react-bootstrap"
import dynamic from "next/dynamic"
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

const MARQUEE_ITEMS = [
  "MY PRESCRIPTIONS",
  "MEDICINE HISTORY",
  "QR VERIFY",
  "PURCHASE RECORDS",
  "AUTHENTICITY",
  "PATIENT CARE",
]

const PatientDash = () => {
  const revenue = "$ 10000"
  const moneySpent = "$ 10000"
  const totalProduction = "$ 10000"
  const activePharmacy = "100"
  const [dataLineChart] = useState({
    options: {
      chart: {
        id: "patient-trend",
        toolbar: { show: false },
        fontFamily: "Inter, system-ui, sans-serif",
        foreColor: "#111",
      },
      colors: ["#000000"],
      stroke: { curve: "smooth", width: 2.5 },
      grid: { borderColor: "#ddd", strokeDashArray: 4 },
      xaxis: {
        categories: [2019, 2020, 2021, 2022, 2023],
        labels: { style: { fontWeight: 600 } },
      },
      yaxis: { labels: { style: { fontWeight: 500 } } },
      markers: {
        size: 5,
        colors: ["#fdfd96"],
        strokeColors: "#000",
        strokeWidth: 2,
      },
      dataLabels: { enabled: false },
      tooltip: { theme: "light" },
    },
    series: [{ data: [900, 1400, 1900, 2300, 2800] }],
  })
  const [dataTable] = useState([
    {
      key: "1",
      medicineName: "Paracetamol",
      sales: "10",
      status: "Pending",
    },
    {
      key: "2",
      medicineName: "Azythromycine",
      sales: "10",
      status: "Pending",
    },
    {
      key: "3",
      medicineName: "Glycaphase",
      sales: "10",
      status: "Pending",
    },
    {
      key: "4",
      medicineName: "Dolo 650",
      sales: "10",
      status: "Bought",
    },
    {
      key: "5",
      medicineName: "Dolo 350",
      sales: "10",
      status: "Bought",
    },
  ])

  const scrollToMetrics = () => {
    document.getElementById("dash-metrics")?.scrollIntoView({
      behavior: "smooth",
    })
  }

  const MarqueeStrip = ({ suffix }) => (
    <div className={ styles.marqueeGroup }>
      { MARQUEE_ITEMS.map((label, i) => (
        <span key={ `${suffix}-${label}-${i}` } className={ styles.marqueeWord }>
          { i > 0 && (
            <span className={ styles.marqueeDiamond } aria-hidden>
              ◆
            </span>
          ) }
          { label }
        </span>
      )) }
    </div>
  )

  return (
    <DashboardLayout role="patient">
      <Container className={ styles.mainContainerDash } fluid>
        <section className={ styles.hero }>
          <p className={ styles.heroEyebrow }>Patient · Overview</p>
          <h1 className={ styles.heroDisplay }>
            <span className={ styles.heroLine }>
              Follow prescriptions and verify medicines with transparent history,
            </span>
            <span className={ styles.heroLineHero }>
              <button
                type="button"
                className={ styles.heroInlinePill }
                onClick={ scrollToMetrics }
              >
                <span className={ styles.heroPillIcon } aria-hidden>
                  ↓
                </span>
                View metrics
              </button>
              <span className={ styles.heroBrand }>MediLog</span>
              <span className={ styles.heroRest }>
                puts you in control
              </span>
            </span>
          </h1>
          <div className={ styles.heroLower }>
            <p className={ styles.heroLead }>
              See spend, pharmacy activity, and prescription status in one
              place—aligned with chain-of-custody where available.
            </p>
            <div className={ styles.heroCtaRow }>
              <span className={ styles.ctaSolid }>Health snapshot</span>
              <div className={ styles.heroArrowDeco } aria-hidden />
            </div>
          </div>
        </section>
      </Container>

      <div className={ styles.marquee } role="presentation">
        <div className={ styles.marqueeTrack }>
          <MarqueeStrip suffix="a" />
          <MarqueeStrip suffix="b" />
        </div>
      </div>

      <Container className={ styles.mainContainerDash } fluid>
        <section id="dash-metrics" className={ styles.yellowZone }>
          <div className={ styles.yellowInner }>
            <div className={ styles.floatingPill }>
              <span className={ styles.floatingPillBrand }>Patient</span>
              <span className={ styles.floatingPillHint }>
                Prescriptions &amp; purchases
              </span>
            </div>

            <div className={ styles.statPillRow }>
              { [
                { label: "Total production", value: totalProduction },
                { label: "Money spent", value: moneySpent },
                { label: "Active pharmacies", value: activePharmacy },
                { label: "Revenue", value: revenue },
              ].map((s) => (
                <div key={ s.label } className={ styles.statPill }>
                  <span className={ styles.statPillLabel }>{ s.label }</span>
                  <span className={ styles.statPillValue }>{ s.value }</span>
                </div>
              )) }
            </div>

            <Row className={ styles.splitRow }>
              <Col lg={ 5 }>
                <div className={ styles.panel }>
                  <h2 className={ styles.panelTitle }>Spend trend</h2>
                  <div className={ styles.panelChart }>
                    <Chart
                      options={ dataLineChart.options }
                      series={ dataLineChart.series }
                      type="line"
                      width="100%"
                    />
                  </div>
                </div>
              </Col>
              <Col lg={ 7 }>
                <div className={ styles.panel }>
                  <h2 className={ styles.panelTitle }>
                    Latest prescriptions
                  </h2>
                  <div className={ styles.panelTableWrap }>
                    <Table className={ styles.dataTable } hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Prescription drugs</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        { dataTable.map((item) => (
                          <tr key={ item.key }>
                            <td>{ item.key }</td>
                            <td>{ item.medicineName }</td>
                            <td>
                              <span
                                className={
                                  item.status === "Pending"
                                    ? styles.statusPillPending
                                    : styles.statusPillBought
                                }
                              >
                                { item.status }
                              </span>
                            </td>
                          </tr>
                        )) }
                      </tbody>
                    </Table>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </section>
      </Container>
    </DashboardLayout>
  )
}
export default PatientDash
