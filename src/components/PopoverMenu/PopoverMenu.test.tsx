import { screen, render, waitFor } from '@testing-library/react';
import { ActionDropDown } from './PopoverMenu';

it('renders PopoverMenu', async () => {
  const dummyActions = [
    {
      name: 'testAction',
      handler: (id: any) => {
        console.log(id);
      },
    },
  ];
  render(<ActionDropDown actions={dummyActions} referenceId="1" />);
  screen.getByRole("button").click();
  await waitFor(() => expect(screen.getByText(/testAction/i)).toBeInTheDocument());
});
