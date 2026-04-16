import React from "react"
import Link from "next/link"
import { Button, Spinner } from "react-bootstrap"
import { useWalletRole } from "../contexts/WalletRoleContext"
import styles from "../public/static/css/components/RoleAccessPanel.module.css"

const ROLE_COPY = {
  admin: {
    title: "Operations access required",
    body:
      "This workspace is limited to authorized operators. Connect the wallet your organization has approved for MediLog operations.",
  },
  doctor: {
    title: "No prescriber profile for this wallet",
    body:
      "Connect a wallet that has been enrolled as a prescriber, or ask your administrator to register this address in Operations.",
  },
  pharmacy: {
    title: "No pharmacy profile for this wallet",
    body:
      "Connect a wallet enrolled for your pharmacy, or complete enrollment in Operations with your administrator.",
  },
  patient: {
    title: "No patient profile for this wallet",
    body:
      "Connect a wallet linked to your patient record, or enroll this address through Operations.",
  },
  manufacturer: {
    title: "No manufacturer profile for this wallet",
    body:
      "Connect a wallet registered for your manufacturing organization, or complete setup in Operations.",
  },
}

function adminWalletRequired() {
  const raw =
    typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_ADMIN_WALLET
      : undefined
  return !!(raw && String(raw).trim())
}

function ConnectPrompt({ role }) {
  const { connectWallet } = useWalletRole()
  const copy = ROLE_COPY[ role ] || ROLE_COPY.doctor
  return (
    <div className={ styles.panel }>
      <h2 className={ styles.title }>Connect your wallet</h2>
      <p className={ styles.body }>{ copy.body }</p>
      <Button
        type="button"
        variant="dark"
        className={ styles.primaryBtn }
        onClick={ connectWallet }
      >
        Connect wallet
      </Button>
      <p className={ styles.muted }>
        <Link href="/">Back to home</Link>
      </p>
    </div>
  )
}

function AccessDenied({ role }) {
  const { connectWallet } = useWalletRole()
  const copy = ROLE_COPY[ role ] || ROLE_COPY.doctor
  return (
    <div className={ styles.panel }>
      <h2 className={ styles.title }>{ copy.title }</h2>
      <p className={ styles.body }>{ copy.body }</p>
      <div className={ styles.actions }>
        <Button
          type="button"
          variant="outline-dark"
          className={ styles.secondaryBtn }
          onClick={ connectWallet }
        >
          Use another wallet
        </Button>
        <Link href="/adminPages/AdminDashboard" className={ styles.linkBtn }>
          Open Operations
        </Link>
      </div>
      <p className={ styles.muted }>
        <Link href="/">Back to home</Link>
      </p>
    </div>
  )
}

function AdminDenied() {
  const copy = ROLE_COPY.admin
  return (
    <div className={ styles.panel }>
      <h2 className={ styles.title }>{ copy.title }</h2>
      <p className={ styles.body }>{ copy.body }</p>
      <p className={ styles.muted }>
        <Link href="/">Back to home</Link>
      </p>
    </div>
  )
}

function AdminConnectPrompt() {
  const { connectWallet } = useWalletRole()
  const copy = ROLE_COPY.admin
  return (
    <div className={ styles.panel }>
      <h2 className={ styles.title }>{ copy.title }</h2>
      <p className={ styles.body }>{ copy.body }</p>
      <Button
        type="button"
        variant="dark"
        className={ styles.primaryBtn }
        onClick={ connectWallet }
      >
        Connect wallet
      </Button>
      <p className={ styles.muted }>
        <Link href="/">Back to home</Link>
      </p>
    </div>
  )
}

/**
 * Shows loading / access messaging or renders children when the wallet matches the dashboard role.
 */
export function RoleAccessGate({ role, children }) {
  const { account, loading, isRegisteredForRole } = useWalletRole()

  if (loading) {
    return (
      <div className={ styles.loading }>
        <Spinner animation="border" role="status" size="sm" />
        <span className={ styles.loadingText }>Checking wallet…</span>
      </div>
    )
  }

  if (role === "admin") {
    if (isRegisteredForRole("admin")) {
      return children
    }
    if (adminWalletRequired() && !account) {
      return <AdminConnectPrompt />
    }
    return <AdminDenied />
  }

  if (!account) {
    return <ConnectPrompt role={ role } />
  }

  if (!isRegisteredForRole(role)) {
    return <AccessDenied role={ role } />
  }

  return children
}
