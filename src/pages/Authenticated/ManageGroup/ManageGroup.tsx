import { Button, Col, Input, Modal, notification, Row, Space } from 'antd';
import type { TableProps } from 'antd';
import './ManageGroup.scss';
import { useTranslation } from 'react-i18next';
import { PlusCircleFilled, SearchOutlined } from '@ant-design/icons';
import type { DefaultRecordType } from 'rc-table/lib/interface';
import Table from '@/components/Table/Table';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks/App.hook';
import { useDeleteContactGroupMutation, useLazyGetContactGroupMasterQuery, useLazyGetcontactUploadHistoryQuery, useLazyGetGroupsListQuery, useUpdateGroupStatusMutation } from '../../../services/contacts/groups/Group';
import { dateFormat } from '../../../Utils/date';
import { setActionId } from '@/stores/TemplateProject.store';
import { DeleteNotification } from '@/components/DeleteNotification/DeleteNotification';
import CustomFilter from '@/components/CustomFilter/CustomFilter';
import { SkeletonElement } from '@/components/SkeletonElement/SkeletonElement';
import GroupDetailShow from '@/components/GroupDetailShow/GroupDetailShow';
import { ActionDropDown } from '@/components/PopoverMenu/PopoverMenu';
import { FormTitle } from '@/components/Title/Title';
import { Status } from '@/components/Status/Status';

