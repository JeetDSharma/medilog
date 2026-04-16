import React from "react"
import Link from "next/link"
import { Button } from "react-bootstrap"
import { useRouter } from "next/router"
import styles from "../../public/static/css/components/sidebar.module.css"

const SidebarLink = ({ href, icon: Icon, children }) => {
  const router = useRouter()
  const active = router.pathname === href
  return (
    <Button
      as={ Link }
      href={ href }
      className={ `${styles.navigationButtons} ${active ? styles.navActive : ""}` }
      variant="light"
    >
      <div className={ styles.NavContent }>
        { Icon && <Icon className={ styles.SideBarIcons } /> }
        { children }
      </div>
    </Button>
  )
}

export default SidebarLink
