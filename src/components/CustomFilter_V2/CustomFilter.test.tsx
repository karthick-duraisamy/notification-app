import { render, screen, fireEvent } from '@testing-library/react';
import CustomFilter from './CustomFilter';

const templateFilterProps = [
  {
    label: 'Search template',
    labelKey: 'search',
    data: [
      { label: 'template1', value: 1 },
      { label: 'template2', value: 2 }
    ],
    handler: () => { }
  }
  // {
  //   label: 'Folders',
  //   // unique key
  //   labelKey: 'folder',
  //   data: [
  //     { label: 'folder1', value: 1 },
  //     { label: 'folder2', value: 2 }
  //   ],
  //   handler: (id: string) => {}
  // }
];
const filterProps = [
  {
    label: 'Status',
    // unique key
    labelKey: 'status',
    data: [
      { label: 'active', value: 1 },
      { label: 'inactive', value: 2 }
    ],
    handler: () => { },
    test_id: 'selectBox'
  }
];

describe('Custom filter render suite', () => {
  it('rendered select box with placeholder', () => {
    render(<CustomFilter filters={filterProps} pathname="test" />);
    expect(screen.getByText(filterProps[0].label)).toBeInTheDocument();
  });
  it('rendered custom filter for template', () => {
    render(<CustomFilter filters={templateFilterProps} pathname="template" />);
    expect(screen.getByText(templateFilterProps[0].label)).toBeInTheDocument();
    // expect(customFilterSearch.fireEvent('click'));
    // fireEvent.click(selectBox);
  });

  it('rendered custom filter for input text box', async () => {
    render(<CustomFilter filters={templateFilterProps} pathname="template" />);
    let selectBox = screen.getByTestId('customFilterSearch');
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    if (selectBox) fireEvent.click(selectBox);
    const event = new KeyboardEvent('keydown', { keyCode: 97 });
    selectBox.dispatchEvent(event);
    // (selectBox as any).sendKeys('airline');
    // expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    // expect(customFilterSearch.fireEvent('click'));
    // fireEvent.click(selectBox);
  });
});
