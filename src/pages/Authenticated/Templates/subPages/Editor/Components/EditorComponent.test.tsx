import { fireEvent, render, screen } from '@testing-library/react';
import HtmlEditor from '../../NewTemplatePage/HtmlEditor';
import ImportTemplate from '../../NewTemplatePage/ImportTemplate';
import NewTemplatePage from '../../NewTemplatePage/NewTemplatePage';
import FolderViewCard from '../../SavedTemplatePage/FolderViewCard/FolderViewCard';
import GridViewCard from '../../SavedTemplatePage/GridViewCard/GridViewCard';
import ListView from '../../SavedTemplatePage/ListView/ListView';
import NoTemplates from '../../SavedTemplatePage/NoTemplates/NoTemplates';
import SavedTemplatePage from '../../SavedTemplatePage/SavedTemplatePage';
import ThumbnailViewCard from '../../SavedTemplatePage/ThumbnailViewCard/ThumbnailViewCard';
import TemplateLayoutPage from '../../TemplateLayoutPage/TemplateLayoutPage';
import Editor from '../Editor';
import { Header } from './Header';
import { PreviwModalTitle } from './PreviewModalTitle';
import CommonTestWrapper from '@/components/CommonTestWrapper/CommonTestWrapper';
import type { Result } from '../../../../../../services/templates/TemplatesTypes';

