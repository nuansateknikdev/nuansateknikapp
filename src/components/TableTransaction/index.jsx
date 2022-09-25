import { Table } from 'antd'
import Moment from 'react-moment'
import { formatPrice } from '../../utils'
import styles from './tableTransaction.module.css'

const TableTransaction = ({ dataSource }) => {
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
      render: (totalPayment) => <span>Rp {formatPrice(totalPayment)}</span>,
    },
  ]

  return (
    <Table
      bordered
      rowKey={(obj) => obj.id}
      columns={columns}
      dataSource={dataSource}
      pagination={{ pageSize: 5, position: ['', 'bottomCenter'] }}
    />
  )
}

export default TableTransaction
