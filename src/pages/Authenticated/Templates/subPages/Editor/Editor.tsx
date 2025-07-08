import { useEffect, useRef, useState } from 'react';
import EmailEditor from 'editor';
import { Button, Spin, Col, Input, message, Modal, Row, Select, Switch, Tag, Tooltip } from 'antd';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/App.hook';
import { closePreviewModal, PreviewMode } from '@/stores/Modal.store';
import { PreviwModalTitle } from './Components/PreviewModalTitle';
import { Header } from './Components/Header';
import {
  useAddTemplateMutation,
  useLazyGetTemplateQuery,
  useUpdateTemplateMutation
} from '../../../../../services/templates/Templates';
import {
  clearLoadTemplate,
  resetRedo,
  resetUndo,
  setCurrentBackPage,
  setCustomTemplate,
  setHtml,
  setHtmlTrigger,
  setJson,
  setSaveDeActive,
  setTemplateTypeID
} from '@/stores/Template.store';
import { useNavigate, useParams } from 'react-router-dom';
import { JsonEditor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import 'jsoneditor/dist/jsoneditor.min.css';
// import { randomBytes, randomInt } from 'crypto';
import { useVariables } from '../../../../../hooks/editor.hook';
// import * as beautify from 'js-beautify';
import './Editor.scss';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  UndoOutlined,
  RedoOutlined,
  FontColorsOutlined,
  BgColorsOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { clearGuideModalInfo } from '@/stores/TemplateProject.store';
import { ModalTopBorder } from '@/components/ModalTopBorder';

const PM = styled(Modal)`
  max-width: 1092px;
`;

const Editor = () => {
  const ref = useRef<any>(null);
  const { Option } = Select;
  const { project } = useAppSelector((state: any) => state.TemplateProjectReducer);
  const navigate = useNavigate();
  const { id, type } = useParams<{ id?: string; type?: string }>();
  const { isOpen, mode: ModalMode } = useAppSelector((state) => state.ModalReducer.previewModal);
  const dispatch = useAppDispatch();

  const { save, active } = useAppSelector((state) => state.TemplateReducer);
  const { undo, redo } = useAppSelector((state) => state.TemplateReducer.undoredo);
  const { json: loadActiveJson } = useAppSelector((state) => state.TemplateReducer.loadTemplate);
  const { folderId } = useAppSelector((state) => state.TemplateReducer);
  const [viewType, setViewType] = useState<string>('view');
  const jsonEditValue = useAppSelector((state) => state.TemplateReducer.Json);
  const [jsonValues, setJsonValues] = useState<any | undefined>(jsonEditValue);

  const [serviceAddTemplate, serviceAddTemplateStatus] = useAddTemplateMutation();
  const [serviceGetTemplate, serviceGetTemplateStatus] = useLazyGetTemplateQuery();
  const [serviceUpdateTemplateMutation, serviceUpdateTemplateStatus] = useUpdateTemplateMutation();

  const { variable, cascader } = useVariables();
  const [variableInfo, setVariableInfo] = useState<any>([]);
  const saveHtmlTrigger = useAppSelector((state) => state.TemplateReducer.saveHtmlTrigger);
  const templateDetails = useAppSelector((state) => state.TemplateReducer.templateDetails);

  // const isHtmlEdit: boolean = id === 'new' ? true : false;
  const { TextArea } = Input;

  const handleHTMLFullFormat = (htmlString: string) => {
    if (htmlString.split('<center>').length > 1) return htmlString;
    // Regular expression to find the <body> tag
    const bodyTagRegex = /<body[^>]*>/i;

    // Replace the <body> tag with <body><center>
    htmlString = htmlString.replace(bodyTagRegex, (match) => `${match}<center>`);

    // Regular expression to find the closing </body> tag
    const closingBodyTagRegex = /<\/body>/i;

    return htmlString.replace(closingBodyTagRegex, '</center></body>');
  };

  // The following method is used for get the html body value
  const handleHTMLBodyValue = (htmlBodyString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlBodyString, 'text/html');
    const bodyContent: any = doc.body.innerHTML;
    return bodyContent;
  };

  // The following method is used for get the html head value
  const getHTMLHeadCode = (htmlStringVal: string) => {
    if (htmlStringVal.split('<center>').length == 1) {
      return handleHTMLFullFormat(htmlStringVal).split('<center>')[0];
    } else if (htmlStringVal.split('<center>').length > 1) {
      return htmlStringVal.split('<center>')[0];
    } else {
      const beforeBodyRegex = /([\s\S]*?)<body[^>]*>/i;
      // Extract the content before the <body> tag
      const match = htmlStringVal.match(beforeBodyRegex);
      return match ? match[1] : '';
    }
  };

  const [htmlCode, setHtmlCode] = useState(
    id === 'new'
      ? handleHTMLFullFormat(
          '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><title>new document</title><meta name="generator" content="editplus" /><meta name="author" content="" /><meta name="keywords" content="" /><meta name="description" content="" /><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /></head><body><h1>Hello ${{user name}}</h1></body></html>'
        )
      : ''
  );

  const [htmlHeadInfo, setHtmlHeadInfo] = useState('');
  // const [htmlHeadInfo, setHtmlHeadInfo] = useState(
  //   // id === 'new'
  //   //   ? getHTMLHeadCode(
  //   //       '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><title>new document</title><meta name="generator" content="editplus" /><meta name="author" content="" /><meta name="keywords" content="" /><meta name="description" content="" /><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /></head><body><h1>Hello ${{user name}}</h1></body></html>'
  //   //     )
  //   //   : ''
  // );
  let timeoutId: NodeJS.Timeout | null = null;
  const [updateCode, setUpdateCode] = useState(htmlCode);
  const [history, setHistory] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(-1);

  useEffect(() => {
    setVariableInfo(variable);
  }, [variable]);

  // Format the HTML code using beautify package which is used for HTML editor flow
  const handleFormatHtml = () => {
    // try {
    //   const formattedHtml = beautify.html(htmlCode);
    //   setHtmlCode(formattedHtml);
    //   setUpdateCode(formattedHtml);
    // } catch (error) {
    //   console.error('Error formatting HTML:', error);
    // }
  };

  useEffect(() => {
    handleFormatHtml();
  }, []);

  const [isDesignMode, setIsDesignMode] = useState<boolean>(false);

  // The following method is triggered when user make any changes on html editor text box.
  const handleHtmlChange = (event: any) => {
    setHtmlCode(
      event.target.value.split('<center>').length === 1 ? handleHTMLFullFormat(event.target.value) : event.target.value
    );
    setHtmlHeadInfo(getHTMLHeadCode(event?.target?.value));
    // setHtmlHeadInfo(event.target.value.split('<head>'));
  };

  const handleHtmlViewChange = (event: any) => {
    // let headerInfo: string = htmlHeadInfo === '' ? getHTMLHeadCode(htmlCode) : htmlHeadInfo;
    // if (htmlHeadInfo === '') setHtmlHeadInfo(headerInfo);
    // setHtmlCode(headerInfo + '<body>' + event.currentTarget.innerHTML + '</body></head>');
    const newHtml = event.currentTarget.innerHTML;
    // Check if there's a change in the HTML content
    if (newHtml !== updateCode) {
      const newHistory = history.slice(0, currentStep + 1);
      newHistory.push(newHtml);
      setHistory(newHistory);
      setCurrentStep(currentStep + 1);
      setUpdateCode(newHtml); // Update the current HTML content
    }
  };

  useEffect(() => {
    if (id && id !== 'new') {
      let folderIdValue: any = folderId.id != '' ? folderId.id : undefined;
      if (folderIdValue != undefined && folderIdValue != null && folderIdValue != '')
        // get template to load json
        serviceGetTemplate({
          template_id: id,
          folder: folderIdValue
        });
    }
    // eslint-disable-next-line
  }, [id, htmlCode]);

  // Error handling for get template url
  useEffect(() => {
    if ((serviceGetTemplateStatus as any)?.data?.responseCode === 1) {
      const errorKey: any = (serviceGetTemplateStatus as any)?.data?.response['errors']
        ? Object.keys((serviceGetTemplateStatus as any).data.response['errors'])[0]
        : undefined;
      message.error(
        errorKey
          ? errorKey + ' ' + (serviceGetTemplateStatus as any).data.response['errors'][errorKey][0]
          : (serviceGetTemplateStatus as any).data.response['Message']
      );
    }
  }, [serviceGetTemplateStatus]);

  // The following useEffect is used for updating the editing template content value.
  useEffect(() => {
    if (serviceGetTemplateStatus.isSuccess) {
      setHtmlCode(handleHTMLFullFormat((serviceGetTemplateStatus?.data?.response as any)?.data?.template_content));
      // setHtmlHeadInfo(getHTMLHeadCode((serviceGetTemplateStatus?.data?.response as any)?.data?.template_content));
      // setHtmlBodyValue(handleHTMLBodyValue(htmlCode));
      setUpdateCode((serviceGetTemplateStatus?.data?.response as any)?.data?.template_content);
      dispatch(setTemplateTypeID((serviceGetTemplateStatus?.data?.response as any)?.data?.type));
    }
  }, [serviceGetTemplateStatus.isSuccess]);

  useEffect(() => {
    if (undo) {
      ref.current?.undoredo?.undoActionCallback && ref.current.undoredo.undoActionCallback();
      dispatch(resetUndo());
    }
    if (redo) {
      ref.current?.undoredo?.redoActionCallback && ref.current.undoredo.redoActionCallback();
      dispatch(resetRedo());
    }
    // eslint-disable-next-line
  }, [undo, redo]);

  useEffect(() => {
    if (serviceGetTemplateStatus.isSuccess) {
      const { data } = serviceGetTemplateStatus;
      if (data && data.responseCode === 0) {
        dispatch(setTemplateTypeID((data.response.data as any).type));
        const {
          response: {
            data: { template_data }
          }
        } = data;
        if (template_data) {
          loadJson(template_data);
        }
      }
    }
  }, [serviceGetTemplateStatus]);

  // The following method is used for make the selected text as bold, Italic and underline.
  const handleMakeBold = (type?: string) => {
    document.execCommand(type as string, false, '');
  };

  // The following method is used for increasing or decreasing the font size for an selected text.
  const handleFontMethod = (action?: string) => {
    if ((window.getSelection() as any).rangeCount > 0 && !isNaN(parseInt(document.queryCommandValue('fontSize')))) {
      const currentFontSize = parseInt(document.queryCommandValue('fontSize'));
      document.execCommand(
        'fontSize',
        false,
        action === 'increase' ? (currentFontSize + 1).toString() : (currentFontSize - 1).toString()
      );
    }
  };

  // The following method is used for applying the font color or background color for an selected text.
  const handleColorMethod = (event?: any, bool?: boolean) => {
    if (event) {
      const element = event.target;
      const colorValue = element.value; // Store the current color value
      bool ? (element.style.color = colorValue) : (element.style.backgroundColor = colorValue);
      // Add a class to the element
      element.classList.add('color-picker-updated');
      if (event.isTrusted) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        // The following setTimeout is used for the action of store the current update for undo and redo functionality.
        timeoutId = setTimeout(() => {
          document.execCommand(`${bool ? 'foreColor' : 'backColor'}`, false, colorValue);
        }, 1000);
      }
    }
  };

  const undoMethod = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      let headerInfo: string = htmlHeadInfo === '' ? getHTMLHeadCode(htmlCode) : htmlHeadInfo;
      if (htmlHeadInfo === '') setHtmlHeadInfo(headerInfo);
      setHtmlCode(
        headerInfo +
          (htmlCode.split('<center>').length > 0 ? '' : '<body>') +
          history[currentStep - 1] +
          '</body></head>'
      );
    }
  };

  const redoMethod = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
      let headerInfo: string = htmlHeadInfo === '' ? getHTMLHeadCode(htmlCode) : htmlHeadInfo;
      if (htmlHeadInfo === '') setHtmlHeadInfo(headerInfo);
      setHtmlCode(
        headerInfo +
          (htmlCode.split('<center>').length > 0 ? '' : '<body>') +
          history[currentStep + 1] +
          '</body></head>'
      );
      // setHtmlCode(history[currentStep + 1]);
    }
  };

  useEffect(() => {
    if (serviceUpdateTemplateStatus.isSuccess) {
      // notification.success({ message: 'updated', duration: 1 });
      navigate('/templates/saved/default');
      // const folder_id = localStorage.getItem('folder_id');
      // navigate({
      //   pathname: '/templates/saved/grid?folder=' + folder_id
      // });
      // changed to loading the save btn
    }
  }, [serviceUpdateTemplateStatus]);

  // From tracking to edit the Template
  useEffect(() => {
    if (templateDetails.template_id && templateDetails.folder_id) {
      serviceGetTemplate({
        template_id: templateDetails.template_id,
        folder: templateDetails.folder_id
      });
      dispatch(
        setCustomTemplate({
          template_id: '',
          folder_id: ''
        })
      );
    } else if (
      templateDetails.file_content &&
      (templateDetails.file_type === 'html' || templateDetails.file_type === 'json')
    ) {
      dispatch(setCurrentBackPage('/templates/saved/default'));
      dispatch(setTemplateTypeID(templateDetails.file_type === 'html' ? 'H' : 'J'));
      if (templateDetails.file_type === 'html') setHtmlCode(handleHTMLFullFormat(templateDetails.file_content));
      dispatch(
        setCustomTemplate({
          file_content: '',
          file_type: ''
        })
      );
    }
  }, []);

  useEffect(() => {
    const call = async () => {
      const response =
        id === 'new' || id === undefined || type === 'clone'
          ? await serviceAddTemplate({
              template: {
                template_name: active.template_name,
                template_content: getHtml(),
                template_data: getJson(),
                request_format: '{}',
                folder: active.folder_id,
                language: active.language_id,
                type: active.templateType,
                status: '1',
                subject: active.subject,
                project: project ? project : localStorage.getItem('project')
              }
            })
              .unwrap()
              .catch((err: any) => {
                // Error handling for AddTemplate
                if (Object.keys(err.data.response['errors'].template)) {
                  let errorObj = Object.keys(err?.data?.response['errors']?.template);
                  if (errorObj.length > 1) {
                    let fieldValue = '';
                    Object.keys(err.data.response.errors.template).map((value: any) => {
                      fieldValue = fieldValue + value + ', ';
                    });
                    message.error('To save a template, fill out the following required fields ' + fieldValue);
                    dispatch(clearGuideModalInfo({ value: 'template' }));
                  } else message.error(err?.data?.response['errors']?.template[errorObj[0]]);
                } else message.error('To save a template, fill out the required fields.');
              })
          : await serviceUpdateTemplateMutation({
              template_id: id,
              folder: folderId.id != '' ? folderId.id : '',
              template: {
                template_name: active.template_name,
                template_content: getHtml(),
                template_data: getJson(),
                request_format: '{}',
                type: active.templateType,
                folder: active.folder_id,
                language: active.language_id,
                status: '1',
                subject: active.subject,
                project: project ? project : localStorage.getItem('project')
              }
            })
              .unwrap()
              .catch((err: any) => err.data);
      if (response?.responseCode === 0 && response?.response?.data?.template_id) {
        const {
          response: {
            data: { template_id }
          }
        } = response;
        if (template_id) {
          navigate(`/editor/${template_id}`);
        }
        // eslint-disable-next-line
        if (save && id == template_id) {
          message.success('Template updated successfully');
        }
      } else if (response?.responseCode === 1 && response?.response?.errors?.template) {
        const {
          response: {
            errors: { template }
          }
        } = response;
        if (template) {
          //If template didn't save or getting error time modal guide modal didn't open and aslo this page fully used messege.error thats why changed this
          dispatch(clearGuideModalInfo({ value: 'template' }));
          Object.entries(template).forEach(([key, value]) => {
            message.error(`${key} : ${value}`);
          });
        }
      }
      dispatch(setSaveDeActive());
    };

    if (save) {
      call();
    }
    // eslint-disable-next-line
  }, [save, id]);

  useEffect(() => {
    if (serviceAddTemplateStatus.isSuccess) message.success('Template created successfully');
    if (active.templateType === 'J' && (serviceAddTemplateStatus as any)?.data?.response?.data?.template_id) {
      serviceGetTemplate({
        template_id: (serviceAddTemplateStatus as any).data.response.data.template_id,
        folder: (serviceAddTemplateStatus as any).data.response.data.folder
      });
    }
  }, [serviceAddTemplateStatus]);

  useEffect(() => {
    if (loadActiveJson && ref.current) {
      ref.current.loadJson(loadActiveJson);
      dispatch(clearLoadTemplate());
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (saveHtmlTrigger) {
      dispatch(setHtml(getHtml()));
      dispatch(setHtmlTrigger(false));
    }
    // eslint-disable-next-line
  }, [saveHtmlTrigger]);

  const getHtml = () => {
    // isChecking is used for get the template creation method like DNDE or HTML editor
    let isChecking = active.templateType === 'P';
    let html = '';
    if (isChecking && ref.current) {
      html = ref.current.getHtml();
    } else if (!isChecking) {
      if (document.getElementById('cls-content-editor') !== null) {
        // html = document.getElementById('cls-content-editor')?.innerHTML as string;
        // setHtmlCode(document.getElementById('cls-content-editor')?.innerHTML as string);
        let headerInfo: string = htmlHeadInfo === '' ? getHTMLHeadCode(htmlCode) : htmlHeadInfo;
        if (htmlHeadInfo === '') setHtmlHeadInfo(headerInfo);
        html =
          headerInfo +
          (htmlCode.split('<center>').length > 0 ? '' : '<body>') +
          (document.getElementById('cls-content-editor') as any)?.innerHTML +
          '</body></head>';
        setHtmlCode(html);
      } else html = htmlCode;
    }
    return active.templateType === 'J' ? JSON.stringify(jsonEditValue) || JSON.stringify(jsonValues) : html;
  };

  const getJson = () => {
    let json = '{}';
    if (ref.current) {
      json = ref.current?.getJson();
    }
    return active.templateType === 'J' ? JSON.stringify(jsonEditValue) || JSON.stringify(jsonValues) : json;
  };

  // const [JSONEditorValue, setJSONEditorValue] = useState<any>();

  useEffect(() => {
    // setJSONEditorValue((serviceGetTemplateStatus?.data as any)?.response?.data?.template_data);
    dispatch(setJson((serviceGetTemplateStatus?.data as any)?.response?.data?.template_data));
  }, [serviceGetTemplateStatus.isSuccess]);

  // The following method is used for change the view for html editor.
  const handleSelectMethod = (event: any) => {
    if (event === 'code') {
      let headerInfo: string = htmlHeadInfo === '' ? getHTMLHeadCode(htmlCode) : htmlHeadInfo;
      if (htmlHeadInfo === '') setHtmlHeadInfo(headerInfo);
      setHtmlCode(
        headerInfo +
          (htmlCode.split('<center>').length > 0 ? '' : '<body>') +
          (document.getElementById('cls-content-editor') as any)?.innerHTML +
          '</body></head>'
      );
    } else if (event === 'view' && htmlCode.split('<center>').length == 1) {
      handleHTMLFullFormat(htmlCode);
    }
    setViewType(event);
  };

  const loadJson = (json: string) => {
    if (ref.current && json) {
      console.log(ref.current.loadJson(json));
    }
  };

  const isMobileMode = ModalMode === PreviewMode.mobile;
  const isTabletMode = ModalMode === PreviewMode.tablet;

  const ModalContent = () => {
    let width = '100%';
    let height = '100%';
    if (isMobileMode) {
      // iphone 13 viewports
      width = '390px';
    } else if (isTabletMode) {
      width = '592px';
    }

    return (
      <div style={{ height, border: '1px solid #E9E9E9', overflow: 'hidden' }}>
        <Header />
        <iframe
          title="Preview"
          style={{ margin: '0px auto', overflowY: 'scroll', height: 'calc(100% - 44px)' }}
          width={width}
          srcDoc={getHtml()}
        />
      </div>
    );
  };

  // The following method is used for handling the variable filter when user type in text box
  const handleVariableFilter = (event?: any) => {
    setVariableInfo(variable.filter((item) => item.includes(event?.target?.value)));
  };

  // The following method is triggered when user start to drag the variable.
  const handleDragStart = (event?: any, indexData?: any) => {
    event.dataTransfer.setData('text/plain', indexData);
  };

  // The following method is triggered when user drop variable in respective element.
  const handleDrop = (event?: any) => {
    event.preventDefault();
    const text = event.dataTransfer.getData('text/plain');
    const cursorPosition = getCaretPosition();
    insertTextAtCursor(text, cursorPosition);
  };

  // The following method is used for getting the cursor position to drop the content.
  const getCaretPosition = () => {
    const selection = window.getSelection();
    if ((selection as any).rangeCount > 0) {
      const range = (selection as any).getRangeAt(0);
      return range;
    }
    return null;
  };

  const insertTextAtCursor = (text?: any, range?: any) => {
    text = '${{' + text + '}}';
    if (range) {
      range.deleteContents();
      const textNode = document.createTextNode(text);
      range.insertNode(textNode);
      // Move the cursor to the end of the inserted text
      range.setStartAfter(textNode);
      range.setEndAfter(textNode);
      const selection: any = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      setHtmlCode((document.getElementById('cls-content-editor') as any)?.innerHTML);
    }
  };

  const handleDragOver = (event?: any) => {
    event.preventDefault();
  };

  const PreviewModal = () => {
    let maxWidth = '1092px';
    if (isMobileMode) {
      maxWidth = '480px';
    } else if (isTabletMode) {
      maxWidth = '640px';
    }

    return (
      <PM
        open={isOpen}
        width={'100%'}
        bodyStyle={{ height: '70vh', width: isMobileMode ? 'fit-content' : '100%', margin: '0 auto' }}
        onCancel={() => dispatch(closePreviewModal())}
        onOk={() => dispatch(closePreviewModal())}
        title={<PreviwModalTitle />}
        footer={null}
        destroyOnClose={true}
        style={{ maxWidth }}
        modalRender={(node) => {
          return (
            <>
              <ModalTopBorder />
              {node}
            </>
          );
        }}
      >
        <ModalContent />
      </PM>
    );
  };

  const EditorToolbar = () => {
    return (
      <>
        <Row style={{ marginTop: '15px' }}>
          <Col span={24}>
            <Row>
              <Col span={2}>
                <Tooltip title="Bold" style={{ color: 'red', backgroundColor: 'gray' }}>
                  <Button
                    icon={<BoldOutlined />}
                    onClick={() => handleMakeBold('bold')}
                    style={{ fontSize: '12px', width: '29px', height: '27px' }}
                    size="small"
                  ></Button>
                </Tooltip>
              </Col>
              <Col span={2}>
                <Tooltip title="Italic" style={{ color: 'red', backgroundColor: 'gray' }}>
                  <Button
                    icon={<ItalicOutlined />}
                    onClick={() => handleMakeBold('italic')}
                    style={{ fontSize: '12px', width: '29px', height: '27px' }}
                    size="small"
                  ></Button>
                </Tooltip>
              </Col>
              <Col span={2}>
                <Tooltip title="Underline" style={{ color: 'red', backgroundColor: 'gray' }}>
                  <Button
                    icon={<UnderlineOutlined />}
                    onClick={() => handleMakeBold('underline')}
                    style={{ fontSize: '12px', width: '29px', height: '27px' }}
                    size="small"
                  ></Button>
                </Tooltip>
              </Col>
              <Col span={2}>
                <Tooltip title="Font size increase" style={{ color: 'red', backgroundColor: 'gray' }}>
                  <Button
                    onClick={() => handleFontMethod('increase')}
                    style={{ fontSize: '12px', width: '29px', height: '27px' }}
                    size="small"
                  >
                    A+
                  </Button>
                </Tooltip>
              </Col>
              <Col span={2}>
                <Tooltip title="Font size decrease" style={{ color: 'red', backgroundColor: 'gray' }}>
                  <Button
                    // icon={<UnderlineOutlined />}
                    onClick={() => handleFontMethod('decrease')}
                    style={{ fontSize: '12px', width: '29px', height: '27px' }}
                    size="small"
                  >
                    A-
                  </Button>
                </Tooltip>
              </Col>
              <Col span={2}>
                <Tooltip title="Font color" style={{ color: 'red', backgroundColor: 'gray' }}>
                  <Input
                    title="Text color"
                    type="color"
                    className="cls-ugi-colorpicker"
                    id="color"
                    defaultValue="#ffffff"
                    onChange={(event) => handleColorMethod(event, true)}
                    prefix={<FontColorsOutlined />}
                  />
                </Tooltip>
              </Col>
              <Col span={2}>
                <Tooltip title="Font background" style={{ color: 'red', backgroundColor: 'gray' }}>
                  <Input
                    title="Text color"
                    type="color"
                    id="bgcolor"
                    className="cls-ugi-colorpicker"
                    defaultValue="#ffffff"
                    onChange={(event) => handleColorMethod(event, false)}
                    prefix={<BgColorsOutlined />}
                  />
                </Tooltip>
              </Col>
              <Col span={2}>
                <Tooltip title="Undo" style={{ color: 'red', backgroundColor: 'gray' }}>
                  <Button
                    disabled={currentStep === 0}
                    icon={<UndoOutlined />}
                    onClick={undoMethod}
                    style={{ fontSize: '12px', width: '29px', height: '27px' }}
                    size="small"
                  />
                </Tooltip>
              </Col>
              <Col span={2}>
                <Tooltip title="Redo" style={{ color: 'red', backgroundColor: 'gray' }}>
                  <Button
                    icon={<RedoOutlined />}
                    onClick={redoMethod}
                    disabled={currentStep === history.length - 1}
                    style={{ fontSize: '12px', width: '29px', height: '27px' }}
                    size="small"
                  />
                </Tooltip>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <>
      {(id === 'new' && active.templateType === 'P') ||
      (id !== 'new' &&
        serviceGetTemplateStatus?.isSuccess &&
        (serviceGetTemplateStatus?.data?.response as any)?.data?.type === 'P') ? (
        <>
          <PreviewModal />
          <></>
          <EmailEditor
            ref={ref}
            preview={false}
            showUndoRedo={false}
            variables={variable}
            cascader={cascader as any}
          />{' '}
        </>
      ) : (id === 'new' && active.templateType === 'J') ||
        ((serviceGetTemplateStatus as any)?.data?.response as any)?.data?.type === 'J' ||
        (jsonValues && active.templateType === 'J') ? (
        <>
          <div className="cls-json-editor" style={{ width: '90%', margin: '10px auto' }}>
            <JsonEditor
              mode="code"
              value={
                serviceGetTemplateStatus?.isSuccess
                  ? JSON.parse((serviceGetTemplateStatus as any)?.data?.response?.data.template_data)
                  : jsonEditValue
                  ? jsonEditValue
                  : {}
              }
              onChange={(data: any) => {
                // setJSONEditorValue(data);
                dispatch(setJson(data));
                setJsonValues(setJson(data));
              }}
            />
          </div>
        </>
      ) : (
        <>
          {(id === 'new' && active.templateType === 'H') ||
          (id !== 'new' &&
            serviceGetTemplateStatus?.isSuccess &&
            (serviceGetTemplateStatus?.data?.response as any)?.data?.type === 'H' &&
            htmlCode !== '') ||
          (htmlCode !== '' && active.templateType === 'H') ? (
            <>
              <Row>
                <Col span={24}>
                  <Row gutter={16} className="cls-html">
                    <Col span={14} offset={1} className="cls-html-editor">
                      <Row className="cls-html-preview">
                        <Col span={viewType === 'code' ? 5 : 3}>
                          <h3>{viewType === 'code' ? 'HTML Editor:' : 'Preview:'}</h3>
                        </Col>
                        <Col span={viewType === 'code' ? 0 : isDesignMode ? 12 : 0}>
                          <EditorToolbar />
                        </Col>
                        <Col
                          span={viewType === 'code' ? 4 : 5}
                          offset={viewType === 'code' ? 11 : isDesignMode ? 0 : 12}
                        >
                          {viewType === 'code' ? (
                            <Button onClick={handleFormatHtml} type="default">
                              Format
                            </Button>
                          ) : (
                            <Row className="cls-content-editable">
                              <Col span={14} className="cls-edit-content">
                                <h4>Editable</h4>
                              </Col>
                              <Col span={9} offset={1} className="cls-edit-content">
                                <Switch
                                  onChange={(value) => {
                                    setIsDesignMode(value);
                                  }}
                                  checked={isDesignMode}
                                />
                              </Col>
                            </Row>
                          )}
                        </Col>
                        <Col span={4}>
                          <Select defaultValue={'view'} onChange={handleSelectMethod} style={{ width: 80 }}>
                            <Option value="code" key={1}>
                              Code
                            </Option>
                            <Option value="view" key={2}>
                              View
                            </Option>
                          </Select>
                        </Col>
                      </Row>
                      <Row className="cls-editor-content" style={{ border: '5px solid #f1f1f1' }}>
                        <Col span={24}>
                          {viewType === 'code' ? (
                            <TextArea rows={4} value={htmlCode} onChange={handleHtmlChange} />
                          ) : (
                            <>
                              {' '}
                              {htmlCode !== '' ? (
                                <div
                                  style={{ margin: '0px auto' }}
                                  id="cls-content-editor"
                                  contentEditable={isDesignMode}
                                  dangerouslySetInnerHTML={{
                                    __html: handleHTMLBodyValue(htmlCode)
                                  }}
                                  onInput={handleHtmlViewChange}
                                  onDrop={handleDrop}
                                  onDragOver={handleDragOver}
                                />
                              ) : (
                                <p>Loading...</p>
                              )}
                            </>
                          )}
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      // span={isDesignMode === true && viewType === 'view' ? 7 : 0}
                      // offset={isDesignMode === true && viewType === 'view' ? 2 : 0}
                      span={0}
                      className="cls-variable-items"
                    >
                      <h3>Variables :</h3>
                      <Input placeholder="Search variable" onChange={handleVariableFilter} />
                      <br></br>
                      {variableInfo.map((item: any, index: any) => (
                        <Tag
                          draggable
                          onDragStart={(e) => handleDragStart(e, item)}
                          key={index}
                          style={{ backgroundColor: 'lightgray', padding: '5px' }}
                        >
                          {item}
                        </Tag>
                      ))}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </>
          ) : (
            <Row style={{ margin: 'auto', width: '200px' }}>
              <Col span={24} style={{}}>
                <Spin size="large" indicator={<LoadingOutlined style={{ fontSize: 80, color: '#fd9646' }} />} />
              </Col>
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default Editor;
