import ButtonIcon from '../../components/ButtonIcon'
import Tabel from '../../components/Tabel'
import IconAddSquare from '../../assets/icons/ic-add-square.svg'
import { CloseCircleOutlined } from '@ant-design/icons'
import SearchProduct from '../../components/SearchProduct'
import styles from './transaksi.module.css'
import { useState } from 'react'
import { Modal } from 'antd'
import FromTransaksi from './components/FormTransaksi'

const TransaksiMain = () => {
  const [modalTransaksiVisible, setModalTransaksiVisible] = useState(false)

  const columns = [
    {
      title: '#',
      dataIndex: 'no',
      key: 'no',
      render: (text, record, index) => {
        return <span>{index + 1}</span>
      },
    },
    {
      title: 'Gambar',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Nama Produk',
      dataIndex: 'produk',
      key: 'produk',
      render: (produk) =>
        produk.map((item) => (
          <ul key={item.id} style={{ listStyleType: 'none' }}>
            <li>{item.name}</li>
          </ul>
        )),
    },
    {
      title: 'Hari dan Tanggal',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Jam',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Kuantitas',
      dataIndex: 'produk',
      key: 'produk',
      render: (produk) =>
        produk.map((item) => (
          <ul key={item.id} style={{ listStyleType: 'none' }}>
            <li>{`${item.qty}x ${item.name}`}</li>
          </ul>
        )),
    },
    {
      title: 'Total Harga',
      dataIndex: 'countTotal',
      key: 'countTotal',
    },
  ]

  const dataSource = [
    {
      no: '1',
      date: 'Senin, 29-08-2022',
      time: '08:32',
      produk: [
        {
          id: 1,
          name: 'Lampu Plihips',
          qty: 1,
        },
        {
          id: 2,
          name: 'Saklar',
          qty: 2,
        },
      ],
      countTotal: 'Rp 235.000',
    },
  ]

  return (
    <>
      <div className={styles.actionGroup}>
        <div className={styles.filterGroup}>
          <SearchProduct />
        </div>
        <ButtonIcon
          onClick={() => setModalTransaksiVisible(true)}
          type="primary"
          text="Buat Transaksi"
        >
          <IconAddSquare />
        </ButtonIcon>
      </div>
      <p className={styles.tableTittle}>Riwayat Transaksi</p>
      <Tabel columns={columns} dataSource={dataSource} />
      <Modal
        centered
        closeIcon={<CloseCircleOutlined style={{ fontSize: 20 }} />}
        visible={modalTransaksiVisible}
        onCancel={() => setModalTransaksiVisible(false)}
        footer={false}
      >
        <p className={styles.modalTittle}>Tambah Transaksi</p>
        <FromTransaksi />
      </Modal>
    </>
  )
}

export default TransaksiMain
