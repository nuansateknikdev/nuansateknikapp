import { Col, Row } from 'antd';
import Card from 'antd/lib/card/Card';
import totalPendapatan from '../../assets/images/dashboard/total-pendapatan.svg';
import produkTerjual from '../../assets/images/dashboard/produk-terjual.svg';
import totalPelanggan from '../../assets/images/dashboard/total-pelanggan.svg';
import Image from 'next/image';
import styles from './sumcard.module.css';

const SumCard = () => {
  return (
    <div id="sum-card">
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Image src={totalPendapatan} alt="total-pendapatan" />
            <div className={styles.cardInfo}>
              <p>Total Pendapatan</p>
              <p>Rp 2.000.000</p>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Image src={produkTerjual} alt="total-pendapatan" />
            <div className={styles.cardInfo}>
              <p>Produk Terjual</p>
              <p>3562</p>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Image src={totalPelanggan} alt="total-pendapatan" />
            <div className={styles.cardInfo}>
              <p>Total Pelanggan</p>
              <p>1672</p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SumCard;
