import { Select } from 'antd';
const { Option } = Select;

interface ApiDataFilterProps {
  filterHandler: (value: string, option?: any) => void; // match Select's expected handler type
}

const ApiDataFilter = ({ filterHandler }: ApiDataFilterProps) => {
  const internalList = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'This week', value: 'this_week' },
    { label: 'Last week', value: 'last_week' },
    { label: 'This month', value: 'this_month' },
    { label: 'Last month', value: 'last_month' }
  ];

  return (
    <Select data-testid="dashboard_selectbox" defaultValue="this_month" style={{ width: 160 }} onChange={filterHandler}>
      {internalList.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

export default ApiDataFilter;
