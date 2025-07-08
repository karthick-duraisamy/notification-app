import { useNavigate, useLocation } from 'react-router-dom';
import type { DefaultRecordType } from 'rc-table/lib/interface';
import { Col, Row, Button, Modal, Tooltip, Collapse, Space, Input, message } from 'antd';
import type { TableProps } from 'antd';
import { PlusCircleFilled, ExclamationCircleOutlined, LoadingOutlined, CloseCircleOutlined } from '@ant-design/icons';
import {
  useGetMailerMasterQuery,
  useDeleteMailerMutation,
  useUpdateStatusMutation,
  useLazyGetMailerListQuery,
  useLazyGetMailerQuery
} from '../../../services/mailer/Mailer';
import { useLazyGetTemplateQuery } from '../../../services/templates/Templates';
import Table from '@/components/Table/Table';
import './Mailer.scss';
import { useEffect, useState } from 'react';
import { dateFormat } from '../../../Utils/date';
import { SearchOutlined } from '@ant-design/icons';
import CustomFilter from '@/components/CustomFilter/CustomFilter';
import { FormTitle } from '@/components/Title/Title';
import { Status } from '@/components/Status/Status';
import { ActionDropDown } from '@/components/PopoverMenu/PopoverMenu';
import { useAppSelector } from '../../../hooks/App.hook';
import { useResize } from '../../../Utils/resize';
import { SkeletonElement } from '@/components/SkeletonElement/SkeletonElement';

interface IFilterData {
  // uncomment if folder filter is needed
  // folder: string | undefined;
  status: number | undefined;
  project: string | number | undefined;
  setting: number | undefined;
  search: string | undefined;
}

