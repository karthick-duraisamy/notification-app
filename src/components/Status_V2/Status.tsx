import { Space, Tag } from 'antd';
import { DotCircle } from '../Icons/Icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

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
    .ant-tag-green {
    color: #3577F1 !important;
    font-weight: bold;
    background: #e1ebfd !important;
    border: none !important;
    border-radius: 5px !important;
  }
    .ant-tag-volcano {
    color: var(--btn-primary-color) !important;
    font-weight: bold;
    background: #f065484f !important;
    border: none !important;
    border-radius: 5px !important;
  }
    .ant-tag{
       border-radius: 5px !important;
       label{
       font-weight: bold;
       }
    }
`;

interface StatusProp {
  name: string;
  pathName?: string;
  allStatus?: any[];
}

// Define color sets for indexed topics
const TOPIC_COLORS = [
  { color: '#3577F1', background: '#e1ebfd' },
  { color: '#F06548', background: '#f065484f' },
  { color: '#0AB39C', background: '#0ab39c4f' },
  { color: '#faad14', background: '#faad144f' },
  { color: '#FF6B72', background: '#ff6b724f' }
];

// Keep status colors for specific states
const STATUS_COLORS = {
  active: '#0AB39C',
  inactive: '#F06548',
  pending: '#faad14',
  default: '#ffd666'
} as const;

const Status = ({ name, pathName, allStatus }: StatusProp) => {
  const { t } = useTranslation();
  const activeStyles = ['active', 'sent', 'mail sent', 'success'];
  const whatsAppRead = ['read', 'delivered'];
  const iconCss = activeStyles && activeStyles.includes((name || "").toLowerCase())
    ? 'active'
    : whatsAppRead.includes((name || "").toLowerCase())
      ? 'whatsapp'
      : 'in-active';

  // To chnage the first letter as Caps
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getTopicColor = (topicName: string) => {
    // If it's a status color, return white for text
    if (['active', 'in-active', 'pending'].includes((name || "").toLowerCase())) {
      return '#FFFFFF';
    }

    // For topics, use the index-based colors
    const topicIndex: any = allStatus?.findIndex(
      (status) => status?.toLowerCase() === topicName?.toLowerCase()
    );

    return topicIndex !== -1 && topicIndex < 5
      ? TOPIC_COLORS[topicIndex].color
      : STATUS_COLORS.default;
  };

  const getTopicBackground = (topicName: string) => {
    // For status colors, use the full color as background
    if (['active', 'in-active', 'pending'].includes((name || "").toLowerCase())) {
      if (name.toLowerCase() === 'active') return STATUS_COLORS.active;
      if (name.toLowerCase() === 'in-active') return STATUS_COLORS.inactive;
      if (name.toLowerCase() === 'pending') return STATUS_COLORS.pending;
    }

    // For topics, use the index-based background colors
    const topicIndex: any = allStatus?.findIndex?.(
      (status) => status?.toLowerCase() === topicName?.toLowerCase()
    );

    return topicIndex !== -1 && topicIndex < 5
      ? TOPIC_COLORS[topicIndex].background
      : `${STATUS_COLORS.default}4f`;
  };

  return (
    <SpaceStyle className={iconCss} align="center" size={8}>
      {pathName !== "campaign" && (
        <>
          <DotCircle />
          <label>{t(`${name.toLowerCase().replace(/ /g, '-')}`)}</label>
        </>
      )}
      {pathName === "campaign" && (
        <Tag
          style={{
            color: getTopicColor(name),
            backgroundColor: getTopicBackground(name),
            borderColor: 'transparent'
          }}
        >
          <label>{capitalizeFirstLetter(t(`${(name || "").toLowerCase().replace(/ /g, '-')}`))}</label>
        </Tag>
      )}
    </SpaceStyle>
  );
};

export { Status };
