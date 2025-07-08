import { useTranslation } from 'react-i18next';
import css from './Title.module.scss';

interface FormTitleProps {
  title: string;
  subTitle?: string;
  clsName?: string;
  testId?: string;
}

const FormTitle = ({ subTitle, title, clsName, testId }: FormTitleProps) => {
  const { t } = useTranslation();
  const tempClass = clsName === undefined ? css['title'] : css[clsName];
  return (
    <div data-testid={testId} className={tempClass}>
      <p className={`${css['title-head']} cls-title-color`}>{t(title)}</p>
      {subTitle && <p className={`${css['title-head-sub']}`}>{t(subTitle)}</p>}
    </div>
  );
};

export { FormTitle };