const Mailer = () => {
  const { project } = useAppSelector((state) => state.TemplateProjectReducer);
  const navigate = useNavigate();
  const { Panel } = Collapse;
  // extract search from use location if folder filter is needed
  const { pathname } = useLocation();
  const { isSuccess: isMasterSuccess, data: masterData } = useGetMailerMasterQuery({
    project: project?.toString()
  });
  const [pageNumber, setPageNumber] = useState<number | undefined>(1);
  // uncomment if folder filter is needed
  // const { data: folderData } = useGetFolderQuery('/mailer');
  const [listService, listData] = useLazyGetMailerListQuery();
  // const { folderOptions: MailerFolderOptions } = useFolderSelection({ mode: 'mailer' });
  const [deleteService] = useDeleteMailerMutation();
  const [updateService] = useUpdateStatusMutation();
  const [getMailerService, getMailerData] = useLazyGetMailerQuery();
  const [getTemplateService] = useLazyGetTemplateQuery();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [waiting, setWaiting] = useState<number[]>([]);
  const [loadedTemplates, setLoadedTemplates] = useState<any>({});

  // Get the value of isSmallScreen and isMediumScreen from the custom hook
  const { isSmallScreen, isMediumScreen } = useResize();
  const [filterData, setFilterData] = useState<IFilterData>({
    // uncomment if folder filter is needed
    // folder: undefined,
    status: undefined,
    project: project?.toString(),
    setting: undefined,
    search: undefined
  });
  const [searchValue, setSearchValue] = useState('');

  // When modifications are made to the global project, the following useEffect is used to update the value of the mail list.
  useEffect(() => {
    setFilterData((state: any) => {
      return { ...state, project: project };
    });
  }, [project]);
  useEffect(() => {
    //to handle error messages
    if (listData.data?.responseCode === 1) {
      message.error(listData.data?.response.Message);
    }
  }, [listData]);
  useEffect(() => {
    if (filterData.project) listService(filterData);
  }, [listService, filterData, project]);
  // uncomment if folder filter is needed
  // useEffect(() => {
  //   let folder = new URLSearchParams(search).get('folder');
  //   let folderId = folder !== null ? folder : undefined;
  //   setFilterData((state) => {
  //     return { ...state, folderId };
  //   });
  // }, []);

  let apiFormat = {
    setting_id: getMailerData.data?.responseCode === 0 ? getMailerData.data?.response?.data?.settings[0]?.setting : '',
    globalData: {},
    recipientList: [
      {
        action_name: '',
        language_code: '',
        to: [],
        cc: [],
        bcc: [],
        data: {}
      }
    ],
    attachments: []
  };
  let tableData, totalCount;

  const filterProps = [
    {
      label: 'Status',
      // unique key
      labelKey: 'status',
      data: masterData && masterData.responseCode === 0 ? masterData.response.data.status : [],
      handler: (id: number) => {
        setFilterData((state) => {
          return { ...state, status: id === -1 ? undefined : id, page: undefined };
        });
      }
    }
    // uncomment if folder filter is needed
    // {
    //   label: 'Folders',
    //   // unique key
    //   labelKey: 'folder',
    //   data: folderData && folderData.responseCode === 0 ? folderData.response.data : [],
    //   handler: (id: string) => {
    //     setFilterData((state) => {
    //       return { ...state, folder: id === 'all' ? undefined : id };
    //     });
    //   },
    // },
    // Comment the project filter, Because it has been moved to the header and is now accessible globally for the entire component.
    // {
    //   label: 'Projects',
    //   // unique key
    //   labelKey: 'project',
    //   data: masterData && masterData.responseCode === 0 ? masterData.response.data.project : [],
    //   handler: (id: number) => {
    //     setFilterData((state) => {
    //       return { ...state, project: id === -1 ? undefined : id };
    //     });
    //   }
    // }
  ];
  // menu component
  const ActionMenu = ({ referId, templateData }: any) => {
    const actions = [
      {
        name: 'Edit',
        handler: async (id: number) => {
          navigate(`${pathname}/edit/${id}`);
        }
      },
      {
        name: 'Delete',
        handler: async (id: number) => {
          deleteService({ id, project: project?.toString() })
            .unwrap()
            .catch((err: any) => {
              if (err.data.response.errors && err.data.response.errors.pk) {
                Modal.confirm({
                  title: 'Warning!',
                  icon: <ExclamationCircleOutlined />,
                  content: 'Related mapping exists, Do you want to delete?',
                  onOk() {
                    deleteService({ id, force_delete: true, project: project?.toString() });
                  },
                  onCancel() {
                    return;
                  }
                });
              }
            });
        }
      },
      {
        name: `Mark as ${templateData.status === 'Active' ? 'Inactive' : 'active'}`,
        handler: async (id: number) => {
          updateService({ mailer_id: id, status: templateData.status === 'Active' ? 2 : 1 });
        }
      },
      {
        name: 'Api docs',
        handler: async (id: number) => {
          setWaiting((state) => [...state, id]);
          getMailerService({ id, project }).then(() => {
            setIsModalVisible(true);
            setWaiting((state) => state.filter((mid) => mid !== id));
          });
        }
      }
    ];
    if (getMailerData.isFetching && waiting.includes(referId)) return <LoadingOutlined style={{ fontSize: 18 }} />;
    return <ActionDropDown referenceId={referId} actions={actions} />;
  };
  const columns: TableProps<DefaultRecordType>['columns'] = [
    {
      title: 'S.No',
      key: 's_no',
      render: (_text: any, _record: any, index: number) => {
        const serialNo = ((pageNumber as number) - 1) * 6 + (index + 1);
        return serialNo;
      }
    },
    {
      title: 'Configuration name',
      dataIndex: 'mailer_name',
      key: 'mailer_name',
      className: 'cls-mailer-name',
      render: (_: string, data: DefaultRecordType) => (
        <>
          <span>{data.name}</span>
        </>
      )
    },
    {
      title: 'Setting name ',
      dataIndex: 'settings',
      key: 'settings',
      render: (_: string, data: DefaultRecordType) => (
        <>
          <span>{data.settings}</span>
        </>
      )
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      className: 'cls-mailer-actions',
      render: (value: string, data: any) => (
        <>
          {value}{' '}
          {data.remainingActions.length > 0 && (
            <Tooltip
              overlayInnerStyle={{
                maxHeight: 100,
                overflowY: 'scroll',
                wordBreak: 'break-word',
                whiteSpace: 'normal'
              }}
              title={data.remainingActions.map((action: any, index: any) => (
                <div key={index}>
                  {action}
                  {index < data.remainingActions.length - 1 ? ', ' : ''}
                </div>
              ))}
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
      title: 'Action',
      dataIndex: 'mailer_id',
      key: 'mailer_id',
      className: 'popover',
      responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      render: (id: number, data: DefaultRecordType) => <ActionMenu referId={id} templateData={data} />
    },
    {
      title: 'Created date',
      dataIndex: 'created_at',
      key: 'created_at',
      className: 'cls-mailer-created',
      render: (_: string, data: DefaultRecordType) => (
        <Tooltip title={data.created_by}>
          <span>{data.created_by}</span>
        </Tooltip>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      className: 'cls-mailer-status',
      render: (status: string) => <Status name={status} />
    },
    {
      title: 'Updated by',
      dataIndex: 'updated_by',
      key: 'updated_by',
      className: 'cls-mailer-updated',
      render: (_mailerId: string, data: DefaultRecordType) => (
        <Tooltip title={data.updated_by}>
          <span>{data.updated_by}</span>
        </Tooltip>
      )
    },
    // The followning method is used to responsive design expand icon click show details
    ...(isSmallScreen || isMediumScreen
      ? [
          { title: 'Updated by', dataIndex: 'updated_by', key: 'updated_by' },
          { title: 'Created date', dataIndex: 'created_at', key: 'created_at' }
        ]
      : []),

    ...(isSmallScreen
      ? [
          { title: 'Actions', dataIndex: 'actions', key: 'actions' },
          { title: 'Status', dataIndex: 'status', key: 'status' }
        ]
      : [])

    // uncomment if mailer folder concept is included
    // {
    //   title: 'Folder',
    //   dataIndex: 'folder_name',
    //   key: 'folder_name',
    // },
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

  if (listData.isSuccess && isMasterSuccess && listData.data && masterData) {
    if (listData.data.responseCode === 0 && masterData.responseCode === 0) {
      totalCount = listData.data.response.data.count;
      const { results } = listData.data.response.data;
      if (results && results.length > 0) {
        tableData = results.map((item: any) => {
          let settings = '';
          for (let i = 0; i < item.settings.length && i < 3; i++) {
            if (i === 2) {
              settings += ` & (${item.settings.length - i} more)`;
              continue;
            }
            settings += `${i === 0 ? ' ' : ','} ${item.settings[i]?.setting_name}`;
          }

          let actions = '',
            remainingActions: string[] = [];
          for (let i = 0; i < item.actions.length && i < 2; i++) {
            if (i === 1) {
              remainingActions = [...item.actions];
              remainingActions.splice(0, 1);
              continue;
            }
            actions += `${i === 0 ? ' ' : ','} ${item.actions[i]}`;
          }

          return {
            ...item,
            remainingActions,
            mailer_name: item.mailer_name,
            project_name: item.project_name,
            settings,
            status: item.status_name,
            actions: actions,
            created_at: dateFormat(item.created_at, 'date'),
            mailer_id: item.mailer_id,
            updated_at: dateFormat(item?.updated_at, 'date'),
            updated_by: item?.updated_by === null || item?.updated_by === 'null' ? '-' : item?.updated_by
          };
        });
      }
    }
  }

  const handleSearchEvent = (event: any) => {
    setSearchValue(event.target.value);
    if (event.target.value == '') setFilterData((state) => ({ ...state, search: '', page: undefined }));
  };

  const searchHandler = () => {
    if (searchValue !== '') setFilterData((state) => ({ ...state, search: searchValue, page: undefined }));
  };

  const accordionHandler = (key: any) => {
    let template_id = key ? key.split(',')[0] : key;
    let action_name = key ? key.split(',')[1] : key;
    let folder_id = key ? key.split(',')[2] : key;
    let language_code = key ? key.split(',')[3] : key;
    if (template_id && !loadedTemplates[template_id]) {
      getTemplateService({ template_id, folder: folder_id }).then((res: any) => {
        let constructedData = apiFormat;
        if (res.data?.responseCode === 0) {
          constructedData.globalData = JSON.parse(res.data.response.data.request_format);
          // constructedData.recipientList[0].language_code = res.data.response.data.language;
          // EN set as default value for demo purpose
          constructedData.recipientList[0].language_code = language_code ? language_code : 'EN';
          constructedData.recipientList[0].action_name = action_name;
        }
        setLoadedTemplates((state: any) => {
          return {
            ...state,
            [template_id]: constructedData
          };
        });
      });
    }
  };
  const createNewMailer = () => {
    navigate(`${pathname}/create/new`);
  };
  return (
    <div className="Mailer">
      <Row justify="space-between">
        <Col flex="auto">
          <FormTitle title="Configuration" subTitle="How would you like to send an notification?" clsName="normal" />
        </Col>
        <Col>
          {isSmallScreen ? (
            <>
              {/* mobile view */}
              <Button
                data-testid="create_mailer_btn"
                onClick={createNewMailer}
                type="primary"
                size="large"
                icon={<PlusCircleFilled />}
                className="cls-mailer-button"
              >
                Create configuration
              </Button>
            </>
          ) : (
            <>
              {/* desktop view */}
              <Button
                data-testid="create_mailer_btn"
                onClick={createNewMailer}
                type="primary"
                size="large"
                icon={<PlusCircleFilled />}
              >
                Create configuration
              </Button>
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Col className="cls-mailer-filter">
          <Space size={25} align="start" className="mr-2 cls-mailer-search-box">
            <Input
              data-testid="tracking_input_searchbox"
              suffix={
                <SearchOutlined data-testid="tracking_search_icon" style={{ color: '#666' }} onClick={searchHandler} />
              }
              placeholder="Search"
              allowClear
              onChange={handleSearchEvent}
            />
          </Space>
          <CustomFilter pathname="mailer" filters={filterProps} />
        </Col>
      </Row>
      <Row>
        <Col span={24} className="cls-table">
          {listData?.isFetching || listData?.isLoading ? (
            <SkeletonElement />
          ) : (
            <Table
              data={tableData || []}
              columns={visibleColumn}
              pagination={{
                pagination: { pageSize: 6, total: totalCount, current: pageNumber },
                onChange: (config) => {
                  setPageNumber(config.current);
                  if (config.current) {
                    listService({ project: project?.toString(), page: config.current });
                  }
                }
              }}
              setVisibleColumn={setVisibleColumn}
              initialColumns={columns}
              hideableColumns={['s_no', 'mailer_id']}
              disabledSelected={['mailer_name', 'actions']}
              selected={['s_no', 'mailer_name', 'settings', 'actions', 'mailer_id', 'status', 'created_at']}
            />
          )}
        </Col>
      </Row>
      <Modal
        className="cls-api-docs"
        title="API docs"
        closeIcon={<CloseCircleOutlined style={{ fontSize: 22, color: '#FF4646' }} />}
        width="80%"
        onCancel={() => {
          setIsModalVisible(false);
        }}
        open={isModalVisible}
        footer={null}
        destroyOnClose={true}
      >
        <Row>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className="mb-3">
            <h4>Endpoint:</h4>{' '}
            {localStorage.getItem('baseUrl') !== 'undefined' &&
            localStorage.getItem('baseUrl') !== null &&
            localStorage.getItem('baseUrl') !== '' &&
            localStorage.getItem('baseUrl')
              ? localStorage.getItem('baseUrl')?.toString()
              : import.meta.env.VITE_API_URL}
            /trigger_servicev2/
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <h4>Request method:</h4> POST
          </Col>
        </Row>
        <Collapse accordion onChange={accordionHandler}>
          {getMailerData.data?.responseCode === 0 &&
            getMailerData.data.response.data.mailer_templates.map((t) => (
              <Panel
                key={`${t.template},${t.unique_name},${t.folder_info.folder}`}
                header={`${t.action_name} - ${t.template_name}`}
              >
                <pre>
                  {loadedTemplates[t.template] ? JSON.stringify(loadedTemplates[t.template], null, 4) : 'Loading..'}
                </pre>
              </Panel>
            ))}
        </Collapse>
      </Modal>
    </div>
  );
};
export default Mailer;
