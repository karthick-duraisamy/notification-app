import { Button, Col, Row, Form, Input, Switch } from 'antd';
import { PlusOutlined, CloseCircleOutlined, LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks/App.hook';

interface ProjectFormProps {
  formSubmit: (values: any) => void;
  form: any;
  resetFields: () => void;
  isSaving: boolean;
  action: string;
  projectStatusValue?: string;
}

const ProjectForm = ({ formSubmit, resetFields, form, isSaving, action, projectStatusValue }: ProjectFormProps) => {
  const [projectStatus, setProjectStatus] = useState<boolean | undefined>();
  const [isUniqueNameVisible, setIsUniqueNameVisible] = useState(false);
  const uniqueNameHandler = () => {
    setIsUniqueNameVisible((state) => !state);
  };
  let isUpdate: any = [];
  // let isAllPermission: boolean = true;
  const { menuServiceData } = useAppSelector((state) => state.MenuServiceReducer);
  if (menuServiceData?.response?.data?.route.length > 0) {
    // isAllPermission = false;
    const projectPermission = menuServiceData?.response?.data?.route.filter(function (el: any) {
      return el.path === '/project/:action';
    });
    if (projectPermission[0].permission[0] === 'all') {
      // isAllPermission = true;
    } else {
      isUpdate = projectPermission[0]?.permission.filter(function (el: any) {
        return el.indexOf('update') !== -1;
      });
    }
  }
  useEffect(() => { }, [projectStatus]);
  return (
    <>
      <Form
        onReset={() => alert('reset')}
        className=""
        layout="vertical"
        form={form}
        onFinish={formSubmit}
        name="dynamicform"
        initialValues={{ actions: [''] }}
      >
        <Col span={24} className="fields-container">
          <Row gutter={32}>
            {action === 'edit' && (
              <Col span={24} className="text-right">
                <Button type="link" onClick={uniqueNameHandler}>
                  {isUniqueNameVisible ? 'Hide' : 'Show'} unique name
                </Button>
              </Col>
            )}
            <Col xs={24} sm={10} md={10} xl={10} xxl={10}>
              <Form.Item
                name="project_name"
                label="Project name"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: 'Missing project name'
                  }
                ]}
              >
                <Input placeholder="Project" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={10} md={10} xl={10} xxl={10}>
              <Form.Item
                name="project_code"
                label="Project code"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: 'Missing project code'
                  }
                ]}
              >
                <Input placeholder="Project code" />
              </Form.Item>
            </Col>

            {projectStatusValue !== '' || action === 'create' ? (
              <Col xs={24} sm={4} md={4} xl={4} xxl={4}>
                <Form.Item label="Status" name="status" fieldKey="status">
                  <Switch
                    checked={
                      projectStatus !== undefined
                        ? projectStatus
                        : action === 'create'
                          ? true
                          : projectStatusValue == '1'
                            ? true
                            : false
                    }
                    checkedChildren="Active"
                    unCheckedChildren="In-active"
                    onChange={(value) => {
                      setProjectStatus(value);
                      form.setFieldsValue({ status: value === true ? 1 : 2 });
                    }}
                  />
                </Form.Item>
              </Col>
            ) : (
              <></>
            )}
          </Row>
          <Form.List name="actions">
            {(fields: any, { add, remove }: { add: any; remove: any }, {  }: { errors: any }) => {
              return (
                <>
                  {fields.map(({ key, name, fieldKey, ...field }: any, index: number) => {
                    return (
                      <Row key={index} gutter={32}>
                        {/* remove hidden attribute if need to show id */}
                        <Form.Item hidden {...field} name={[name, 'action_id']} fieldKey={[fieldKey, 'action_id']}>
                          <Input placeholder="Action id" />
                        </Form.Item>
                        <Col xs={23} sm={15} md={10} xl={10} xxl={10}>
                          <Form.Item
                            {...field}
                            label={index === 0 ? 'Action name' : null}
                            name={[name, 'action_name']}
                            fieldKey={[fieldKey, 'action_name']}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message: 'Missing Action Name'
                              }
                            ]}
                          >
                            <Input placeholder="Action name" />
                          </Form.Item>
                        </Col>
                        <Col span={11} className={isUniqueNameVisible ? 'show' : 'hide'}>
                          <Form.Item
                            {...field}
                            label={index === 0 ? 'Unique name' : null}
                            name={[name, 'unique_name']}
                            fieldKey={[fieldKey, 'unqiue_name']}
                          >
                            <Input placeholder="Unique name" disabled />
                          </Form.Item>
                        </Col>
                        <Col span={1} className='cls-close-icon'>
                          {index > 0 && (
                            <CloseCircleOutlined
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

                  <Row align="middle" justify="end">
                    <Col>
                      <Button
                        size="small"
                        type="link"
                        icon={<PlusOutlined />}
                        onClick={() => {
                          add();
                        }}
                      >
                        Add fields
                      </Button>
                    </Col>
                  </Row>
                </>
              );
            }}
          </Form.List>
        </Col>

        {isUpdate.length > 0 || menuServiceData?.response?.data?.route.length === 0 || isUpdate ? (
          <Row className="form-btns" gutter={32} justify="end">
            <Col>
              <Button type="default" onClick={resetFields}>
                <ReloadOutlined /> Reset
              </Button>
            </Col>
            <Col>
              <Button type="primary" htmlType="submit">
                {isSaving ? <LoadingOutlined /> : 'Submit'}
              </Button>
            </Col>
          </Row>
        ) : (
          <></>
        )}
      </Form>
    </>
  );
};

export { ProjectForm };
