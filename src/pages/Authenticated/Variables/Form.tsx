import { Button, Col, Row, Form, Input, Select, Spin, Switch } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { SyncOutlined } from '@ant-design/icons';
import { useVariableForm } from '../../../hooks/VariablesForm.hook';
import { useVariableTypeSelection } from '../../../hooks/Selection.hook';
import { LoadingOutlined } from '@ant-design/icons';
interface FormProps {
  formSubmit: (values: any) => void;
  form: any;
  resetFields: () => void;
  projectSelected: Boolean;
  sync: ReturnType<typeof useVariableForm>['sync'];
  retrieved: boolean;
  status: any;
}

const { Option } = Select;

const VariablesFrom = ({ formSubmit, resetFields, form, projectSelected, status }: FormProps) => {
  const { t } = useTranslation();
  const {
    route: { action }
  } = useVariableForm();
  const [variableStatus, setVariableStatus] = useState<boolean | undefined>(undefined);
  const { variableTypeOptions } = useVariableTypeSelection();
  const [varType, setVarType] = useState<number>();
  // eslint-disable-next-line
  const [statusMap] = useState<number[]>([]);

  useEffect(() => {}, [variableStatus]);

  return (
    <>
      <Form
        className="cls-variableForm"
        layout="vertical"
        form={form}
        initialValues={{ variables: [''] }}
        onFinish={formSubmit}
        name="dynamic form"
      >
        <Col span={24} className="fields-container">
          <Form.List name="variables">
            {(fields: any, { add, remove }: { add: any; remove: any }) => {
              return (
                <>
                  {fields.map(({ key, name, fieldKey, ...field }: any, index: number) => {
                    return (
                      <Row key={index} gutter={32}>
                        <Col xs={24} sm={10} lg={6} xl={6} xxl={6}>
                          <Form.Item
                            {...field}
                            label={index === 0 ? 'Variable name' : null}
                            name={[name, 'variable_name']}
                            fieldKey={[fieldKey, 'variable_name']}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message: t('Missing Variable name')
                              }
                            ]}
                          >
                            <Input placeholder="Name" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={10} lg={4} xl={4} xxl={4}>
                          <Form.Item
                            {...field}
                            label={index === 0 ? 'Type' : null}
                            name={[name, 'type']}
                            fieldKey={[fieldKey, 'type']}
                            rules={[
                              {
                                required: true,
                                message: t('Select Variable type')
                              }
                            ]}
                          >
                            <Select
                              onChange={(val: number) => {
                                setVarType(val);
                                // const type = form.getFieldsValue()['variables'][index]['type'];
                              }}
                              placeholder="Select Variable type"
                            >
                              {variableTypeOptions.map((item, index) => {
                                return (
                                  <Option key={index} value={item.id}>
                                    {item.label}
                                  </Option>
                                );
                              })}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={3} lg={4} xl={4} xxl={4}>
                          <Form.Item label="Status" name={[name, 'status']} fieldKey={[fieldKey, 'status']}>
                            <Switch
                              onChange={(value) => {
                                setVariableStatus(value);
                                form.setFieldsValue({ status: value === true ? '1' : '2' });
                              }}
                              checked={
                                variableStatus !== undefined
                                  ? variableStatus
                                  : action === 'add'
                                  ? true
                                  : form.getFieldsValue()?.variables
                                  ? form.getFieldsValue()?.variables[0]
                                    ? form.getFieldsValue()?.variables[0].status === 1
                                    : false
                                  : true
                              }
                              checkedChildren="Active"
                              unCheckedChildren="in-Active"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={varType === 1 ? 7 : 24}>
                          <Form.Item
                            {...field}
                            label={index === 0 ? 'Value' : null}
                            name={[name, 'value']}
                            fieldKey={[fieldKey, 'value']}
                            onBlur={(_e: any) => {
                              return;
                              // form.getFieldsValue(true)['variables']?.map((item: any, key: number) => {
                              //   if (key === index && item.value !== '') {
                              //     setStatusMap((prev) => [...prev, fieldKey]);
                              //     sync.api(item.variable_id, { ...item, fieldKey }, setStatusMap);
                              //   }
                              //   return true;
                              // });
                            }}
                            minusCircleOutlined
                            rules={[
                              {
                                required: true,
                                message: 'Missing value'
                              }
                            ]}
                          >
                            {varType === 1 ? (
                              <Input placeholder="Value" disabled={statusMap.includes(fieldKey)} />
                            ) : (
                              <Input.TextArea rows={5} placeholder="Value" disabled={statusMap.includes(fieldKey)} />
                            )}
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            {...field}
                            label={index === 0 ? 'Description' : null}
                            name={[name, 'description']}
                            fieldKey={[fieldKey, 'description']}
                            minusCircleOutlined
                            rules={[
                              {
                                required: true,
                                message: 'Missing value'
                              }
                            ]}
                          >
                            <Input.TextArea placeholder="Description" />
                          </Form.Item>
                          {statusMap.includes(fieldKey) && (
                            <Spin
                              spinning
                              className="loading-indicator"
                              indicator={<SyncOutlined spin style={{ fontSize: 20 }} />}
                            />
                          )}
                          {index > 0 && (
                            <MinusCircleOutlined
                              onClick={() => {
                                remove(name);
                              }}
                              className="remove-icon"
                            />
                          )}
                        </Col>
                      </Row>
                    );
                  })}

                  {action === 'add' && (
                    <Row align="middle" justify="end">
                      {!projectSelected && (
                        <Col span={24}>
                          <h4>Select a project to add variables</h4>
                        </Col>
                      )}
                      <Col>
                        <Button
                          size="small"
                          type="link"
                          disabled={!projectSelected}
                          icon={<PlusOutlined />}
                          onClick={() => {
                            add();
                          }}
                        >
                          add fields
                        </Button>
                      </Col>
                    </Row>
                  )}
                </>
              );
            }}
          </Form.List>

          {/* <div
            style={{
              zIndex: 99,
              position: 'absolute',
              top: -14,
              borderRadius: '16px',
              padding: '4px 8px',
              color: '#fff',
              background: '#7480A2',
              fontSize: '12px'
            }}
          >
            Fill below details
          </div> */}
        </Col>
        <Row className="form-btns" gutter={32} justify="end">
          <Col>
            <Button type="primary" onClick={resetFields}>
              Reset
            </Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">
              {status.addVariableServiceStatus?.isLoading || status.updateVariableServiceStatus?.isLoading ? (
                <LoadingOutlined spin style={{ fontSize: '14px' }} />
              ) : (
                'Submit'
              )}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export { VariablesFrom as Form };
