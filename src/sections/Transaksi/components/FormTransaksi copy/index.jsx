import { Select, Button, Form, Input, InputNumber, Space, Spin } from 'antd'
import styles from './formTransaksi.module.css'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'

const FromTransaksi = ({ productData = [] }) => {
  const [formVisible, setFormVisible] = useState(true)
  const [optionsProduct, setoptionsProduct] = useState([])
  const [loading, setloading] = useState(true)
  const [disableAddProductInput, setDisableAddProductInput] = useState(false)

  useEffect(() => {
    if (productData) {
      setoptionsProduct(productData)
      setloading(false)
    }
  }, [])

  const onValueChange = (changedValues, allValues) => {
    const productTransaction = allValues.productTranscation
    console.log(productTransaction)
    if (productTransaction) {
      if (productTransaction.length) {
        const optionProductFilter = productData.filter((optionsProductItem) => {
          const isProductSelected = productTransaction.some(
            (productTransactionItem) => {
              if (productTransactionItem !== undefined) {
                return productTransactionItem.product === optionsProductItem.id
              }
              return false
            }
          )
          return isProductSelected !== true
        })

        setoptionsProduct(optionProductFilter)
      } else {
        setoptionsProduct(productData)
      }
    }

    productTransaction.length >= productData.length
      ? setDisableAddProductInput(true)
      : setDisableAddProductInput(false)
  }

  const onFinish = (values) => {
    setFormVisible(false)
    console.log(values)
  }

  const onSubmit = () => {
    window.location.reload(false)
  }

  return (
    <Spin spinning={loading}>
      <div className={styles.cardTotal}>
        <p>Total Harga</p>
        <p>Rp -</p>
      </div>
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
        onValuesChange={onValueChange}
        className={formVisible ? `` : `d-none`}>
        <Form.List name="productTranscation">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex' }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'product']}
                    rules={[
                      {
                        required: true,
                        message: '',
                      },
                    ]}>
                    <Select
                      showSearch
                      placeholder="Select a person"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }>
                      {optionsProduct.map((item, index) => (
                        <Option key={index} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item {...restField} name={[name, 'price']}>
                    <Input placeholder="Harga" size="large" readOnly />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'qty']}
                    rules={[
                      {
                        required: true,
                        message: '',
                      },
                    ]}>
                    <InputNumber
                      controls={false}
                      size="large"
                      min={1}
                      max={100}
                    />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  disabled={disableAddProductInput}>
                  Tambah Produk
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Bayar
          </Button>
        </Form.Item>
      </Form>
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
  )
}

export default FromTransaksi
