import { Button, Col, Row, Popover, Input, Space, message, Tooltip } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import Table from '@/components/Table/Table';
import {
  useLazyGetVariablesQuery,
  useGetVariableMasterInfoQuery,
  useUpdateVariableStatusMutation,
  useDeleteVariableMutation
} from '../../../services/variables/Variable';
import './Variables.scss';
import { useEffect, useState } from 'react';
import CustomFilter from '@/components/CustomFilter/CustomFilter';
import { dateFormat } from '../../../Utils/date';
import { SearchOutlined } from '@ant-design/icons';
import type { DefaultRecordType } from 'rc-table/lib/interface';
import { useAppSelector } from '../../../hooks/App.hook';
import { useDispatch } from 'react-redux';
import { useResize } from '../../../Utils/resize';
import { setVariablePageValue, setVariableSearchValue, setVariableStatusValue, setVariableTypeValue } from '@/stores/DynamicFilter.store';
import type { ListVariableResponse } from '../../../services/variables/VariableTypes';
import type { MailApiResponse } from '../../../services/Service';
import { clearGuideModalInfo } from '@/stores/TemplateProject.store';
import GuideModal from '@/components/GuideModal/GuideModal';
import { SkeletonElement } from '@/components/SkeletonElement/SkeletonElement';
import { DeleteNotification } from '@/components/DeleteNotification/DeleteNotification';
import { Status } from '@/components/Status/Status';
import { FormTitle } from '@/components/Title/Title';
import { ActionDropDown } from '@/components/PopoverMenu/PopoverMenu';


