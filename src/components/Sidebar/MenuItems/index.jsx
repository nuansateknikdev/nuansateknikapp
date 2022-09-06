import { Menu } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './MenuItems.module.css'
import IcHome from '../../../assets/icons/icHome.svg'
import IcCube from '../../../assets/icons/icCubeScane.svg'
import IcWallet from '../../../assets/icons/icWallet.svg'

const MenuItems = () => {
  const location = useRouter()

  return (
    <div id="sidebar-menu">
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={'/'}>
        <Menu.Item key="/" className={styles.menuItem}>
          <Link href="/">
            <a>
              <IcHome /> Beranda
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/produk" className={styles.menuItem}>
          <Link href="/produk">
            <a>
              <IcCube /> Produk
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/transaksi" className={styles.menuItem}>
          <Link href="/transaksi">
            <a>
              <IcWallet />
              Transaksi
            </a>
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default MenuItems
