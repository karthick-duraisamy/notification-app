import { useEffect, useState } from 'react';
import { Col, Row, Tabs, Radio, message } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router';
import { useParams } from 'react-router-dom';
import { FileTextOutlined, AppstoreFilled, BarsOutlined, LoadingOutlined } from '@ant-design/icons';
import NewTemplatePage from './subPages/NewTemplatePage/NewTemplatePage';
import SavedTemplatePage from './subPages/SavedTemplatePage/SavedTemplatePage';
import './Templates.scss';
import { useAppSelector, useAppDispatch } from '../../../hooks/App.hook';
import { setTemplateView } from '@/stores/Template.store';
import TemplateLayoutPage from './subPages/TemplateLayoutPage/TemplateLayoutPage';
import { useLazyGetTemplateFolderListQuery } from '../../../services/templates/Templates';
import { clearGuideModalInfo } from '@/stores/TemplateProject.store';
import { BackButton } from '@/components/BackButton/BackButton';
import GuideModal from '@/components/GuideModal/GuideModal';
import { FormTitle } from '@/components/Title/Title';

interface IFilterData {
  folder: string | undefined;
  status: number | undefined;
  page: string | undefined;
  project: string | number | undefined;
  search: string | undefined;
}

const Templates = () => {
  const navigate = useNavigate();
  if (localStorage.getItem('lastLocation') === '/templates/:tab/:view') {
    localStorage.setItem('lastLocation', '/templates/new/default');
    navigate('/templates/new/default');
  }
  const [isMySavedTemplate, setIsMySavedTemplate] = useState(false);
  const { project, modalGuide } = useAppSelector((state: any) => state.TemplateProjectReducer);
  const [isModelOpen, setIsModelOpen] = useState(!!modalGuide?.includes('template'));
  const [filterData, setFilterData] = useState<IFilterData>({
    folder: undefined,
    status: undefined,
    page: undefined,
    search: undefined,
    project: project
  });
  const [getTemplateFolderData, getTemplateFolderDataStatus] = useLazyGetTemplateFolderListQuery();
  const { view, tab } = useParams<{ view?: string; tab?: string }>();
  const { t } = useTranslation();
  const location = useLocation();
  const [activePath, setActivPath] = useState({
    tab: '',
    view: 'new'
  });
  const items = [
    { label: 'My saved templates', key: 'saved', children: <SavedTemplatePage /> }, // remember to pass the key prop
    { label: 'New template', key: 'new', children: <NewTemplatePage /> }
  ];
  const dispatch = useAppDispatch();
  const { templateView, folderId } = useAppSelector((state) => state.TemplateReducer);
  useEffect(() => {
    if (tab && view) {
      setActivPath({
        tab,
        view
      });
      tab === 'saved' ? setIsMySavedTemplate(true) : setIsMySavedTemplate(false);
    }
  }, [tab, view]);

  useEffect(() => {
    if (project != undefined && filterData.project) {
      getTemplateFolderData(filterData);
    }
  }, [getTemplateFolderData, filterData, project]);

  // Error handling for template folder url
  useEffect(() => {
    if ((getTemplateFolderDataStatus as any)?.data?.responseCode === 1) {
      const errorKey: any = (getTemplateFolderDataStatus as any)?.data?.response['errors']
        ? Object.keys((getTemplateFolderDataStatus as any).data.response['errors'])[0]
        : undefined;
      message.error(
        errorKey
          ? errorKey + ' ' + (getTemplateFolderDataStatus as any).data.response['errors'][errorKey][0]
          : (getTemplateFolderDataStatus as any)?.data?.response['Message']
      );
    }
  }, [getTemplateFolderDataStatus]);

  useEffect(() => {
    setFilterData((state) => {
      return { ...state, project: project };
    });
  }, [project]);

  // The following useEffect is triggered on initial rendering, when default route is an template.
  useEffect(() => {
    if (window.location.href.includes('/templates/:tab/:view')) navigate('/templates/saved/default');
  }, []);

  // Initial time of closing the modal or navigate through modal to clear the specific store value to hide the Integration workflow modal.(Guide)
  useEffect(() => {
    if (isModelOpen == false) {
      dispatch(clearGuideModalInfo({ value: 'template' }));
    }
  }, [isModelOpen]);

  const ViewSwitcher = () => (
    <Radio.Group
      className="view-switch"
      value={templateView.view}
      onChange={(e: RadioChangeEvent) => {
        dispatch(setTemplateView(e.target.value));
        if (e.target.value) {
          navigate(`/templates/saved/${e.target.value}${folderId.id ? '?folder=' + folderId.id : ''}`);
        }
      }}
    >
      <Radio.Button value="thumbnail">
        <FileTextOutlined />
      </Radio.Button>
      <Radio.Button value="grid">
        <AppstoreFilled />
      </Radio.Button>
      <Radio.Button value="list">
        <BarsOutlined />
      </Radio.Button>
    </Radio.Group>
  );

  if (view === 'layout')
    return (
      <>
        <div className="flex-container">
          <h2 className="f-sbold">Templates layout</h2>
          <BackButton />
        </div>
        <TemplateLayoutPage />
      </>
    );
  return (
    <>
      <GuideModal
        isOpen={isModelOpen}
        onClose={() => {
          setIsModelOpen(false);
        }}
        isNext={false}
        status="success"
        message=""
        nextStep="Template Created Succesfully and also Variables mapped, Now Create the Configuration."
        buttonLabel="Create Configuration"
        navigateTo="/mailer/create/new"
        additionButtonLabel="Go to Templates"
        additionNavigateTo=""
        pathName="template"
      />
      <Row justify="space-between" align="middle">
        <Col flex="auto">
          <FormTitle
            title={t('Notification templates')}
            subTitle={t('How would you like to create your template?')}
            clsName="normal"
          />
        </Col>
        {/* create button removed ad per new design */}
        {/* {isMySavedTemplate && (
          <Col>
            <Button
              type="primary"
              size="large"
              icon={<PlusCircleFilled />}
              onClick={() => {
                dispatch(setActiveFolderID(null as unknown as number));
                dispatch(setActiveTemplateName('untitled'));
                dispatch(setActiveLanguage(null as unknown as number));
                dispatch(setActiveSubject(null as unknown as string));
                navigate(`/editor/new`);
              }}
            >
              Create template
            </Button>
          </Col>
        )} */}
      </Row>
      {getTemplateFolderDataStatus?.isSuccess &&
      getTemplateFolderDataStatus?.currentData?.responseCode === 0 &&
      (getTemplateFolderDataStatus?.data?.response as any)?.data?.count > 0 ? (
        <Tabs
          items={items}
          className="Templates"
          defaultActiveKey="saved"
          size="large"
          tabBarGutter={80}
          activeKey={activePath.tab}
          tabBarExtraContent={isMySavedTemplate && location.pathname !== '/templates/saved/default' && <ViewSwitcher />}
          onChange={(activeKey: string) => {
            navigate(`/templates/${activeKey}/default`);
          }}
        ></Tabs>
      ) : (
        <>
          {getTemplateFolderDataStatus?.isSuccess ? (
            <NewTemplatePage />
          ) : (
            <h3 className="text-center">
              <LoadingOutlined /> Loading...
            </h3>
          )}
        </>
      )}
    </>
  );
};

export default Templates;
