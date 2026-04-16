import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import DashboardLayout from "../../components/DashboardLayout"
import styles from "../../public/static/css/manufacturer/ManufacturerDashboard.module.css"
import { Table, Row, Col, Container } from "react-bootstrap"
import dynamic from "next/dynamic"
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

const MARQUEE_ITEMS = [
  "DRUG PRODUCTION",
  "QUALITY CONTROL",
  "BATCH TRACKING",
  "DISTRIBUTION",
  "ON-CHAIN RECORDS",
  "MANUFACTURING",
]

const ManufacturerDash = () => {
  const revenue = "$ 10000"
  const inventory = "$ 10000"
  const weight = "100 kg"
  const totalProduction = "$ 10000"
  const activePharmacy = "100"
  const [dataLineChart] = useState({
    options: {
      chart: {
        id: "mfg-trend",
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
    series: [{ data: [2100, 3200, 4100, 5200, 6100] }],
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
    <DashboardLayout role="manufacturer">
      <Container className={ styles.mainContainerDash } fluid>
        <section className={ styles.hero }>
          <p className={ styles.heroEyebrow }>Manufacturer · Overview</p>
          <h1 className={ styles.heroDisplay }>
            <span className={ styles.heroLine }>
              Produce, batch, and ship medicines with immutable traceability,
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
                anchors every batch on-chain
              </span>
            </span>
          </h1>
          <div className={ styles.heroLower }>
            <p className={ styles.heroLead }>
              Track lots from facility to pharmacy with transparent sales and
              dispensing events tied to smart contracts.
            </p>
            <div className={ styles.heroCtaRow }>
              <span className={ styles.ctaSolid }>Operations snapshot</span>
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
              <span className={ styles.floatingPillBrand }>Manufacturer</span>
              <span className={ styles.floatingPillHint }>
                Production &amp; distribution
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
                  <h2 className={ styles.panelTitle }>Pharmacy sales mix</h2>
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
export default ManufacturerDash
