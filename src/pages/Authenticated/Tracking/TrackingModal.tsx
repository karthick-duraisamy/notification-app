import { Form, Row, Col, Input, Button, Select, notification, message } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  useLazyPreviewQuery,
  useEditResendMutation,
  useSendTestMailMutation,
  useLazyRequestFormatQuery
} from '../../../services/Tracking/Tracking';
import { LoadingOutlined } from '@ant-design/icons';
import { useSettingSelect } from '../../../hooks/SettingForm.hook';
import { useAppDispatch, useAppSelector } from '../../../hooks/App.hook';
import { JsonEditor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import 'jsoneditor/dist/jsoneditor.min.css';
import type { Result } from '../../../services/Tracking/TrackingTypes';
import type { PreviewSendModal } from '../../../layouts/Template/Template';
import { setHtml } from '@/stores/Template.store';
import JSONViewer from '@/components/JSONViewer/JSONViewer';

const { Option } = Select;
interface ITrackingModal {
  data: Result;
  mode: 'tracking';
}
// request format
const TrackingModal = (props: ITrackingModal | PreviewSendModal) => {
  const { mode, data, params } = props as any;
  // eslint-disable-next-line
  const [previewService, previewServiceData] = useLazyPreviewQuery();

  const [previewData, setPreviewData] = useState(data ? data.template_info.template_content_value : params.preview);
  const jsonEditorValue: any = previewData;
  // const [previewJsonValue, setPreviewJsonValue] = useState(undefined);
  const [editResend, isFetching] = useEditResendMutation();
  const [trackingForm] = useForm();
  // eslint-disable-next-line
  // const [view, setView] = useState(mode === 'tracking' ? 'preview' : 'edit');
  const { options } = useSettingSelect();
  const { user } = useAppSelector((state: any) => state.user);
  const [sendTestMail, sendTestMailStatus] = useSendTestMailMutation();
  const [requestFormatService] = useLazyRequestFormatQuery();
  const [isRequestFormat, setIsRequestFormat] = useState<boolean>(true);
  const [requestFormatInfo, setRequestFormatInfo] = useState<any>();
  let request_data =
    data && data.template_info ? data.template_info.request_format_value : (props as any).params.request_JSON;
  const [jsonEditorData, setJsonEditorData] = useState(request_data);
  // default view set to tree
  const [jsonEditorView, setJsonEditorView] = useState('code');
  const attachmentData: string | undefined = data?.attachments[0];
  const { active } = useAppSelector((state) => state.TemplateReducer);
  const { project } = useAppSelector((state) => state.TemplateProjectReducer);
  const html = useAppSelector((state) => state.TemplateReducer.getHtml);
  const dispatch = useAppDispatch();
  const [TrackingIframe] = useState(sessionStorage?.getItem('iframe_token'));

  useEffect(() => {
    if (requestFormatInfo !== undefined) setJsonEditorView(jsonEditorView === 'tree' ? 'code' : 'tree');
  }, [requestFormatInfo]);

  useEffect(() => {
    if (mode === 'tracking') {
      let validSetting = options?.options.filter((option: any) => option.id === data.setting_id);
      trackingForm.setFieldsValue({
        setting_name: validSetting.length > 0 ? data.setting_id : undefined,
        cc: data.cc,
        bcc: data.bcc,
        to: data.to,
        subject: data.subject,
        phone_number: data.to
      });
    }
    // eslint-disable-next-line
  }, [data, trackingForm, options]);
  useEffect(() => {
    if (mode !== 'tracking' && params && params.request_JSON) {
      trackingForm.setFieldsValue({
        request: JSON.stringify(params.request_JSON, null, 4),
        subject: params.subject,
        to: user ? user.email : undefined
      });
    }
    // eslint-disable-next-line
  }, [params]);

  const handleForm = (value: any) => {
    if ((data && data.template_info.template_content) || params.preview)
      previewService({
        project: Number(sessionStorage.getItem('project_id'))
          ? Number(sessionStorage.getItem('project_id'))
          : Number(project),
        template_content: data ? data.template_info.template_content : params.preview,
        request_format_value: jsonEditorData,
        setting_id:
          sessionStorage.getItem('setting_id') !== null ? Number(sessionStorage.getItem('setting_id')) : undefined,
        subject:
          mode === 'tracking'
            ? data?.template_info?.subject
            : params?.subject
              ? params?.subject
              : value?.subject
                ? value?.subject
                : data?.subject
      })
        .unwrap()
        .then((res: any) => {
          if (res.responseCode === 0) {
            // setView('preview');
            setPreviewData(res?.response?.data?.template_content_value);
            trackingForm.setFieldsValue({ subject: res?.response?.data?.subject });
          }
        })
        .catch((err: any) => {
          // Error handling for Preview
          const errorKey: any = err?.data?.response['errors'] ? Object.keys(err.data.response['errors'])[0] : undefined;
          message.error(
            errorKey ? errorKey + ' ' + err.data.response['errors'][errorKey][0] : err.data.response['Message']
          );
        });
  };

  // Download using fetch
  // function handleAttachment() {
  //   notification.info({ message: 'Attachment will start to download' });

  //   fetch(attachmentData)
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const url = window.URL.createObjectURL(blob);
  //       const link = document.createElement('a');
  //       link.href = url;
  //       link.setAttribute('download', 'image.jpg');
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link); // Clean up the temporary element
  //     })
  //     .catch((error) => {
  //       // Handle errors here
  //       console.error('Error fetching attachment:', error);
  //     });
  // }

  // Download using axios
  function handleAttachment() {
    notification.info({ message: 'Attachment will start to download' });
    axios({
      url: attachmentData,
      method: 'GET',
      responseType: 'blob'
    }).then((response: any) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'image.jpg');
      document.body.appendChild(link);
      link.click();
    });
  }

  // The following method is used for handling the reset functionality
  const resetHandling = () => {
    if (isRequestFormat) {
      setJsonEditorView(jsonEditorView === 'tree' ? 'code' : 'tree');
      requestFormatService({
        template_content: data?.template_info?.template_content,
        subject: data?.template_info?.subject,
        project: project ? project : Number(localStorage.getItem('project'))
      })
        .unwrap()
        .then((resp: any) => {
          if (resp.responseCode === 0) {
            setIsRequestFormat(false);
            setRequestFormatInfo(resp.response.data);
            setJsonEditorData(resp.response.data);
          }
        });
    } else setJsonEditorData(requestFormatInfo);
  };

  const DownloadJsonButton = (jsonData: any, fileName: any) => {
    // Convert JSON data to a string
    const jsonString = JSON.stringify(jsonData, null, 2); // Pretty-print with 2 spaces

    // Create a Blob with JSON content and MIME type `application/json`
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create an object URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up by revoking the object URL
    URL.revokeObjectURL(url);
  };

  const downloadHtmlContent = () => {
    let htmlContentValue =
      props.mode === 'Editor'
        ? previewData
          ? previewData
          : props.params.preview
        : previewData
          ? previewData
          : (props as any)?.data?.template_info?.template_content_value;
    // Create a Blob containing the HTML content
    const blob = new Blob([htmlContentValue], { type: 'text/html' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement('a');
    link.href = url;

    // Set the download attribute to specify the filename
    let editorTemplateName: string = '';
    editorTemplateName =
      props.mode === 'Editor' && props.params.template_name != undefined ? props.params.template_name : 'template';
    link.download =
      props.mode === 'Editor' ? editorTemplateName : (props as any).data.template_info.template_name + '.html';

    // Append the link to the document body
    document.body.appendChild(link);

    // Trigger a click event to initiate the download
    link.click();

    // Clean up by revoking the URL
    URL.revokeObjectURL(url);
  };

  // The following useEffect is used to disable the click action on preview template option.
  useEffect(() => {
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.onload = () => {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDocument) {
          const style = iframeDocument.createElement('style');
          style.innerHTML = `
            button, a, input, [role="button"], [tabindex] {
              pointer-events: none;
            }
          `;
          iframeDocument.head.appendChild(style);
        }
      };
    }
  }, [previewData]);

  const handleJson = (Json: string) => {
    if (Json === '') return {};
    if (typeof JSON.parse(Json) === 'string') return JSON.parse(JSON.parse(Json));
    if (typeof JSON.parse(Json) === 'object') return JSON.parse(Json);
  };

  const handleResend = () => {
    let values = Object.keys(trackingForm.getFieldsValue()).length === 0 ? data : trackingForm.getFieldsValue();
    if (mode === 'tracking') {
      let formData: any = {
        setting_id: sessionStorage.getItem('setting_id')
          ? Number(sessionStorage.getItem('setting_id'))
          : values?.setting_name,
        tracking_id: data?.tracking_id,
        subject: values?.subject,
        to: values?.to?.split(',')[0] ? values?.to?.split(',') : [],
        cc: values?.cc?.split(',')[0] ? values?.cc?.split(',') : [],
        bcc: values?.bcc?.split(',')[0] ? values?.bcc?.split(',') : [],
        request_format_value: jsonEditorData
      };
      if (values.phone_number !== null && values.phone_number !== undefined)
        formData['phone_number'] = values?.phone_number ? Number(values?.phone_number) : '';
      editResend(formData)
        .unwrap()
        .then((res: any) => {
          if (res.responseCode === 0) {
            notification.success({ message: 'Notification has been sent successfully' });
            if (html != '') dispatch(setHtml(''));
          } else notification.error({ message: 'Something went wrong, notification not sent' });
        })
        .catch((err: any) => {
          let errMsg = Object.keys(err?.data?.response?.errors);
          notification.error({
            message: errMsg[0].charAt(0).toUpperCase() + errMsg[0].slice(1) + ' field may not be null'
          });
        });
    } else {
      sendTestMail({
        setting_id: sessionStorage.getItem('setting_id')
          ? Number(sessionStorage.getItem('setting_id'))
          : values?.setting_name,
        subject: values.subject,
        phone_number: Number(values.phone_number),
        to: values?.to && values?.to?.split(',')[0] ? values?.to?.split(',') : [],
        cc: values?.cc && values?.cc?.split(',')[0] ? values?.cc?.split(',') : [],
        bcc: values?.bcc && values?.bcc?.split(',')[0] ? values?.bcc?.split(',') : [],
        request_format_value: jsonEditorData,
        template_content: params.preview,
        project: Number(sessionStorage.getItem('project_id'))
          ? Number(sessionStorage.getItem('project_id'))
          : Number(project)
      })
        .unwrap()
        .then((resp: any) => {
          if (resp.responseCode === 0) {
            if (resp.response.data.status === 1) notification.error({ message: resp.response.data.message as any });
            else {
              params.closeModalCallBack();
              notification.success({ message: 'Notification sent successfully' });
              if (html != '') dispatch(setHtml(''));
            }
          } else {
            params.closeModalCallBack();
            notification.error({ message: 'Notification not sent, check tracking for more details' });
          }
        })
        .catch(() => notification.error({ message: 'Notification not sent, check form values' }));
    }
  };

  // useEffect(() => {
  //   if ((active?.templateType === 'J' || data?.template_info?.template_type === 'J') && previewServiceData?.isSuccess) {
  //     setPreviewJsonValue((previewServiceData as any)?.data?.response?.data?.template_content_value);
  //   }
  // }, [previewServiceData]);

  return (
    <>
      <Row gutter={30}>
        <Col xs={24} sm={24} md={12} lg={12} xl={TrackingIframe ? 24 : 12} xxl={TrackingIframe ? 24 : 12}>
          <Form
            name="resendForm"
            className="resend-form"
            form={trackingForm}
            onFinish={handleResend}
            data-testid="tracking_send_btn"
            layout="vertical"
            autoComplete="off"
          >
            <Row gutter={16}>
              {!TrackingIframe ? (
                <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
                  <Form.Item
                    name="setting_name"
                    label="Settings"
                    rules={[
                      {
                        required: true,
                        message: 'Select setting'
                      }
                    ]}
                  >
                    <Select
                      placeholder="Select settings"
                      defaultValue={mode === 'tracking' ? 12 : undefined}
                      disabled={mode === 'tracking' ? true : false}
                    >
                      {options?.options.map((option: any, index: any) => {
                        return (
                          <Option key={index} value={option.id}>
                            {option.label}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              ) : (
                ''
              )}
              <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
                {active?.templateType === 'J' ||
                data?.template_info?.template_type === 'J' ||
                data?.notification_type === 'Whatsapp' ? (
                  <Form.Item
                    name="phone_number"
                    label="Phone number"
                    rules={[
                      {
                        required: true,
                        message: 'Enter number'
                      }
                    ]}
                  >
                    <Input placeholder="Enter number" />
                  </Form.Item>
                ) : (
                  <Form.Item
                    name="to"
                    label="To email ID"
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: 'Enter email'
                      }
                    ]}
                  >
                    <Input placeholder="To email" />
                  </Form.Item>
                )}
              </Col>
              {!TrackingIframe &&
              active?.templateType !== 'J' &&
              data?.template_info?.template_type !== 'J' &&
              data?.notification_type !== 'Whatsapp' ? (
                <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
                  <Form.Item name="cc" label="CC">
                    <Input placeholder="CC" />
                  </Form.Item>
                </Col>
              ) : (
                ''
              )}
              {!TrackingIframe &&
              active?.templateType !== 'J' &&
              data?.template_info?.template_type !== 'J' &&
              data?.notification_type !== 'Whatsapp' ? (
                <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
                  <Form.Item name="bcc" label="Bcc">
                    <Input placeholder="Bcc" />
                  </Form.Item>
                </Col>
              ) : (
                ''
              )}

              <Col span={24}>
                <Form.Item
                  name="subject"
                  label="Subject"
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: 'Enter subject'
                    }
                  ]}
                >
                  <Input placeholder="Enter subject" disabled={true} />
                </Form.Item>
              </Col>

              {data?.attachment?.length > 0 ? (
                <Col span={4}>
                  <Form.Item name="attachment" label="Attachment">
                    <span title="Click to download the attachment" onClick={handleAttachment}>
                      {data.attachment[0]}
                    </span>
                  </Form.Item>
                </Col>
              ) : (
                <></>
              )}

              {!TrackingIframe ? (
                <Col span={24}>
                  <div className="text-right">
                    <Select
                      placeholder="Select view"
                      value={jsonEditorView}
                      onChange={(value) => setJsonEditorView(value)}
                    >
                      <Option value="code">Code</Option>
                      <Option value="tree">Tree</Option>
                    </Select>
                    <Button
                      data-testid="tracking_preview_btn"
                      onClick={handleForm}
                      style={{ color: '#fff', background: '#37c57a' }}
                    >
                      {previewServiceData.isFetching ? <LoadingOutlined /> : 'Run'}
                    </Button>
                  </div>
                  {/* as state change doesn't refresh editor in DOM used below method */}
                  {jsonEditorView === 'tree' && (
                    <JsonEditor mode="tree" value={jsonEditorData} onChange={(data: any) => setJsonEditorData(data)} />
                  )}
                  {jsonEditorView === 'code' && (
                    <JsonEditor mode="code" value={jsonEditorData} onChange={(data: any) => setJsonEditorData(data)} />
                  )}
                </Col>
              ) : (
                <Col span={24}>
                  <div className="PreviewMail">
                    <Row>
                      <Col span={12}>
                        <h3>Preview</h3>
                      </Col>
                      {!TrackingIframe ? (
                        <Col className="cls-download-attachment" span={12} style={{ textAlign: 'right' }}>
                          <Button style={{ color: 'blue', fontWeight: '500' }} onClick={downloadHtmlContent}>
                            Download
                          </Button>
                        </Col>
                      ) : null}
                    </Row>
                    <div className="preview-frame">
                      {active?.templateType === 'J' ||
                      data?.template_info?.template_type === 'J' ||
                      data?.notification_type === 'Whatsapp' ? (
                        <>
                          <Row>
                            <Col span={24} className="cls-json-preview">
                              <h4>
                                <JSONViewer jsonEditorValue={handleJson(jsonEditorValue)} />
                              </h4>
                            </Col>
                          </Row>
                        </>
                      ) : (
                        <iframe title="Preview" width="100%" height="500px" srcDoc={previewData} />
                      )}
                    </div>
                  </div>
                </Col>
              )}
            </Row>
            <Row className="form-btns mt-3" gutter={32} justify={TrackingIframe ? 'center' : 'end'}>
              {!TrackingIframe ? (
                <Col>
                  <Button data-testid="tracking_reset_btn" type="default" className="reset-btn" onClick={resetHandling}>
                    <ReloadOutlined />
                    Reset
                  </Button>
                </Col>
              ) : (
                ''
              )}
              <Col>
                <Button htmlType="submit" type="primary" style={{ margin: '0 auto' }}>
                  {sendTestMailStatus.isLoading || isFetching?.isLoading ? (
                    <LoadingOutlined />
                  ) : mode === 'tracking' ? (
                    'Resend'
                  ) : (
                    'Send'
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        {!TrackingIframe ? (
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <div className="PreviewMail">
              <Row>
                <Col span={12}>
                  <h3>Preview</h3>
                </Col>
                {!TrackingIframe ? (
                  <Col span={12} style={{ textAlign: 'right' }}>
                    <Button
                      style={{ border: 'none', color: 'blue', fontWeight: '500' }}
                      onClick={() => {
                        if (active?.templateType === 'J' || data?.template_info?.template_type === 'J')
                          DownloadJsonButton(handleJson(previewData), trackingForm?.getFieldsValue()?.subject);
                        else downloadHtmlContent();
                      }}
                    >
                      Download
                    </Button>
                  </Col>
                ) : null}
              </Row>
              <div className="preview-frame">
                {active?.templateType === 'J' ||
                data?.template_info?.template_type === 'J' ||
                data?.notification_type === 'Whatsapp' ? (
                  <>
                    <Row>
                      <Col span={24} className="cls-json-preview">
                        <h4>
                          <JSONViewer jsonEditorValue={handleJson(jsonEditorValue)} />
                        </h4>
                      </Col>
                    </Row>
                  </>
                ) : (
                  <iframe title="Preview" width="100%" height="500px" srcDoc={previewData} />
                )}
              </div>
            </div>
          </Col>
        ) : null}
      </Row>
    </>
  );
};
export default TrackingModal;
