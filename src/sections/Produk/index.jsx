import { CloseCircleOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import { useState } from 'react'
import IconAddSquare from '../../assets/icons/ic-add-square.svg'
import ButtonIcon from '../../components/ButtonIcon'
import FilterCategory from '../../components/FilterCategory'
import SearchProduct from '../../components/SearchProduct'
import Tabel from '../../components/Tabel'
import { FormProduk, FormStok } from './components'
import styles from './produk.module.css'
import { columns, dataSource } from './produk.utils'

const ProdukMain = ({ caterogryData }) => {
  const [modalProductVisible, setModalProductVisible] = useState(false)
  const [modalStockVisible, setModalStockVisible] = useState(false)
  const [modalEditVisible, setModalEditVisible] = useState(false)

  return (
    <>
      <div className={styles.actionGroup}>
        <div className={styles.filterGroup}>
          <SearchProduct />
          <FilterCategory caterogryData={caterogryData} />
        </div>
        <ButtonIcon
          onClick={() => setModalProductVisible(true)}
          type="primary"
          text="Tambah Produk">
          <IconAddSquare />
        </ButtonIcon>
      </div>
      <Tabel columns={columns} dataSource={dataSource} />
      <Modal
        centered
        closeIcon={<CloseCircleOutlined style={{ fontSize: 20 }} />}
        visible={modalProductVisible}
        onCancel={() => setModalProductVisible(false)}
        footer={false}>
        <p className={styles.modalTittle}>Tambah Produk</p>
        <FormProduk caterogryData={caterogryData} />
      </Modal>
      <Modal
        centered
        closeIcon={<CloseCircleOutlined style={{ fontSize: 20 }} />}
        visible={modalStockVisible}
        onCancel={() => setModalStockVisible(false)}
        footer={false}>
        <p className={styles.modalTittle}>Tambah Stok</p>
        <FormStok />
      </Modal>
      <Modal
        centered
        closeIcon={<CloseCircleOutlined style={{ fontSize: 20 }} />}
        visible={modalEditVisible}
        onCancel={() => setModalEditVisible(false)}
        footer={false}>
        <p className={styles.modalTittle}>Edit Produk</p>
        <FormProduk caterogryData={caterogryData} />
      </Modal>
    </>
  )
}

export default ProdukMain
