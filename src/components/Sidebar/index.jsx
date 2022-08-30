import Image from 'next/image';
import { useAuth } from '../../../context/AuthUserContext';
import logo from '../../assets/logo/logo.svg';
import MenuItems from './MenuItems';
import styles from './sidebar.module.css';
import { Button } from 'antd';

const Sidebar = () => {
  const { signOutAuth } = useAuth();

  return (
    <div id="sidebar" className={styles.container}>
      <div className={styles.logo}>
        <Image src={logo} alt="Logo Nuansa Teknik" />
      </div>
      <div className={styles.menu}>
        <MenuItems />
        <Button onClick={signOutAuth}>Keluar</Button>
      </div>
    </div>
  );
};

export default Sidebar;
