import SumCard from '../../components/SumCard'
import ChartCard from '../../components/ChartCard'
import Moment from 'react-moment'
import TableTransaction from '../../components/TableTransaction'

const BerandaMain = ({ productData, transactionData }) => {
  console.log(transactionData)
  return (
    <div>
      <SumCard transactionData={transactionData} />
      <ChartCard productData={productData} transactionData={transactionData} />
      <TableTransaction dataSource={transactionData} />
    </div>
  )
}

export default BerandaMain