interface IFilterData {
  project: undefined | number;
  status: undefined | number;
  variable_type: undefined | number;
  page: number | undefined;
  search: string | undefined;
}
const Variables = () => {
  const { project, modalGuide } = useAppSelector((state) => state.TemplateProjectReducer);
  const [isModelOpen, setIsModelOpen] = useState(!!modalGuide?.includes('variables'));
  const { variableSearchValue, variableTypeValue, variableStatusValue, variablePageValue } = useAppSelector(
    (state) => state.DynamicFilterReducer
  );
  const [projectVal] = useState(project);
  const dispath = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const [pageNumber, setPageNumber] = useState<number | undefined>(1);
  // eslint-disable-next-line
  const { isSuccess: _masterSuccess, data: masterData } = useGetVariableMasterInfoQuery({});

  // Get the value of isSmallScreen and isMediumScreen from the custom hook
  const { isSmallScreen, isMediumScreen } = useResize();

  // Error handling for variable masterInfo
  useEffect(() => {
    if (masterData?.responseCode === 1 && masterData.response.Message) message.error(masterData.response.Message);
  }, [masterData]);

  const createVariablesClick = () => {
    navigate(`${pathname}/add`);
  };

  const [table, setTable] = useState<{
    columns: any;
    tableData: any;
    size: number;
  }>({
    columns: '',
    tableData: '',
    size: 0
  });
  const [filterData, setFilterData] = useState<IFilterData>({
    project: Number(project),
    status: variableStatusValue,
    variable_type: variableTypeValue,
    page: variablePageValue,
    search: variableSearchValue
  });

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
      label: 'Type',
      labelKey: 'type',
      test_id: 'variable_type',
      value: variableTypeValue,
      data: masterData && masterData.responseCode === 0 ? masterData.response.data.variable_type : [],
      handler: (id: number) => {
        setPageNumber(1);
        dispath(setVariablePageValue(1));
        dispath(setVariableTypeValue(id));
        setFilterData((state) => {
          return { ...state, variable_type: id === -1 ? undefined : id, page: undefined };
        });
      }
    },
    {
      label: 'Status',
      labelKey: 'status',
      value: variableStatusValue,
      data: masterData && masterData.responseCode === 0 ? masterData.response.data.status : [],
      handler: (id: number) => {
        setPageNumber(1);
        dispath(setVariableStatusValue(id));
        dispath(setVariablePageValue(1));
        setFilterData((state) => {
          return { ...state, status: id === -1 ? undefined : id, page: undefined };
        });
      }
    }
  ];
  const [getVariableListService, VariableListServiceStatus] = useLazyGetVariablesQuery();

  // Error handling for getVariableList
  useEffect(() => {
    if (VariableListServiceStatus?.isSuccess && VariableListServiceStatus?.error) {
      const error = ((VariableListServiceStatus as any)?.error as any)?.data;
      if (error) {
        const errorResponse = error?.response?.errors ? error?.response?.errors : error.detail;
        error[Object.keys(error)[0]][0].message
          ? message.error(error[Object.keys(error)[0]][0].message)
          : message.error(errorResponse);
      }
    }
  }, [VariableListServiceStatus]);

  // When modifications are made to the global project, the following
  // useEffect is used to update the value of the variable list.
  useEffect(() => {
    if (project != projectVal)
      setFilterData((state) => {
        return { ...state, project: Number(project), page: undefined };
      });
    else
      setFilterData((state) => {
        return { ...state, project: Number(project) };
      });
  }, [project]);

  const buildTableDataFromAPI = (
    isSuccess: boolean,
    data: MailApiResponse<ListVariableResponse> | undefined,
    // routing: {
    //   navigate: ReturnType<typeof useNavigate>;
    //   pathname: string;
    // },
    isSmallScreen: boolean,
    isMediumScreen: boolean
    //Checks if the screen size is small or medium
  ) => {
    let columns,
      tableData,
      size = 0;

    // row
    if (isSuccess && data) {
      if (data.responseCode === 0 && data.response.data.count > 0) {
        const { results, count } = data.response.data;
        count && (size = count);
        tableData = results.map((item) => {
          return {
            ...item,
            createddate: dateFormat(item.created_at, 'date'),
            created_by: item?.created_by === null || item?.created_by === 'null' ? '-' : item?.created_by
          };
        });
      }
    }

    // columns
    columns = [
      {
        title: 'S.No',
        key: 's_no',
        className: 'cls-no',
        render: (_text: any, _record: any, index: any) => {
          // Calculate the serial number based on the current page and page size
          const serialNo = ((pageNumber as number) - 1) * 6 + (index + 1);
          return serialNo;
        }
      },
      {
        title: 'Variable name',
        dataIndex: 'variable_name',
        key: 'variable_name',
        className: 'cls-variable-name'
      },
      {
        title: 'Type',
        dataIndex: 'variable_type_name',
        key: 'variable_type_name',
        className: 'cls-variable-type'
      },
      {
        title: 'Values',
        dataIndex: 'value',
        key: 'value',
        className: 'cls-variable-value',
        render: (_id: number, data: any) => {
          if (data.value[0] === '<') {
            return (
              <Popover title={null} content={() => <div dangerouslySetInnerHTML={{ __html: data.value }}></div>}>
                <span>{data.value.slice(0, 100)}...</span>
              </Popover>
            );
          } else {
            return <>{data.value}</>;
          }
        }
      },
      {
        title: 'Action',
        dataIndex: 'variable_id',
        key: 'actions',
        className: 'popover',
        render: (id: number, data: any) => <ActionMenu referId={id} data={data} />
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        className: 'cls-descrption',
        render: (_variableId: string | number, data: DefaultRecordType) => (
          <Tooltip title={data.description}>
            <span>{data.description}</span>
          </Tooltip>
        )
      },
      {
        title: 'Status',
        dataIndex: 'status_name',
        key: 'status',
        className: 'cls-variable-status',
        render: (status: string) => <Status name={status} />
      },
      {
        title: 'Created by',
        dataIndex: 'created_by',
        key: 'created_by',
        className: 'cls-variable-createdby',
        render: (_variableId: string | number, data: DefaultRecordType) => (
          <>
            <span>{data.created_by}</span>
          </>
        )
      },
      // The followning method is used to responsive design expand icon click show details
      ...(isSmallScreen
        ? [
            { title: 'Type', dataIndex: 'variable_type_name', key: 'variable_type_name' },
            { title: 'Project', dataIndex: 'project_name', key: 'project_name' },
            { title: 'Status', dataIndex: 'status_name', key: 'status_name', className: 'cls-status' }
          ]
        : []),

      ...(isSmallScreen || isMediumScreen ? [{ title: 'Values', dataIndex: 'value', key: 'value' }] : [])
    ];

    return {
      columns,
      tableData,
      size
    };
  };

  /* Table custom column functionality */
  const [visibleColumn, setVisibleColumn] = useState<any[]>([]);

  useEffect(() => {
    if (VariableListServiceStatus) {
      const { isSuccess, data } = VariableListServiceStatus;
      const { columns, tableData, size } = buildTableDataFromAPI(
        isSuccess,
        data,
        // { navigate, pathname },
        isSmallScreen,
        isMediumScreen
      );
      setTable({
        columns,
        tableData,
        size
      });
      setVisibleColumn(columns);
    }
  }, [VariableListServiceStatus, navigate, pathname, isSmallScreen, isMediumScreen]);

  useEffect(() => {
    if (project != undefined) {
      getVariableListService(filterData);
    }
  }, [filterData, getVariableListService]);

  // Initial time of closing the modal or navigate through modal to clear the specific store value to hide the Integration workflow modal.(Guide)
  useEffect(() => {
    if (isModelOpen == false) {
      dispath(clearGuideModalInfo({ value: 'variables' }));
    }
  }, [isModelOpen]);

  const handleSearchEvent = (event: any) => {
    setSearchValue(event.target.value);
    if (event.target.value == '') setFilterData((state) => ({ ...state, search: '', page: undefined }));
  };

  const searchHandler = (_event: any) => {
    setPageNumber(1);
    dispath(setVariablePageValue(1));
    dispath(setVariableSearchValue(searchValue));
    setFilterData((state) => ({ ...state, search: searchValue, page: undefined }));
  };

  return (
    <div className="Variables">
      <GuideModal
        isOpen={isModelOpen}
        onClose={() => {
          setIsModelOpen(false);
        }}
        isNext={false}
        status="success"
        message=""
        nextStep="Variables Created Succesfully, Now go the Template page and Create their Template."
        buttonLabel="Create Template"
        navigateTo="/templates/new/default"
        additionButtonLabel=""
        additionNavigateTo=""
        pathName="veriables"
      />
      <Row justify="space-between" className="cls-variable" align="middle" gutter={[0, 24]}>
        <Col flex="auto">
          <FormTitle
            title="Variables details"
            subTitle={isSmallScreen ? 'To manage the variables' : 'To manage the variables used in the template'}
            clsName="normal"
          />
        </Col>
        <Col>
          <Button
            data-testid="create_variable_btn"
            type="primary"
            size="large"
            icon={<PlusCircleFilled />}
            onClick={createVariablesClick}
            className="cls-create-variable"
          >
            Add variables
          </Button>
        </Col>
      </Row>
      <Space size={25} align="start" className="mr-2">
        <Input
          onPressEnter={searchHandler}
          data-testid="tracking_input_searchbox"
          suffix={
            <SearchOutlined data-testid="tracking_search_icon" style={{ color: '#666' }} onClick={searchHandler} />
          }
          placeholder="Search"
          allowClear
          onChange={handleSearchEvent}
        />
      </Space>
      <CustomFilter filters={filterProps} pathname="variable" />
      <Row>
        <Col span={24} className="cls-table">
          {VariableListServiceStatus?.isFetching || VariableListServiceStatus?.isLoading ? (
            <SkeletonElement />
          ) : (
            <Table
              data={table.tableData}
              columns={visibleColumn}
              pagination={{
                pagination: { pageSize: 6, total: table.size, current: pageNumber },
                onChange: (config) => {
                  setPageNumber(config.current);
                  dispath(setVariablePageValue(config.current));
                  // change the page
                  if (config.current) {
                    setFilterData((state) => ({ ...state, page: config.current }));
                  }
                }
              }}
              setVisibleColumn={setVisibleColumn}
              initialColumns={(table.columns as any[]) || []}
              disabledSelected={['variable_name']}
              hideableColumns={['actions', 's_no']}
              selected={[
                's_no',
                'variable_name',
                'variable_type_name',
                'value',
                'created_by',
                'status',
                'description',
                'actions'
              ]}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

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
      name: 'Edit',
      handler: async (id: number) => {
        navigate(`${pathname}/edit/${id}`);
      }
    },
    {
      name: 'Delete',
      handler: async (settingId: any) => {
        const setting_id = typeof settingId === 'number' ? settingId.toString() : settingId;
        const props = {
          serviceMethod: deleteServiceMethod,
          id: setting_id
        };
        DeleteNotification(props);
      }
    },
    {
      name: `Set as ${data.status === 1 ? 'In-Active' : 'Active'}`,
      handler: async (id: number) => {
        updateStatus({ status: data.status === 1 ? 2 : 1, variable_id: id });
      }
    }
  ];
  return <ActionDropDown referenceId={referId} actions={actions} />;
};

export default Variables;
