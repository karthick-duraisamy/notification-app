import { Form, Input, InputNumber, Select, Checkbox, Radio, DatePicker, Switch, Upload, Button, Row, Col } from 'antd';
import './DynamicForm.scss';
import { UploadOutlined } from '@ant-design/icons';
import type { Rule } from 'antd/es/form';
import { formatLabel } from '../../Utils/commonFunction';
import { useEffect, useRef } from 'react';
import FolderFilter from '../FolderFilter/FolderFilter';

const { TextArea } = Input;
// const { Title } = Typography;

const DynamicForm = ({
  formData,
  title,
  onFinish,
  topicOptions
}: {
  formData: any;
  title: any;
  onFinish: any;
  topicOptions?: any;
}) => {
  //First word will be the Form function like edit or add.
  const [_firstWord, ...restWords] = title.split(' ');
  // Remaining word will be Form Title.
  const remainingTitle = restWords.join(' ');
  const [form] = Form.useForm();

  //Get the initial of all feild values
  const initialFormValuesRef = useRef<Record<string, any>>({});

  const handleChange = (name: any, val: any) => {
    console.log(name, val);
  };

  const renderField = (field: any) => {
    const { name, label, type, options = [], value, selectType } = field;
    const placeholder = label.replace('_', ' ').toLowerCase();
    // to check the input tpe here.
    switch (type) {
      case 'text':
      case 'email':
        return <Input placeholder={'Enter ' + placeholder} defaultValue={value} type={type} />;
      case 'password':
        return <Input.Password defaultValue={value} />;
      case 'number':
        return <InputNumber placeholder={'Enter ' + placeholder} style={{ width: '100%' }} defaultValue={value} />;
      case 'textarea':
        return <TextArea rows={4} defaultValue={value} />;
      case 'select':
        if (selectType === 'customSelect') {
          return (
            <FolderFilter
              folders={options}
              pathname="manageGroup"
              activeFolder={value}
              handler={(val: any) => handleChange(name, val)}
            />
          );
        } else if (selectType === 'statusSelect') {
          return (
            <Select defaultValue={value}>
              {options.map((opt: any) => (
                <Select.Option key={opt.label} value={opt?.value}>
                  {opt.label}
                </Select.Option>
              ))}
            </Select>
          );
        } else {
          return (
            <Select defaultValue={value}>
              {topicOptions.map((opt: any) => (
                <Select.Option key={opt?.value} value={opt?.value}>
                  {opt?.label}
                </Select.Option>
              ))}
            </Select>
          );
        }
      case 'radio':
        return (
          <Radio.Group defaultValue={value}>
            {options.map((opt: any) => (
              <Radio key={opt} value={opt}>
                {opt}
              </Radio>
            ))}
          </Radio.Group>
        );
      case 'checkbox':
        return <Checkbox defaultChecked={value}>{label}</Checkbox>;
      case 'switch':
        return <Switch defaultChecked={value} />;
      case 'date':
        return <DatePicker style={{ width: '100%' }} />;
      case 'file':
        return (
          <Upload>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        );
      default:
        return <Input defaultValue={value} />;
    }
  };

  //Here will be setting the Button and Form Title.
  const submitText = title.toLowerCase().includes('edit') ? `Update ${remainingTitle}` : `Add ${remainingTitle}`;

  // On updation to set the updated field only
  const handleUpdation = (values: any) => {
    const changedFields: any = {};
    const initialValues = initialFormValuesRef.current;

    Object.keys(values).forEach((key) => {
      if (values[key] !== initialValues[key]) {
        changedFields[key] = values[key];
      }
    });
    onFinish(changedFields);
  };

  // When form will be update that time indentify the updated one.
  useEffect(() => {
    const initialValues = formData.reduce((acc: Record<string, any>, field: any) => {
      acc[field.name] = field.value;
      return acc;
    }, {});
    initialFormValuesRef.current = initialValues;
    form.setFieldsValue(initialValues);
  }, [formData]);

  return (
    <>
      <Row className="cls-dynamics-form">
        <Col span={24}>
          <Row justify="space-between">
            <Col xs={12} sm={12} md={12} xl={12} xxl={12}>
              <p className="title">{title}</p>
            </Col>
          </Row>
        </Col>
        <Col span={24} className="form-container">
          <div className="cls-form-legend">
            {title.toLowerCase().includes('edit') ? 'Update below details' : 'Add below details'}
          </div>

          <Form
            layout="vertical"
            form={form}
            onFinish={title.toLowerCase().includes('edit') ? handleUpdation : onFinish}
            initialValues={formData.reduce((acc: any, field: any) => {
              acc[field.name] = field.value;
              return acc;
            }, {})}
          >
            <Row>
              <Col span={24} className="fields-container">
                <Row gutter={32}>
                  {formData.map((field: any) => {
                    const isRequired = field.required;
                    const rules: Rule[] = [];

                    if (isRequired) {
                      rules.push({ required: true, message: `${field.label} is required` });
                    }

                    if (field.type === 'email') {
                      rules.push({ type: 'email', message: 'Please give valid email' });
                    }

                    if (field.type === 'checkbox') {
                      return (
                        <Col xs={24} sm={10} lg={8} xl={8} xxl={8}>
                          <Form.Item name={field.name} valuePropName="checked" rules={rules}>
                            {renderField(field)}
                          </Form.Item>
                        </Col>
                      );
                    }

                    //Will taken the whole space.
                    if (field.type === 'textarea' || field.name === 'description') {
                      return (
                        <Col xs={24} sm={10} lg={24} xl={24} xxl={24}>
                          <Form.Item name={field.name} label={field.label} rules={rules} required={isRequired}>
                            {renderField(field)}
                          </Form.Item>
                        </Col>
                      );
                    }

                    return (
                      <Col
                        xs={24}
                        sm={10}
                        lg={remainingTitle == 'Group details' ? 12 : 6}
                        xl={remainingTitle == 'Group details' ? 12 : 6}
                        xxl={remainingTitle == 'Group details' ? 12 : 6}
                      >
                        <Form.Item
                          name={field.name}
                          label={formatLabel(field.label)}
                          rules={rules}
                          required={isRequired}
                        >
                          {renderField(field)}
                        </Form.Item>
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row>
            <Row className="form-btns" gutter={32} justify="end">
              <Button type="primary" htmlType="submit">
                {submitText}
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default DynamicForm;
