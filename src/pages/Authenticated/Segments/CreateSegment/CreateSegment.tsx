import { Button, Checkbox, Col, Form, Input, Radio, Row } from "antd";
import { PlusOutlined, CloseCircleOutlined } from '@ant-design/icons';
import './CreateSegment.scss';
import { useForm } from "antd/lib/form/Form";
import { FormLayout } from "../../../../layouts/Form/Form";
import { AutoComplete } from "@/components/AutoComplete/AutoComplete";

const CreateSegment = () => {
  const [form] = useForm();

  // Dropdown values
  const options = [
    { value: 'Burns Bay Road' },
    { value: 'Downing Street' },
    { value: 'Wall Street' },
  ];

  // Final Submil function handling
  const handleFinish = (values: any) => {
    console.log("Form Values:", values);
  };
  
  return (<>

      <FormLayout title={"Create Segment"}>
        <Form layout="vertical" form={form} initialValues={{ criteria: 'Match all conditions', actions: [''] }} onFinish={handleFinish}>
          <Col span={24} className="cls-fields-container">
            <Row>
              {/* Form Input label */}
              <Col span={12}>
                <Form.Item
                  name="segment_name"
                  label="Segments name"
                  rules={[
                    {
                      required: true,
                      message: 'Missing segment name'
                    }
                  ]}
                >
                  <Input className="cls-input" placeholder="Enter the segments name" />
                </Form.Item>
              </Col>
              {/* Form Checkbox */}
              <Col className="cls-checkbox">
                <Form.Item >
                  <Checkbox checked> Activation Status</Checkbox>
                </Form.Item>
              </Col>
            </Row>
            {/* Radio button  */}
            <Row>
              <Col className="cls-radio" span={2} >
                Crtiteria
              </Col>
              <Col span={20}>
                <Form.Item
                  name="criteria" // Matches the key in initialValues
                >
                  <Radio.Group>
                    <Radio key="matchallconditions" value="Match all conditions">
                      Match all conditions
                    </Radio>
                    <Radio key="matchanyonecondition" value="Match anyone conditions">
                      Match anyone conditions
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            {/* Dynamic form starts */}
            <Form.List name="actions">
              {(fields: any, { add, remove }: { add: any; remove: any }) => {
                return (
                  <>
                    {fields.map(({ key, name, fieldKey, ...field }: any, index: number) => {
                      return (
                        <Row key={index} gutter={32}>
                          <Col span={6}>
                            <AutoComplete
                              formItemName={[name, 'template_name']}
                              formItemLabel={index === 0 ? 'Filter field' : null}
                              formItemRequired={true}
                              formItemMessage="Missing Filter Field"
                              formItemField={field}
                              formItemFieldKey={[fieldKey, 'template_folder']}
                              name="template_folder"
                              index={index}
                              title="Select the filter field"
                              option={options}
                            />
                          </Col>
                          <Col span={6}>
                            <AutoComplete
                              formItemName={[name, 'filter_condition']}
                              formItemLabel={index === 0 ? 'Filter Condition' : null}
                              formItemRequired={true}
                              formItemMessage="Missing filter condition"
                              formItemField={field}
                              formItemFieldKey={[fieldKey, 'template_folder']}
                              name="template_folder"
                              index={index}
                              title="Select the filter condition"
                              option={options}
                            />
                          </Col>
                          <Col span={10}>
                            <Form.Item
                              name={[name, 'filter_value']}
                              label={index === 0 ? 'Filter Value' : null}
                              rules={[
                                {
                                  required: true,
                                  message: 'Missing filter value'
                                }
                              ]}
                            >
                              <Input className="cls-input" placeholder="Enter the Filter Value" />
                            </Form.Item>
                            {index > 0 && (
                              <CloseCircleOutlined
                                style={{ color: '#f00' }}
                                onClick={() => {
                                  remove(name);
                                }}
                                className="remove-icon"
                              />
                            )}
                          </Col>
                        </Row>
                      )
                    })}
                    <Row align="middle" justify="end">
                      <Col>
                        <Button
                          size="small"
                          type="link"
                          icon={<PlusOutlined />}
                          onClick={() => add()}
                        >
                          Add Row
                        </Button>
                      </Col>
                    </Row>
                  </>
                )
              }}
            </Form.List>
            {/* Dynamic form ends */}
          </Col>
          {/* Form final submit and form reset  */}
          <Row className="form-btns" gutter={32} justify="end">
            <Col>
              <Button type="default" className="reset-btn">
                Reset
              </Button>
            </Col>
            <Col>
              <Button type="primary" htmlType="submit">
                submit
              </Button>
            </Col>
          </Row>
        </Form>
      </FormLayout>
  </>)
};

export default CreateSegment;
