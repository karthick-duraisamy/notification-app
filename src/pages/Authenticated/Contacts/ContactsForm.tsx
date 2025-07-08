import { Button, Col, Row, Modal, Upload } from 'antd';
import { FormLayout } from '../../../layouts/Form/Form';
import { Form } from './Form';
import { UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useContactsForm } from '../../../hooks/ContactsForm.hook';
import { useParams } from 'react-router-dom';
import './Contacts.scss';
import { ModalTopBorder } from '@/components/ModalTopBorder';

const { Dragger } = Upload;

const UM = styled(Modal)`
  .ant-modal-content {
    border-left-color: red;
    border: 1px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  .ant-modal-footer {
    border: unset;
    border-radius: 20px;
  }
`;

const ContactsForm = () => {
  const { action: urlAction } = useParams<{ action?: string }>();
  const {
    form,
    modal: { isUploadModalVisible, setIsUploadModalVisible },
    onFinish,
    resetFields,
    route: { action },
    isSaving
  } = useContactsForm();

  const UploadModal = () => {
    return (
      <UM
        className="cls-upload-file"
        open={isUploadModalVisible}
        title={null}
        onOk={() => setIsUploadModalVisible(false)}
        onCancel={() => setIsUploadModalVisible(false)}
        width={800}
        centered={true}
        modalRender={(node) => (
          <>
            <ModalTopBorder />
            {node}
          </>
        )}
        okText="Submit"
        closable={false}
      >
        <Dragger
          name="contactUpload"
          multiple={false}
          accept=".xls,.xlsx,.csv"
          maxCount={1}
          // onDrop={(e) => {}}
          // onChange={(e) => {}}
          //   itemRender={(originNode, file, fileid !== undefinedList, action) => {
          //     return (
          //       <Row>
          //         <Col>
          //           <Row style={{ paddingTop: '24px' }}>
          //             <Col>
          //               <span style={{ fontSize: '18px' }}>Uploaded File</span>
          //             </Col>
          //           </Row>
          //           <Row>
          //             <Col span={24}>
          //               <List
          //                 itemLayout="vertical"
          //                 dataSource={fileList}
          //                 renderItem={(item) => {
          //                   return (Upload
          //                     <List.Item>
          //                       <List.Item.Meta
          //                         title={item.name}
          //                         description={`${item.size ? item.size / 1024 : 0}  kb`}
          //                       />
          //                     </List.Item>
          //                   );
          //                 }}
          //               >
          //                 <DeleteOutlined
          //                   onClick={() => {
          //                     action.remove();
          //                   }}
          //                 />
          //               </List>
          //             </Col>Upload
          //           </Row>
          //         </Col>
          //       </Row>
          //     );
          //   }}
        >
          <p className="ant-upload-drag-icon">
            <UploadOutlined style={{ fontSize: '24px' }} />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Supported file formats are XSLS, XLS & CSV</p>{' '}
        </Dragger>
      </UM>
    );
  };

  const Upload = () => {
    return (
      <Row justify="end">
        <Col>
          <Button
            className="cls-upload-btn"
            data-testid="contactpage_upload_btn"
            type="default"
            onClick={() => setIsUploadModalVisible(true)}
          >
            Upload
          </Button>
        </Col>
      </Row>
    );
  };

  return (
    <FormLayout
      title={`${action.charAt(0).toUpperCase() + action.slice(1) + ' contacts'}`}
      additionalHead={urlAction !== 'edit' ? <Upload /> : null}
    >
      <Form resetFields={resetFields} form={form} formSubmit={onFinish} isSaving={isSaving} />
      <UploadModal />
    </FormLayout>
  );
};

export default ContactsForm;