describe('Test case for template editor components', () => {
  it('initial rendering of editor header component', () => {
    render(
      <CommonTestWrapper>
        <Header />
      </CommonTestWrapper>
    );
  });
  it('checking initial rendering editor previewmodaltitle component', async () => {
    render(
      <CommonTestWrapper>
        <PreviwModalTitle />
      </CommonTestWrapper>
    );
  });
  it('Checking initial rendering of editor component', async () => {
    render(
      <CommonTestWrapper>
        <Editor />
      </CommonTestWrapper>
    );
  });
  it('Checking initial rendering of HtmlEditor section', async () => {
    render(
      <CommonTestWrapper>
        <HtmlEditor />
      </CommonTestWrapper>
    );
  });
  it('Checking initial rendering of ImportTemplate section', async () => {
    render(
      <CommonTestWrapper>
        <ImportTemplate />
      </CommonTestWrapper>
    );
  });
  it('Checking initial rendering of NewTemplatePage', async () => {
    render(
      <CommonTestWrapper>
        <NewTemplatePage />
      </CommonTestWrapper>
    );
  });
  it('Checking initial rendering of FolderViewCard section', async () => {
    render(
      <CommonTestWrapper>
        <FolderViewCard folder_id="18" folder_name="SouthWest" count={27} />
      </CommonTestWrapper>
    );
    const folder_ele = screen.getByTestId('template_folder_list');
    if (folder_ele) fireEvent.doubleClick(folder_ele);
  });
  const templateData = {
    created_at: '2022-03-02T06:54:15.644000Z',
    created_by: 'infiniti@infi.com',
    folder: '1',
    folder_name: 'GroupRM',
    language: '1',
    language_name: 'English',
    preview: 'http://grmapi-v2.infinitisoftware.net/uploads/email_api/18.RM_EN_travel_registration.jpg',
    request_format: '{"user_name": "", "site_url": "", "confirmation_link": ""}',
    status: '1',
    status_name: 'Active',
    subject: 'travel registration',
    template_id: 18,
    template_name: 'RM_EN_travel_registration',
    updated_at: '2022-10-11 04:27:27.924121+00:00',
    updated_by: 'infiniti@infi.com'
  };
  it('Checking initial rendering of GridViewCard section', async () => {
    render(
      <CommonTestWrapper>
        <GridViewCard key={18} {...templateData} />
      </CommonTestWrapper>
    );
    let selectBox = screen.getByTestId('Gridview_Component');
    if (selectBox) fireEvent.click(selectBox);
    fireEvent.change(screen.getByPlaceholderText(/Search/i), {
      target: { value: 'airline searching' }
    });
  });
  const listViewData: Result[] = [
    {
      template_id: 18,
      template_name: 'RM_EN_travel_registration',
      subject: 'travel registration',
      request_format: '{"user_name": "", "site_url": "", "confirmation_link": ""}',
      folder: '1',
      folder_name: 'GroupRM',
      language: '1',
      language_name: 'English',
      status: '1',
      status_name: 'Active',
      created_at: '2022-03-02T06:54:15.644000Z',
      created_by: 'infiniti@infi.com',
      updated_by: 'infiniti@infi.com',
      updated_at: '2022-10-11 04:27:27.924121+00:00',
      preview: 'http://grmapi-v2.infinitisoftware.net/uploads/email_api/18.RM_EN_travel_registration.jpg'
    }
  ];
  const listViewData1: Result[] = [
    {
      template_id: 18,
      template_name: 'RM_EN_travel_registration',
      subject: 'travel registration',
      request_format: '{"user_name": "", "site_url": "", "confirmation_link": ""}',
      folder: '1',
      folder_name: 'GroupRM',
      language: '1',
      language_name: 'English',
      status: '1',
      status_name: 'Active',
      created_at: '2022-03-02T06:54:15.644000Z',
      created_by: 'infiniti@infi.com',
      updated_by: 'infiniti@infi.com',
      updated_at: '',
      preview: 'http://grmapi-v2.infinitisoftware.net/uploads/email_api/18.RM_EN_travel_registration.jpg'
    }
  ];
  it('Checking initial rendering of listView section', async () => {
    render(
      <CommonTestWrapper>
        <ListView listData={listViewData} count={18} />
      </CommonTestWrapper>
    );
    let selectBox = screen.getByTestId('ListView_testid');
    if (selectBox) fireEvent.click(selectBox);
    if (selectBox) fireEvent.click(selectBox);
  });
  it('Checking initial rendering of listView section with no data', async () => {
    render(
      <CommonTestWrapper>
        <ListView listData={[]} count={0} />
      </CommonTestWrapper>
    );
  });
  it('Checking initial rendering of listView section with no updated info data', async () => {
    render(
      <CommonTestWrapper>
        <ListView listData={listViewData1} count={12} />
      </CommonTestWrapper>
    );
  });
  it('Checking initial rendering of NoTemplates section', async () => {
    render(
      <CommonTestWrapper>
        <NoTemplates />
      </CommonTestWrapper>
    );
  });
  it('Checking initial rendering of ThumbnailViewCard section', async () => {
    render(
      <CommonTestWrapper>
        <ThumbnailViewCard data={templateData} key={18} />
      </CommonTestWrapper>
    );
  });
  it('Checking initial rendering of SavedTemplatePage page', async () => {
    render(
      <CommonTestWrapper>
        <SavedTemplatePage />
      </CommonTestWrapper>
    );
  });
  it('Checking initial rendering of TemplateLayoutPage section', async () => {
    render(
      <CommonTestWrapper>
        <TemplateLayoutPage />
      </CommonTestWrapper>
    );
    let selectBox = screen.getByTestId('TemplateLayoutColumn');
    for (let i = 0; i < selectBox.childNodes.length; i++) {
      if ((selectBox as any)[i]) fireEvent.click((selectBox as any)[i]);
    }
  });
  it('Creating new template', async () => {
    render(
      <CommonTestWrapper>
        <NewTemplatePage />
      </CommonTestWrapper>
    );
    let selectBox = screen.getByTestId('new_template_section');
    if (selectBox) fireEvent.click(selectBox);
    expect(screen.getByText('Select an item inside the body')).toBeInTheDocument();
  });
  it('Creating html template', async () => {
    render(
      <CommonTestWrapper>
        <NewTemplatePage />
      </CommonTestWrapper>
    );
    let selectBox = screen.getByTestId('html_editor_section');
    if (selectBox) fireEvent.click(selectBox);
  });
  it('Creating by import template', async () => {
    render(
      <CommonTestWrapper>
        <NewTemplatePage />
      </CommonTestWrapper>
    );
    let selectBox = screen.getByTestId('import_template_section');
    if (selectBox) fireEvent.click(selectBox);
  });
  it('Creating by template layout', async () => {
    render(
      <CommonTestWrapper>
        <NewTemplatePage />
      </CommonTestWrapper>
    );
    let selectBox = screen.getByTestId('template_layout_section');
    if (selectBox) fireEvent.click(selectBox);
  });
});
