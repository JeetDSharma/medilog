import React from "react"
import Header from "../../components/Header"
import styles from "../../public/static/css/manufacturer/ManufacturerProfile.module.css"
import { Table, Row, Col, Container, Card } from "react-bootstrap"
import SideBar from "../../components/sideBar/SideBarManufacturerDash"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const ManufacturerDash = () => {
  const router = useRouter()
  const [manufacturerDetails, setManufacturerDetails] = useState({})

  useEffect(() => {
    const requestDataManufacturer = async () => {
      try {
        const walletAddress =
          "0xfa3a6089C317868655f9B15433B62F3f682D2691"
        const response = await fetch(
          `http://localhost:5001/api/manufacturerGetDetailByWallet`,
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
        setManufacturerDetails(responseData)
      } catch (error) {
        console.log(error)
      }
    }
    requestDataManufacturer()
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
                            styles.imageManufacturer
                          }
                          src="/static/images/manufacturerIMG.jpg"
                        />
                      </td>
                      <th>Manufacturer</th>
                      <td>
                        { " " }
                        {
                          manufacturerDetails.ManufacturerName
                        }{ " " }
                      </td>
                    </tr>

                    <tr>
                      <th>Wallet Address</th>
                      <td>
                        { " " }
                        {
                          manufacturerDetails.walletAddress
                        }{ " " }
                      </td>
                    </tr>

                    <tr>
                      <th>E-mail</th>
                      <td>
                        { " " }
                        {
                          manufacturerDetails.emailID
                        }{ " " }
                      </td>
                    </tr>
                    <tr>
                      <th>Phone Number</th>
                      <td>
                        { " " }
                        {
                          manufacturerDetails.phoneNumber
                        }{ " " }
                      </td>
                    </tr>
                    <tr>
                      <th>Address</th>
                      <td>
                        { manufacturerDetails.address }
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

export default ManufacturerDash
