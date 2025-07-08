import { createRoot } from 'react-dom/client';
import App from './App';
import CommonTestWrapper from './components/CommonTestWrapper/CommonTestWrapper';

const mockRender = jest.fn();
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: mockRender,
  })),
}));

describe('Application root', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);

    require('./index.tsx'); // trigger the render

    expect(createRoot).toHaveBeenCalledWith(div);
    expect(mockRender).toHaveBeenCalledWith(
      <CommonTestWrapper>
        <App />
      </CommonTestWrapper>
    );
  });
});
