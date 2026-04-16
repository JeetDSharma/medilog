import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import DashboardLayout from "../../components/DashboardLayout"
import styles from "../../public/static/css/doctor/DoctorDashboard.module.css"
import { Table, Row, Col, Container } from "react-bootstrap"
import dynamic from "next/dynamic"
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

const MARQUEE_ITEMS = [
  "PRESCRIPTIONS",
  "PATIENT RECORDS",
  "MEDICINE VERIFY",
  "DRUG INTERACTIONS",
  "CHAIN OF CUSTODY",
  "SECURE PRESCRIBING",
]

const DoctorDash = () => {
  const revenue = "$ 10000"
  const inventory = "$ 10000"
  const weight = "100 kg"
  const totalProduction = "$ 10000"
  const activePharmacy = "100"
  const [dataLineChart] = useState({
    options: {
      chart: {
        id: "doctor-trend",
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
    series: [{ data: [1200, 2100, 2800, 3600, 4200] }],
  })
  const [dataTable] = useState([
    { key: "1", medicineName: "Paracetamol", sales: "10" },
    { key: "2", medicineName: "Azythromycine", sales: "10" },
    { key: "3", medicineName: "Glycaphase", sales: "10" },
    { key: "4", medicineName: "Dolo 650", sales: "10" },
    { key: "5", medicineName: "Dolo 350", sales: "10" },
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
    <DashboardLayout role="doctor">
      <Container className={ styles.mainContainerDash } fluid>
        <section className={ styles.hero }>
          <p className={ styles.heroEyebrow }>Doctor · Overview</p>
          <h1 className={ styles.heroDisplay }>
            <span className={ styles.heroLine }>
              Monitor prescriptions and patient care with full chain visibility,
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
                verifies every prescription
              </span>
            </span>
          </h1>
          <div className={ styles.heroLower }>
            <p className={ styles.heroLead }>
              Reduce counterfeit risk and align prescribing with transparent
              inventory and pharmacy fulfillment data.
            </p>
            <div className={ styles.heroCtaRow }>
              <span className={ styles.ctaSolid }>Clinical snapshot</span>
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
              <span className={ styles.floatingPillBrand }>Doctor</span>
              <span className={ styles.floatingPillHint }>
                Prescribing &amp; verification
              </span>
            </div>

            <div className={ styles.statPillRow }>
              { [
                { label: "Total production", value: totalProduction },
                {
                  label: "Current inventory",
                  value: `${inventory} · ${weight}`,
                },
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
                  <h2 className={ styles.panelTitle }>Pharmacy trend</h2>
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
                    Grossing medicines
                  </h2>
                  <div className={ styles.panelTableWrap }>
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
export default DoctorDash
