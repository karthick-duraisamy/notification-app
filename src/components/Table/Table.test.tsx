import { screen, render } from '@testing-library/react';
import Testwrapper from '../CommonTestWrapper/CommonTestWrapper';
import Table from './Table';
import { useState } from 'react';

it('renders Table', () => {
  const [visibleColumn, setVisibleColumn] = useState<any[]>([]);

  let columns = [
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'username'
    }
  ];
  let tableData = [{ username: 'testUser' }];
  render(
    <Testwrapper>
      <Table data={tableData} columns={columns} initialColumns={visibleColumn} setVisibleColumn={setVisibleColumn} />
    </Testwrapper>
  );
  expect(screen.getByText(tableData[0].username)).toBeInTheDocument();
});
