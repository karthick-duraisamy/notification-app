import { Row } from 'antd';
import Progress from 'antd/lib/progress/progress';
import './CustomProgressBar.scss';
interface CustomProgressBarProps {
  fullValue: number;
  status: number;
  type: string;
  field?: string;
}

const CustomProgressBar = ({ fullValue, status, type }: CustomProgressBarProps) => {
  const percentValue = fullValue ? Math.round((status / fullValue) * 100) : 0;
  if (type === 'both') {
    return (
      <Row className="cls-type-both">
        <p>
          {status} <span className="cls-type-both-pre">({percentValue}%)</span>
        </p>
        <Progress percent={percentValue} size="small" showInfo={false} />
        {/* <p className="cls-type-field">of {field}</p> */}
      </Row>
    );
  }
  return (
    <Row>
      <p>{type === 'percent' ? percentValue + '%' : status}</p>
      <Progress percent={percentValue} size="small" showInfo={false} />
    </Row>
  );
};

export default CustomProgressBar;
