import { Col, Row } from 'antd'
import Card from 'antd/lib/card/Card'
import styles from './chartcard.module.css'
import IconGreenBox from '../../assets/images/dashboard/icon-green-box.svg'
import IconOrangeBox from '../../assets/images/dashboard/icon-orange-box.svg'
import ChartBar from './ChartBar'
import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { useProduct } from '../../../context/ProductContext'
import { useRouter } from 'next/router'

const ChartCard = ({ productData, transactionData = null }) => {
  const { setCurrentCategoryFilter } = useProduct()
  const router = useRouter()
  const stockReady = productData.filter((produk) => produk.stock >= 10)
  const stockMinim = productData.filter((produk) => produk.stock < 10)

  const onButtonMenipisClick = () => {
    setCurrentCategoryFilter('1')
    router.push('/produk')
  }
  const onButtonLihatClick = () => {
    router.push('/produk')
  }
  return (
    <div id="chart-card">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={24} lg={24} xl={16}>
          <ChartBar transactionData={transactionData} />
        </Col>
        <Col xs={24} md={24} lg={24} xl={8}>
          <Card>
            <div className={styles.cardContainer}>
              <p className={styles.cardTitle}>Gudang</p>
              <div className={styles.cardInner}>
                <div className={styles.stock}>
                  <div
                    className={styles.cardbox}
                    style={{
                      border: '1px solid #6fcf97',
                      background: '#ebfff3',
                    }}>
                    <IconGreenBox />
                    <p>{stockReady.length}</p>
                    <p>Barang</p>
                  </div>
                  <div className={styles.cardInfo}>
                    <div className={styles.text}>
                      <p>Stok ditangan</p>
                      <p>Cek secara berkala untuk stok yang tersedia</p>
                    </div>
                    <Button onClick={onButtonLihatClick}>Lihat stok</Button>
                  </div>
                </div>
                <div className={styles.stock}>
                  <div
                    className={styles.cardbox}
                    style={{
                      border: '1px solid #F2C94C',
                      background: '#FFF9E8',
                    }}>
                    <IconOrangeBox />
                    <p>{stockMinim.length}</p>
                    <p>Barang</p>
                  </div>
                  <div className={styles.cardInfo}>
                    <div className={styles.text}>
                      <p>Stok menipis</p>
                      <p>Stok menipis, jaga terus stok produk agar stabil</p>
                    </div>
                    <Button onClick={onButtonMenipisClick}>Lihat stok</Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ChartCard
