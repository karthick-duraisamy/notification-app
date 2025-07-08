import { Select } from 'antd';
import { useLang } from '../../hooks/Language.hook';
import { CaretDownFilled } from '@ant-design/icons';
import CFG from '../../config/config.json';
import './Language.scss';
import { FlagIndia, FlagUk } from '../Icons/FlagIcon';
import { useState } from 'react';

const { Option } = Select;

const Language = () => {
  const [languageSelect, setLanguageSelect] = useState('en-US');
  const { lang, changeLang } = useLang();
  const changeLanguage = (value: string) => {
    setLanguageSelect(value);
    console.log(value);
    changeLang(value);
  };

  return (
    <>
      <div className="language" data-testid="lang">
        {languageSelect == 'en-US' ? <FlagUk /> : <FlagIndia />}
        <Select
          defaultValue={CFG.default_lang}
          value={lang}
          onChange={changeLanguage}
          suffixIcon={<CaretDownFilled style={{ color: 'var(--theme-login-input-text-color)', fontSize: '14px' }} />}
          style={{ width: 90 }}
          variant="borderless"
        >
          {CFG.language.map((value, index) => {
            return (
              <Option key={index} value={value.code}>
                {value.text}
              </Option>
            );
          })}
        </Select>
      </div>
    </>
  );
};

export default Language;
