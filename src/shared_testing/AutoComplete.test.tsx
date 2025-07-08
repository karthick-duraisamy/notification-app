import { AutoComplete } from '@/components/AutoComplete/AutoComplete';
import { render, screen } from '@testing-library/react';


describe('Custom filter render suite', () => {
  const autoCompleteSelect = () => {};
  const handleChange = () => {};
  const options = [
    {
      label: 'Last month',
      key: '1'
    },
    {
      label: 'This month',
      key: '2'
    },

    {
      label: 'Last week',
      key: '3'
    },
    {
      label: 'This week',
      key: '4'
    },
    {
      label: 'Today',
      key: '5'
    }
  ];
  it('rendered reschedule attention testing', () => {
    render(
      <AutoComplete
        formItemName={'settings'}
        formItemLabel="Settings"
        formItemRequired={false}
        formItemMessage="Select setting"
        onSelect={autoCompleteSelect}
        onChange={handleChange}
        name="settings"
        title="Select setting"
        option={options.length > 0 ? options : []}
      />
    );
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });
  //   it('reschedule attention with reschedule data', async () => {
  //     render(<Attention dataInfo={attentionData} />);
  //     let selectBox = screen.getByTestId('attention');
  //     if (selectBox) fireEvent.click(selectBox);
  //     expect(screen.getByText(attentionData['status'])).toBeInTheDocument();
  //   });
  //   it('reschedule attention with cancelled data', async () => {
  //     render(<Attention dataInfo={attentionData1} />);
  //     let selectBox = screen.getByText(attentionData1['status']);
  //     if (selectBox) fireEvent.click(selectBox);
  //     expect(screen.getByText(attentionData1['status'])).toBeInTheDocument();
  //   });
});
