import i18next from 'i18next';
import HttpApi from 'i18next-http-backend';
import CFG from '../config/config.json';

// abstracting the i18n setup and combining with antd,
const addMailerPath = (path: string): string => {
  if (!path.includes('/')) {
    const parts = path.split('/');
    parts.splice(2, 0, '');
    return parts.join('/');
  }
  return path;
};

// Add /mailer/ to the path
i18next.use(HttpApi).init({
  lng: CFG.default_lang,
  fallbackLng: CFG.default_lang,
  load: 'currentOnly',
  debug: false,
  interpolation: {
    escapeValue: false
  },

  backend: {
    loadPath: addMailerPath('/locales/{{lng}}/{{ns}}.json')
  },
  react: { useSuspense: true }
});

export default i18next;
