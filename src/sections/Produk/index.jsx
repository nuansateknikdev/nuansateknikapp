import Layout from '../../layout';
import Tabel from '../../components/Tabel';
import { Button, Space } from 'antd';
import SearchProduct from '../../components/SearchProduct';
import styles from './produk.module.css';
import FilterCategory from '../../components/FilterCategory';

const ProdukMain = () => {
  const columns = [
    {
      title: '#',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: 'Gambar',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Nama Produk',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Kategori',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Stok',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Harga Beli',
      dataIndex: 'purchasePrice',
      key: 'purchasePrice',
    },
    {
      title: 'Harga Jual',
      dataIndex: 'sellingPrice',
      key: 'sellingPrice',
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (record) => (
        <Space size="middle" key={record.id}>
          <Button>Tambah Stok</Button>
          <Button>Edit</Button>
          <Button>Hapus</Button>
        </Space>
      ),
    },
  ];

  // dummy data
  const dataSource = [
    {
      no: '1',
      name: 'Lampu Plihips',
      category: 'Lampu',
      stock: '25',
      purchasePrice: '21.000',
      sellingPrice: '30.000',
    },
    {
      no: '2',
      name: 'Lampu Plihips',
      category: 'Lampu',
      stock: '25',
      purchasePrice: '21.000',
      sellingPrice: '30.000',
    },
    {
      no: '3',
      name: 'Lampu Plihips',
      category: 'Lampu',
      stock: '25',
      purchasePrice: '21.000',
      sellingPrice: '30.000',
    },
  ];

  return (
    <Layout id="produk-page" title="Produk">
      <div className={styles.filterGroup}>
        <SearchProduct />
        <FilterCategory />
      </div>
      <Tabel columns={columns} dataSource={dataSource} />
    </Layout>
  );
};

export default ProdukMain;
