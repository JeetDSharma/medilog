import React from "react";
import { Button, Container } from "react-bootstrap";
import styles from "../../public/static/css/components/sidebar.module.css";
import Link from "next/link";
import AdminDashboard from "../../pages/adminPages/AddADoctor";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import { AiOutlineUnorderedList } from "react-icons/ai";
const SideBar = () => {
  const connectWallet = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } else {
      alert("METAMASK NOT FOUND!");
    }
  };
  return (
    <Container className={styles.mainContainerSidebar}>
      <Button
        className={styles.navigationButtons}
        variant="light"
        onClick={connectWallet}
      >
        <div className={styles.NavContent}>
          <FaIcons.FaWallet className={styles.SideBarIcons} />
          Connect Wallet
        </div>
      </Button>{" "}
      <Link href="/adminPages/AdminDashboard">
        <Button className={styles.navigationButtons} variant="light">
          <div className={styles.NavContent}>
            <FaIcons.FaTachometerAlt className={styles.SideBarIcons} />
            Dashboard
          </div>
        </Button>{" "}
      </Link>
      <Link href="/adminPages/DoctorView">
        <Button className={styles.navigationButtons} variant="light">
          <div className={styles.NavContent}>
            <AiOutlineUnorderedList className={styles.SideBarIcons} />
            View Doctors
          </div>
        </Button>{" "}
      </Link>
      <Link href="/adminPages/MedicineView">
        <Button className={styles.navigationButtons} variant="light">
          <div className={styles.NavContent}>
            <AiOutlineUnorderedList className={styles.SideBarIcons} />
            View Medicine List
          </div>
        </Button>{" "}
      </Link>
      <Link href="/adminPages/PharmacyView">
        <Button className={styles.navigationButtons} variant="light">
          <div className={styles.NavContent}>
            {" "}
            <AiOutlineUnorderedList className={styles.SideBarIcons} />
            View Pharmacy List
          </div>
        </Button>{" "}
      </Link>
      <Link href="/adminPages/ManufacturerView">
        <Button className={styles.navigationButtons} variant="light">
          <div className={styles.NavContent}>
            <AiOutlineUnorderedList className={styles.SideBarIcons} />
            View Manufacturer
          </div>
        </Button>{" "}
      </Link>
      <Link href="/adminPages/PatientView">
        <Button className={styles.navigationButtons} variant="light">
          <div className={styles.NavContent}>
            <AiOutlineUnorderedList className={styles.SideBarIcons} />
            View Patients
          </div>
        </Button>{" "}
      </Link>
    </Container>
  );
};

export default SideBar;
