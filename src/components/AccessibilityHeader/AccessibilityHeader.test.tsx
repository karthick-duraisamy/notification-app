import { fireEvent, render, screen } from '@testing-library/react';
import AccessibilityHeader from './AccessibilityHeader';

it('renders AccessibilityHeader', () => {
  render(<AccessibilityHeader />);
  expect(screen.getByText('Accessibility')).toBeInTheDocument();
});
it('reschedule attention with reschedule data', async () => {
  render(<AccessibilityHeader />);
  let selectBox = screen.getByTestId('acccessibility_color_change');
  if (selectBox) fireEvent.click(selectBox);
  expect(screen.getByText('Accessibility')).toBeInTheDocument();
  // need to check the class name of body is changed or not while switching theme
  // expect(container.firstChild.classList.contains('foo')).toBe(true)
});
