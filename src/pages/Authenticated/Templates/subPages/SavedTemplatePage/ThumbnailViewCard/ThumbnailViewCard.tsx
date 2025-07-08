import { Col } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { TemplateActions } from '../SavedTemplatePage';
import type { Result as ITemplateResponse } from '../../../../../../services/templates/TemplatesTypes';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/App.hook';
import type { ChangeEvent } from 'react';
import { removeSelectedTemplates, setSelectedTemplates } from '@/stores/Template.store';

interface IThumbnailViewCard {
  data: ITemplateResponse;
}
const ThumbnailViewCard = ({ data }: IThumbnailViewCard) => {
  const dispatch = useAppDispatch();
  const { selectedTemplates } = useAppSelector((state) => state.TemplateReducer);
  const selectHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target.checked ? setSelectedTemplates(data.template_id) : removeSelectedTemplates(data.template_id));
  };
  return (
    <Col xs={12} sm={6} lg={4} xl={4} xxl={3} className="gutter-row">
      <div className="ThumbnailViewCard text-center">
        <div className="pb-3">
          <div className="flex-container">
            <input
              type="checkbox"
              id={data.template_id.toString()}
              checked={selectedTemplates.templates.includes(data.template_id) || selectedTemplates.all}
              onChange={selectHandler}
              disabled={selectedTemplates.all}
              className="template-check mr-2"
            />
            <TemplateActions data={data} />
          </div>
          <FileTextOutlined className="thumb-icon text-center" />
          <label className="mt-2 d-block text-ellipsis">{data.template_name}</label>
        </div>
      </div>
    </Col>
  );
};
export default ThumbnailViewCard;
