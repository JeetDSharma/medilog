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
  FaUserShield,
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

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Enroll participants",
    text:
      "Your organization registers manufacturers, prescribers, pharmacies, and patients—each tied to an approved wallet.",
  },
  {
    step: "2",
    title: "Produce & record",
    text:
      "Manufacturers register batches and inventory with tamper-evident records aligned to your on-chain medicine registry.",
  },
  {
    step: "3",
    title: "Prescribe",
    text:
      "Licensed prescribers issue prescriptions against verified medicines and enrolled patients.",
  },
  {
    step: "4",
    title: "Dispense",
    text:
      "Pharmacies fulfill prescriptions, update dispensing history, and maintain a clear chain of custody.",
  },
  {
    step: "5",
    title: "Verify & follow",
    text:
      "Patients confirm authenticity, view prescription history, and stay informed across the journey.",
  },
]

const ROLES = [
  {
    href: "/manufacturer/ManufacturerDashboard",
    title: "Manufacturer",
    desc: "Produce and track batches with tamper-proof on-chain records.",
    outcome: "Register medicines, manage inventory, and sell to enrolled pharmacies.",
    need: "Wallet approved as a manufacturer in Operations.",
    Icon: FaIndustry,
  },
  {
    href: "/pharmacy/PharmacyDashboard",
    title: "Pharmacy",
    desc: "Dispense safely with inventory visibility and verified sourcing.",
    outcome: "Verify patients, dispense against prescriptions, and record sales.",
    need: "Wallet approved as a pharmacy in Operations.",
    Icon: FaPills,
  },
  {
    href: "/doctor/DoctorDashboard",
    title: "Doctor",
    desc: "Prescribe with confidence and reduce counterfeit risk.",
    outcome: "Issue prescriptions tied to verified medicines and patient wallets.",
    need: "Wallet approved as a prescriber in Operations.",
    Icon: FaUserMd,
  },
  {
    href: "/patient/PatientDashboard",
    title: "Patient",
    desc: "Verify medicines and follow your prescription journey.",
    outcome: "View prescriptions, check medicines, and use QR flows.",
    need: "Wallet enrolled as a patient in Operations.",
    Icon: FaUserInjured,
  },
]

const OPERATIONS = {
  href: "/adminPages/AdminDashboard",
  title: "Operations",
  desc:
    "Register organizations, manage the medicine catalog, and maintain participant wallets across the network.",
  outcome: "Onboard prescribers, pharmacies, manufacturers, and patients; curate master data.",
  need: "Authorized operator access (see your organization’s policy).",
}

const Index = () => {
  const scrollToRoles = () => {
    document.getElementById("roles")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToHow = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
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
                  Explore roles
                </button>
                <span className={ styles.heroBrand }>MediLog</span>
                <span className={ styles.heroRest }>
                  secures your supply chain.
                </span>
              </span>
            </h1>
            <div className={ styles.heroLower }>
              <p className={ styles.heroLead }>
                MediLog connects manufacturing, prescribing, dispensing, and
                patient care on one verifiable network—from batch to bedside—with
                transparent logistics and authenticity at every step.
              </p>
              <div className={ styles.heroCtaRow }>
                <Link href="#roles" className={ styles.ctaSolid }>
                  View workspaces
                </Link>
                <button
                  type="button"
                  className={ styles.ctaGhost }
                  onClick={ scrollToHow }
                >
                  How it works
                </button>
                <div className={ styles.heroArrowDeco } aria-hidden />
              </div>
            </div>
          </section>
        </Container>

        <section
          id="how-it-works"
          className={ styles.howSection }
          aria-labelledby="how-it-works-heading"
        >
          <Container fluid className={ styles.howInner }>
            <h2 id="how-it-works-heading" className={ styles.howHeading }>
              How MediLog works
            </h2>
            <p className={ styles.howSub }>
              A single platform for the medicine lifecycle—off-chain profiles and
              catalog data, with critical steps anchored on-chain.
            </p>
            <ol className={ styles.howSteps }>
              { HOW_IT_WORKS.map(({ step, title, text }) => (
                <li key={ step } className={ styles.howStep }>
                  <span className={ styles.howStepNum } aria-hidden>
                    { step }
                  </span>
                  <div>
                    <span className={ styles.howStepTitle }>{ title }</span>
                    <p className={ styles.howStepText }>{ text }</p>
                  </div>
                </li>
              )) }
            </ol>
          </Container>
        </section>

        <div className={ styles.marquee } role="presentation">
          <div className={ styles.marqueeTrack }>
            <MarqueeStrip suffix="a" />
            <MarqueeStrip suffix="b" />
          </div>
        </div>

        <section id="roles" className={ styles.yellowZone }>
          <Container fluid className={ styles.yellowInner }>
            <div className={ styles.floatingPill }>
              <span className={ styles.floatingPillBrand }>Workspaces</span>
              <span className={ styles.floatingPillHint }>
                Open the view that matches your role. Connect your wallet to
                access enrolled features.
              </span>
            </div>
            <div className={ styles.roleGrid }>
              { ROLES.map(
                ({ href, title, desc, outcome, need, Icon }) => (
                  <Link key={ href } href={ href } className={ styles.roleCard }>
                    <span className={ styles.roleIconWrap } aria-hidden>
                      <Icon className={ styles.roleIcon } />
                    </span>
                    <span className={ styles.roleTitle }>{ title }</span>
                    <span className={ styles.roleDesc }>{ desc }</span>
                    <span className={ styles.roleOutcome }>{ outcome }</span>
                    <span className={ styles.roleNeed }>{ need }</span>
                    <span className={ styles.roleCta }>Open workspace →</span>
                  </Link>
                )
              ) }
              <Link
                href={ OPERATIONS.href }
                className={ [styles.roleCard, styles.roleCardOps].join(" ") }
              >
                <span className={ styles.roleIconWrap } aria-hidden>
                  <FaUserShield className={ styles.roleIcon } />
                </span>
                <span className={ styles.roleTitle }>{ OPERATIONS.title }</span>
                <span className={ styles.roleDesc }>{ OPERATIONS.desc }</span>
                <span className={ styles.roleOutcome }>{ OPERATIONS.outcome }</span>
                <span className={ styles.roleNeed }>{ OPERATIONS.need }</span>
                <span className={ styles.roleCta }>Open console →</span>
              </Link>
            </div>
          </Container>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Index
