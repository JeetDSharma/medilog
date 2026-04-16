import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import DashboardLayout from "../../components/DashboardLayout"
import styles from '../../public/static/css/admin/MedicineView.module.css'
import { Table, Form, Row, Col, Container, Button } from 'react-bootstrap'
import Link from "next/link"
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import { useRouter } from "next/navigation"

const MedicineView = () => {
  const [loadedMedicines, setLoadedMedicines] = useState([])

  useEffect(() => {
    const sendrequest = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/medicinelist')
        const responseData = await response.json()
        console.log(responseData)
        setLoadedMedicines(responseData)
      } catch (err) {
        console.log(err)
      }
    }
    sendrequest()
  }, [])
  return (
    <DashboardLayout role="admin">
          <Container className={styles.mainContainerDash}>
            <Container className={styles.formContainerSearch}>
              <Form className={["d-flex", styles.mainSearchForm]}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className={["me-2", styles.searchInput]}
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
              <br />
            </Container>
            <Table className={styles.tableMain}>
              <thead>
                <tr className={styles.mainTableHeading}>
                  <td>Medicine ID</td>
                  <td>Medicine Name</td>
                  <td>Medicine Power</td>
                  <td>Medicine Drugs</td>
                  <td>Side Effect</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {loadedMedicines.map((item, index) => (
                  <tr key={index} className={styles.trTable}>
                    <td className={styles.tdTable}>{item.MedicineID}</td>
                    <td className={styles.tdTable}>{item.MedicineName}</td>
                    <td className={styles.tdTable}>{item.MedicinePower}</td>
                    <td className={styles.tdTable}>{item.MedicineDrugs}</td>
                    <td className={styles.tdTable}>{item.SideEffects}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
    </DashboardLayout>
  );
}

export default MedicineView
