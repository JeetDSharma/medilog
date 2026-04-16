import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Link from "next/link"
import { Container } from "react-bootstrap"
import {
  FaIndustry,
  FaPills,
  FaUserMd,
  FaUserInjured,
} from "react-icons/fa"
import styles from "../public/static/css/index.module.css"

const MARQUEE_ITEMS = [
  "MANUFACTURING",
  "PRESCRIPTION",
  "DISPENSING",
  "PATIENT CARE",
  "CHAIN OF CUSTODY",
  "VERIFY AUTHENTICITY",
]

const ROLES = [
  {
    href: "/manufacturer/ManufacturerDashboard",
    title: "Manufacturer",
    desc: "Produce and track batches with tamper-proof on-chain records.",
    Icon: FaIndustry,
  },
  {
    href: "/pharmacy/PharmacyDashboard",
    title: "Pharmacy",
    desc: "Dispense safely with inventory visibility and verified sourcing.",
    Icon: FaPills,
  },
  {
    href: "/doctor/DoctorDashboard",
    title: "Doctor",
    desc: "Prescribe with confidence and reduce counterfeit risk.",
    Icon: FaUserMd,
  },
  {
    href: "/patient/PatientDashboard",
    title: "Patient",
    desc: "Verify medicines and follow your prescription journey.",
    Icon: FaUserInjured,
  },
]

const Index = () => {
  const scrollToRoles = () => {
    document.getElementById("roles")?.scrollIntoView({ behavior: "smooth" })
  }

  const MarqueeStrip = ({ suffix }) => (
    <div className={ styles.marqueeGroup }>
      { MARQUEE_ITEMS.map((label, i) => (
        <span key={ `${suffix}-${label}-${i}` } className={ styles.marqueeWord }>
          { i > 0 && (
            <span className={ styles.marqueeDiamond } aria-hidden>
              ◆
            </span>
          ) }
          { label }
        </span>
      )) }
    </div>
  )

  return (
    <>
      <Header />
      <div className={ styles.pageShell }>
        <Container fluid className={ styles.mainContainer }>
          <section className={ styles.hero }>
            <p className={ styles.heroEyebrow }>Blockchain supply chain</p>
            <h1 className={ styles.heroDisplay }>
              <span className={ styles.heroLine }>
                Revolutionizing medicine,
              </span>
              <span className={ styles.heroLineHero }>
                <button
                  type="button"
                  className={ styles.heroInlinePill }
                  onClick={ scrollToRoles }
                >
                  <span className={ styles.heroPillIcon } aria-hidden>
                    ↓
                  </span>
                  Scroll for roles
                </button>
                <span className={ styles.heroBrand }>MediLog</span>
                <span className={ styles.heroRest }>
                  secures your supply chain.
                </span>
              </span>
            </h1>
            <div className={ styles.heroLower }>
              <p className={ styles.heroLead }>
                You need transparent logistics and authenticity at every step.
                MediLog links manufacturers, prescribers, pharmacies, and
                patients on one verifiable network.
              </p>
              <div className={ styles.heroCtaRow }>
                <Link href="#roles" className={ styles.ctaSolid }>
                  Get started
                </Link>
                <div className={ styles.heroArrowDeco } aria-hidden />
              </div>
            </div>
          </section>
        </Container>

        <div className={ styles.marquee } role="presentation">
          <div className={ styles.marqueeTrack }>
            <MarqueeStrip suffix="a" />
            <MarqueeStrip suffix="b" />
          </div>
        </div>

        <section id="roles" className={ styles.yellowZone }>
          <Container fluid className={ styles.yellowInner }>
            <div className={ styles.floatingPill }>
              <span className={ styles.floatingPillBrand }>MediLog</span>
              <span className={ styles.floatingPillHint }>
                Choose your role to enter the dashboard
              </span>
            </div>
            <div className={ styles.roleGrid }>
              { ROLES.map(({ href, title, desc, Icon }) => (
                <Link key={ href } href={ href } className={ styles.roleCard }>
                  <span className={ styles.roleIconWrap } aria-hidden>
                    <Icon className={ styles.roleIcon } />
                  </span>
                  <span className={ styles.roleTitle }>{ title }</span>
                  <span className={ styles.roleDesc }>{ desc }</span>
                  <span className={ styles.roleCta }>Open dashboard →</span>
                </Link>
              )) }
            </div>
          </Container>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Index
