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
      <div className={ styles.roleEyebrow }>Manufacturer</div>
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
      <SidebarLink href="/manufacturer/ManufacturerDashboard" icon={ FaIcons.FaTachometerAlt }>
        Dashboard
      </SidebarLink>
      <SidebarLink href="/manufacturer/ManufacturerProfile" icon={ FaIcons.FaUser }>
        My Profile
      </SidebarLink>
      <SidebarLink href="/manufacturer/ManufacturerInventory" icon={ FaIcons.FaHome }>
        My Inventory
      </SidebarLink>
      <SidebarLink href="/manufacturer/ManufacturerCreateBill" icon={ FaIcons.FaPencilAlt }>
        Create Bill
      </SidebarLink>
      <SidebarLink href="/manufacturer/ManufacturerViewMedicine" icon={ FaIcons.FaEye }>
        View Medicine List
      </SidebarLink>
      <SidebarLink href="/manufacturer/ManufacturerProduceMedicine" icon={ FaIcons.FaShoppingBag }>
        Produce Medicine
      </SidebarLink>
      <SidebarLink href="/manufacturer/ManufacturerAddDrug" icon={ FaIcons.FaPlus }>
        Add Drug
      </SidebarLink>
    </Container>
  )
}

export default SideBar
