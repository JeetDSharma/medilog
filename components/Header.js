import React from "react"
import { Nav, Navbar, Button, Container, Image } from "react-bootstrap"
import Link from "next/link"
import { FaChevronDown } from "react-icons/fa"
import styles from "../public/static/css/components/Header.module.css"

const Header = () => {
  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" })
    } else {
      alert("METAMASK NOT FOUND!")
    }
  }

  return (
    <Navbar className={ styles.mainNavbar } expand="lg" collapseOnSelect>
      <Container fluid className={ styles.mainContainer }>
        <Navbar.Brand as={ Link } href="/" className={ styles.logoSpace }>
          <Image
            className={ styles.logoLogistics }
            src="/static/images/logisticsLogo.png"
            alt="MediLog"
          />
          <span className={ styles.fontText }>MediLog</span>
          <FaChevronDown className={ styles.logoChevron } aria-hidden />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="medilog-navbar-nav"
          className={ styles.navToggle }
        />
        <Navbar.Collapse id="medilog-navbar-nav" className={ styles.navCollapse }>
          <Nav className={ [styles.centerNav, "mx-lg-auto" ].join(" ") }>
            <Nav.Link as={ Link } href="/" className={ styles.navLink }>
              Home
            </Nav.Link>
            <Nav.Link
              as={ Link }
              href="/manufacturer/ManufacturerDashboard"
              className={ styles.navLink }
            >
              Manufacturer
            </Nav.Link>
            <Nav.Link
              as={ Link }
              href="/doctor/DoctorDashboard"
              className={ styles.navLink }
            >
              Doctor
            </Nav.Link>
            <Nav.Link
              as={ Link }
              href="/pharmacy/PharmacyDashboard"
              className={ styles.navLink }
            >
              Pharmacy
            </Nav.Link>
            <Nav.Link
              as={ Link }
              href="/patient/PatientDashboard"
              className={ styles.navLink }
            >
              Patient
            </Nav.Link>
            <Nav.Link
              as={ Link }
              href="/adminPages/AdminDashboard"
              className={ styles.navLink }
            >
              Admin
            </Nav.Link>
          </Nav>
          <Nav className={ styles.rightNav }>
            <Button
              type="button"
              variant="outline-light"
              className={ styles.ctaPill }
              onClick={ connectWallet }
            >
              Connect Wallet
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
