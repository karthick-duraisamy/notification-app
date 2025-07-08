import { fireEvent, render, screen } from '@testing-library/react';
import FolderFilter from './FolderFilter';
import CommonTestWrapper from '../CommonTestWrapper/CommonTestWrapper';

it('renders Header', () => {
  const folder: any = [
    { count: 39, folder_id: '1', folder_name: 'GroupRM' },
    { count: 13, folder_id: '7', folder_name: 'GroupRM--mh' },
    {
      count: 128,
      folder_id: '8',
      folder_name: 'GOL'
    }
  ];

  const clickHandler = () => {};
  render(
    <CommonTestWrapper>
      <FolderFilter folders={folder} pathname="template" activeFolder={undefined} handler={clickHandler} />
    </CommonTestWrapper>
  );
  expect(screen.getByTestId('folder_click_Indicator')).toBeInTheDocument();
  let selectBox = screen.getByTestId('folder_click_Indicator');
  if (selectBox) fireEvent.click(selectBox);
  // let addFolderBtn = screen.getByTestId('add_folder_btn');
});
