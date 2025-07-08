import { Space } from 'antd';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { DotCircle } from '../Icons/Icons';

const SpaceStyle = styled(Space)`
  &.in-active,
  &.active {
    color: var(--active);
    border: none;
    background: unset;
  }

  &.in-active,
  &.in-active svg path {
    color: var(--in-active);
    fill: var(--in-active);
  }

  &.whatsapp {
    color: var(--whatsapp);
    svg path {
      fill: var(--whatsapp);
    }
  }
`;

interface StatusProp {
  name: string;
}

const Status = ({ name }: StatusProp) => {
  const { t } = useTranslation();
  const activeStyles = ['active', 'sent', 'mail sent', 'success'];
  const whatsAppRead = ['read', 'delivered'];
  const iconCss = activeStyles.includes(name.toLowerCase())
    ? 'active'
    : whatsAppRead.includes(name.toLowerCase())
      ? 'whatsapp'
      : 'in-active';
  return (
    <SpaceStyle className={iconCss} align="center" size={8}>
      <DotCircle />
      <label>{t(`${name.toLowerCase().replace(/ /g, '-')}`)}</label>
    </SpaceStyle>
  );
};

export { Status };
