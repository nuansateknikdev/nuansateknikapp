import ButtonIcon from '../../components/ButtonIcon'
import Tabel from '../../components/Tabel'
import IconAddSquare from '../../assets/icons/ic-add-square.svg'
import { CloseCircleOutlined } from '@ant-design/icons'
import SearchProduct from '../../components/SearchProduct'
import styles from './transaksi.module.css'
import { useState } from 'react'
import { Modal } from 'antd'
import FromTransaksi from './components/FormTransaksi'
import Moment from 'react-moment'

const TransaksiMain = ({ productData, transactionData }) => {
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
      dataIndex: 'products',
      key: 'products',
      render: (products) => (
        <div className={styles.tableThumbnailContainer}>
          {products.map((item, index) => (
            <div key={index} className={styles.tableThumbnailInner}>
              <p>{item.qty}x</p>
              <div className={styles.tableThumbnail}>
                <img src={item.image} />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Nama Produk',
      dataIndex: 'products',
      key: 'products',
      render: (products) => (
        <ul>
          {products.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Hari dan Tanggal',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => (
        <span>
          <Moment date={createdAt} format="dddd, DD-MM-YYYY" />
        </span>
      ),
    },
    {
      title: 'Jam',
      dataIndex: 'time',
      key: 'time',
      render: (text, record, index) => {
        return <span>{index + 1}</span>
      },
    },
    {
      title: 'Kuantitas',
      dataIndex: 'products',
      key: 'products',
      render: (products) => (
        <ul style={{ listStyleType: 'none' }}>
          {products.map((item) => (
            <li key={item.id}>{`${item.qty}x ${item.name}`}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Total Harga',
      dataIndex: 'totalPayment',
      key: 'totalPayment',
      render: (totalPayment) => <span>Rp {totalPayment}</span>,
    },
  ]

  const dataSource = [
    {
      no: '1',
      date: 'Senin, 29-08-2022',
      time: '08:32',
      products: [
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

  const handleAddTransaction = () => {
    setModalTransaksiVisible(true)
  }

  return (
    <>
      <div className={styles.actionGroup}>
        <div className={styles.filterGroup}>
          <SearchProduct />
        </div>
        <ButtonIcon
          onClick={handleAddTransaction}
          type="primary"
          text="Buat Transaksi">
          <IconAddSquare />
        </ButtonIcon>
      </div>
      <p className={styles.tableTittle}>Riwayat Transaksi</p>
      <Tabel columns={columns} dataSource={transactionData} />
      <Modal
        id="form-transaksi-modal"
        wrapClassName="form-transaksi-modal"
        centered
        closeIcon={<CloseCircleOutlined style={{ fontSize: 20 }} />}
        visible={modalTransaksiVisible}
        onCancel={() => setModalTransaksiVisible(false)}
        footer={false}>
        <p className={styles.modalTittle}>Tambah Transaksi</p>
        <FromTransaksi productData={productData} />
      </Modal>
    </>
  )
}

export default TransaksiMain
