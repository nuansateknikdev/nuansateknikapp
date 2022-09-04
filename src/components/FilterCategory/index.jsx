import { Select } from 'antd'
const { Option } = Select

const FilterCategory = ({ setFilterCategoryField, caterogryData }) => {
  return (
    <div id="filter-category" className="">
      <Select
        // bordered={false}
        size="large"
        allowClear
        placeholder="--Kategori--"
        optionFilterProp="children"
        // onChange={(value) => {
        //   value ? setFilterCategoryField(value) : setFilterCategoryField('');
        // }}
        // filterOption={(input, option) =>
        //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        // }
        // filterSort={(optionA, optionB) =>
        //   optionA.children
        //     .toLowerCase()
        //     .localeCompare(optionB.children.toLowerCase())
        // }
      >
        {caterogryData.map((item) => (
          <Option value={item.name} key={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
    </div>
  )
}

export default FilterCategory
