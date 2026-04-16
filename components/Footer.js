import React from "react"
import Link from "next/link"
import styles from "../public/static/css/components/Footer.module.css"
import {
  NAV_PLATFORM_LINKS,
  NAV_OPERATIONS,
  FOOTER_PLATFORM_TITLE,
  FOOTER_OPERATIONS_TITLE,
} from "../lib/navConfig"

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
            <span className={ styles.colTitle }>{ FOOTER_PLATFORM_TITLE }</span>
            <ul className={ styles.linkList }>
              { NAV_PLATFORM_LINKS.map(({ href, label }) => (
                <li key={ href }>
                  <Link href={ href }>{ label }</Link>
                </li>
              )) }
            </ul>
          </div>
          <div className={ styles.colLinks }>
            <span className={ styles.colTitle }>{ FOOTER_OPERATIONS_TITLE }</span>
            <ul className={ styles.linkList }>
              <li>
                <Link href={ NAV_OPERATIONS.href }>{ NAV_OPERATIONS.label }</Link>
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
