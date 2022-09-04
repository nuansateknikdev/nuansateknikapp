import { Col, Row } from 'antd'
import Card from 'antd/lib/card/Card'
import TotalPendapatan from '../../assets/images/dashboard/total-pendapatan.svg'
import ProdukTerjual from '../../assets/images/dashboard/produk-terjual.svg'
import TotalPelanggan from '../../assets/images/dashboard/total-pelanggan.svg'
import styles from './sumcard.module.css'

const SumCard = () => {
  return (
    <div id="sum-card">
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <TotalPendapatan />
            <div className={styles.cardInfo}>
              <p>Total Pendapatan</p>
              <p>Rp 2.000.000</p>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <ProdukTerjual />
            <div className={styles.cardInfo}>
              <p>Produk Terjual</p>
              <p>3562</p>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <TotalPelanggan />
            <div className={styles.cardInfo}>
              <p>Total Pelanggan</p>
              <p>1672</p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default SumCard
