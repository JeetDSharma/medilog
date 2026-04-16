import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { API_BASE } from "../lib/apiBase"

const WalletRoleContext = createContext(null)

function isMongoDoc(data) {
  return (
    data &&
    typeof data === "object" &&
    !Array.isArray(data) &&
    typeof data._id === "string"
  )
}

async function fetchHasProfile(path, walletAddress) {
  if (!walletAddress) return false
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ walletAddress }),
    })
    const data = await res.json()
    if (typeof data === "string") return false
    return isMongoDoc(data)
  } catch {
    return false
  }
}

function parseAdminAllowlist() {
  const raw =
    typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_ADMIN_WALLET
      : undefined
  if (!raw || !String(raw).trim()) return null
  return String(raw)
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
}

export function WalletRoleProvider({ children }) {
  const [account, setAccount] = useState(null)
  const [loading, setLoading] = useState(true)
  const [roles, setRoles] = useState({
    doctor: false,
    pharmacy: false,
    patient: false,
    manufacturer: false,
  })

  const resolveRoles = useCallback(async (address) => {
    if (!address) {
      setRoles({
        doctor: false,
        pharmacy: false,
        patient: false,
        manufacturer: false,
      })
      setLoading(false)
      return
    }
    setLoading(true)
    const [doctor, pharmacy, patient, manufacturer] = await Promise.all([
      fetchHasProfile("/api/doctorGetDetailByWallet", address),
      fetchHasProfile("/api/pharmacyGetDetailByWallet", address),
      fetchHasProfile("/api/patientGetDetailByWallet", address),
      fetchHasProfile("/api/manufacturerGetDetailByWallet", address),
    ])
    setRoles({ doctor, pharmacy, patient, manufacturer })
    setLoading(false)
  }, [])

  const refresh = useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      setAccount(null)
      await resolveRoles(null)
      return
    }
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      })
      const addr = accounts[0] ? String(accounts[0]) : null
      setAccount(addr)
      await resolveRoles(addr)
    } catch {
      setAccount(null)
      await resolveRoles(null)
    }
  }, [resolveRoles])

  const connectWallet = useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      window.alert("Install MetaMask or another Ethereum wallet to continue.")
      return
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })
    const addr = accounts[0] ? String(accounts[0]) : null
    setAccount(addr)
    await resolveRoles(addr)
  }, [resolveRoles])

  useEffect(() => {
    refresh()
    if (typeof window === "undefined" || !window.ethereum) return undefined
    const eth = window.ethereum
    const onAccounts = () => {
      refresh()
    }
    const onChain = () => {
      if (typeof window !== "undefined") window.location.reload()
    }
    eth.on("accountsChanged", onAccounts)
    eth.on("chainChanged", onChain)
    return () => {
      eth.removeListener("accountsChanged", onAccounts)
      eth.removeListener("chainChanged", onChain)
    }
  }, [refresh])

  const isRegisteredForRole = useCallback(
    (roleKey) => {
      if (roleKey === "admin") {
        const allow = parseAdminAllowlist()
        if (!allow || allow.length === 0) return true
        if (!account) return false
        return allow.includes(account.toLowerCase())
      }
      return roles[ roleKey ] === true
    },
    [account, roles]
  )

  const value = useMemo(
    () => ({
      account,
      loading,
      roles,
      connectWallet,
      refresh,
      isRegisteredForRole,
    }),
    [account, loading, roles, connectWallet, refresh, isRegisteredForRole]
  )

  return (
    <WalletRoleContext.Provider value={ value }>
      { children }
    </WalletRoleContext.Provider>
  )
}

export function useWalletRole() {
  const ctx = useContext(WalletRoleContext)
  if (!ctx) {
    throw new Error("useWalletRole must be used within WalletRoleProvider")
  }
  return ctx
}
