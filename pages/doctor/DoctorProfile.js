import React, { useState, useEffect } from "react"
import DashboardLayout from "../../components/DashboardLayout"
import styles from "../../public/static/css/doctor/DoctorProfile.module.css"
import { Table, Row, Col, Container, Button, Card } from "react-bootstrap"
import { useRouter } from "next/router"
//c
const DoctorProfile = () => {
  const router = useRouter()
  const [doctorDetails, setDoctorDetails] = useState({})

  useEffect(() => {
    const requestDataDoctor = async () => {
      try {
        const walletAddress =
          "0x2C17BbFCb04161690949f026A8fA62237795A962"
        const response = await fetch(
          `http://localhost:5001/api/doctorGetDetailByWallet`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              walletAddress: walletAddress,
            }),
          }
        )
        const responseData = await response.json()
        console.log(responseData)
        setDoctorDetails(responseData)
      } catch (error) {
        console.log(error)
      }
    }
    requestDataDoctor()
  }, [])
  return (
    <DashboardLayout role="doctor">
          <Container className={ styles.mainContainerDash }>
            <Card className={ styles.mainCard }>
              <Card.Body>
                <Table
                  className={ [
                    styles.TableMain,
                    "table-borderless",
                  ] }
                >
                  <tbody>
                    <tr>
                      <td
                        rowspan="7"
                        className={ styles.mainImageDiv }
                      >
                        <img
                          className={
                            styles.imageDoctor
                          }
                          src="/static/images/doctorIMG.jpg"
                        />
                      </td>
                      <th>Full Name</th>
                      <td>
                        { " " }
                        { doctorDetails.DoctorName }{ " " }
                      </td>
                    </tr>

                    <tr>
                      <th>Wallet Address</th>
                      <td>
                        { " " }
                        {
                          doctorDetails.walletAddress
                        }{ " " }
                      </td>
                    </tr>
                    <tr>
                      <th>DOB</th>
                      <td> { doctorDetails.DOB } </td>
                    </tr>
                    <tr>
                      <th>E-mail</th>
                      <td> { doctorDetails.emailID } </td>
                    </tr>
                    <tr>
                      <th>Phone Number</th>
                      <td>
                        { " " }
                        { doctorDetails.phoneNumber }{ " " }
                      </td>
                    </tr>
                    <tr>
                      <th>Speciality</th>
                      <td>{ doctorDetails.speciality }</td>
                    </tr>
                    <tr>
                      <th>Registration No. </th>
                      <td>{ doctorDetails.doctorRegNo }</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Container>
    </DashboardLayout>
  )
}

export default DoctorProfile
