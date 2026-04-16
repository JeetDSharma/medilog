import React from "react"
import Header from "../../components/Header"
import styles from "../../public/static/css/pharmacy/PharmacyProfile.module.css"
import { Row, Col, Container, Table, Card } from "react-bootstrap"
import SideBar from "../../components/sideBar/SideBarPharmacyDash"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const PharmacyDash = () => {
  const router = useRouter()
  const [pharmacyDetails, setPharmacyDetails] = useState({})

  useEffect(() => {
    const requestDataPharmacy = async () => {
      try {
        const walletAddress =
          "1Lbcfr7sAHTD9CgdQo3HTMTkV8LK4ZnX71"
        const response = await fetch(
          `http://localhost:5000/api/pharmacyGetDetailByWallet`,
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
        setPharmacyDetails(responseData)
      } catch (error) {
        console.log(error)
      }
    }
    requestDataPharmacy()
  }, [])

  return (
    <>
      <Header />
      <Row className={ styles.mainContainerDashRow }>
        <SideBar />
        <Col className={ styles.mainContainerDashCol }>
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
                            styles.imagePharmacy
                          }
                          src="/static/images/pharmacistIMG.jpg"
                        />
                      </td>
                      <th>Manufacturer</th>
                      <td>
                        { " " }
                        {
                          pharmacyDetails.PharmacyName
                        }{ " " }
                      </td>
                    </tr>

                    <tr>
                      <th>Wallet Address</th>
                      <td>
                        { " " }
                        {
                          pharmacyDetails.walletAddress
                        }{ " " }
                      </td>
                    </tr>

                    <tr>
                      <th>E-mail</th>
                      <td>
                        { " " }
                        {
                          pharmacyDetails.emailID
                        }{ " " }
                      </td>
                    </tr>
                    <tr>
                      <th>Phone Number</th>
                      <td>
                        { " " }
                        {
                          pharmacyDetails.phoneNumber
                        }{ " " }
                      </td>
                    </tr>
                    <tr>
                      <th>Address</th>
                      <td>
                        { pharmacyDetails.address }
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Container>
        </Col>
      </Row>
    </>
  )
}

export default PharmacyDash
