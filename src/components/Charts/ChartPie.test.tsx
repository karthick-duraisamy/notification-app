import { render, screen } from '@testing-library/react';
import CommonTestWrapper from '../CommonTestWrapper/CommonTestWrapper';
import { PieChartExample } from './ChartPie';

it('renders PieChart', () => {
  render(
    <CommonTestWrapper>
      <PieChartExample data={[]} />
    </CommonTestWrapper>
  );
  expect(screen.getByTestId('piechart')).toBeInTheDocument();
});
