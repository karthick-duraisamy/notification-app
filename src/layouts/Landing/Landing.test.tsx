import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Container from './Landing';

it('renders Header', () => {
  render(<Container />);
  expect(screen.getByTestId('container')).toBeInTheDocument();
});
