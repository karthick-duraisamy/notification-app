import { useNavigate, useLocation } from 'react-router';
import type { DefaultRecordType } from 'rc-table/lib/interface';
import { Button, Col, message, Row, Tooltip } from 'antd';
import type { TableProps } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import Table from '@/components/Table/Table';
import {
  useDeleteProjectMutation,
  useChangeProjectStatusMutation,
  useGetProjectMasterInfoQuery,
  useLazyGetProjectsQuery
} from '../../../services/project/Project';
import { useDispatch } from 'react-redux';
import { setTemplateEditId } from '@/stores/Project.store';
import { dateFormat } from '../../../Utils/date';
import CustomFilter from '@/components/CustomFilter/CustomFilter';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../../hooks/App.hook';
import './Project.scss';
import { useResize } from '../../../Utils/resize';
import { DeleteNotification } from '@/components/DeleteNotification/DeleteNotification';
import { ActionDropDown } from '@/components/PopoverMenu/PopoverMenu';
import { Status } from '@/components/Status/Status';
import { clearGuideModalInfo } from '@/stores/TemplateProject.store';
import GuideModal from '@/components/GuideModal/GuideModal';
import { FormTitle } from '@/components/Title/Title';
import { SkeletonElement } from '@/components/SkeletonElement/SkeletonElement';