const ManageGroup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispath = useDispatch();
  // The following line is used to get the project value form store.
  const { project } = useAppSelector((state) => state.TemplateProjectReducer);
  // The following line is used to set the filter option for the group list
  const [filterData, setFilterData] = useState<any>({
    topic: undefined,
    project: project !== undefined && project !== null ? Number(project) : undefined,
    page: 1,
    page_size: 6,
  });
  const [groupSearch, setGroupSearch] = useState<string | undefined>(undefined);
  // The following service call is made to get the master info response
  const [getMaterInfo, getMaterInfoStatus] = useLazyGetContactGroupMasterQuery();
  // The following line is used to define the service name and their respective value for getting group list
  const [getGroups, getGroupsData] = useLazyGetGroupsListQuery();

  // The following service call is made to get the upload history response
  const [getContactuploadHistory, getContactuploadHistoryStatus]: any = useLazyGetcontactUploadHistoryQuery();
  // to open the history modal
  const [openModal, setOpenModal] = useState(false);
  //Updates the Status
  const [updateGroupStatus, getUpdateGroupStatus] = useUpdateGroupStatusMutation();

  // The following useEffect is triggered at initial render to get the group list info.
  useEffect(() => {
    if (project !== undefined && project !== null) {
      getGroups({ project: project });
      getMaterInfo({ project: project });
    }
  }, []);
  // The following useeffect is triggered when modification is made in project value
  useEffect(() => {
    if (project !== undefined && project !== null) {
      getGroups({ project: project });
      getMaterInfo({ project: project });
    }
  }, [project]);

  //After the Status updation to Success message.
  useEffect(() => {
    if (getUpdateGroupStatus?.isSuccess)
      notification.success({ message: `Status updated successfully` });
  }, [getUpdateGroupStatus?.isSuccess])

  // The following useEffect is triggered when change the filter options or pagination
  useEffect(() => {
    getGroups(filterData);
  }, [filterData]);

  // The following state value to set the group list info and passed to table component
  let [listData, setListData] = useState(undefined);
  // The following state value to set the group list count and passed to table component
  let [listCount, setListCount] = useState(undefined);


  // The following useEffect is triggered to get the group list success or failure response.
  useEffect(() => {
    if (getGroupsData?.isSuccess) {
      let { results } = (getGroupsData as any)?.data?.response?.data;
      setListCount((getGroupsData as any)?.data?.response?.data?.count);
      let tableData = results.map((item: any) => {
        return {
          ...item,
          status_name: item.status_name,
          create_date: dateFormat(item.created_at, 'date'),
          create_time: dateFormat(item.created_at),
          updated_at: dateFormat(item?.updated_at, 'date'),
          updated_by: item.updated_by
        };
      });

      //If response have count of group detail, that time only set's the table's data.
      if ((getGroupsData as any)?.data?.response?.data?.count != 0)
        setListData(tableData);
      else setListData(undefined)
    }
  }, [getGroupsData]);

  // The following method is triggered when user click the create manage group button
  const createManageGroup = () => {
    navigate(`${pathname}/create`);
    console.log('create manage group button clicked');
  };

  // to navigate and store the id 
  const groupNavigate = (group_name: any, group_id: string) => {
    navigate(`${pathname}/view/${group_name}`);
    dispath(setActionId({ value: group_id }));
  }
  const filterProps = [
    {
      label: 'Topic',
      labelKey: 'topic',
      data:
        getMaterInfoStatus?.isSuccess && (getMaterInfoStatus as any)?.data?.response?.data?.topic
          ? (getMaterInfoStatus as any)?.data?.response?.data?.topic
          : [],
      handler: (id: number) => {
        setFilterData((prev: any) => ({
          ...prev,
          project: project,
          r_topic: id
        }));
      }
    }
  ];

  // The following method is triggered when search icon is clicked to filter the group name
  const handleGroupNameSearch = () => {
    setFilterData((prev: any) => ({
      ...prev,
      project: project,
      name: groupSearch
    }));
  };

  const columns: TableProps<DefaultRecordType>['columns'] = [
    {
      title: 'S.No',
      key: 's_no',
      render: (_text: any, _record: any, index: any) => {
        // Calculate the serial number based on current page and page size
        const serialNo = ((filterData.page as number) - 1) * 6 + (index + 1);
        return serialNo;
      }
    },
    {
      title: 'Group name',
      key: 'group_name',
      render: (data: DefaultRecordType) => (
        <>
          <span className="cls-group-name" onClick={() => groupNavigate(data?.group_name, data?.group_id)}>{data?.group_name}</span>
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
          <span>{data?.topic ? data?.topic : '-'}</span>
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
      title: 'Status',
      dataIndex: 'status_name',
      key: 'status_name',
      className: 'cls-variable-status',
      render: (status: string) => <Status name={status} />
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
      render: (_id: number, data: any) => <ActionMenu referId={data.project_id} data={data} />
    }
  ];
  //The following function to run on upload history click
  const uploadContactHistory = (value: any) => {
    getContactuploadHistory({ project: project, contact_group: value.id });
    setOpenModal(true);
  }

  // Find the Status against value(id)
  const findStatusValue = (statusName: any) => {
    const nextLabel = statusName === "Active" ? "In-Active" : "Active";
    const found = (getMaterInfoStatus as any)?.data?.response?.data?.status.find((status: { label: string; }) => status.label === nextLabel);
    return found ? found.value : null;
  };

  //To render the Action tooltip data and id sent to ActionDropdown
  const ActionMenu = ({ referId, data }: any) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [deleteContactGroup] = useDeleteContactGroupMutation();

    const deleteServiceMethod = () => {
      deleteContactGroup({ id: data?.group_id, project })
        .then(() => {
          notification.success({ message: `${data?.group_name} group deleted successfully` });
        })
        .catch((error: any) => {
          console.error('Delete failed', error);
        });
    };

    const actions = [
      {
        name: 'View group',
        handler: async () => {
          groupNavigate(data?.group_name, data?.group_id);
          navigate(`${pathname}/view/${data?.group_name}`);
        }
      },
      {
        name: 'Upload history',
        handler: async () => {
          uploadContactHistory({ id: data?.group_id });
        }
      },
      {
        name: `Set as ${data.status_name === 'Active' ? 'In-Active' : 'Active'}`,
        handler: async () => {
          updateGroupStatus({ id: data?.group_id, contactGroup: { status: findStatusValue(data?.status_name) } });
        }
      },
      {
        name: 'Delete group',
        handler: async () => {
          const props = {
            serviceMethod: deleteServiceMethod,
            id: project
          };
          DeleteNotification(props);
          dispath(setActionId({ value: data?.group_id }));
        }
      }

    ];
    return <ActionDropDown referenceId={referId} actions={actions} />;
  };

  /* Table custom column functionality */
  const [visibleColumn, setVisibleColumn] = useState(columns);

  // Contact history is not there means showing the notification.
  useEffect(() => {
    if (getContactuploadHistoryStatus?.isSuccess) {
      const results = getContactuploadHistoryStatus?.data?.response?.data?.results;

      if (results && results.length > 0) {
        const totalCount = results[0].total_count;

        if (totalCount > 0) {
          setOpenModal(true);
        } else {
          notification.info({
            message: 'No contact upload history available for this group',
            placement: 'topRight'
          });
        }
      }
    }
  }, [getContactuploadHistoryStatus]);

  return (
    <>
      <Row className="cls-manage-group">
        <Col span={24}>
          {/* The following set of code is used implementing the header element */}
          <Row className="cls-header-ele">
            <Col span={20}>
              <FormTitle title={t('manage_group')} subTitle={t('manage_group_subtitle')} clsName="normal" />
            </Col>
            <Col span={4}>
              <Button onClick={createManageGroup} type="primary" size="middle" icon={<PlusCircleFilled />}>
                Create group
              </Button>
            </Col>
          </Row>

          <Row className="cls-filter-ele">
            <Col>
              <Space size={25} align="start">
                <Input
                  suffix={<SearchOutlined style={{ color: '#666' }} onClick={handleGroupNameSearch} />}
                  placeholder="Search group name"
                  allowClear
                  onChange={(event: any) => {
                    if (event?.target?.value) {
                      setGroupSearch(event?.target?.value);
                    } else {
                      setGroupSearch("");
                      setFilterData((prev: any) => ({
                        ...prev,
                        project: project,
                        name: ""
                      }));
                    }
                  }}
                />
              </Space>
              <CustomFilter pathname="manage_group" filters={filterProps} />
            </Col>
          </Row>
          {getGroupsData.isFetching ? <SkeletonElement /> : <Row>
            <Col span={24} className="cls-group-table">
              <Table
                data={listData || []}
                columns={visibleColumn}
                pagination={{
                  pagination: { pageSize: filterData?.page_size, total: listCount, current: filterData.page },
                  onChange: (config) => {
                    setFilterData((prev: any) => ({
                      ...prev,
                      page: config?.current,
                      page_size: config?.pageSize,
                      project: project
                    }));
                  }
                }}
                setVisibleColumn={setVisibleColumn}
                initialColumns={columns}
                hideableColumns={['s_no', 'actions']}
                disabledSelected={[]}
                selected={['s_no', 'group_name', 'description', 'topic', 'contact_count', 'status_name', 'created_by', 'actions']}
              />
            </Col>
          </Row>}
        </Col>
        {getContactuploadHistoryStatus?.isSuccess && (getContactuploadHistoryStatus?.data?.response?.data?.results).length > 0 && (getContactuploadHistoryStatus?.data?.response?.data?.results?.[0].total_count) > 0 && (
          <Modal open={openModal} onCancel={() => {
            setOpenModal(false)
          }} footer={null} centered className='cls-modal-section'>
            {getContactuploadHistoryStatus?.data?.response?.data.results.map((data: any, index: any) => (
              <GroupDetailShow manageGroup={data} responseData={undefined} groupDetails={undefined} index={index} manageGroupLength={(getContactuploadHistoryStatus?.data?.response?.data.results).length} count={(getContactuploadHistoryStatus?.data?.response?.data?.count)} />
            ))}
          </Modal>
        )}

      </Row>
    </>
  );
};

export default ManageGroup;
