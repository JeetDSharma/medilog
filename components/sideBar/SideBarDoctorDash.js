import React from "react"
import { Button, Container } from "react-bootstrap"
import styles from "../../public/static/css/components/sidebar.module.css"
import * as FaIcons from "react-icons/fa"
import SidebarLink from "./SidebarLink"

const SideBar = () => {
  const connectWallet = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" })
    } else {
      alert("METAMASK NOT FOUND!")
    }
  }
  return (
    <Container className={ styles.mainContainerSidebar }>
      <div className={ styles.roleEyebrow }>Doctor</div>
      <div className={ styles.walletBlock }>
        <Button
          className={ styles.navigationButtons }
          variant="light"
          onClick={ connectWallet }
        >
          <div className={ styles.NavContent }>
            <FaIcons.FaWallet className={ styles.SideBarIcons } />
            Connect Wallet
          </div>
        </Button>
      </div>
      <div className={ styles.navDivider } />
      <SidebarLink href="/doctor/DoctorDashboard" icon={ FaIcons.FaTachometerAlt }>
        Dashboard
      </SidebarLink>
      <SidebarLink href="/doctor/DoctorProfile" icon={ FaIcons.FaUser }>
        My Profile
      </SidebarLink>
      <SidebarLink href="/doctor/DoctorPatientCheck" icon={ FaIcons.FaCheck }>
        Check Patient
      </SidebarLink>
      <SidebarLink href="/doctor/DoctorMedicineView" icon={ FaIcons.FaMedkit }>
        Medicines
      </SidebarLink>
      <SidebarLink href="/doctor/DoctorGivePrescription" icon={ FaIcons.FaPen }>
        Give Prescription
      </SidebarLink>
    </Container>
  )
}

export default SideBar
