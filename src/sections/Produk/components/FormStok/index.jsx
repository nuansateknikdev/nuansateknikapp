import { Button, Form, Input, InputNumber } from 'antd'

const FormTambahStok = () => {
  return (
    <Form
      // form={form}
      layout={'vertical'}
      // onFinish={onFinish}
    >
      <Form.Item label="Nama Produk" name="name">
        <Input size="large" readOnly />
      </Form.Item>
      <Form.Item
        label="Stok Barang"
        name="stock"
        initialValue={8}
        extra="*stok saat ini">
        <Input size="large" readOnly />
      </Form.Item>
      <Form.Item name="stock" extra="*lakukan penambahan stok disini">
        <InputNumber size="large" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Tambah
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormTambahStok
