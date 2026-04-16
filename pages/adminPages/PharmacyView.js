import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header";
import styles from "../../public/static/css/admin/PharmacyView.module.css";
import { Table, Form, Row, Col, Container, Button } from "react-bootstrap";
import SideBar from "../../components/sideBar/SideBarAdminDash";
import Link from "next/link";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const [loadedPharmacies, setLoadedPharmacies] = useState([]);
  const router = useRouter();
  const deletePharmacy = async (value) => {
    console.log(value);
    try {
      const response = await fetch("http://localhost:5000/api/pharmacyDelete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: value,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
    router.refresh();
  };
  useEffect(() => {
    const sendrequest = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/pharmacylist");
        const responseData = await response.json();
        console.log(responseData);
        setLoadedPharmacies(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    sendrequest();
  }, []);
  return (
    <>
      <Header />
      <Row className={styles.mainContainerDashRow}>
        <SideBar />
        <Col className={styles.mainContainerDashCol}>
          <Container className={styles.mainContainerDash}>
            <Container className={styles.formContainerSearch}>
              <Form className={["d-flex", styles.mainSearchForm]}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className={["me-2", styles.searchInput]}
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
                <Link href="/adminPages/AddAPharmacy">
                  <Button
                    variant="outline-secondary"
                    className={styles.addPharmacyButton}
                  >
                    +
                  </Button>
                </Link>
              </Form>
            </Container>
            <Table className={styles.tableMain}>
              <thead>
                <tr className={styles.mainTableHeading}>
                  <td>Pharmacy ID</td>
                  <td>Pharmacy Name</td>
                  <td>Wallet Address</td>
                  <td>Email ID</td>
                  <td>Phone Number</td>
                  <td>Address</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {loadedPharmacies.map((item, index) => (
                  <tr key={index} className={styles.trTable}>
                    <td className={styles.tdTable}>{item.pharmacyID}</td>
                    <td className={styles.tdTable}>{item.PharmacyName}</td>
                    <td className={styles.tdTable}>{item.walletAddress}</td>
                    <td className={styles.tdTable}>{item.emailID}</td>
                    <td className={styles.tdTable}>{item.phoneNumber}</td>
                    <td className={styles.tdTable}>{item.address}</td>
                    <td className={styles.tdTable}>
                      <Link
                        href={"/adminPages/EditProfilePharmacy?id=" + item._id}
                      >
                        <Button variant="outline-primary" value={item._id}>
                          <AiOutlineEdit></AiOutlineEdit>
                        </Button>
                      </Link>{" "}
                      <Button
                        variant="outline-danger"
                        value={item._id}
                        onClick={() => {
                          deletePharmacy(item._id);
                        }}
                      >
                        <AiOutlineDelete></AiOutlineDelete>
                      </Button>
                    </td>
                    {/* <td className={ styles.tdTable }></td> */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboard;
