/* eslint-disable @next/next/no-img-element */
import { CloseCircleOutlined } from '@ant-design/icons'
import { useContext, useState } from 'react'
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
import { formatPrice } from '../../utils'
import { useProduct } from '../../../context/ProductContext'

const storageDirectory = '/product/'
const docRef = 'product'

const ProdukMain = ({ categoryData, productData }) => {
  const { currentCategoryFilter, setCurrentCategoryFilter } = useProduct()
  const [modalProductVisible, setModalProductVisible] = useState(false)
  const [modalStockVisible, setModalStockVisible] = useState(false)
  const [modalEditVisible, setModalEditVisible] = useState(false)
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false)
  const [updateData, setUpdateData] = useState(null)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [idRecord, setIdRecord] = useState(null)

  const [searchField, setSearchField] = useState('')

  const categoryOptionforAddandUpdate = categoryData.filter(
    (item) => item.id != '1'
  )

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
      title: 'Produk',
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
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: 'Harga Beli',
      dataIndex: 'purchasePrice',
      key: 'purchasePrice',
      render: (purchasePrice) => `Rp ${formatPrice(purchasePrice)}`,
    },
    {
      title: 'Harga Jual',
      dataIndex: 'sellingPrice',
      key: 'sellingPrice',
      render: (sellingPrice) => `Rp ${formatPrice(sellingPrice)}`,
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
      // console.log(docSnap.data())
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
      // console.log(docSnap.data())
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

  // FILLTERING PRODUCT BY SEARCH PRODUCT OR CATEGORY
  const handleFilterCategory = (datas) => {
    console.log(currentCategoryFilter)
    if (currentCategoryFilter === '1')
      return datas.filter((data) => data.stock < 10)
    return datas.filter((data) => data.category.id === currentCategoryFilter)
  }
  const handleFilterSearch = (datas) => {
    return datas.filter((data) =>
      data.name.toLowerCase().includes(searchField.toLowerCase())
    )
  }
  const handleFilteringProduct = () => {
    let productFilter = productData
    if (currentCategoryFilter !== null) {
      if (searchField.length !== 0 && currentCategoryFilter.length !== 0) {
        productFilter = handleFilterCategory(productFilter)
        productFilter = handleFilterSearch(productFilter)
      } else if (searchField.length) {
        productFilter = handleFilterSearch(productFilter)
      } else if (currentCategoryFilter.length) {
        productFilter = handleFilterCategory(productFilter)
      }
    }
    return productFilter
  }

  const productFilter =
    productData !== null ? handleFilteringProduct() : productData

  // FILTERING SEARCH OPTION SUGGESTION BY CATEGORY
  const handleFilterSearchOption = () => {
    let searchOption = productData
    if (currentCategoryFilter !== null) {
      if (currentCategoryFilter.length !== 0) {
        searchOption = searchOption.filter(
          (product) => product.category.id === currentCategoryFilter
        )
      }
    }
    searchOption = searchOption.map((product) => {
      return { value: product.name, label: product.name }
    })
    return searchOption
  }

  const searchOptionFilter = productData ? handleFilterSearchOption() : null

  return (
    <>
      <div className={styles.actionGroup}>
        <div className={styles.filterGroup}>
          <SearchProduct
            setSearchField={setSearchField}
            optionSearchField={searchOptionFilter}
          />
          <FilterCategory
            currentCategoryFilter={currentCategoryFilter}
            setCurrentCategoryFilter={setCurrentCategoryFilter}
            categoryData={categoryData}
          />
        </div>
        <ButtonIcon
          onClick={() => setModalProductVisible(true)}
          type="primary"
          text="Tambah Produk">
          <IconAddSquare />
        </ButtonIcon>
      </div>
      <Tabel columns={columns} dataSource={productFilter} />
      {/* MODAL ADD PRODUCT */}
      <Modal
        centered
        closeIcon={<CloseCircleOutlined style={{ fontSize: 20 }} />}
        visible={modalProductVisible}
        onCancel={() => setModalProductVisible(false)}
        footer={false}>
        <p className={styles.modalTittle}>Tambah Produk</p>
        <FormProduk categoryData={categoryOptionforAddandUpdate} />
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
          <FormProduk
            initData={updateData}
            categoryData={categoryOptionforAddandUpdate}
          />
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
