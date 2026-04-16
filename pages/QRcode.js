import React from 'react'
import QRCodeGenerator from '../components/QR/QRCodeGenerator'
import QRCodeReader from '../components/QR/QRCodeReader'
import dynamic from 'next/dynamic'


const QRCodes = dynamic(() => import('../components/QR/QRCodeReader'), {
  ssr: false,
})
// const QRcode = () => {
//   return <QRCodeReader />
// }

export default QRCodes
