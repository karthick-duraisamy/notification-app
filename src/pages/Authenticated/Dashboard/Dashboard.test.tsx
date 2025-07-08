import { fireEvent, render, screen } from '@testing-library/react';
import CommonTestWrapper from '@/components/CommonTestWrapper/CommonTestWrapper';
import Dashboard from './Dashbard';

// test('Dashboard renderd', () => {
//   render(
//     <CommonTestWrapper>
//       <Dashboard />
//     </CommonTestWrapper>
//   );
//   const header = screen.getByText('Dashboard');
//   expect(header).toBeInTheDocument();

describe('mailer template dashboard page testing', () => {
  it('testing for switching the time internal', () => {
    render(
      <CommonTestWrapper>
        <Dashboard />
      </CommonTestWrapper>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    let selectBox = screen.getByTestId('dashboard_selectbox');
    fireEvent.select(selectBox, {
      target: { value: '2' }
    });
  });
  it('testing for switching tracking page', () => {
    render(
      <CommonTestWrapper>
        <Dashboard />
      </CommonTestWrapper>
    );
    let selectBox = screen.getByTestId('dashboard_tracking');
    if (selectBox) fireEvent.click(selectBox);
  });
  it('Dashboard with tracking button testing', async () => {
    render(
      <CommonTestWrapper>
        <Dashboard />
      </CommonTestWrapper>
    );
    let selectBox = screen.getByTestId('dashboard_selectbox');
    if (selectBox) fireEvent.click(selectBox);
  });
  it('Dashboard with tracking status button testing', async () => {
    render(
      <CommonTestWrapper>
        <Dashboard />
      </CommonTestWrapper>
    );
    let selectBox = screen.getByTestId('dashboard_tracking_status');
    if (selectBox) fireEvent.click(selectBox);
  });
  it('Dashboard with template button testing', async () => {
    render(
      <CommonTestWrapper>
        <Dashboard />
      </CommonTestWrapper>
    );
    let selectBox = screen.getByTestId('dashboard_templates');
    if (selectBox) fireEvent.click(selectBox);
  });
  it('Dashboard with project button testing', async () => {
    render(
      <CommonTestWrapper>
        <Dashboard />
      </CommonTestWrapper>
    );
    let selectBox = screen.getByTestId('dashboard_project');
    if (selectBox) fireEvent.click(selectBox);
  });
  it('Dashboard with mailer button testing', async () => {
    render(
      <CommonTestWrapper>
        <Dashboard />
      </CommonTestWrapper>
    );
    let selectBox = screen.getByTestId('dashboard_mailer');
    if (selectBox) fireEvent.click(selectBox);
  });
  it('Dashboard option selection', async () => {
    // const { _getByTestId, _getAllByTestId } = render(
    //   <CommonTestWrapper>
    //     <Dashboard />
    //   </CommonTestWrapper>
    // );
    let selectBox = screen.getByTestId('dashboard_selectbox');
    fireEvent.change(selectBox, { target: { value: 'lastWeek' } });
    // let options = screen.getAllByTestId('dashboard_selectbox_option');

    // expect(screen.getByText(attentionData['status'])).toBeInTheDocument();
    // fireEvent.change(screen.getByPlaceholderText(/Search/i), {
    //   target: { value: 'airline searching' }
    // });
    // let selectBox = screen.getByTestId('dashboard_mailer');
    // if (selectBox) fireEvent.click(selectBox);
  });
});
