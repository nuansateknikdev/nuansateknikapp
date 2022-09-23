import { Select, Button, Form, Input, InputNumber, Space, Spin } from 'antd'
import styles from './formTransaksi.module.css'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'

const formDataModel = {
  id: null,
  name: null,
  sellingPrice: 0,
  qty: 1,
}

const FromTransaksi = ({ productData = null, updateData = null }) => {
  const [formVisible, setFormVisible] = useState(true)
  const [loading, setloading] = useState(true)
  const [disableAddProductInput, setDisableAddProductInput] = useState(false)
  const [formData, setFormData] = useState([])
  const [optionsProduct, setoptionsProduct] = useState([])
  const [totalTransaksi, settotalTransaksi] = useState(0)

  useEffect(() => {
    if (productData) {
      setoptionsProduct(productData)
      setloading(false)
    }
  }, [])

  useEffect(() => {
    // Handle Disable Button Add Input Product
    if (formData.length >= productData.length) setDisableAddProductInput(true)
    else setDisableAddProductInput(false)

    // Handle Duplicate Option Product
    const newOptionsProduct = productData.filter((options) => {
      const optionsSelected = formData.some((data) => data.id === options.id)
      return !optionsSelected
    })

    setoptionsProduct(newOptionsProduct)

    // Handle Get total transaksi
    if (formData.length > 0) {
      let totalTransaksi = formData.reduce(
        (total, num) => total + num.sellingPrice,
        0
      )
      settotalTransaksi(totalTransaksi)
    }
  }, [formData])

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

    const newInput = { ...curentInput, qty: value }

    newFormData[index] = newInput
    setFormData(newFormData)
  }

  const onBayarClick = (values) => {
    setFormVisible(false)
    console.log(values)
  }

  const handleAddInputProduct = () => {
    setFormData([...formData, formDataModel])
  }

  const handleRemoveInputProduct = (id, index) => {
    const newFormData = formData.filter((item, idx) => idx !== index)
    setFormData(newFormData)
  }

  const onSubmit = () => {
    window.location.reload(false)
  }

  return (
    <div id="form-transaksi">
      <Spin spinning={loading}>
        <div className={styles.cardTotal}>
          <p>Total Harga</p>
          <p>Rp {totalTransaksi}</p>
        </div>
        <div className={formVisible ? `` : `d-none`}>
          {formData.map((product, index) => {
            return (
              <div className="form-transaksi__input-proudct">
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
            htmlType="submit"
            style={{ width: '100%' }}
            onClick={onBayarClick}>
            Bayar
          </Button>
        </div>

        <div className={formVisible ? `d-none` : ``}>
          <p style={{ fontSize: '18px' }}>Rincian Pembayaran</p>
          <Form layout="vertical" onFinish={onSubmit}>
            <Form.Item name="buy" label="Bayar">
              <Input placeholder="Masukkan Jumlah Uang" size="large" />
            </Form.Item>
            <Form.Item name="changes" label="Kembalian">
              <div className={styles.cardChanges}>
                <p>Rp 10.000</p>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className={styles.btnSumbit}>
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
            </Form.Item>
          </Form>
        </div>
      </Spin>
    </div>
  )
}

export default FromTransaksi
