import Logo from '../../../assets/logo/logo.svg'
import MenuItems from '../MenuItems'
import styles from './sidebar.module.css'
import IcLogout from '../../../assets/icons/icLogout.svg'
import { Button } from 'antd'
import { useAuth } from '../../../../context/AuthUserContext'

const Sidebar = () => {
  const { signOutAuth } = useAuth()

  return (
    <div id="sidebar" className={styles.container}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <MenuItems />
      <Button className="nt-btn-logout" block onClick={signOutAuth}>
        <IcLogout /> Keluar
      </Button>
    </div>
  )
}

export default Sidebar
