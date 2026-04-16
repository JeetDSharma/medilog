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
      alert("METAMASK / Wallet NOT FOUND!")
    }
  }
  return (
    <Container className={ styles.mainContainerSidebar }>
      <div className={ styles.roleEyebrow }>Pharmacy</div>
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
      <SidebarLink href="/pharmacy/PharmacyDashboard" icon={ FaIcons.FaTachometerAlt }>
        Dashboard
      </SidebarLink>
      <SidebarLink href="/pharmacy/PharmacyProfile" icon={ FaIcons.FaUser }>
        My Profile
      </SidebarLink>
      <SidebarLink href="/pharmacy/PharmacyPatientCheck" icon={ FaIcons.FaCheck }>
        Check Patient
      </SidebarLink>
      <SidebarLink href="/pharmacy/PharmacyViewMedicines" icon={ FaIcons.FaMedkit }>
        Medicines
      </SidebarLink>
      <SidebarLink href="/pharmacy/PharmacySellToPatient" icon={ FaIcons.FaPencilAlt }>
        Sell To Patient
      </SidebarLink>
    </Container>
  )
}

export default SideBar
