import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomeLayout from './Home';

it('renders Header', () => {
  render(<HomeLayout />);
  expect(screen.getByTestId('home')).toBeInTheDocument();
});
