import ButtonIcon from '../../components/ButtonIcon'
import IconAddSquare from '../../assets/icons/ic-add-square.svg'
import { CloseCircleOutlined } from '@ant-design/icons'
import SearchProduct from '../../components/SearchProduct'
import styles from './transaksi.module.css'
import { useState } from 'react'
import { Modal } from 'antd'
import FromTransaksi from './components/FormTransaksi'
import TableTransaction from '../../components/TableTransaction'

const TransaksiMain = ({ productData, transactionData }) => {
  const [modalTransaksiVisible, setModalTransaksiVisible] = useState(false)

  const handleAddTransaction = () => {
    setModalTransaksiVisible(true)
  }

  return (
    <>
      <div className={styles.actionGroup}>
        <div className={styles.filterGroup}>
          <SearchProduct />
        </div>
        <ButtonIcon
          onClick={handleAddTransaction}
          type="primary"
          text="Buat Transaksi"
        >
          <IconAddSquare />
        </ButtonIcon>
      </div>
      <p className={styles.tableTittle}>Riwayat Transaksi</p>
      <TableTransaction dataSource={transactionData} />
      <Modal
        id="form-transaksi-modal"
        wrapClassName="form-transaksi-modal"
        centered
        closeIcon={<CloseCircleOutlined style={{ fontSize: 20 }} />}
        visible={modalTransaksiVisible}
        onCancel={() => setModalTransaksiVisible(false)}
        footer={false}
      >
        <p className={styles.modalTittle}>Tambah Transaksi</p>
        <FromTransaksi productData={productData} />
      </Modal>
    </>
  )
}

export default TransaksiMain
