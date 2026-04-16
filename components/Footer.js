import React from 'react'
import styles from '../public/static/css/components/Footer.module.css'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const Footer = () => {
  return (
    <>
      <Container className={styles.mainFooterContainer}>
        <hr />
        Made with 💕
      </Container>
    </>
  )
}

export default Footer
