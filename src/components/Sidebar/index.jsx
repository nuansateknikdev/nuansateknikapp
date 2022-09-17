import Image from 'next/image'
import { useAuth } from '../../../context/AuthUserContext'
import Logo from '../../assets/logo/logo.svg'
import MenuItems from './MenuItems'
import styles from './sidebar.module.css'
import { Button } from 'antd'

const Sidebar = () => {
  const { signOutAuth } = useAuth()

  return (
    <div id="sidebar" className={styles.container}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <MenuItems />
      <div className={styles.button}>
        <Button block onClick={signOutAuth}>
          Keluar
        </Button>
      </div>
    </div>
  )
}

export default Sidebar
