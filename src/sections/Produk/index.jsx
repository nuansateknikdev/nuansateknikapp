/* eslint-disable @next/next/no-img-element */
import { CloseCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'
import IconAddSquare from '../../assets/icons/ic-add-square.svg'
import ButtonIcon from '../../components/ButtonIcon'
import FilterCategory from '../../components/FilterCategory'
import SearchProduct from '../../components/SearchProduct'
import Tabel from '../../components/Tabel'
import { FormProduk, FormStok } from './components'
import styles from './produk.module.css'

import { storage, firestore } from '../../../lib/initFirebase'
import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'

import { message, Modal, Space, Spin } from 'antd'
import IconEdit from '../../assets/icons/ic-edit.svg'
import IconTrash from '../../assets/icons/ic-trash.svg'
import IconTrashXL from '../../assets/icons/ic-trash-xl.svg'

const storageDirectory = '/product/'
const docRef = 'product'

const ProdukMain = ({ categoryData, productData }) => {
  const [modalProductVisible, setModalProductVisible] = useState(false)
  const [modalStockVisible, setModalStockVisible] = useState(false)
  const [modalEditVisible, setModalEditVisible] = useState(false)
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false)
  const [updateData, setUpdateData] = useState(null)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [idRecord, setIdRecord] = useState(null)

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
        return (
          <div className={styles.imageContainer}>
            <img src={record.image} alt="image" />
          </div>
        )
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
        return (
          <p>{record.category.name === null ? '-' : record.category.name}</p>
        )
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
      render: (purchasePrice) =>
        `Rp ${
          purchasePrice.toString().length > 3
            ? purchasePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
            : purchasePrice
        }`,
    },
    {
      title: 'Harga Jual',
      dataIndex: 'sellingPrice',
      key: 'sellingPrice',
      render: (sellingPrice) =>
        `Rp ${
          sellingPrice.toString().length > 3
            ? sellingPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
            : sellingPrice
        }`,
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle" key={record.id}>
          <ButtonIcon
            text="Tambah Stok"
            type="primary"
            onClick={() => handleOnAddStockBtnClick(record.id)}>
            <IconAddSquare />
          </ButtonIcon>
          <ButtonIcon
            className="btn-outline"
            text="Edit"
            onClick={() => handleOnUpdateBtnClick(record.id)}>
            <IconEdit />
          </ButtonIcon>
          <ButtonIcon
            className="btn-outline"
            text="Hapus"
            onClick={() => {
              setModalDeleteVisible(true), setIdRecord(record.id)
            }}>
            <IconTrash />
          </ButtonIcon>
        </Space>
      ),
    },
  ]

  const handleOnAddStockBtnClick = async (id) => {
    setModalStockVisible(true)
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

  const handleOnDeleteBtnClick = async (id) => {
    setConfirmLoading(true)

    // Create a reference to the file to delete
    const imageRef = ref(storage, storageDirectory + id)

    // Delete the file
    deleteObject(imageRef)
      .then(async () => {
        try {
          await deleteDoc(doc(firestore, docRef, id))
          setConfirmLoading(false)
          message.success('Berhasil Menghapus Produk')
          window.location.reload(false)
        } catch (err) {
          console.error(error)
          message.error('Delete Data Product Gagal!')
          setConfirmLoading(false)
        }
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        message.error('Delete Data Product Gagal!')
        setConfirmLoading(false)
      })
  }

  return (
    <>
      <div className={styles.actionGroup}>
        <div className={styles.filterGroup}>
          <SearchProduct />
          <FilterCategory categoryData={categoryData} />
        </div>
        <ButtonIcon
          onClick={() => setModalProductVisible(true)}
          type="primary"
          text="Tambah Produk">
          <IconAddSquare />
        </ButtonIcon>
      </div>
      <Tabel columns={columns} dataSource={productData} />
      {/* MODAL ADD PRODUCT */}
      <Modal
        centered
        closeIcon={<CloseCircleOutlined style={{ fontSize: 20 }} />}
        visible={modalProductVisible}
        onCancel={() => setModalProductVisible(false)}
        footer={false}>
        <p className={styles.modalTittle}>Tambah Produk</p>
        <FormProduk categoryData={categoryData} />
      </Modal>

      {/* MODAL ADD STOCK */}
      <Modal
        centered
        closeIcon={<CloseCircleOutlined style={{ fontSize: 20 }} />}
        visible={modalStockVisible}
        onCancel={() => {
          setModalStockVisible(false)
          setUpdateData(null)
        }}
        footer={false}>
        <p className={styles.modalTittle}>Tambah Stok</p>
        {updateData ? (
          <FormStok initData={updateData} />
        ) : (
          <Spin>
            <FormStok />
          </Spin>
        )}
      </Modal>

      {/* MODAL UPDATE PRODUCT */}
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
          <FormProduk initData={updateData} categoryData={categoryData} />
        ) : (
          <Spin>
            <FormProduk />
          </Spin>
        )}
      </Modal>

      <Modal
        centered
        closable={false}
        visible={modalDeleteVisible}
        onCancel={() => setModalDeleteVisible(false)}
        confirmLoading={confirmLoading}
        onOk={() => handleOnDeleteBtnClick(idRecord)}
        okType="danger"
        okText="Hapus"
        cancelText="Batal">
        <IconTrashXL />
        <p className={styles.modalDesc}>
          Kamu yakin ingin menghapus produk ini?
        </p>
      </Modal>
    </>
  )
}

export default ProdukMain
