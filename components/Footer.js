import React from "react"
import Link from "next/link"
import styles from "../public/static/css/components/Footer.module.css"

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className={ styles.footer }>
      <div className={ styles.inner }>
        <div className={ styles.grid }>
          <div className={ styles.colBrand }>
            <span className={ styles.brand }>MediLog</span>
            <p className={ styles.tagline }>
              Revolutionizing medicine supply chain with secure blockchain
              logistics and transparent chain of custody.
            </p>
          </div>
          <div className={ styles.colLinks }>
            <span className={ styles.colTitle }>Quick links</span>
            <ul className={ styles.linkList }>
              <li>
                <Link href="/manufacturer/ManufacturerDashboard">
                  Manufacturer
                </Link>
              </li>
              <li>
                <Link href="/doctor/DoctorDashboard">Doctor</Link>
              </li>
              <li>
                <Link href="/pharmacy/PharmacyDashboard">Pharmacy</Link>
              </li>
              <li>
                <Link href="/patient/PatientDashboard">Patient</Link>
              </li>
              <li>
                <Link href="/adminPages/AdminDashboard">Admin</Link>
              </li>
            </ul>
          </div>
          <div className={ styles.colSupport }>
            <span className={ styles.colTitle }>Support</span>
            <p className={ styles.supportText }>
              Need help with MetaMask or the network? Check your wallet
              connection and contract addresses in{" "}
              <code className={ styles.code }>lib/contractAddresses.js</code>.
            </p>
            <a className={ styles.supportLink } href="mailto:support@medilog.local">
              support@medilog.local
            </a>
          </div>
        </div>
        <div className={ styles.bottomBar }>
          <span>© { year } MediLog. All rights reserved.</span>
          <span className={ styles.madeWith }>Made with care</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
