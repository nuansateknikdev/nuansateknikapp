import SumCard from '../../components/SumCard'
import ChartCard from '../../components/ChartCard'
import TableTransaction from '../../components/TableTransaction'
import styles from './beranda.module.css'

const BerandaMain = ({ productData, transactionData }) => {
  return (
    <div>
      <SumCard transactionData={transactionData} />
      <ChartCard productData={productData} transactionData={transactionData} />
      <div className={styles.tableContainer}>
        <h2 className={styles.tableTitle}>Transaksi Terbaru</h2>
        <TableTransaction
          dataSource={transactionData
            .sort(
              (a, b) =>
                Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
            )
            .slice(0, 5)}
        />
      </div>
    </div>
  )
}

export default BerandaMain
