import { Table } from 'antd';

const Tabel = ({ columns, dataSource }) => {
  return (
    <Table
      bordered
      rowKey={(obj) => obj.id}
      columns={columns}
      dataSource={dataSource}
      pagination={{ pageSize: 5, position: ['', 'bottomCenter'] }}
    />
  );
};

export default Tabel;
