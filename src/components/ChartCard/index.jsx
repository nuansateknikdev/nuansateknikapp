import { Col, Row } from 'antd';
import Card from 'antd/lib/card/Card';
import styles from './chartcard.module.css';
import exampleChart from '../../assets/images/dashboard/exampleChart.jpg';
import iconGreenBox from '../../assets/images/dashboard/icon-green-box.svg';
import iconOrangeBox from '../../assets/images/dashboard/icon-orange-box.svg';
import Image from 'next/image';
import { Button } from 'antd';

const ChartCard = () => {
  return (
    <div id="chart-card">
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Card>
            <Image src={exampleChart} alt="chart" />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <div className={styles.cardContainer}>
              <p className={styles.cardTitle}>Gudang</p>
              <div className={styles.stock}>
                <div
                  className={styles.cardbox}
                  style={{ border: '1px solid #6fcf97', background: '#ebfff3' }}
                >
                  <Image src={iconGreenBox} alt="chart" />
                  <p>1.291</p>
                  <p>items</p>
                </div>
                <div className={styles.cardInfo}>
                  <div className={styles.text}>
                    <p>Stok ditangan</p>
                    <p>Cek secara berkala untuk stok yang tersedia</p>
                  </div>
                  <Button>Lihat stok</Button>
                </div>
              </div>
              <div className={styles.stock}>
                <div
                  className={styles.cardbox}
                  style={{ border: '1px solid #F2C94C', background: '#FFF9E8' }}
                >
                  <Image src={iconOrangeBox} alt="chart" />
                  <p>1.291</p>
                  <p>items</p>
                </div>
                <div className={styles.cardInfo}>
                  <div className={styles.text}>
                    <p>Stok menipis</p>
                    <p>Stok menipis, jaga terus stok produk agar stabil</p>
                  </div>
                  <Button>Lihat stok</Button>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ChartCard;