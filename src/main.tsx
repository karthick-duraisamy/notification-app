import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import './assets/scss/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './languages/Language.context';
import { AppStoreProvider } from './stores/Store';
import { Loader } from './components/Loader/Loader';


const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <Suspense fallback={<Loader fallback={true} />}>
      <BrowserRouter>
        <AppStoreProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </AppStoreProvider>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
