import SumCard from '../../components/SumCard'
import ChartCard from '../../components/ChartCard'
import Tabel from '../../components/Tabel'

const BerandaMain = () => {
  const columns = [
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
      dataIndex: 'produk',
      key: 'produk',
      render: (produk) =>
        produk.map((item) => (
          <ul key={item.id} style={{ listStyleType: 'none' }}>
            <li>{item.name}</li>
          </ul>
        )),
    },
    {
      title: 'Hari dan Tanggal',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Jam',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Kuantitas',
      dataIndex: 'produk',
      key: 'produk',
      render: (produk) =>
        produk.map((item) => (
          <ul key={item.id} style={{ listStyleType: 'none' }}>
            <li>{`${item.qty}x ${item.name}`}</li>
          </ul>
        )),
    },
    {
      title: 'Total Harga',
      dataIndex: 'countTotal',
      key: 'countTotal',
    },
  ]

  // dummy data
  const dataSource = [
    {
      no: '1',
      date: 'Senin, 29-08-2022',
      time: '08:32',
      produk: [
        {
          id: 1,
          name: 'Lampu Plihips',
          qty: 1,
        },
        {
          id: 2,
          name: 'Saklar',
          qty: 2,
        },
      ],
      countTotal: 'Rp 235.000',
    },
    {
      no: '2',
      date: 'Senin, 29-08-2022',
      time: '08:32',
      produk: [
        {
          id: 1,
          name: 'Lampu Plihips',
          qty: 1,
        },
        {
          id: 2,
          name: 'Saklar',
          qty: 2,
        },
      ],
      countTotal: 'Rp 235.000',
    },
    {
      no: '3',
      date: 'Senin, 29-08-2022',
      time: '08:32',
      produk: [
        {
          id: 1,
          name: 'Lampu Plihips',
          qty: 1,
        },
        {
          id: 2,
          name: 'Saklar',
          qty: 2,
        },
      ],
      countTotal: 'Rp 235.000',
    },
  ]

  return (
    <div>
      <SumCard />
      <ChartCard />
      <Tabel columns={columns} dataSource={dataSource} />
    </div>
  )
}

export default BerandaMain
