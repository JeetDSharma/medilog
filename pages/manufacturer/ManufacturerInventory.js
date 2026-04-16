import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "../../components/Header"
import styles from "../../public/static/css/manufacturer/ManufacturerInventory.module.css"
import { Table, Form, Row, Col, Container, Button } from "react-bootstrap"
import SideBar from "../../components/sideBar/SideBarManufacturerDash"
import Link from "next/link"
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import { useRouter } from "next/navigation"

const AdminDashboard = () => {
  const [loadedInventory, setLoadedInventory] = useState([])

  const router = useRouter()
  useEffect(() => {
    // set loaded inventory
  }, [])
  return (
    <>
      <Header />
      <Row className={ styles.mainContainerDashRow }>
        <SideBar />
        <Col className={ styles.mainContainerDashCol }>
          <Container className={ styles.mainContainerDash }>
            <Container className={ styles.formContainerSearch }>
              <Form className={ ["d-flex", styles.mainSearchForm] }>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className={ ["me-2", styles.searchInput] }
                  aria-label="Search"
                />
                <Button variant="outline-success">
                  Search
                </Button>

              </Form>
            </Container>
            <Table className={ styles.tableMain }>
              <thead>
                <tr className={ styles.mainTableHeading }>
                  <td>Sr No</td>
                  <td>Medicine ID</td>
                  <td>Manufacturer ID</td>
                  <td>Manufacturing Date</td>
                  <td>Expiry Date</td>
                  <td>MRP</td>
                </tr>
              </thead>
              <tbody>

                { loadedInventory.map((item, index) => (
                  <tr key={ index } className={ styles.trTable }>
                    <td className={ styles.tdTable }>
                      { item.Srno }
                    </td>
                    <td className={ styles.tdTable }>
                      { item.MedicineID }
                    </td>
                    <td className={ styles.tdTable }>
                      { item.ManufacturerID }
                    </td>
                    <td className={ styles.tdTable }>
                      { item.ManufacturingDate }
                    </td>
                    <td className={ styles.tdTable }>
                      { item.ExpiryDate }
                    </td>
                    <td className={ styles.tdTable }>
                      { item.MRP }
                    </td>
                  </tr>
                )) }
              </tbody>
            </Table>
          </Container>
        </Col>
      </Row>
    </>
  )
}

export default AdminDashboard
