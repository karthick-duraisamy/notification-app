import { Col, Input, Row } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import type { FC } from 'react';
import './index.scss';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BackButton } from '@/components/BackButton/BackButton';

const Title = () => (
  <Row justify="space-between" align="middle">
    <Col>
      <span className="cls-template-sub-page">Edit template</span>
    </Col>
    <Col>
      <BackButton />
    </Col>
  </Row>
);

const Container: FC<ChildInterface> = ({ children }) => {
  return (
    <Row>
      <Col span={24} className="cls-template-html-editor">
        {children}
      </Col>
    </Row>
  );
};

const FormLabel = ({ title }: { title: string }) => (
  <span style={{ display: 'inline-block', fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>{title}</span>
);

const HtmlEditor = () => {
  return (
    <Row gutter={[0, 24]}>
      <Col span={24}>
        <Title />
      </Col>
      <Col span={24}>
        <Container>
          <Row justify="space-between">
            <Col span={11}>
              <FormLabel title="Template name" />
              <FormItem>
                <Input placeholder="Template name" />
              </FormItem>
            </Col>
            <Col span={11}>
              <FormLabel title="Folder name" />
              <FormItem>
                <Input placeholder="Select folder" />
              </FormItem>
            </Col>
            <Col span={24} className="cls-tamplate-editor-toolbar">
              <FormLabel title="Template Html code" />
              <CKEditor
                editor={ClassicEditor}
                data=""
                onReady={() => {
                  // You can store the "editor" and use when it is needed.
                }}
                onChange={(_event: any, _editor: any) => {
                  // const data = editor.getData();
                }}
                onBlur={(_event: any, _editor: any) => {}}
                onFocus={(_event: any, _editor: any) => {}}
              />
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
};

export default HtmlEditor;
