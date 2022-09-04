import { CloseCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'
import IconAddSquare from '../../assets/icons/ic-add-square.svg'
import ButtonIcon from '../../components/ButtonIcon'
import FilterCategory from '../../components/FilterCategory'
import SearchProduct from '../../components/SearchProduct'
import Tabel from '../../components/Tabel'
import { FormProduk, FormStok } from './components'
import styles from './produk.module.css'
import { firestore } from '../../../lib/initFirebase'
import { doc, getDoc } from 'firebase/firestore'
import { dataSource } from './produk.utils'

import { Button, Modal, Space, Spin } from 'antd'
import IconEdit from '../../assets/icons/ic-edit.svg'
import IconTrash from '../../assets/icons/ic-trash.svg'
import { async } from '@firebase/util'

const ProdukMain = ({ caterogryData, productData }) => {
  const [modalProductVisible, setModalProductVisible] = useState(false)
  const [modalStockVisible, setModalStockVisible] = useState(false)
  const [modalEditVisible, setModalEditVisible] = useState(false)
  const [updateData, setUpdateData] = useState(null)

  const columns = [
    {
      title: '#',
      dataIndex: 'no',
      key: 'no',
      render: (text, record, index) => {
        return <span>{index + 1}</span>
      },
    },
    {
      title: 'Gambar',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => {
        return <img src={text} alt="" style={{ height: '200px' }} />
      },
    },
    {
      title: 'Nama Produk',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Kategori',
      dataIndex: 'category',
      key: 'category',
      render: (text, record) => {
        return <p>{record.category.name}</p>
      },
    },
    {
      title: 'Stok',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Harga Beli',
      dataIndex: 'purchasePrice',
      key: 'purchasePrice',
    },
    {
      title: 'Harga Jual',
      dataIndex: 'sellingPrice',
      key: 'sellingPrice',
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle" key={record.id}>
          <ButtonIcon
            text="Tambah Stok"
            type="primary"
            onClick={() => setModalStockVisible(true)}>
            <IconAddSquare />
          </ButtonIcon>
          <ButtonIcon
            className="btn-outline"
            text="Edit"
            onClick={() => handleOnUpdateBtnClick(record.id)}>
            <IconEdit />
          </ButtonIcon>
          <ButtonIcon className="btn-outline" text="Hapus">
            <IconTrash />
          </ButtonIcon>
        </Space>
      ),
    },
  ]

  const handleOnUpdateBtnClick = async (id) => {
    console.log(id)
    setModalEditVisible(true)
    try {
      const docRef = doc(firestore, 'product', id)
      const docSnap = await getDoc(docRef)
      console.log(docSnap.data())
      setUpdateData({
        id: docSnap.id,
        name: docSnap.data().name,
        purchasePrice: docSnap.data().purchasePrice,
        sellingPrice: docSnap.data().sellingPrice,
        stock: docSnap.data().stock,
        image: docSnap.data().image,
        category: {
          id: docSnap.data().category.id,
          name: docSnap.data().category.name,
        },
      })
    } catch (err) {
      console.error(err)
    }
  }

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
      <Tabel columns={columns} dataSource={productData} />
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
        onCancel={() => {
          setUpdateData(null)
          setModalEditVisible(false)
        }}
        footer={false}>
        <p className={styles.modalTittle}>Edit Produk</p>
        {updateData ? (
          <FormProduk initData={updateData} caterogryData={caterogryData} />
        ) : (
          <Spin>
            <FormProduk />
          </Spin>
        )}
      </Modal>
    </>
  )
}

export default ProdukMain
