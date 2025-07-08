import { Col } from 'antd';
import './GridViewCard.scss';
import type { Result as ITemplateResponse } from '../../../../../../services/templates/TemplatesTypes';
import { setSelectedTemplates, removeSelectedTemplates, setHtml, setCurrentBackPage } from '@/stores/Template.store';
import type { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/App.hook';
import { TemplateActions } from '../SavedTemplatePage';
import { dateFormat } from '../../../../../../Utils/date';
import { useNavigate } from 'react-router-dom';
import { Status } from '@/components/Status/Status';

const GridViewCard = (data: ITemplateResponse) => {
  const html = useAppSelector((state: any) => state.TemplateReducer.getHtml);
  let { template_id, template_name, folder_name, updated_at, status_name, preview, type } = data;
  const imageURL = preview + '?' + new Date().getTime();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedTemplates } = useAppSelector((state) => state.TemplateReducer);
  const selectHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target.checked ? setSelectedTemplates(template_id) : removeSelectedTemplates(template_id));
  };

  // The following method is used to open the editor for the template when double click is made.
  const openEditWindow = (templateId: string | number) => {
    dispatch(setCurrentBackPage(undefined));
    navigate(`/editor/${templateId}`);
    if (html != '') dispatch(setHtml(''));
  };

  return (
    <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8} className="mb-5">
      <div className="GridViewCard">
        <div className="valign-center d-flex mb-2">
          <input
            data-testid="Gridview_Component"
            type="checkbox"
            id={template_id.toString()}
            checked={selectedTemplates.templates.includes(template_id) || selectedTemplates.all}
            onChange={selectHandler}
            disabled={selectedTemplates.all}
            className="template-check mr-2"
          />
          <label title={template_name} htmlFor={template_id.toString()} className="f-sbold text-ellipsis fs-16">
            #{template_id} {template_name}
          </label>
        </div>
        <div
          className="img mb-3"
          onDoubleClick={() => {
            openEditWindow(template_id);
          }}
        >
          <img src={imageURL} alt={template_name} />
        </div>
        <span className="d-block">Folder: {folder_name}</span>
        <span className="last-updated d-block fs-12">Last updated on {dateFormat(updated_at as any, 'dateTime')}</span>
        <span className="d-block fs-12">
          Editor : {type === 'H' ? 'HTML' : type === 'J' ? 'JSON editor' : 'Drag and Drop'}
        </span>
        <div className="flex-container mt-2">
          <Status name={status_name} />
          <TemplateActions data={data} />
        </div>
      </div>
    </Col>
  );
};
export default GridViewCard;
