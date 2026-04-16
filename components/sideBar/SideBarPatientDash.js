import React from "react"
import { Button, Container } from "react-bootstrap"
import styles from "../../public/static/css/components/sidebar.module.css"
import Link from "next/link"
import * as FaIcons from "react-icons/fa"
import * as IoIcons from "react-icons/io"
import { AiOutlineSecurityScan } from "react-icons/ai"

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
      <Link href="/patient/PatientDashboard">
        <Button className={ styles.navigationButtons } variant="light">
          <div className={ styles.NavContent }>
            <FaIcons.FaTachometerAlt className={ styles.SideBarIcons } />
            Dashboard
          </div>
        </Button>{ " " }
      </Link>
      <Link href="/patient/PatientProfile">
        <Button className={ styles.navigationButtons } variant="light">
          <div className={ styles.NavContent }>
            <FaIcons.FaUser className={ styles.SideBarIcons } />
            My Profile
          </div>
        </Button>{ " " }
      </Link>
      <Link href="/patient/PatientQR">
        <Button className={ styles.navigationButtons } variant="light">
          <div className={ styles.NavContent }>
            <FaIcons.FaQrcode className={ styles.SideBarIcons } />
            My QR Code
          </div>
        </Button>{ " " }
      </Link>
      <Link href="/patient/PatientViewPrescriptionList">
        <Button className={ styles.navigationButtons } variant="light">
          <div className={ styles.NavContent }>
            <FaIcons.FaFileAlt className={ styles.SideBarIcons } />
            View Prescription
          </div>
        </Button>{ " " }
      </Link>
      <Link href="/patient/PatientCheckMedicine">
        <Button className={ styles.navigationButtons } variant="light">
          <div className={ styles.NavContent }>
            <AiOutlineSecurityScan className={ styles.SideBarIcons } />
            Verify Medicine
          </div>
        </Button>{ " " }
      </Link>
      <Link href="/patient/patientpurchasehistory">
        <Button className={ styles.navigationButtons } variant="light">
          <div className={ styles.NavContent }>
            <FaIcons.FaHistory className={ styles.SideBarIcons } />
            Purchase History
          </div>
        </Button>{ " " }
      </Link>
    </Container>
  )
}

export default SideBar
