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
      alert("METAMASK / Wallet NOT FOUND!")
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
      <Link href="/pharmacy/PharmacyDashboard">
        <Button className={ styles.navigationButtons } variant="light">
          <div className={ styles.NavContent }>
            <FaIcons.FaTachometerAlt
              className={ styles.SideBarIcons }
            />
            Dashboard
          </div>
        </Button>{ " " }
      </Link>
      <Link href="/pharmacy/PharmacyProfile">
        <Button className={ styles.navigationButtons } variant="light">
          <div className={ styles.NavContent }>
            <FaIcons.FaUser className={ styles.SideBarIcons } />
            My Profile
          </div>
        </Button>{ " " }
      </Link>
      <Link href="/pharmacy/PharmacyPatientCheck">
        <Button className={ styles.navigationButtons } variant="light">
          <div className={ styles.NavContent }>
            <FaIcons.FaCheck className={ styles.SideBarIcons } />
            Check Patient
          </div>
        </Button>{ " " }
      </Link>
      <Link href="/pharmacy/PharmacyViewMedicines">
        <Button className={ styles.navigationButtons } variant="light">
          <div className={ styles.NavContent }>
            <FaIcons.FaMedkit className={ styles.SideBarIcons } />
            Medicines
          </div>
        </Button>{ " " }
      </Link>
      <Link href="/pharmacy/PharmacySellToPatient">
        <Button className={ styles.navigationButtons } variant="light">
          <div className={ styles.NavContent }>
            <FaIcons.FaPencilAlt className={ styles.SideBarIcons } />
            Sell To Patient
          </div>
        </Button>{ " " }
      </Link>
    </Container>
  )
}

export default SideBar
