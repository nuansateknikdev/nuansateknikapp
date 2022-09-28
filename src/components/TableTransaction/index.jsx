import { Table } from 'antd'
import { useRouter } from 'next/router'
import Moment from 'react-moment'
import { formatDate, formatPrice } from '../../utils'
import styles from './tableTransaction.module.css'

const TableTransaction = ({ dataSource }) => {
  const router = useRouter()

  const columns = [
    {
      title: 'Tanggal',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => (
        <span>
          {formatDate(createdAt)}
          <Moment date={createdAt} format=" HH:mm" />
        </span>
      ),
    },
    {
      title: 'Foto Produk',
      dataIndex: 'products',
      key: 'products',
      render: (products) => (
        <div className={styles.tableThumbnailContainer}>
          {products.map((item, index) => (
            <div key={index} className={styles.tableThumbnailInner}>
              <p>{`${item.qty}${
                item.category.name === 'kabel' ? 'm' : 'x'
              }`}</p>
              <div className={styles.tableThumbnail}>
                <img src={item.image} />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Produk',
      dataIndex: 'products',
      key: 'products',
      render: (products) => (
        <ul style={{ marginLeft: '16px' }}>
          {products.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Harga',
      dataIndex: 'products',
      key: 'products',
      render: (products) => (
        <ul style={{ listStyleType: 'none' }}>
          {products.map((item) => (
            <li key={item.id}>Rp {formatPrice(item.sellingPrice)}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Banyaknya',
      dataIndex: 'products',
      key: 'products',
      render: (products) => (
        <ul style={{ listStyleType: 'none' }}>
          {products.map((item) => (
            <li key={item.id}>{`${item.qty}${
              item.category.name === 'kabel' ? 'm' : 'x'
            }`}</li>
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

  console.log(dataSource)

  return (
    <Table
      rowKey={(obj) => obj.id}
      columns={columns}
      dataSource={dataSource}
      pagination={
        router.pathname === '/'
          ? false
          : { pageSize: 5, position: ['', 'bottomCenter'] }
      }
    />
  )
}

export default TableTransaction
