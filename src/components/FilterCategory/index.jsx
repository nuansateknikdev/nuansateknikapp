import { Select } from 'antd'
const { Option } = Select

const FilterCategory = ({ setFilterCategoryField, categoryData }) => {
  return (
    <div id="filter-category" className="">
      <Select
        size="large"
        allowClear
        placeholder="Kategori"
        optionFilterProp="children"
        style={{ width: '200px' }}
        onChange={(value) => {
          value ? setFilterCategoryField(value) : setFilterCategoryField('')
        }}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
          optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())
        }
      >
        {categoryData &&
          categoryData.map((category) => (
            <Option value={category.id} key={category.id}>
              {category.name}
            </Option>
          ))}
      </Select>
    </div>
  )
}

export default FilterCategory
