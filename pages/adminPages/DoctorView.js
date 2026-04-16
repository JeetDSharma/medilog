import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "../../components/Header"
import styles from "../../public/static/css/admin/DoctorView.module.css"
import { Table, Form, Row, Col, Container, Button } from "react-bootstrap"
import SideBar from "../../components/sideBar/SideBarAdminDash"
import Link from "next/link"
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import { useRouter } from "next/navigation"

const AdminDashboard = () => {
  const [loadedDoctors, setLoadedDoctors] = useState([])
  const router = useRouter()
  const deleteDoctor = async (value) => {
    console.log(value)
    try {
      const response = await fetch(
        "http://localhost:5000/api/doctorDelete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: value,
          }),
        }
      )
      const responseData = await response.json()
      console.log(responseData)
    } catch (err) {
      console.log(err)
    }
    router.refresh()
  }
  useEffect(() => {
    const sendrequest = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/doctorlist"
        )
        const responseData = await response.json()
        console.log(responseData)
        setLoadedDoctors(responseData)
      } catch (err) {
        console.log(err)
      }
    }
    sendrequest()
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
                <Link href="/adminPages/AddADoctor">
                  <Button
                    variant="outline-secondary"
                    className={ styles.addDoctorButton }
                  >
                    +
                  </Button>
                </Link>
              </Form>
            </Container>
            <Table className={ styles.tableMain }>
              <thead>
                <tr className={styles.mainTableHeading}>
                  <td>Doctor Reg No</td>
                  <td>Doctor Name</td>
                  <td>Wallet Address</td>
                  <td>DOB</td>
                  <td>Email ID</td>
                  <td>Phone Number</td>
                  <td>Speciality</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>

                { loadedDoctors.map((item, index) => (
                  <tr key={ index } className={ styles.trTable }>
                    <td className={ styles.tdTable }>
                      { item.doctorRegNo }
                    </td>
                    <td className={ styles.tdTable }>
                      { item.DoctorName }
                    </td>
                    <td className={ styles.tdTable }>
                      { item.walletAddress }
                    </td>
                    <td className={ styles.tdTable }>
                      { item.DOB }
                    </td>
                    <td className={ styles.tdTable }>
                      { item.emailID }
                    </td>
                    <td className={ styles.tdTable }>
                      { item.phoneNumber }
                    </td>
                    <td className={ styles.tdTable }>
                      { item.speciality }
                    </td>
                    <td className={ styles.tdTable }>
                      <Link
                        href={
                          "/adminPages/EditProfileDoctor?id=" +
                          item._id
                        }
                      >
                        <Button
                          variant="outline-primary"
                          value={ item._id }
                        >
                          <AiOutlineEdit></AiOutlineEdit>
                        </Button>
                      </Link>{ " " }
                      <Button
                        variant="outline-danger"
                        value={ item._id }
                        onClick={ () => {
                          deleteDoctor(item._id)
                        } }
                      >
                        <AiOutlineDelete></AiOutlineDelete>
                      </Button>
                    </td>
                    {/* <td className={ styles.tdTable }></td> */}
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
