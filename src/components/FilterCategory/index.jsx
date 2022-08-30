import { Select } from 'antd';
const { Option } = Select;

const FilterCategory = ({ setFilterCategoryField, categoryData }) => {
  return (
    <div id="program-page__filter-category" className="mindo-shadow">
      <Select
        // bordered={false}
        size="large"
        allowClear
        showSearch
        placeholder="Cari kategori"
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
        <Option></Option>
      </Select>
    </div>
  );
};

export default FilterCategory;
