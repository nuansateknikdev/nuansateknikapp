import { Button, Modal, Space } from 'antd'
import IconEdit from '../../assets/icons/ic-edit.svg'
import IconTrash from '../../assets/icons/ic-trash.svg'
import IconAddSquare from '../../assets/icons/ic-add-square.svg'
import ButtonIcon from '../../components/ButtonIcon'

export const columns = [
  {
    title: '#',
    dataIndex: 'no',
    key: 'no',
  },
  {
    title: 'Gambar',
    dataIndex: 'image',
    key: 'image',
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
    render: (record) => (
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
          onClick={() => setModalEditVisible(true)}>
          <IconEdit />
        </ButtonIcon>
        <ButtonIcon className="btn-outline" text="Hapus">
          <IconTrash />
        </ButtonIcon>
      </Space>
    ),
  },
]

// dummy data
export const dataSource = [
  {
    no: '1',
    name: 'Lampu Plihips',
    category: 'Lampu',
    stock: '25',
    purchasePrice: '21.000',
    sellingPrice: '30.000',
  },
  {
    no: '2',
    name: 'Lampu Plihips',
    category: 'Lampu',
    stock: '25',
    purchasePrice: '21.000',
    sellingPrice: '30.000',
  },
  {
    no: '3',
    name: 'Lampu Plihips',
    category: 'Lampu',
    stock: '25',
    purchasePrice: '21.000',
    sellingPrice: '30.000',
  },
]
