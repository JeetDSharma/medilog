import React from 'react'
import { useState } from 'react'
import styles from '../../public/static/css/QRCodeGenerator.module.css'
import { QRCodeCanvas } from 'qrcode.react'
import web3 from '../../ethereum/web3'
import { Container, Card } from 'react-bootstrap'

const QRCodeGenerator = () => {
  const [url, setUrl] = useState('')
  const addressFetcher = async () => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' }).then((res) => {
        setUrl(res[0])
      })
    } else {
      alert('CONNECT TO METAMASK')
    }
  }
  addressFetcher()
  const qrcode = <QRCodeCanvas id="qrCode" value={url} size={300} level={'H'} />
  const downloadQRCode = (e) => {
    e.preventDefault()
    setUrl('')
  }

  return (
    <>
      <div>{qrcode}</div>
      <div>{url}</div>
    </>
  )
}
export default QRCodeGenerator
