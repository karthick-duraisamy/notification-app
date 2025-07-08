import { render, screen } from '@testing-library/react';
import DynamicFilter from './DynamicFilter';
import TestWrapper from '../CommonTestWrapper/CommonTestWrapper';

it('renders Header', () => {
  render(
    <TestWrapper>
      <DynamicFilter />
    </TestWrapper>
  );
  expect(screen.getByTestId('header')).toBeInTheDocument();
});
