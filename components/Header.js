import React from "react";
import {
  NavDropdown,
  Nav,
  Navbar,
  Button,
  Container,
  Image,
} from "react-bootstrap";
import styles from "../public/static/css/components/Header.module.css";

const Header = () => {
  return (
    <Navbar className={styles.mainNavbar} expand="lg">
      <Container className={styles.mainContainer}>
        <Navbar.Brand href="/" className={styles.logoSpace}>
          <Image
            className={styles.logoLogistics}
            src="../static/images/logisticsLogo.png"
          ></Image>
          <text className={styles.fontText}>MediLog</text>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className={["me-auto", styles.restNav]}>
          <Nav.Link className={styles.font} href="/adminPages/AdminDashboard">
            <text className={styles.fontText}>Admin</text>
          </Nav.Link>
          <Nav.Link href="#link">
            <text className={styles.fontText}>Support</text>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
