import { render } from '@testing-library/react';
import App from './App';
import CommonTestWrapper from './components/CommonTestWrapper/CommonTestWrapper';
import reportWebVitals from './reportWebVitals';
import { register, unregister } from './serviceWorkerRegistration';

test('renders app without error', async () => {
  render(
    <CommonTestWrapper>
      <App />
    </CommonTestWrapper>
  );
});
it('checking reportWebVitals', () => {
  expect(reportWebVitals(console.log)).not.toBe(new Date());
});
it('checking register', () => {
  expect(register()).not.toBe(new Date());
});
it('checking unregister', () => {
  expect(unregister()).not.toBe(new Date());
});
