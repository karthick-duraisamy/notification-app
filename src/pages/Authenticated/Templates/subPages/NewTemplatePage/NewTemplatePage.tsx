import { Col, Row } from 'antd';
import { useNavigate } from 'react-router';
import Icon from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import ImportTemplate from './ImportTemplate';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/App.hook';
import { openImportTemplateModal } from '@/stores/Modal.store';
import { TemplateChooser } from '@/components/TemplateChooser/TemplateChooser';
import { setActiveSubject, setActiveTemplateName, setCurrentBackPage, setHtml, setTemplateTypeID } from '@/stores/Template.store';
import { DragAndDropEditorIcon, HTMLEditorIcon, JSONEditorIcon, LayoutIcon, UploadIcon } from '@/components/Icons/Icons';

const NewTemplatePage = () => {
  const { t } = useTranslation();
  const titleDrag = t('templates_drag_and_drop_title');
  const subtitleDrag = t('templates_drag_and_drop_subtitle');

  const titleEditor = t('templates_html_editor_title');
  const subtitleEditor = t('templates_html_subtitle');

  const jsonTitle = t('JSON Editor');
  const jsonSubTitle = t('Configure your notification campaign structure with precision using our JSON editor.');

  const titleTemplate = t('templates_import_title');
  const subtitleTemplate = t('templates_drag_and_drop_subtitle');

  const titleLayout = t('layout_title');
  const subtitleLayout = t('layout_subtitle');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const html = useAppSelector((state) => state.TemplateReducer.getHtml);
  if (html != '') dispatch(setHtml(''));

  return (
    <Row gutter={[{ sm: 16, md: 16, lg: 24, xl: 30, xxl: 70 }, 24]} className="new-template">
      <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={6} data-testid="new_template_section">
        <TemplateChooser
          icon={<Icon component={DragAndDropEditorIcon} style={{ fontSize: '25px' }} />}
          title={titleDrag}
          subtitle={subtitleDrag}
          onClick={() => {
            dispatch(setActiveSubject(''));
            dispatch(setActiveTemplateName(''));
            dispatch(setCurrentBackPage('/templates/new/default'));
            navigate('/editor/new');
            dispatch(setTemplateTypeID('P'));
          }}
        />
      </Col>

      <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={6} data-testid="html_editor_section">
        <TemplateChooser
          icon={<Icon component={HTMLEditorIcon} style={{ fontSize: '25px' }} />}
          title={titleEditor}
          subtitle={subtitleEditor}
          onClick={() => {
            dispatch(setActiveSubject(''));
            dispatch(setActiveTemplateName(''));
            dispatch(setCurrentBackPage('/templates/new/default'));
            navigate('/editor/new');
            dispatch(setTemplateTypeID('H'));
          }}
        />
      </Col>

      <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={6} data-testid="html_editor_section">
        <TemplateChooser
          icon={<Icon component={JSONEditorIcon} style={{ fontSize: '25px' }} />}
          title={jsonTitle}
          subtitle={jsonSubTitle}
          onClick={() => {
            dispatch(setActiveSubject(''));
            dispatch(setActiveTemplateName(''));
            dispatch(setCurrentBackPage('/templates/new/default'));
            navigate('/editor/new');
            dispatch(setTemplateTypeID('J'));
          }}
        />
      </Col>

      <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={6} data-testid="import_template_section">
        <TemplateChooser
          icon={<Icon component={UploadIcon} style={{ fontSize: '25px' }} />}
          title={titleTemplate}
          subtitle={subtitleTemplate}
          onClick={() => dispatch(openImportTemplateModal())}
        />
        <ImportTemplate />
      </Col>
      <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={6} data-testid="template_layout_section">
        <TemplateChooser
          icon={<Icon component={LayoutIcon} style={{ fontSize: '25px' }} />}
          title={titleLayout}
          subtitle={subtitleLayout}
          onClick={() => {
            dispatch(setCurrentBackPage('/templates/new/default'));
            navigate('/templates/new/layout');
          }}
        />
      </Col>
    </Row>
  );
};

export default NewTemplatePage;
