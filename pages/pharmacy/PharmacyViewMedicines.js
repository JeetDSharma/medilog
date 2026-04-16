import React from "react"
import DashboardLayout from "../../components/DashboardLayout"
import styles from "../../public/static/css/pharmacy/PharmacyViewMedicines.module.css"
import { Table, Form, Row, Col, Container, Button } from "react-bootstrap"
const MedicineList = [
  {
    key: "1",
    medicineName: "Paracetamol",
    manufacturingDate: "06/01/2019",
    expiryDate: "06/09/2025",
    mrp: "300",
    qty: "10",
  },
  {
    key: "2",
    medicineName: "Azythromycine",
    manufacturingDate: "06/01/2019",
    expiryDate: "06/09/2025",
    mrp: "300",
    qty: "50",
  },
  {
    key: "3",
    medicineName: "Glycaphase",
    manufacturingDate: "06/01/2019",
    expiryDate: "06/09/2025",
    mrp: "300",
    qty: "22",
  },
  {
    key: "4",
    medicineName: "Dolo 650",
    manufacturingDate: "06/01/2019",
    expiryDate: "06/09/2025",
    mrp: "300",
    qty: "15",
  },
]
const PharmacyViewMedicine = () => {
  return (
    <DashboardLayout role="pharmacy">
          <Container className={ styles.mainContainerDash }>
            <Container className={ styles.formContainerSearch }>
              <Form className={ ["d-flex", styles.mainSearchForm] }>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className={ ["me-2", styles.searchInput] }
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
              <br />
            </Container>
            <Table className={ styles.tableMain }>
              <thead>
                <tr className={ styles.mainTableHeading }>
                  <td>Medicine ID</td>
                  <td>Medicine Name</td>
                  <td>Manufacturing Date</td>
                  <td>Expiry Date</td>
                  <td>MRP</td>
                  <td>Qty</td>
                </tr>
              </thead>
              <tbody>
                { MedicineList.map((MedicineList) => {
                  return (
                    <tr className={ styles.trTable }>
                      <td className={ styles.tdTable }>{ MedicineList.key }</td>
                      <td className={ styles.tdTable }>{ MedicineList.medicineName }</td>
                      <td className={ styles.tdTable }>{ MedicineList.manufacturingDate }</td>
                      <td className={ styles.tdTable }>{ MedicineList.expiryDate }</td>
                      <td className={ styles.tdTable }>{ MedicineList.mrp }</td>
                      <td className={ styles.tdTable }>{ MedicineList.qty }</td>
                    </tr>
                  )
                }) }
              </tbody>
            </Table>
          </Container>
    </DashboardLayout>
  )
}

export default PharmacyViewMedicine
