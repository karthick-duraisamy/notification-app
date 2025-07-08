import _React, { useState } from 'react';
import { Col, Input, Modal, Row, Tabs, Upload } from 'antd';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/App.hook';
import { closeImportTemplateModal } from '@/stores/Modal.store';
import { UploadOutlined } from '@ant-design/icons';
import FormItem from 'antd/lib/form/FormItem';
import { ModalTopBorder } from '@/components/ModalTopBorder';
import {
  setActiveFolderID,
  setActiveLanguage,
  setActiveSubject,
  setActiveTemplateName,
  setCustomTemplate,
  setFolderId,
  setJson
} from '../../../../../../stores/Template.store';
import { useNavigate } from 'react-router-dom';

const { Dragger } = Upload;

const IT = styled(Modal)`
  .ant-modal-content {
    border: 1px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: var(--theme-header-background);
    .ant-modal-close-x {
      span {
        svg path {
          fill: var(--theme-login-input-text-color);
        }
      }
    }
  }
  input,
  textarea,
  .ant-input-group-addon {
    background-color: var(--theme-import-template-bg-color);
    color: var(--theme-login-input-text-color);
  }
  .ant-modal-header {
    background-color: var(--theme-header-background);
    .ant-modal-title {
      color: var(--theme-login-input-text-color);
    }
  }
  .ant-modal-body {
    .ant-upload-drag {
      background-color: var(--theme-header-background);
      p {
        color: var(--theme-login-input-text-color);
      }
    }
  }
  .ant-modal-footer {
    border: unset;
    border-radius: 20px;
    .ant-btn-default {
      background-color: var(--theme-import-template-bg-color);
      color: var(--theme-login-input-text-color);
    }
  }
`;

const ImportTemplate = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.ModalReducer.importTemplateModal);
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');
  const [templateName, _setTemplateName] = useState('');
  const [folderName, _setFolderName] = useState('');
  const [templateCode, _setTemplateCode] = useState('');
  const navigate = useNavigate();

  // File validation: only .json or .html
  const beforeUpload = (file: File) => {
    const isAllowed =
      file.type === 'application/json' ||
      file.type === 'text/html' ||
      file.name.endsWith('.json') ||
      file.name.endsWith('.html');
    if (!isAllowed) {
      Modal.error({ title: 'Invalid file', content: 'Only .json or .html files are allowed.' });
    }
    return isAllowed || Upload.LIST_IGNORE;
  };

  const items = [
    {
      label: 'Upload from file',
      key: '1',
      children: (
        <Dragger
          name="uploadfile"
          multiple={false}
          maxCount={1}
          height={180}
          accept=".json,.html"
          beforeUpload={beforeUpload}
          onChange={(info) => {
            if (info.file.status !== 'removed') {
              setFile(info.file.originFileObj || null);
            } else {
              setFile(null);
            }
          }}
          fileList={
            file
              ? [
                  {
                    uid: file.name,
                    name: file.name,
                    status: 'done' as const,
                    originFileObj: file
                  } as any
                ]
              : []
          }
        >
          <p className="ant-upload-drag-icon">
            <UploadOutlined style={{ fontSize: '24px' }} />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Supported file formats are HTML</p>
        </Dragger>
      )
    },
    {
      label: 'Upload from link',
      key: '2',
      children: (
        <>
          <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>
            Enter URL
          </span>
          <FormItem>
            <Input addonAfter="link" value={url} onChange={(e) => setUrl(e.target.value)} />
          </FormItem>
        </>
      )
    },
    {
      label: 'Insert template code',
      key: '3',
      children: (
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Row justify="space-between">
              <Col span={11}>
                <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>
                  Template name
                </span>
                <FormItem>
                  <Input placeholder="Template name" />
                </FormItem>
              </Col>
              <Col span={11}>
                <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>
                  Folder name
                </span>
                <FormItem>
                  <Input placeholder="Folder name" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem>
                  <Input.TextArea placeholder="<html></html>" rows={5} />
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>
      )
    }
  ];

  // To set the template base data
  const handleOk = () => {
    if (file) {
      const extension = file?.name?.split('.').pop()?.toLowerCase();
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent: any = e.target?.result;

        // Validate file content based on extension
        if (extension === 'json') {
          try {
            JSON.parse(fileContent);
          } catch (err) {
            Modal.error({ title: 'Invalid JSON', content: 'The uploaded file is not valid JSON.' });
            return;
          }
        } else if (extension === 'html') {
          if (!/<html[\s\S]*?>[\s\S]*?<\/html>/i.test(fileContent)) {
            Modal.error({ title: 'Invalid HTML', content: 'The uploaded file does not appear to be valid HTML.' });
            return;
          }
        } else {
          Modal.error({ title: 'Invalid file', content: 'Only .json or .html files are allowed.' });
          return;
        }

        dispatch(
          setCustomTemplate({
            file_content: fileContent,
            file_type: extension
          })
        );
        if (extension === 'json') dispatch(setJson(JSON.parse(fileContent)));
        dispatch(closeImportTemplateModal());
        dispatch(setFolderId(''));
        dispatch(setActiveFolderID(null as unknown as number));
        dispatch(setActiveTemplateName(''));
        dispatch(setActiveSubject(''));
        dispatch(setActiveLanguage(null as unknown as number));
        navigate(`/editor/new`);
      };
      reader.readAsText(file);
      return;
    } else if (url) {
      dispatch(
        setCustomTemplate({
          url: url
        })
      );
    } else if (templateName && folderName && templateCode) {
      dispatch(
        setCustomTemplate({
          url: url
        })
      );
    }
    // To close the modal and reset the state
    dispatch(closeImportTemplateModal());
    dispatch(setFolderId(''));
    dispatch(setActiveFolderID(null as unknown as number));
    dispatch(setActiveTemplateName(''));
    dispatch(setActiveSubject(''));
    dispatch(setActiveLanguage(null as unknown as number));
    // To navigate the template edit page
    navigate(`/editor/new`);
  };

  return (
    <IT
      open={isOpen}
      title={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>Import template</span>}
      onOk={handleOk}
      onCancel={() => dispatch(closeImportTemplateModal())}
      width={800}
      modalRender={(node) => (
        <>
          <ModalTopBorder />
          {node}
        </>
      )}
      okText="Import"
      cancelText="Cancel"
      centered={true}
    >
      <Tabs className="Templates" defaultActiveKey="1" size="large" tabBarGutter={80} items={items}></Tabs>
    </IT>
  );
};

export default ImportTemplate;
