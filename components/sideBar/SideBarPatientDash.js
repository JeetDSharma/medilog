import React from "react"
import { Button, Container } from "react-bootstrap"
import styles from "../../public/static/css/components/sidebar.module.css"
import * as FaIcons from "react-icons/fa"
import { AiOutlineSecurityScan } from "react-icons/ai"
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
      <div className={ styles.roleEyebrow }>Patient</div>
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
      <SidebarLink href="/patient/PatientDashboard" icon={ FaIcons.FaTachometerAlt }>
        Dashboard
      </SidebarLink>
      <SidebarLink href="/patient/PatientProfile" icon={ FaIcons.FaUser }>
        My Profile
      </SidebarLink>
      <SidebarLink href="/patient/PatientQR" icon={ FaIcons.FaQrcode }>
        My QR Code
      </SidebarLink>
      <SidebarLink href="/patient/PatientViewPrescriptionList" icon={ FaIcons.FaFileAlt }>
        View Prescription
      </SidebarLink>
      <SidebarLink href="/patient/PatientCheckMedicine" icon={ AiOutlineSecurityScan }>
        Verify Medicine
      </SidebarLink>
      <SidebarLink href="/patient/patientpurchasehistory" icon={ FaIcons.FaHistory }>
        Purchase History
      </SidebarLink>
    </Container>
  )
}

export default SideBar
