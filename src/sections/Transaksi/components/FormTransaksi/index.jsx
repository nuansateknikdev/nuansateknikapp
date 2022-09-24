import {
  Select,
  Button,
  Form,
  Input,
  InputNumber,
  Space,
  Spin,
  message,
} from 'antd'
import { firestore } from '../../../../../lib/initFirebase'

import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  writeBatch,
  increment,
} from 'firebase/firestore'

import styles from './formTransaksi.module.css'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'

const formDataModel = {
  id: null,
  name: null,
  sellingPrice: 0,
  stock: 0,
  qty: 1,
}

const { Option } = Select

const FromTransaksi = ({ productData = null, updateData = null }) => {
  const [formVisible, setFormVisible] = useState(true)
  const [disableAddProductInput, setDisableAddProductInput] = useState(false)
  const [disableBuatTransaksi, setDisableBuatTransaksi] = useState(true)
  const [loading, setloading] = useState(true)
  const [formData, setFormData] = useState([])
  const [optionsProduct, setoptionsProduct] = useState([])
  const [totalPayment, settotalPayment] = useState(0)
  const [refund, setRefund] = useState(0)
  const [payment, setPayment] = useState(0)
  const [isPaymentError, setIsPaymentError] = useState(false)

  useEffect(() => {
    if (productData) {
      setoptionsProduct(productData)
      setDisableAddProductInput(false)

      if (updateData) {
        setFormData(updateData)
      }
      setloading(false)
    } else {
      setDisableAddProductInput(true)
    }
  }, [])

  useEffect(() => {
    const filterProductStock = productData.filter((data) => data.stock != 0)

    // Handle Disable Button Add Input Product
    if (formData.length >= filterProductStock.length)
      setDisableAddProductInput(true)
    else setDisableAddProductInput(false)

    // Handle Duplicate Option Select Product
    const newOptionsProduct = filterProductStock.filter((options) => {
      const optionsSelected = formData.some((data) => data.id === options.id)
      return !optionsSelected
    })

    setoptionsProduct(newOptionsProduct)

    // Handle Get total transaksi
    if (formData.length > 0) {
      let totalPayment = formData.reduce(
        (total, num) => total + num.sellingPrice * num.qty,
        0
      )
      settotalPayment(totalPayment)
    }
  }, [formData])

  // Handle Refund
  useEffect(() => {
    if (payment >= totalPayment) {
      setRefund(payment - totalPayment)
      setDisableBuatTransaksi(false)
    } else {
      setRefund(0)
      setDisableBuatTransaksi(true)
    }
  }, [payment])

  const handleSelectOnchange = (value, index) => {
    setloading(true)
    const selectProduct = productData.find((product) => product.id === value)

    let newFormData = formData.map((item) => item)
    let curentInput = formData[index]

    const newInput = { ...curentInput, ...selectProduct }

    newFormData[index] = newInput

    setFormData(newFormData)

    setloading(false)
  }

  const handleQtyChange = (value, index) => {
    let newFormData = formData.map((item) => item)
    let curentInput = formData[index]
    // if (value > curentInput.stock) message.error('Qty melebihi sot')

    const newInput = { ...curentInput, qty: value }

    newFormData[index] = newInput
    setFormData(newFormData)
  }

  // HANDLE DYNAMIC INPUT
  const handleAddInputProduct = () => {
    setFormData([...formData, formDataModel])
  }

  const handleRemoveInputProduct = (id, index) => {
    const newFormData = formData.filter((item, idx) => idx !== index)
    setFormData(newFormData)
  }

  // Handle Input Payment
  const handleInputPayment = (value) => {
    if (value < totalPayment) {
      setIsPaymentError(true)
      setDisableBuatTransaksi(true)
    } else {
      setIsPaymentError(false)
      setDisableBuatTransaksi(false)
    }
    setPayment(value)
  }
  const onBayarClick = () => {
    setFormVisible(false)
  }

  const onBuatTransaksiBtnClick = async () => {
    if (payment < totalPayment) {
      message.error('uang bayar kurang dari total bayar')
      setIsPaymentError(true)
    } else {
      setloading(true)
      setDisableBuatTransaksi(true)
      try {
        const dataTranscaction = {
          products: formData,
          totalPayment,
          payment,
          refund,
          createdAt: serverTimestamp(),
          updateAt: serverTimestamp(),
        }

        const batch = writeBatch(firestore)

        formData.map((data) => {
          const productRef = doc(firestore, 'product', data.id)
          batch.update(productRef, { stock: increment(-data.qty) })
        })

        const transactionNewRef = doc(collection(firestore, 'transaction'))
        batch.set(transactionNewRef, dataTranscaction)
        // Commit the batch
        await batch.commit()

        window.location.reload(false)
      } catch (error) {
        console.log(error)
        message.error('Transaksi Gagal')
        setloading(false)
      }
    }
  }

  return (
    <div id="form-transaksi">
      <Spin spinning={loading}>
        <div className={styles.cardTotal}>
          <p>Total Harga</p>
          <p>Rp {totalPayment}</p>
        </div>
        <div className={formVisible ? `` : `d-none`}>
          <div className="form-transaksi__input-proudct">
            <p>#</p>
            <p>Produk Pesanan</p>
            <p>Harga</p>
            <p>Stock</p>
            <p>Kuantitas</p>
            <p></p>
          </div>
          {formData.map((product, index) => {
            return (
              <div key={index} className="form-transaksi__input-proudct">
                <p>{index + 1}</p>
                <Select
                  value={product.name}
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  onChange={(value) => handleSelectOnchange(value, index)}>
                  {optionsProduct.map((option, indexOption) => (
                    <Option key={indexOption} value={option.id}>
                      {option.name}
                    </Option>
                  ))}
                </Select>
                <InputNumber
                  value={product.sellingPrice}
                  controls={false}
                  size="large"
                  min={0}
                  readOnly
                />
                <InputNumber
                  value={product.stock}
                  controls={false}
                  size="large"
                  min={0}
                  readOnly
                />
                <InputNumber
                  onChange={(value) => handleQtyChange(value, index)}
                  value={product.qty}
                  controls={false}
                  size="large"
                  min={1}
                  max={product.stock}
                />
                <MinusCircleOutlined
                  onClick={() => handleRemoveInputProduct(product.id, index)}
                />
              </div>
            )
          })}

          <Button
            className="form-transaksi__btn-tambah-produk"
            type="dashed"
            block
            icon={<PlusOutlined />}
            onClick={handleAddInputProduct}
            disabled={disableAddProductInput}>
            Tambah Produk
          </Button>
          <Button
            type="primary"
            block
            onClick={onBayarClick}
            disabled={totalPayment === 0}>
            Bayar
          </Button>
        </div>

        <div className={formVisible ? `d-none` : `form-transaksi__pembayaran`}>
          <hr />
          <h2>Rincian Pembayaran</h2>
          <p className="form-transaksi__pembayaran__label">Bayar</p>

          <InputNumber
            onChange={(value) => handleInputPayment(value)}
            value={payment}
            controls={false}
            min={0}
            status={isPaymentError ? 'error' : ''}
          />
          <p className="form-transaksi__pembayaran__label">Kembalian</p>
          <div className={`${styles.cardChanges} `}>
            <p>Rp {refund}</p>
          </div>
          <Button
            type="primary"
            block
            className={styles.btnSumbit}
            disabled={disableBuatTransaksi}
            onClick={onBuatTransaksiBtnClick}>
            Buat Transaksi
          </Button>
          <Button
            type="ghost"
            block
            className={styles.btnSumbit}
            style={{ marginTop: 10 }}
            onClick={() => setFormVisible(true)}>
            Kembali
          </Button>
        </div>
      </Spin>
    </div>
  )
}

export default FromTransaksi
