import React, { useState, useEffect } from "react"
import { QRCodeCanvas } from "qrcode.react"

const QRCodeGenerator = () => {
  const [ url, setUrl ] = useState("")
  useEffect(() => {
    const addressFetcher = async () => {
      if (typeof window === "undefined" || !window.ethereum) {
        return
      }
      try {
        const res = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        if (res && res[ 0 ]) setUrl(res[ 0 ])
      } catch {
        /* user rejected or wallet error */
      }
    }
    addressFetcher()
  }, [])
  const qrcode = (
    <QRCodeCanvas id="qrCode" value={ url } size={ 300 } level="H" />
  )
  return (
    <>
      <div>{ qrcode }</div>
      <div>{ url }</div>
    </>
  )
}
export default QRCodeGenerator
