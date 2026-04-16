import React from "react"
import { Button, Container } from "react-bootstrap"
import styles from "../../public/static/css/components/sidebar.module.css"
import Link from "next/link"
import * as FaIcons from "react-icons/fa"
import * as IoIcons from "react-icons/io"
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
      <Button
        className={ styles.navigationButtons }
        variant="light"
        onClick={ connectWallet }
      >
        <div className={ styles.NavContent }>
          <FaIcons.FaWallet className={ styles.SideBarIcons } />
          Connect Wallet
        </div>
      </Button>{ " " }
      <Link href="/manufacturer/ManufacturerDashboard">
        <Button className={ styles.navigationButtons } variant="light">
          <div className={ styles.NavContent }>
            <FaIcons.FaTachometerAlt
              className={ styles.SideBarIcons }
            />
            Dashboard
          </div>
        </Button>{ " " }
      </Link>
      <Link href="/manufacturer/ManufacturerProfile">
        <Button className={ styles.navigationButtons } variant="light">
          <div className={ styles.NavContent }>
            <FaIcons.FaUser className={ styles.SideBarIcons } />
            My Profile
          </div>
        </Button>{ " " }
      </Link>
      <Link href="/manufacturer/ManufacturerInventory">
        <Button className={ styles.navigationButtons } variant="light">
          <div className={ styles.NavContent }>
            <FaIcons.FaHome className={ styles.SideBarIcons } />
            My Inventory
          </div>
        </Button>{ " " }
      </Link>
      <Link href="/manufacturer/ManufacturerCreateBill">
        <Button className={ styles.navigationButtons } variant="light">
          <div className={ styles.NavContent }>
            <FaIcons.FaPencilAlt className={ styles.SideBarIcons } />
            Create Bill
          </div>
        </Button>{ " " }
      </Link>
      <Link href="/manufacturer/ManufacturerViewMedicine">
        <Button className={ styles.navigationButtons } variant="light">
          <div className={ styles.NavContent }>
            <FaIcons.FaEye className={ styles.SideBarIcons } />
            View Medicine List
          </div>
        </Button>{ " " }
      </Link>
      <Link href="/manufacturer/ManufacturerProduceMedicine">
        <Button className={ styles.navigationButtons } variant="light">
          <div className={ styles.NavContent }>
            <FaIcons.FaShoppingBag
              className={ styles.SideBarIcons }
            />
            Produce Medicine
          </div>
        </Button>{ " " }
      </Link>
      <Link href="/manufacturer/ManufacturerAddDrug">
        <Button className={ styles.navigationButtons } variant="light">
          <div className={ styles.NavContent }>
            <FaIcons.FaPlus
              className={ styles.SideBarIcons }
            />
            Add Drug
          </div>
        </Button>{ " " }
      </Link>
    </Container>
  )
}

export default SideBar
