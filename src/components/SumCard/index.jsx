import { Col, Row } from 'antd'
import Card from 'antd/lib/card/Card'
import TotalPendapatan from '../../assets/images/dashboard/total-pendapatan.svg'
import ProdukTerjual from '../../assets/images/dashboard/produk-terjual.svg'
import TotalPelanggan from '../../assets/images/dashboard/total-pelanggan.svg'
import styles from './sumcard.module.css'
import { formatPrice } from '../../utils'
import { useEffect, useState } from 'react'

const SumCard = ({ transactionData }) => {
  const [totalPayment, setTotalPayment] = useState(0)
  const [productSoldDatas, setProductSoldDatas] = useState(0)

  useEffect(() => {
    let paymentDatas = []
    let productSoldDatas = []

    transactionData.map((transaction) => {
      paymentDatas.push(transaction.totalPayment)
      transaction.products.map((product) => {
        productSoldDatas.push(product.qty)
      })
    })

    setTotalPayment(countTotal(paymentDatas))
    setProductSoldDatas(countTotal(productSoldDatas))
  }, [])

  const countTotal = (data) => data.reduce((sum, num) => sum + num)

  return (
    <div id="sum-card">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg xl={8}>
          <Card>
            <TotalPendapatan />
            <div className={styles.cardInfo}>
              <p>Total Pendapatan</p>
              <p>Rp {formatPrice(totalPayment)}</p>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} xl={8}>
          <Card>
            <ProdukTerjual />
            <div className={styles.cardInfo}>
              <p>Produk Terjual</p>
              <p>{productSoldDatas}</p>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} xl={8}>
          <Card>
            <TotalPelanggan />
            <div className={styles.cardInfo}>
              <p>Total Pelanggan</p>
              <p>{transactionData.length}</p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default SumCard
