import { Radio } from 'antd';
import './Theme.scss';
import { useTheming } from '../../hooks/Theme.hook';
import { DarkIcon, LightIcon } from '../Icons/Icons';

const Theme = () => {
  const { changeTheme, theme } = useTheming();

  const setTheme = (e: any) => {
    return changeTheme(e.target.value);
  };

  return (
    <Radio.Group onChange={setTheme} value={theme} className="radioSwitch">
      <Radio.Button className="cls-radio-switch" value="light">
        <LightIcon /> Light
      </Radio.Button>
      <Radio.Button className="cls-radio-switch" value="dark">
        <DarkIcon /> Dark
      </Radio.Button>
    </Radio.Group>
  );
};

export { Theme };
