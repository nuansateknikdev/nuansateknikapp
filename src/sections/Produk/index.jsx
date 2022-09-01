import Tabel from '../../components/Tabel';
import { Button, Modal, Space } from 'antd';
import SearchProduct from '../../components/SearchProduct';
import styles from './produk.module.css';
import FilterCategory from '../../components/FilterCategory';
import { useState } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { FormProduk, FormStok } from './components';
import IconAddSquare from '../../assets/icons/ic-add-square.svg';
import IconEdit from '../../assets/icons/ic-edit.svg';
import IconTrash from '../../assets/icons/ic-trash.svg';
import Image from 'next/image';
import ButtonIcon from '../../components/ButtonIcon';

const ProdukMain = () => {
  const [modalProductVisible, setModalProductVisible] = useState(false);
  const [modalStockVisible, setModalStockVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);

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
          <ButtonIcon
            icon={IconAddSquare}
            text="Tambah Stok"
            type="primary"
            onClick={() => setModalStockVisible(true)}
          />
          <ButtonIcon
            className="btn-outline"
            icon={IconEdit}
            text="Edit"
            onClick={() => setModalEditVisible(true)}
          />
          <ButtonIcon className="btn-outline" icon={IconTrash} text="Hapus" />
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
    <>
      <div className={styles.actionGroup}>
        <div className={styles.filterGroup}>
          <SearchProduct />
          <FilterCategory />
        </div>
        <ButtonIcon
          onClick={() => setModalProductVisible(true)}
          type="primary"
          text="Tambah Produk"
          icon={IconAddSquare}
        />
      </div>
      <Tabel columns={columns} dataSource={dataSource} />
      <Modal
        centered
        closeIcon={<CloseCircleOutlined style={{ fontSize: 20 }} />}
        visible={modalProductVisible}
        onCancel={() => setModalProductVisible(false)}
        footer={false}
      >
        <p className={styles.modalTittle}>Tambah Produk</p>
        <FormProduk />
      </Modal>
      <Modal
        centered
        closeIcon={<CloseCircleOutlined style={{ fontSize: 20 }} />}
        visible={modalStockVisible}
        onCancel={() => setModalStockVisible(false)}
        footer={false}
      >
        <p className={styles.modalTittle}>Tambah Stok</p>
        <FormStok />
      </Modal>
      <Modal
        centered
        closeIcon={<CloseCircleOutlined style={{ fontSize: 20 }} />}
        visible={modalEditVisible}
        onCancel={() => setModalEditVisible(false)}
        footer={false}
      >
        <p className={styles.modalTittle}>Edit Produk</p>
        <FormProduk />
      </Modal>
    </>
  );
};

export default ProdukMain;
