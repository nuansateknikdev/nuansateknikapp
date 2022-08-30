import { Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MenuItems = () => {
  const location = useRouter();

  return (
    <div id="sidebar-menu">
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={'/'}
      >
        <Menu.Item key="/beranda">
          <Link href="/beranda">
            <a>Beranda</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/produk">
          <Link href="/produk">
            <a>Produk</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/transaksi">
          <Link href="/transaksi">
            <a>Transaksi</a>
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default MenuItems;
