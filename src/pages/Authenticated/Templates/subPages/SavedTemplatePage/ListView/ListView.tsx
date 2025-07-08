import Table from '@/components/Table/Table';
import type { Result as ITemplateResponse } from '../../../../../../services/templates/TemplatesTypes';
import type { DefaultRecordType } from 'rc-table/lib/interface';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/App.hook';
import { setSelectedTemplates, removeSelectedTemplates } from '@/stores/Template.store';
import { TemplateActions } from '../SavedTemplatePage';
import { dateFormat } from '../../../../../../Utils/date';
import { useState } from 'react';
import { Status } from '@/components/Status/Status';
import { useResize } from '../../../../../../Utils/resize';

interface IListData {
  listData: ITemplateResponse[];
  count?: number;
}

const ListView = ({ listData }: IListData) => {
  const dispatch = useAppDispatch();
  const { selectedTemplates } = useAppSelector((state) => state.TemplateReducer);
  const selectHandler = (id: number, isChecked: boolean) => {
    dispatch(isChecked ? setSelectedTemplates(id) : removeSelectedTemplates(id));
  };

  // Get the value of isSmallScreen from the custom hook
  const { isSmallScreen, isMediumScreen } = useResize();

  const columns = [
    {
      title: '',
      dataIndex: 'template_id',
      key: 'checked',
      className: "cls-list-checked",
      render: (template_id: number) => (
        <input
          data-testid="ListView_testid"
          type="checkbox"
          onChange={(e) => {
            selectHandler(template_id, e.target.checked);
          }}
          checked={selectedTemplates.templates.includes(template_id) || selectedTemplates.all}
          disabled={selectedTemplates.all}
        />
      )
    },
    {
      title: 'Id',
      dataIndex: 'template_id',
      key: 'template_id',
      className: "cls-list-id",
    },
    { title: 'Templates', dataIndex: 'template_name', key: 'template_name', className: "cls-list-templatename" },
    { title: 'Folder name', dataIndex: 'folder_name', key: 'folder_name', className: "cls-list-foldername" },
    {
      title: 'Last modification',
      dataIndex: 'updated_info',
      key: 'updated_at',
      className: "cls-list-upadate",
      render: (updated_at: any) => <span>{updated_at === '' ? 'Not updated' : dateFormat(updated_at, 'dateTime')}</span>
    },
    {
      title: 'Status',
      dataIndex: 'status_name',
      key: 'status_name',
      className: "cls-list-statusname",
      render: (status: string) => <Status name={status} />
    },
    {
      title: 'Action',
      dataIndex: 'template_id',
      key: 'template_id',
      className: 'popover',
      render: (_id: number, data: DefaultRecordType) => <TemplateActions data={data} />
    },

    // The followning method is used to responsive design expand icon click show details
    ...(isSmallScreen ? [{ title: 'Templates', dataIndex: 'template_name', key: 'template_name', className: "cls-list-templatename" },
    { title: 'Status', dataIndex: 'status_name', key: 'status_name' },
    {
      title: 'Last modification',
      dataIndex: 'updated_info',
      key: 'updated',
      className: "cls-list-upadate"
    },
    ] : []),

    ...(isMediumScreen ? [{ title: 'Folder name', dataIndex: 'folder_name', key: 'folder_name', className: "cls-list-foldername" },
    { title: 'Last modification', dataIndex: 'updated_info', key: 'updated', className: "cls-list-upadate" }] : [])

  ];
  const [visibleColumn, setVisibleColumn] = useState(columns);
  return (
    <div className="ListView">
      {listData.length > 0 ? (
        <Table
          data={listData}
          columns={visibleColumn}
          pagination={{ pagination: false, onChange: () => null }}
          initialColumns={columns}
          setVisibleColumn={setVisibleColumn}
          hideableColumns={['template_id', 'checked']}
          disabledSelected={['template_name']}
        />
      ) : (
        <p>No templates found</p>
      )}
    </div>
  );
};
export default ListView;
