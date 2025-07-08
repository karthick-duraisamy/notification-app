import { useContext, useEffect, useState } from 'react';
import { LangugeContext } from '../languages/Language.context';
import hiIN from 'antd/lib/locale/hi_IN';
import enUS from 'antd/lib/locale/en_US';
import type { Locale } from 'antd/es/locale';
import { useTranslation } from 'react-i18next';
import CFG from '../config/config.json';

const useLang = () => {
  const [antdLangProvider, setAntdLangProvider] = useState<Locale>(enUS);
  const { lang, changeLang } = useContext(LangugeContext);
  const { i18n } = useTranslation();
  //in applifecycle, store the previous selected language is browser storage
  // in app init, set that language or init new one
  useEffect(() => {
    const existingLangauge = localStorage.getItem('lang');
    const lang = (existingLangauge) ? existingLangauge : CFG.default_lang;
    changeLang(lang);
  }, [changeLang]);

  // maintaining language states for antd and react
  // configProvider for antd language, it changes the default inbuilt languge in antd,
  //   ex: pagination text in antd pagination component

  useEffect(() => {
    if (lang) {
      switch (lang) {
        case 'en-US':
          setAntdLangProvider(enUS);
          break;
        case 'hi-IN':
          setAntdLangProvider(hiIN);
          break;
        default:
          console.info('language not yet implemented');
      }
      if (i18n.changeLanguage) {
        i18n.changeLanguage(lang);
        localStorage.setItem('lang', lang);
      }
    }
  }, [lang, i18n]);

  return { lang, changeLang, antdLangProvider };
};

export { useLang };
