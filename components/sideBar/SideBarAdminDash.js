import React from "react"
import { Button, Container } from "react-bootstrap"
import styles from "../../public/static/css/components/sidebar.module.css"
import * as FaIcons from "react-icons/fa"
import { AiOutlineUnorderedList } from "react-icons/ai"
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
      <div className={ styles.roleEyebrow }>Admin console</div>
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
      <SidebarLink href="/adminPages/AdminDashboard" icon={ FaIcons.FaTachometerAlt }>
        Dashboard
      </SidebarLink>
      <SidebarLink href="/adminPages/DoctorView" icon={ AiOutlineUnorderedList }>
        View Doctors
      </SidebarLink>
      <SidebarLink href="/adminPages/MedicineView" icon={ AiOutlineUnorderedList }>
        View Medicine List
      </SidebarLink>
      <SidebarLink href="/adminPages/PharmacyView" icon={ AiOutlineUnorderedList }>
        View Pharmacy List
      </SidebarLink>
      <SidebarLink href="/adminPages/ManufacturerView" icon={ AiOutlineUnorderedList }>
        View Manufacturer
      </SidebarLink>
      <SidebarLink href="/adminPages/PatientView" icon={ AiOutlineUnorderedList }>
        View Patients
      </SidebarLink>
    </Container>
  )
}

export default SideBar
