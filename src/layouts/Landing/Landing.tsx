import { Col, Row } from 'antd';
import css from './Landing.module.scss';
import { useTranslation } from 'react-i18next';
import Language from '../../components/Language/Language';
import { Outlet } from 'react-router-dom';
import { Logo } from '../../components/Logo/Logo';
import { LandingImage } from '../../components/LandingImage/LandingImage';
import { Theme } from '../../components/Theme/Theme';

const Container = () => {
  const { t } = useTranslation();

  return (
    <>
      <Row className={`${css['container']} ${css['h-100']}`} data-testid="container">
        <Col className={css['container-image']} xs={24} sm={24} md={12} lg={12} xl={12}>
          <Row justify="center" align="top">
            <Col xs={20} sm={20} md={19} lg={19} xl={19} className={css['container-logo']}>
              <Logo page={'login'} />
            </Col>
            <Col xs={20} sm={20} md={19} lg={19} xl={19}>
              <h1 className={css['title']}>{t('landing_welcome')}</h1>
              <span className={css['title-sub']}>{t('landing_welcome_subtitle')}</span>
            </Col>
            <Col xs={0} sm={0} md={19} lg={19} xl={19}>
              <LandingImage />
            </Col>
          </Row>
        </Col>
        <Col className={`${css.form} pt-4`} xs={24} sm={24} md={12} lg={12} xl={12}>
          <Row justify="center" align="top" className={css['container-wrapper']}>
            <Col sm={20} md={24} lg={24} xl={24} className={css['container-header']}>
              <Theme />
              <Language />
            </Col>
            <Col xs={20} sm={20} md={19} lg={20} xl={16}>
              <Outlet />
            </Col>
            <Col span={24} className={css['container-poweredby']}>
              {t('powered_by')}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Container;