interface IFilterData {
  project: undefined | number | string;
  status: undefined | number;
  page: undefined | number;
  created_at: any;
}
const Project = () => {
  const { project, modalGuide } = useAppSelector((state: any) => state.TemplateProjectReducer);
  const navigate = useNavigate();
  const [isModelOpen, setIsModelOpen] = useState(modalGuide?.includes('project'));
  const { pathname } = useLocation();
  // eslint-disable-next-line
  const { data: masterData, isFetching, isLoading } = useGetProjectMasterInfoQuery({});
  const [getProjects, getProjectsData] = useLazyGetProjectsQuery();

  const dispatch = useDispatch();
  const [deleteService] = useDeleteProjectMutation();

  const [pageNumber, setPageNumber] = useState<number | undefined>(1);
  // Get the value of isSmallScreen and isMediumScreen from the custom hook
  const { isSmallScreen, isMediumScreen } = useResize();
  const deleteServiceMethod = (id: string | number) => {
    deleteService({ id });
  };

  let isRetrieve: any = [];
  let isUpdate: any = [];
  let isCreate: any = [];
  let isAllPermission: boolean = true;

  const [changeStatus] = useChangeProjectStatusMutation();
  const { menuServiceData } = useAppSelector((state: any) => state.MenuServiceReducer);
  if (menuServiceData?.response?.data?.route.length > 0) {
    isAllPermission = false;
    const projectPermission = menuServiceData?.response?.data?.route.filter(function (el: any) {
      return el.path === '/project/:action';
    });
    if (projectPermission[0].permission[0] === 'all') {
      isAllPermission = true;
    } else {
      isRetrieve = projectPermission[0]?.permission.filter(function (el: any) {
        return el.indexOf('retrieve') !== -1;
      });
      isUpdate = projectPermission[0]?.permission.filter(function (el: any) {
        return el.indexOf('update') !== -1;
      });
      isCreate = projectPermission[0]?.permission.filter(function (el: any) {
        return el.indexOf('all') !== -1;
      });
    }
  }
  const ProjectActions = ({ data }: any) => {
    const rowActions: any[] = [
      {
        name: 'Delete',
        handler: async (id: number) => {
          const props = {
            serviceMethod: deleteServiceMethod,
            id: id
          };
          DeleteNotification(props);
        }
      },
      {
        name: `Set as ${data.status === 'Active' ? 'In-Active' : 'Active'}`,
        handler: async (projectId: any) => {
          changeStatus({ project_id: projectId, status: data.status === 'Active' ? 2 : 1 });
        }
      },
      {
        name: 'Create settings',
        handler: (projectId: any) => {
          navigate(`/settings/create?project=${projectId}`);
        }
      }
    ];
    if (
      isRetrieve.length > 0 ||
      isUpdate.length > 0 ||
      menuServiceData?.response?.data?.route.length === 0 ||
      isAllPermission
    ) {
      rowActions[rowActions.length] = {
        name: 'Edit',
        handler: async (projectId: any) => {
          // check /w balaji if this format is usable
          // navigate(`/project/${projectId}/edit`);
          const project_id = typeof projectId === 'number' ? projectId.toString() : projectId;
          localStorage.setItem('status', project_id);
          dispatch(setTemplateEditId({ project_id }));
          navigate(`${pathname}/edit`);
        }
      };
    }
    // const rowActions = [
    //   {
    //     name: 'Edit',
    //     handler: async (projectId: any) => {
    //       // check /w balaji if this format is usable
    //       // navigate(`/project/${projectId}/edit`);
    //       const project_id = typeof projectId === 'number' ? projectId.toString() : projectId;
    //       dispatch(setTemplateEditId({ project_id }));
    //       navigate(`${pathname}/edit`);
    //     }
    //   },
    //   {
    //     name: 'Delete',
    //     handler: async (projectId: any) => {
    //       const project_id = typeof projectId === 'number' ? projectId.toString() : projectId;
    //       deleteService({ project_id });
    //     }
    //   },
    //   {
    //     name: `Set as ${data.status === 'Active' ? 'In-Active' : 'Active'}`,
    //     handler: async (projectId: any) => {
    //       changeStatus({ project_id: projectId, status: data.status === 'Active' ? 2 : 1 });
    //     }
    //   },
    //   {
    //     name: 'Create settings',
    //     handler: (projectId: any) => {
    //       navigate(`/settings/create?project=${projectId}`);
    //     }
    //   }
    // ];
    return <ActionDropDown referenceId={data.project_id} actions={rowActions} />;
  };

  const columns: TableProps<DefaultRecordType>['columns'] = [
    {
      title: 'S.No',
      key: 's_no',
      render: (_text: any, _record: any, index: any) => {
        // Calculate the serial number based on current page and page size
        const serialNo = ((pageNumber as any) - 1) * 6 + (index + 1);
        return serialNo;
      }
    },
    {
      title: 'Project name',
      dataIndex: 'project_name',
      key: 'title',
      className: 'cls-project-name',
      render: (_: string | number, data: DefaultRecordType) => (
        <>
          <span>{data?.project_name}</span>
        </>
      )
    },
    {
      title: 'Project code',
      dataIndex: 'project_code',
      key: 'project_code',
      className: 'cls-project-name',
      render: (_: string | number, data: DefaultRecordType) => (
        <>
          <span>{data.project_code}</span>
        </>
      )
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      className: 'cls-project-actions',
      responsive: ['md', 'sm', 'xs'],
      render: (value: string, data: any) => (
        <>
          {value}{' '}
          {data.remainingActions.length > 0 && (
            <Tooltip
              overlayInnerStyle={{ maxHeight: 100, overflowY: 'scroll' }}
              title={data.remainingActions.join(', ')}
              color={'var(--background)'}
            >
              {' '}
              & {data.remainingActions.length} more
            </Tooltip>
          )}
        </>
      )
    },
    {
      title: 'Created by',
      dataIndex: 'created_by',
      key: 'created_by',
      className: 'cls-project-created-by',
      responsive: ['md', 'sm', 'xs'],
      render: (_: string | number, data: DefaultRecordType) => (
        <>
          <span>{data.created_by}</span>
        </>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      className: 'cls-project-status',
      responsive: ['md', 'xs', 'sm'],
      render: (status: string) => <Status name={status} />
    },
    {
      title: 'Updated by',
      dataIndex: 'updated_by',
      key: 'updated_by',
      className: 'cls-project-updated-by',
      responsive: ['md', 'sm', 'xs'],
      render: (_: string | number, data: DefaultRecordType) => (
        <>
          <span>{data.updated_by}</span>
        </>
      )
    },

    // The followning method is used to responsive design expand icon click show details
    ...(isSmallScreen
      ? [
          { title: 'Created by', dataIndex: 'created_by', key: 'created_by', className: 'cls-created' },
          { title: 'Updated by', dataIndex: 'updated_by', key: 'updated_by' }
        ]
      : []),
    ...(isSmallScreen || isMediumScreen
      ? [
          { title: 'Actions', dataIndex: 'actions', key: 'actions' },
          { title: 'Updated by', dataIndex: 'updated_by', key: 'updated_by' }
        ]
      : []),

    {
      title: 'Action',
      dataIndex: 'project_id',
      key: 'from',
      className: 'popover',
      responsive: ['lg', 'xs', 'sm'],
      render: (_: string | number, data: DefaultRecordType) => <ProjectActions data={data} />
    }
  ];

  /* Table custom column functionality */
  const [visibleColumn, setVisibleColumn] = useState(columns);

  // Update only the serialNo column dynamically when pageNumber changes
  useEffect(() => {
    setVisibleColumn((prevColumns) =>
      prevColumns.map((column) =>
        column.key === 's_no'
          ? {
              ...column,
              render: (_text: any, _record: any, index: number) => ((pageNumber as number) - 1) * 6 + (index + 1)
            }
          : column
      )
    );
  }, [pageNumber]);

  const [filterData, setFilterData] = useState<IFilterData>({
    project: project,
    status: undefined,
    page: undefined,
    created_at: undefined
  });

  // When modifications are made to the global project,
  // the following useEffect is used to update the value of the setting list.
  useEffect(() => {
    setFilterData((state) => {
      return { ...state, project: Number(project) };
    });
  }, [project]);

  useEffect(() => {
    getProjects(filterData);
    // eslint-disable-next-line
  }, [filterData]);
  useEffect(() => {
    if (getProjectsData.currentData?.responseCode === 1) {
      message.error(getProjectsData?.currentData?.response?.Message);
    }
  }, [getProjectsData]);
  const filterProps = [
    // {
    //   label: 'Project',
    //   // unique key
    //   labelKey: 'project',
    //   data: masterData && masterData.responseCode === 0 ? masterData.response.data.project : [],
    //   handler: (id: number) => {
    //     setFilterData((state) => {
    //       return { ...state, project: id === -1 ? undefined : id };
    //     });
    //   },
    // },
    {
      label: 'Status',
      labelKey: 'status',
      data: masterData && masterData.responseCode === 0 ? masterData.response.data.status : [],
      handler: (id: number) => {
        setFilterData((state) => {
          return { ...state, status: id === -1 ? undefined : id, page: undefined };
        });
      }
    },
    {
      label: 'Created date',
      labelKey: 'date',
      data: [],
      handler: (dateString: any) => {
        setFilterData((state) => {
          return { ...state, created_at: dateString, page: undefined };
        });
      }
    }
  ];
  let tableData, totalCount;

  const { isSuccess, data } = getProjectsData;
  if (isSuccess && data) {
    if (data.responseCode === 0) {
      const { results } = data.response.data;
      totalCount = data.response.data.count;
      if (results && results.length > 0) {
        tableData = results.map((item) => {
          let actions = '',
            remainingActions: string[] = [];
          for (var i = 0; i < item.actions.length && i < 3; i++) {
            if (i === 2) {
              remainingActions = [...item.actions];
              remainingActions.splice(0, 2);
              continue;
            }
            actions += `${i === 0 ? ' ' : ','} ${item.actions[i]}`;
          }

          return {
            ...item,
            actions,
            remainingActions,
            status: item.status_name,
            create_date: dateFormat(item.created_at, 'date'),
            updated_at: dateFormat(item.updated_at, 'date'),
            updated_by: item?.updated_by == null || item?.updated_by === 'null' ? '-' : item?.updated_by
          };
        });
      }
    }
  }
  const createNewProjectClick = () => {
    navigate(`${pathname}/create`);
  };

  // Initial time of closing the modal or navigate through modal to clear the specific store value to hide the Integration workflow modal.(Guide)
  useEffect(() => {
    if (isModelOpen == false && modalGuide.includes('project')) {
      dispatch(clearGuideModalInfo({ value: 'project' }));
    }
  }, [isModelOpen]);

  return (
    <>
      <GuideModal
        isOpen={isModelOpen}
        onClose={() => {
          setIsModelOpen(false);
        }}
        isNext={false}
        status="success"
        message=""
        nextStep="Project Created Succesfully, Now go to Settings page and Create their Settings."
        buttonLabel="Create Settings"
        navigateTo="/settings/create"
        additionButtonLabel="Go to Project"
        additionNavigateTo=""
        pathName="project"
      />
      <Row justify="space-between" className="cls-project-detail" align="middle" gutter={[0, 24]}>
        <Col flex="auto">
          <FormTitle title="Project details" subTitle="To manage the project of the notification" clsName="normal" />
        </Col>
        <Col>
          {isSmallScreen ? (
            <>
              {isCreate.length > 0 || menuServiceData?.response?.data?.route.length === 0 || isAllPermission ? (
                <Button
                  data-testid="new_project_create_btn"
                  onClick={createNewProjectClick}
                  type="primary"
                  size="large"
                  icon={<PlusCircleFilled />}
                  className="cls-create-button"
                >
                  New Project
                </Button>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              {isCreate.length > 0 || menuServiceData?.response?.data?.route.length === 0 || isAllPermission ? (
                <Button
                  data-testid="new_project_create_btn"
                  onClick={createNewProjectClick}
                  type="primary"
                  size="large"
                  icon={<PlusCircleFilled />}
                  className="cls-create-button"
                >
                  Create new project
                </Button>
              ) : (
                <></>
              )}
            </>
          )}
        </Col>
      </Row>
      <Row style={{ margin: '0px 0px 0px 0px' }}>
        <Col span={24} className="cls-project-filter">
          <CustomFilter pathname="project" filters={filterProps} />
        </Col>
      </Row>
      <Row style={{ marginTop: '5px' }}>
        <Col span={24} className="cls-table">
          {isLoading || isFetching ? (
            <SkeletonElement />
          ) : (
            <Table
              data={tableData || []}
              columns={visibleColumn}
              pagination={{
                pagination: { pageSize: 6, total: totalCount, current: pageNumber },
                onChange: (config) => {
                  if (config.current) {
                    setPageNumber(config.current);
                    setFilterData((state) => {
                      return { ...state, page: config.current };
                    });
                  }
                }
              }}
              setVisibleColumn={setVisibleColumn}
              initialColumns={columns}
              hideableColumns={['s_no', 'from']}
              disabledSelected={['title']}
              selected={['s_no', 'title', 'actions', 'status', 'from', 'project_code', 'created_by']}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default Project;
