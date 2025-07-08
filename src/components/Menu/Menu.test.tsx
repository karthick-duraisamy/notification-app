import { screen, render } from '@testing-library/react';
import Testwrapper from '../CommonTestWrapper/CommonTestWrapper';
import { SideBar } from './Menu';
describe('Menu Testing', () => {
  test('renders Menu', async () => {
    render(
      <Testwrapper>
        <SideBar />
      </Testwrapper>
    );
    const getMenuData = await screen.findAllByRole('menuitem');
    expect(getMenuData).not.toHaveLength(0);
    // await waitFor(() => expect(screen.getByText(/Dashboard/i)).toBeInTheDocument());
  });
});
