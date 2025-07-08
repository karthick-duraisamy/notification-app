import { Col, Row, Button, Space, Radio, Modal, Select, Dropdown, Menu, Input, Mentions, message } from 'antd';
import '../../pages/Authenticated/Tracking/Tracking.scss';
import './Template.scss';
import {
  ArrowLeftOutlined,
  CaretDownOutlined,
  MobileOutlined,
  DesktopOutlined,
  TabletOutlined,
  UndoOutlined,
  RedoOutlined,
  FolderOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/App.hook';
import { openPreviewModal, PreviewMode } from '../../stores/Modal.store';
import {
  setSaveActive,
  triggerRedo,
  triggerUndo,
  setActiveFolderID,
  setActiveTemplateName,
  setHtmlTrigger,
  setback,
  setHtml,
  setActiveSubject,
  setActiveLanguage,
  setFolderId
} from '../../stores/Template.store';
import { useState, useEffect } from 'react';
import { useTriggerMailMutation } from '../../services/TriggerService/Trigger';
import { LoadingOutlined } from '@ant-design/icons';
import TrackingModal from '../../pages/Authenticated/Tracking/TrackingModal';
import { useLazyRequestFormatQuery } from '../../services/Tracking/Tracking';
import { useLazyGetTemplateMasterInfoQuery } from '../../services/masterInfo/masterInfo';
import { clearTemaplateMasterInfo } from '../../stores/masterInfo.store';
import { useVariables } from '../../hooks/editor.hook';
import FolderFilter from '../../components/FolderFilter/FolderFilter';
import { useGetTemplateMasterQuery } from '../../services/templates/Templates';
import { useTemplateFolderSelection } from '../../hooks/Selection.hook';
import { CheckGuideModal } from '../../Utils/commonFunction';
import { setGuideModalInfo } from '../../stores/TemplateProject.store';

export interface PreviewSendModal {
  params: ModalParams;
  mode: 'Editor';
}

interface ModalParams {
  setting_id?: number | string;
  emaild_id?: number | string;
  template_name?: string;
  cc?: string;
  bcc?: string;
  subject?: string;
  request_JSON?: string;
  preview: string;
  closeModalCallBack: () => void;
}

const { Option } = Select;

const TemplateLayout = () => {
  const { currentBackPage } = useAppSelector((state) => state.TemplateReducer);
  const { project, modalGuide } = useAppSelector((state: any) => state.TemplateProjectReducer);
  const navigate = useNavigate();
  const { folderId } = useAppSelector((state) => state.TemplateReducer);

  const [service] = useLazyGetTemplateMasterInfoQuery();
  const dispatch = useAppDispatch();
  const appDispatch = useAppDispatch();

  const { active } = useAppSelector((state) => state.TemplateReducer);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [renamed, setRenamed] = useState(false);
  const isSaving = useAppSelector((state) => state.TemplateReducer.save);
  const [requestFormatService, requestFormatServicesStatus] = useLazyRequestFormatQuery();
  const masterInfo = useAppSelector((state) => state.MasterInfoReducer);
  const { templateFolder } = useTemplateFolderSelection();

  const html = useAppSelector((state) => state.TemplateReducer.getHtml);
  const jsonEditValue = useAppSelector((state) => state.TemplateReducer.Json);
  const [requestFormat, setRequestFormat] = useState('');
  const { variable } = useVariables();
  useGetTemplateMasterQuery({});

  const { folders } = useAppSelector((state) => state.TemplateReducer.templateFolder);

  useEffect(() => {
    service(null);
    return () => {
      appDispatch(clearTemaplateMasterInfo());
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if ((html && html !== '') || (html !== '' && active.templateType === 'J' && active.subject.length > 0)) {
      requestFormatService({
        template_content: active.templateType === 'J' ? JSON.stringify(jsonEditValue) : html,
        subject: active.subject,
        project: project ? project : localStorage.getItem('project')
      })
        .unwrap()
        .then((resp: any) => {
          if (resp) {
            setRequestFormat(resp.response.data);
            setModalVisibility(true);
          }
        });

      setHtml('');
    }
    // eslint-disable-next-line
  }, [html]);

  //@ts-ignore
  const focusNameOnLoad = (element: Input | null) => {
    if (element && active.template_name && !renamed) {
      element.focus({ cursor: 'all' });
      setRenamed(true);
    }
  };

  const SendTestMailModal = () => {
    // eslint-disable-next-line
    const [email] = useState('');
    const [triggerService] = useTriggerMailMutation();
    // eslint-disable-next-line
    const [selectedOption] = useState<number | undefined>(undefined);

    return (
      <Modal
        className="TrackingModal"
        width={'80%'}
        style={{ top: 32 }}
        open={modalVisibility}
        onCancel={() => setModalVisibility(false)}
        onOk={() => {
          setModalVisibility(false);
          const to = email.includes(',') ? email.split(',') : [email];
          selectedOption &&
            triggerService({
              setting_id: selectedOption.toString(),
              recipientList: [{ data: '', to, action_name: 'test mail' }]
            });
        }}
        okText="send test notification"
        cancelText="cancel"
        footer={null}
        closeIcon={<CloseCircleOutlined style={{ fontSize: 22, color: '#FF4646' }} />}
        closable={true}
        title={null}
      >
        <TrackingModal
          params={{
            preview: html,
            request_JSON: requestFormat,
            closeModalCallBack: () => setModalVisibility(false),
            subject: active.subject,
            template_name: active.template_name
          }}
          mode="Editor"
        />
      </Modal>
    );
  };

  const sendMail = () => {
    if (active.subject) {
      dispatch(setHtml(''));
      dispatch(setHtmlTrigger(true));
    } else {
      message.warning('Please enter subject to send notification');
      return false;
    }
  };

  // Whenever we add template that time,we wanna store the template on store to handle the integration modal.(Guide)
  useEffect(() => {
    if (isSaving != undefined && isSaving != false) {
      let value = 'template';
      const valueSet = CheckGuideModal(modalGuide, value);
      dispatch(setGuideModalInfo({ value: valueSet }));
    }
  }, [isSaving]);

  return (
    <div
      style={{ width: '100%', height: '100%', display: 'flex', flex: 1, flexDirection: 'column' }}
      data-testid="templatelayout"
    >
      <Row style={{ padding: '24px 10px', borderBottom: '1px solid #E8E7E7' }}>
        <Col span={24}>
          <Row justify="space-between">
            <Col>
              <Space size="middle">
                <FolderOutlined style={{ fontSize: '16px' }} />
                <span style={{ fontSize: '16px' }}>
                  <FolderFilter
                    folders={folders.length > 0 ? folders : templateFolder}
                    pathname="template"
                    activeFolder={active.folder_id !== -1 ? active.folder_id : undefined}
                    handler={(value: any) => {
                      dispatch(setFolderId(value));
                      dispatch(setActiveFolderID(value));
                    }}
                  />
                </span>
                <span style={{ fontSize: '14px', color: 'grey', fontWeight: 100 }}>/</span>
                <span style={{ fontSize: '16px' }}>
                  <Input
                    type="text"
                    value={active.template_name}
                    placeholder="Enter template name"
                    onChange={(event) => {
                      dispatch(setActiveTemplateName(event.currentTarget.value));
                    }}
                    ref={(ref) => focusNameOnLoad(ref)}
                  />
                </span>
                <span style={{ fontSize: '16px' }}>
                  <Mentions
                    prefix="${{"
                    style={{ width: '188px' }}
                    value={active.subject}
                    placeholder="Enter subject"
                    onChange={(string) => {
                      dispatch(setActiveSubject(string));
                    }}
                  >
                    {variable &&
                      variable.map((item, index) => {
                        return (
                          <Mentions.Option key={index.toString()} value={`${item}}}`}>
                            {item}
                          </Mentions.Option>
                        );
                      })}
                  </Mentions>
                </span>

                <span style={{ fontSize: '16px' }}>
                  <Select
                    value={active.language_id !== null ? active.language_id : undefined}
                    placeholder="Lan"
                    onSelect={(value: any) => {
                      dispatch(setActiveLanguage(value));
                    }}
                  >
                    {masterInfo &&
                      masterInfo.template &&
                      masterInfo.template.language.map((item: any, index: any) => {
                        return (
                          <Option
                            key={index.toString()}
                            value={typeof item.value == 'string' ? Number(item.value) : item.value}
                          >
                            {item.label.substring(0, 2)}
                          </Option>
                        );
                      })}
                  </Select>
                </span>
                <Space size="small">
                  <Button
                    data-testid="template_undo_action"
                    icon={<UndoOutlined />}
                    onClick={() => {
                      dispatch(triggerUndo());
                    }}
                  />
                  <Button
                    data-testid="template_redo_action"
                    icon={<RedoOutlined />}
                    onClick={() => {
                      dispatch(triggerRedo());
                    }}
                  />
                </Space>
                <Radio.Group
                  defaultValue="desktop"
                  value={null}
                  onChange={(value) => {
                    dispatch(openPreviewModal({ mode: value.target.value as PreviewMode }));
                  }}
                >
                  <Radio.Button value={PreviewMode.mobile} data-testid="preview_mobile">
                    <MobileOutlined />
                  </Radio.Button>
                  <Radio.Button value={PreviewMode.tablet} data-testid="preview_tablet">
                    <TabletOutlined />
                  </Radio.Button>
                  <Radio.Button value={PreviewMode.desktop} data-testid="preview_desktop">
                    <DesktopOutlined />
                  </Radio.Button>
                </Radio.Group>

                <div style={{ display: 'inline', transition: 'width 0.5s ease-in !important' }}>
                  <Dropdown.Button
                    type="primary"
                    onClick={() => {
                      dispatch(setSaveActive());
                    }}
                    style={{
                      borderTopLeftRadius: 'unset',
                      borderBottomLeftRadius: 'unset'
                    }}
                    icon={<CaretDownOutlined />}
                    overlay={() => {
                      return (
                        <Menu>
                          <Menu.Item key="testmail" onClick={sendMail}>
                            {requestFormatServicesStatus.isFetching ? (
                              <LoadingOutlined />
                            ) : active.templateType === 'J' ? (
                              'Send test notification'
                            ) : (
                              'Send test mail'
                            )}
                          </Menu.Item>
                        </Menu>
                      );
                    }}
                  >
                    {isSaving ? <LoadingOutlined /> : 'Save template'}
                  </Dropdown.Button>
                </div>
                <Button
                  type="default"
                  data-testid="clickIndicator"
                  icon={<ArrowLeftOutlined />}
                  onClick={() => {
                    if (currentBackPage == undefined) dispatch(setback(true));
                    sessionStorage.removeItem('templateType');
                    navigate('/templates/saved/grid?folder=' + folderId.id);
                  }}
                >
                  Back
                </Button>
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="container">
        <Col span={24} className="editor-container">
          <Outlet />
        </Col>
      </Row>
      <SendTestMailModal />
    </div>
  );
};

export default TemplateLayout;
