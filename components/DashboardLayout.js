import React from "react"
import { Row, Col } from "react-bootstrap"
import Header from "./Header"
import SideBarAdmin from "./sideBar/SideBarAdminDash"
import SideBarDoctor from "./sideBar/SideBarDoctorDash"
import SideBarManufacturer from "./sideBar/SideBarManufacturerDash"
import SideBarPatient from "./sideBar/SideBarPatientDash"
import SideBarPharmacy from "./sideBar/SideBarPharmacyDash"
import styles from "../public/static/css/components/DashboardLayout.module.css"

const sidebars = {
  admin: SideBarAdmin,
  doctor: SideBarDoctor,
  manufacturer: SideBarManufacturer,
  patient: SideBarPatient,
  pharmacy: SideBarPharmacy,
}

/**
 * @param {object} props
 * @param {"admin"|"doctor"|"manufacturer"|"patient"|"pharmacy"} props.role
 * @param {React.ReactNode} props.children
 */
const DashboardLayout = ({ role = "admin", children }) => {
  const SideBar = sidebars[ role ] || SideBarAdmin
  return (
    <>
      <Header />
      <Row className={ styles.mainContainerDashRow }>
        <SideBar />
        <Col className={ styles.mainContainerDashCol }>
          <div
            className={ styles.dashCanvas }
            data-m54-dashboard="true"
          >
            { children }
          </div>
        </Col>
      </Row>
    </>
  )
}

export default DashboardLayout
