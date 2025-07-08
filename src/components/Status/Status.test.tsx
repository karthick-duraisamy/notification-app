import { screen, render, waitFor } from '@testing-library/react';
import { Status } from './Status';
import TestWrapper from '../CommonTestWrapper/CommonTestWrapper';

it('renders Status', async () => {
  //   used common test wrapper to fix translation issue
  render(
    <TestWrapper>
      <Status name="sent" />
    </TestWrapper>
  );
  // status name will be capitalized
  await waitFor(() => expect(screen.getByText(/sent/i)).toBeInTheDocument());
});
