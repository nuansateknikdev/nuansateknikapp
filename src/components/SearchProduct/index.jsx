import { Input, AutoComplete } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import IcSearch from '../../assets/icons/ic-search.svg'

const SearchProduct = ({ optionSearchField, setSearchField }) => {
  const handleSearch = (value) => {
    setSearchField(value)
  }

  return (
    <div id="search-product" style={{ width: '356px' }}>
      <AutoComplete
        options={optionSearchField}
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        onChange={handleSearch}
        notFoundContent="Produk tidak ditemukan"
      >
        <Input
          allowClear
          size="large"
          placeholder="Cari produk"
          prefix={<IcSearch />}
          required
          style={{ width: '356px', height: '54px' }}
        />
      </AutoComplete>
    </div>
  )
}

export default SearchProduct
