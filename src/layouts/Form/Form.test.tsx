import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormLayout } from './Form';

it('renders Header', () => {
  render(<FormLayout title={''} children={undefined} />);
  expect(screen.getByTestId('form')).toBeInTheDocument();
});
