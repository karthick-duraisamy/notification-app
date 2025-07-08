import { ConfigProvider } from 'antd';
import { AppRoute } from './routes/index.route';
import { DocumentHead } from '../src/components/DocumentHead/DocumentHead';
import { useLang } from './hooks/Language.hook';

const App = () => {
  const { antdLangProvider } = useLang();
  localStorage.removeItem('fontInfo');
  return (
    <ConfigProvider locale={antdLangProvider}>
      <DocumentHead />
      <AppRoute />
    </ConfigProvider>
  );
};

export default App;
