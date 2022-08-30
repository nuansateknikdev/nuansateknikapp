import { Input, AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchProduct = ({ optionSearchField, setSearchField }) => {
  // const handleSearch = (value) => {
  //   setSearchField(value);
  // };

  return (
    <div id="search-product" className="">
      <AutoComplete
        // options={optionSearchField}
        // filterOption={(inputValue, option) =>
        //   option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        // }
        // onChange={handleSearch}
        notFoundContent="Produk tidak ditemukan"
      >
        <Input
          allowClear
          // bordered={false}
          size="large"
          placeholder="Cari produk"
          prefix={<SearchOutlined />}
          required
        />
      </AutoComplete>
    </div>
  );
};

export default SearchProduct;
