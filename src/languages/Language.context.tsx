import { createContext, useState } from 'react';
import type { FC } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18 from './i18';
import CFG from '../config/config.json';

export const LangugeContext = createContext({ lang: CFG.default_lang, changeLang: (lang: string) => {console.log(lang)} });

export const LanguageProvider: FC<ChildInterface> = (props) => {
  const [lang, setLang] = useState<string>(CFG.default_lang);

  const changeLang = (lang: string) => {
    if (lang) {
      setLang(lang);
    }
  };

  // combining all language providers
  return (
    <I18nextProvider i18n={i18}>
      <LangugeContext.Provider value={{ lang: lang, changeLang }}>{props.children}</LangugeContext.Provider>
    </I18nextProvider>
  );
};
