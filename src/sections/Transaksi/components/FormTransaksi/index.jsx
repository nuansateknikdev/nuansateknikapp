import { AutoComplete, Button, Form, Input, InputNumber, Space } from 'antd'
import styles from './formTransaksi.module.css'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'

const FromTransaksi = () => {
  const [formVisible, setFormVisible] = useState(false)

  const onFinish = () => {
    setFormVisible(true)
  }

  const onSubmit = () => {
    window.location.reload(false)
  }

  return (
    <>
      <div className={styles.cardTotal}>
        <p>Total Harga</p>
        <p>Rp -</p>
      </div>
      {!formVisible ? (
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.List name="users">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex' }} align="baseline">
                    <Form.Item {...restField} name={[name, 'name']}>
                      <AutoComplete
                        options={[{ value: 'text 1' }, { value: 'text 2' }]}
                      >
                        <Input allowClear size="large" placeholder="Produk" />
                      </AutoComplete>
                    </Form.Item>
                    <Form.Item {...restField} name={[name, 'price']}>
                      <Input placeholder="Harga" size="large" readOnly />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, 'qty']}>
                      <InputNumber
                        controls={false}
                        size="large"
                        min={1}
                        max={100}
                        defaultValue={1}
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
                  >
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
      ) : (
        <>
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
                className={styles.btnSumbit}
              >
                Buat Transaksi
              </Button>
              <Button
                type="ghost"
                block
                className={styles.btnSumbit}
                style={{ marginTop: 10 }}
                onClick={() => setFormVisible(false)}
              >
                Kembali
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </>
  )
}

export default FromTransaksi
