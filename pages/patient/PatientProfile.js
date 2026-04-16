import React, { useState, useEffect } from "react"
import DashboardLayout from "../../components/DashboardLayout"
import styles from "../../public/static/css/patient/PatientProfile.module.css"
import { Table, Container, Button, Card, Row, Col } from "react-bootstrap"
import { useRouter } from "next/router"

const PatientDash = () => {
  const router = useRouter()
  const [patientDetails, setPatientDetails] = useState({})

  useEffect(() => {
    const requestDataPatient = async () => {
      try {
        const walletAddress = "safsfa"
        const response = await fetch(
          `http://localhost:5001/api/patientGetDetailByWallet`,
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
        setPatientDetails(responseData)
      } catch (error) {
        console.log(error)
      }
    }
    requestDataPatient()
  }, [])
  return (
    <DashboardLayout role="patient">
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
                            styles.imagePatient
                          }
                          src="/static/images/patientIMG.jpg"
                        />
                      </td>
                      <th>Full Name</th>
                      <td>
                        { " " }
                        {
                          patientDetails.patientName
                        }{ " " }
                      </td>
                    </tr>

                    <tr>
                      <th>Wallet Address</th>
                      {/* <td> { patientDetails.walletAddress } </td> */ }
                    </tr>
                    <tr>
                      <th>DOB</th>
                      <td> { patientDetails.DOB } </td>
                    </tr>
                    <tr>
                      <th>E-mail</th>
                      <td> { patientDetails.emailID } </td>
                    </tr>
                    <tr>
                      <th>Phone Number</th>
                      <td>
                        { " " }
                        {
                          patientDetails.phoneNumber
                        }{ " " }
                      </td>
                    </tr>
                    <tr>
                      <th>Speciality</th>
                      <td>
                        {
                          patientDetails.patientDescription
                        }
                      </td>
                    </tr>
                    <tr>
                      <th>Registration No. </th>
                      <td>{ patientDetails.aadharCard }</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Container>
    </DashboardLayout>
  )
}

export default PatientDash
