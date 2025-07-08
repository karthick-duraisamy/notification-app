import { Row, Col } from 'antd';
import {
  Layout1,
  Layout2,
  Layout3,
  Layout4,
  Layout5,
  Layout6,
  Layout7,
  Layout8
} from '@/components/Images/TemplateLayouts';
import { useAppDispatch } from '../../../../../hooks/App.hook';
import {
  setActiveFolderID,
  setActiveTemplateName,
  setLoadTemplate,
  setTemplateTypeID
} from '@/stores/Template.store';
import { SingleColumnJson } from './singleColumn';
import { useNavigate } from 'react-router-dom';
import './TemplateLayoutPage.scss';
import { twoColumnJson } from './twocolumn';
import { threeColumnJson } from './three-column';
import { singleColumnFullWidth } from './singleColumn-fullwidth';
import { twoColumnJsonFullWidth } from './twocolumn-fullwidth';
import { threeColumnJsonFullWidth } from './three-column-full-width';
import { newsJson } from './news';

const TemplateLayoutPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const columnArr: any[] = [
    { component: SingleColumnJson, text: '1 Column', layout: <Layout1 /> },
    { component: twoColumnJson, text: '2 Column', layout: <Layout2 /> },
    { component: threeColumnJson, text: '3 Column', layout: <Layout3 /> },
    { component: singleColumnFullWidth, text: '1 Column - Full width', layout: <Layout4 /> },
    { component: twoColumnJsonFullWidth, text: '2 Column - Full width', layout: <Layout5 /> },
    { component: threeColumnJsonFullWidth, text: '3 Column - Full width', layout: <Layout6 /> },
    { component: newsJson, text: 'Simple text', layout: <Layout7 /> }
  ];

  return (
    <div className="TemplateLayoutPage">
      <p className="ml-3">Basic</p>
      <Row
        data-testid="TemplateLayoutColumn"
        gutter={[20, 40]}
        onClick={() => {
          dispatch(setActiveTemplateName(''));
          dispatch(setActiveFolderID(null as unknown as number));
        }}
      >
        {columnArr?.map((item: any, index) => {
          return (
            <Col sm={6} lg={6} xxl={12}>
              <div
                key={index}
                className="cls-layout"
                onClick={() => {
                  dispatch(setLoadTemplate(JSON.stringify(item.component)));
                  dispatch(setTemplateTypeID('P'));
                  navigate('/editor/new');
                }}
              >
                {item.layout}
                <p>{item.text}</p>
              </div>
            </Col>
          );
        })}
        <Col sm={6} lg={6} xxl={12}>
          <div className="cls-layout">
            <Layout8 />
            <p>Simple text</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TemplateLayoutPage;
