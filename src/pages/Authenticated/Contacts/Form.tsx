import { Button, Col, Row, Form, Input } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { LoadingOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

interface FormProps {
  formSubmit: (values: any) => void;
  form: any;
  resetFields: () => void;
  isSaving: boolean;
}

const ContactForm = ({ formSubmit, resetFields, form, isSaving }: FormProps) => {
  const { t } = useTranslation();
  const { action } = useParams<{ action?: string; id?: string }>();

  return (
    <>
      <Form
        className=""
        layout="vertical"
        form={form}
        initialValues={{ contacts: [''] }}
        onFinish={formSubmit}
        name="dynamic form"
      >
        <Col span={24} className="fields-container">
          <Form.List name="contacts">
            {(fields: any, { add, remove }: { add: any; remove: any }) => {
              return (
                <>
                  <Row>
                    <Col span={24}>
                      {fields.map(({ key, name, fieldKey, ...field }: any, index: number) => {
                        return (
                          <Row gutter={32} key={index} className="cls-contact-add">
                            <Col xs={23} sm={11} md={6} lg={5} xl={5} xxl={5}>
                              <Form.Item
                                {...field}
                                label={index === 0 ? 'First name' : null}
                                name={[name, 'first_name']}
                                fieldKey={[fieldKey, 'first_name']}
                                rules={[
                                  {
                                    required: true,
                                    whitespace: true,
                                    message: 'Missing First name'
                                  }
                                ]}
                              >
                                <Input placeholder="First name" />
                              </Form.Item>
                            </Col>
                            <Col xs={23} sm={11} md={6} lg={5} xl={5} xxl={5}>
                              <Form.Item
                                {...field}
                                label={index === 0 ? 'Last name' : null}
                                name={[name, 'last_name']}
                                fieldKey={[fieldKey, 'last_name']}
                                rules={[
                                  {
                                    required: true,
                                    whitespace: true,
                                    message: 'Missing last name'
                                  }
                                ]}
                              >
                                <Input placeholder="Last name" />
                              </Form.Item>
                            </Col>
                            <Col xs={23} sm={11} md={6} lg={4} xl={4} xxl={4}>
                              <Form.Item
                                {...field}
                                label={index === 0 ? 'Phone number' : null}
                                name={[name, 'phone_number']}
                                fieldKey={[fieldKey, 'phone_number']}
                                rules={[
                                  {
                                    required: true,
                                    whitespace: true,
                                    message: 'Missing phone number'
                                  }
                                ]}
                              >
                                <Input placeholder="Phone number" />
                              </Form.Item>
                            </Col>
                            <Col xs={23} sm={11} md={6} lg={10} xl={10} xxl={10}>
                              <Form.Item
                                {...field}
                                label={index === 0 ? 'Email ID' : null}
                                name={[name, 'email_id']}
                                fieldKey={[fieldKey, 'email_id']}
                                rules={[
                                  {
                                    required: true,
                                    whitespace: true,
                                    email: true,
                                    message: 'Missing Email ID'
                                  },
                                  { type: 'email', message: t('msg_invalid_email') }
                                ]}
                              >
                                <Input placeholder="Email ID" />
                              </Form.Item>
                              {index > 0 ? (
                                <MinusCircleOutlined
                                  data-testid="contactform_minus_icon"
                                  onClick={() => {
                                    remove(name);
                                  }}
                                  className="remove-icon"
                                />
                              ) : null}
                            </Col>
                          </Row>
                        );
                      })}
                    </Col>
                    {/* <Col span={3} offset={1}>
                      <Form.Item
                        label={
                          action === 'edit'
                            ? action === 'edit' && status
                              ? 'Mark as inActive'
                              : 'Mark as active'
                            : 'Mark as active'
                        }
                        name="status"
                        fieldKey="status"
                      >
                        <Switch
                          checkedChildren="active"
                          unCheckedChildren="inActive"
                          checked={action === 'edit' ? status : true}
                        />
                      </Form.Item>
                    </Col> */}
                  </Row>
                  {action !== 'edit' ? (
                    <Row align="middle" justify="end">
                      <Col>
                        <Button
                          data-testid="contact_form_addmore_btn"
                          size="small"
                          type="link"
                          icon={<PlusOutlined />}
                          onClick={() => {
                            add();
                          }}
                        >
                          {t('Add more')}
                        </Button>
                      </Col>
                    </Row>
                  ) : null}
                </>
              );
            }}
          </Form.List>
        </Col>

        <Row className="form-btns" gutter={32} justify="end">
          <Col>
            <Button type="primary" onClick={resetFields}>
              {t('Reset')}
            </Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">
              {isSaving ? <LoadingOutlined /> : t('Submit')}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export { ContactForm as Form };
