import React from 'react'
import { Container } from 'react-bootstrap'
import { QrReader } from 'react-qr-reader'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const QRCodeReader = () => {
  const [dataqr, setData] = useState({})
  const handleError = (err) => {
    console.log(err)
    // setData('Invalid QR')
  }
  const handleScan = (data) => {
    console.log(data)
    setData(data)
  }
  const dataPrinter = () => {
    try {
      document.getElementById(mainDivScan).innerText = dataqr.text
      if (dataqr !== 'undefined' && dataqr !== 'null') {
        console.log(dataqr)
        document.getElementById(resultQR).innerHTML = dataqr.text
      }
    } catch (err) {
      console.log('error')
    }
  }
  return (
    <div id="mainDivScan" style={ { width: "500px" } }>
      <QrReader
        delay={ 100 }
        onError={ handleError }
        onResult={ handleScan }
      ></QrReader>
      <p id="resultQR"> yes </p>
    </div >
  )
}

export default QRCodeReader
