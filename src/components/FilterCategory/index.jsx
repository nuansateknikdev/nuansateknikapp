import { Select } from 'antd'
const { Option } = Select

const FilterCategory = ({
  currentCategoryFilter,
  setCurrentCategoryFilter,
  categoryData,
}) => {
  return (
    <div id="filter-category" style={{ height: '54px' }}>
      <Select
        size="large"
        allowClear
        placeholder="Kategori"
        optionFilterProp="children"
        style={{ width: '221px', height: '54px' }}
        defaultValue={currentCategoryFilter}
        onChange={(value) => {
          value
            ? setCurrentCategoryFilter(value)
            : setCurrentCategoryFilter(null)
        }}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
          optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())
        }>
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
