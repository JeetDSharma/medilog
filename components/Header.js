import React from "react"
import { Nav, Navbar, Button, Container, Image, NavDropdown } from "react-bootstrap"
import Link from "next/link"
import { FaChevronDown } from "react-icons/fa"
import styles from "../public/static/css/components/Header.module.css"
import {
  NAV_HOME,
  NAV_PLATFORM_DROPDOWN_LABEL,
  NAV_PLATFORM_LINKS,
  NAV_OPERATIONS,
} from "../lib/navConfig"
import { useWalletRole } from "../contexts/WalletRoleContext"

const Header = () => {
  const { connectWallet } = useWalletRole()

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
            <Nav.Link
              as={ Link }
              href={ NAV_HOME.href }
              className={ styles.navLink }
            >
              { NAV_HOME.label }
            </Nav.Link>
            <NavDropdown
              title={ NAV_PLATFORM_DROPDOWN_LABEL }
              id="medilog-platform-nav"
              className={ styles.navDropdown }
            >
              { NAV_PLATFORM_LINKS.map(({ href, label }) => (
                <NavDropdown.Item
                  key={ href }
                  as={ Link }
                  href={ href }
                  className={ styles.navDropdownItem }
                >
                  { label }
                </NavDropdown.Item>
              )) }
            </NavDropdown>
            <Nav.Link
              as={ Link }
              href={ NAV_OPERATIONS.href }
              className={ styles.navLink }
            >
              { NAV_OPERATIONS.label }
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
