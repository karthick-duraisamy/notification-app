import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Typography, Row, Col } from "antd";
import "./AiSubjectLineGenerator.scss"; // Import the custom CSS
import { AIicon } from "../Icons/Icons";
import { useAIServiceMutation } from "@/services/initializer/initializer";

const { TextArea } = Input;
const { Title } = Typography;

interface AiSubjectLineGeneratorProps {
  open: boolean;
  onClose: () => void;
  inputInfo?: string;
  setFieldsValues: Function;
}

const AiSubjectLineGenerator: React.FC<AiSubjectLineGeneratorProps> = ({
  open,
  onClose,
  inputInfo,
  setFieldsValues
}) => {
  const [prompt, setPrompt] = useState(inputInfo || "");
  const [AIService, AIServiceStatus] = useAIServiceMutation();
  const [openSuggestions, setOpenSuggestions] = useState(false);

  let responseData = {
    "responseCode": 200,
    "response": {
      "Message": "Success",
      "data": {
        "options": [
          {
            "suggested_subject": "Cut Travel Costs by 22%? How To",
            "preheader": "One simple step can drastically reduce your travel budget. Learn more!"
          },
          {
            "suggested_subject": "Smart Travel Savings: 22% Awaits",
            "preheader": "Unlock exclusive discounts and save big on your next trip. Don't miss out!"
          },
          {
            "suggested_subject": "22% Off Travel: The Secret's Out!",
            "preheader": "Discover the savvy strategy for significant savings on every journey. Click now!"
          },
          {
            "suggested_subject": "Save 22% on Travel: It's This Easy",
            "preheader": "Your gateway to cheaper travel is here. Start saving with just one click!"
          }
        ]
      }
    }
  };

  const handleGenerate = () => {
    let requestData = {
      propmt: "Save 22% Off Your Travel Spend – In One Smart Move",
      type: "campaign_text",
    };
    AIService(requestData);
    setOpenSuggestions(true);
  };

  // After the Use button to get the Setfields Values.
  const handleUseSubject = (subject: any, preheader: any) => {
    setFieldsValues({ subject: subject, preheader: preheader });
    setOpenSuggestions(false);
    onClose();
  }

  useEffect(() => {
    console.log(AIServiceStatus);
  }, [AIServiceStatus])

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable
      centered
      width={700}
      className="ai-subject-line-modal"
    >
      <div>
        <Title level={4} className="modal-title">
          {/* <EditOutlined style={{ marginRight: 8 }} /> */}
          <AIicon /> AI Subject Line Generator
        </Title>

        <div style={{ marginTop: 20 }}>
          <label className="input-label">Prompt</label>
          <TextArea
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Generate compelling email subject lines for a marketing campaign"
            className="custom-textarea"
          />
        </div>

        <Button
          type="primary"
          icon={<AIicon />}
          onClick={handleGenerate}
          className="generate-button"
        >
          Generate
        </Button>

        {openSuggestions && responseData?.response?.data?.options?.length > 0 && (
          <div className="cls-suggestions-container">
            {responseData.response.data.options.map((option, index) => (
              <div className="cls-suggestion-item">
                <Row key={index} >
                  <div className="cls-suggestion-content">
                    <div className="cls-subject-line">
                      <strong>{option.suggested_subject}</strong>
                    </div>
                    <div className="cls-preheader">
                      <span>{option.preheader}</span>
                    </div>
                  </div>
                </Row>
                <Row justify={'space-between'}>
                    <Col span={18}></Col>
                    <Col>
                      <Button
                        type="primary"
                        onClick={() => handleUseSubject(option.suggested_subject, option.preheader)}
                        className="cls-use-button"
                      >
                        Use this
                      </Button>
                    </Col>
                </Row>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AiSubjectLineGenerator;
