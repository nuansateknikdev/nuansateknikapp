import { Table } from 'antd'

const Tabel = ({ columns, dataSource }) => {
  return (
    <div id="table">
      <div className="table__wrapper">
        <Table
          rowKey={(obj) => obj.id}
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 5, position: ['', 'bottomCenter'] }}
        />
      </div>
    </div>
  )
}

export default Tabel
