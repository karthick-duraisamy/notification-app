import { Button, Col, Input, Row, Space } from 'antd';
import type { TableProps } from 'antd';
import './Segments.scss';
import { useTranslation } from 'react-i18next';
import { PlusCircleFilled, SearchOutlined } from '@ant-design/icons';
import type { DefaultRecordType } from 'rc-table/lib/interface';
import Table from '@/components/Table/Table';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { dateFormat } from '../../../Utils/date';
import { useDeleteVariableMutation, useUpdateVariableStatusMutation } from '../../../services/variables/Variable';
import { DeleteNotification } from '@/components/DeleteNotification/DeleteNotification';
import CustomFilter from '@/components/CustomFilter/CustomFilter';
import { ActionDropDown } from '@/components/PopoverMenu/PopoverMenu';
import { FormTitle } from '@/components/Title/Title';

const Segments = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [pageNumber] = useState<number | undefined>(1);

  // The following method is triggered when user click the create manage group button
  const createSegment = () => {
    navigate(`${pathname}/create`);
    console.log('create manage group button clicked');
  };

  const filterProps = [
    {
      label: 'Topic',
      labelKey: 'topic',
      data: [
        { id: 0, value: 'Marketing' },
        { id: 1, value: 'Non-Marketing' }
      ],
      handler: (id: number) => {
        console.log(id);
      }
    }
  ];

  // The following method is triggered when search icon is clicked to filter the group name
  const handleGroupNameSearch = () => {
    console.log('Method is triggered when search icon is clicked');
  };

  let results = [
    {
      group_id: '6819dfd0c041e8b1a7fec846',
      group_name: 'Test1',
      description: 'This is the first testing Group',
      project_id: 1,
      topic: 'Marketing',
      contact_count: 10,
      project_name: 'ClearTrip',
      status: null,
      status_name: null,
      created_by: 'superadmin@grmapi.com',
      created_at: '2025-05-06T10:09:20.970000Z',
      updated_by: null,
      updated_at: null,
      actions: ['Demo project testing']
    }
  ];

  let tableData, totalCount;
  tableData = results.map((item: any) => {
    return {
      ...item,
      status: item.status_name,
      create_date: dateFormat(item.created_at, 'date'),
      create_time: dateFormat(item.created_at),
      updated_at: dateFormat(item?.updated_at, 'date'),
      updated_by: item.updated_by
    };
  });
  console.log('tableData');
  console.log(tableData);

  const columns: TableProps<DefaultRecordType>['columns'] = [
    {
      title: 'S.No',
      key: 's_no',
      render: (_text: any, _record: any, index: any) => {
        // Calculate the serial number based on current page and page size
        const serialNo = ((pageNumber as number) - 1) * 6 + (index + 1);
        return serialNo;
      }
    },
    {
      title: 'Segments name',
      key: 'group_name',
      render: (data: DefaultRecordType) => (
        <>
          <span>{data?.group_name}</span>
        </>
      )
    },
    {
      title: 'description',
      key: 'description',
      width: '350px',
      render: (data: DefaultRecordType) => (
        <>
          <span>{data.description}</span>
        </>
      )
    },
    {
      title: 'Topic',
      key: 'topic',
      render: (data: DefaultRecordType) => (
        <>
          <span>{data.topic}</span>
        </>
      )
    },
    {
      title: 'Contact count',
      key: 'contact_count',
      render: (data: DefaultRecordType) => (
        <>
          <span>{data.contact_count}</span>
        </>
      )
    },
    {
      title: 'Created by',
      key: 'created_by',
      className: 'cls-multiple-item',
      render: (data: DefaultRecordType) => (
        <>
          <p>{data.created_by}</p>
          <p>{data.create_time}</p>
        </>
      )
    },
    {
      title: 'Action',
      dataIndex: 'group_id',
      key: 'actions',
      className: 'popover',
      render: (_: number, data: any) => <ActionMenu referId={data.project_id} data={data} />
    }
  ];

  //To render the Action tooltip
  const ActionMenu = ({ referId, data }: any) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [updateStatus] = useUpdateVariableStatusMutation();
    const [deleteVariable] = useDeleteVariableMutation();
    const deleteServiceMethod = (id: number) => {
      deleteVariable(id);
    };
    const actions = [
      {
        name: 'View',
        handler: async (id: number) => {
          navigate(`${pathname}/view/${id}`);
        }
      },
      {
        name: 'Edit',
        handler: async (id: number) => {
          navigate(`${pathname}/edit/${id}`);
        }
      },
      {
        name: 'Delete',
        handler: async (settingId: any) => {
          const project_id = typeof settingId === 'number' ? settingId.toString() : settingId;
          const props = {
            serviceMethod: deleteServiceMethod,
            id: project_id
          };
          DeleteNotification(props);
        }
      },
      {
        name: `Set as ${data.status === 0 || null ? 'Active' : 'In-Active'}`,
        handler: async (id: number) => {
          updateStatus({ status: data.status === 1 ? 2 : 1, variable_id: id });
        }
      }
    ];
    return <ActionDropDown referenceId={referId} actions={actions} />;
  };

  /* Table custom column functionality */
  const [visibleColumn, setVisibleColumn] = useState(columns);

  return (
    <>
      <Row className="cls-segment">
        <Col span={24}>
          {/* The following set of code is used implementing the header element */}
          <Row className="cls-header-ele">
            <Col span={20}>
              <FormTitle title={t('segments')} subTitle={t('segments_subtitle')} clsName="normal" />
            </Col>
            <Col span={4}>
              <Button onClick={createSegment} type="primary" size="middle" icon={<PlusCircleFilled />}>
                {t('segments_create')}
              </Button>
            </Col>
          </Row>

          <Row className="cls-filter-ele">
            <Col>
              <Space size={25} align="start">
                <Input
                  suffix={<SearchOutlined style={{ color: '#666' }} onClick={handleGroupNameSearch} />}
                  placeholder={t('search_segments_name')}
                  allowClear
                  onChange={(value: any) => {
                    console.log(value);
                  }}
                />
              </Space>
              <CustomFilter pathname="manage_group" filters={filterProps} />
            </Col>
          </Row>

          <Row>
            <Col span={24} className="cls-segment-table">
              <Table
                data={tableData}
                columns={visibleColumn}
                pagination={{
                  pagination: { pageSize: 6, total: totalCount, current: pageNumber },
                  onChange: (config) => {
                    if (config.current) {
                    }
                  }
                }}
                setVisibleColumn={setVisibleColumn}
                initialColumns={columns}
                hideableColumns={['s_no', 'actions']}
                disabledSelected={[]}
                selected={['s_no', 'group_name', 'description', 'topic', 'contact_count', 'created_by', 'actions']}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Segments;
