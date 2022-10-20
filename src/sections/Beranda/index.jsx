import SumCard from '../../components/SumCard'
import ChartCard from '../../components/ChartCard'
import TableTransaction from '../../components/TableTransaction'
import styles from './beranda.module.css'
import { Card } from 'antd'

const BerandaMain = ({ productData, transactionData }) => {
  return (
    <div>
      <SumCard transactionData={transactionData} />
      <ChartCard productData={productData} transactionData={transactionData} />
      <Card>
        <h2 className={styles.tableTitle}>Transaksi Terbaru</h2>
        <TableTransaction
          dataSource={transactionData.sort(
            (a, b) =>
              Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
          )}
        />
      </Card>
    </div>
  )
}

export default BerandaMain
