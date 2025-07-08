import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import type { DefaultRecordType } from 'rc-table/lib/interface';
import type { TableProps } from 'antd';
import { Row, Col, Button, message, Tooltip } from 'antd';
import './Settings.scss';
import { PlusCircleFilled } from '@ant-design/icons';
import {
  useDeleteSettingMutation,
  useLazyGetSettingsQuery,
  useGetSettingMasterInfoQuery,
  useChangeStatusMutation
} from '../../../services/setting/Setting';
import { setTemplateEditId } from '@/stores/Setting.store';
import Table from '@/components/Table/Table';
import { dateFormat } from '../../../Utils/date';
import CustomFilter from '@/components/CustomFilter/CustomFilter';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../hooks/App.hook';
import { useResize } from '../../../Utils/resize';
import { Status } from '@/components/Status/Status';
import { clearGuideModalInfo } from '@/stores/TemplateProject.store';
import type { ListSettingResponse } from '../../../services/setting/SettingTypes';
import { DeleteNotification } from '@/components/DeleteNotification/DeleteNotification';
import { ActionDropDown } from '@/components/PopoverMenu/PopoverMenu';
import GuideModal from '@/components/GuideModal/GuideModal';
import { FormTitle } from '@/components/Title/Title';
import { SkeletonElement } from '@/components/SkeletonElement/SkeletonElement';

interface IFilterData {
  project: string | number | undefined;
  status: undefined | number;
  page: undefined | number;
}

const Settings = () => {
  const { project, modalGuide } = useAppSelector((state) => state.TemplateProjectReducer);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const dispath = useDispatch();
  const [deleteService] = useDeleteSettingMutation();
  // eslint-disable-next-line
  const { data: masterData } = useGetSettingMasterInfoQuery({});
  const [getSettings, getSettingsData] = useLazyGetSettingsQuery();
  const [changeStatus] = useChangeStatusMutation();
  const [isModelOpen, setIsModelOpen] = useState(!!modalGuide?.includes('settings'));

  // Get the value of isSmallScreen from the custom hook
  // Get the value of isMediumScreen from the custom hook
  const { isSmallScreen, isMediumScreen } = useResize();
  const [pageNumber, setPageNumber] = useState<number | undefined>(1);
  const [filterData, setFilterData] = useState<IFilterData>({
    project: project,
    status: undefined,
    page: undefined
  });

  // When modifications are made to the global project,
  // the following useEffect is used to update the value of the setting list.
  useEffect(() => {
    setFilterData((state) => {
      return { ...state, project: project };
    });
  }, [project]);

  const deleteServiceMethod = (setting_id: string) => {
    deleteService({ setting_id });
  };

  useEffect(() => {
    getSettings(filterData);
  }, [filterData, getSettings]);
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
    // {
    //   label: 'Project',
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

  const columns: TableProps<DefaultRecordType>['columns'] = [
    // { title: 'id', dataIndex: 'setting_id', key: 'id' },
    // { title: t('user_name'), dataIndex: 'user_name' },
    {
      title: 'S.No',
      key: 's_no',
      render: (_text: any, _record: any, index: any) => {
        // Calculate the serial number based on the current page and page size
        const serialNo = ((pageNumber as number) - 1) * 6 + (index + 1);
        return serialNo;
      }
    },
    { title: t('settings_name'), dataIndex: 'setting_name', key: 'setting_name', className: 'cls-setting-name' },
    { title: t('mail_type'), dataIndex: 'setting_type_name', key: 'setting_type_name', className: 'cls-setting-type' },
    {
      title: t('from_email_id'),
      dataIndex: 'from_email_id',
      key: 'from_email_id',
      className: 'cls-email-id',
      render: (_: string | number, data: DefaultRecordType) => (
        <Tooltip title={data.from_email_id}>
          <span>{data.from_email_id}</span>
        </Tooltip>
      )
    },
    {
      title: t('end_point') + ' (' + t('port') + ')',
      dataIndex: 'end_point',
      key: 'end_point',
      className: 'cls-setting-end-point',
      render: (value, record) => (
        <Tooltip title={`${value ? value : '-'} ${record.port ? '(' + record.port + ')' : ''}`}>
          <span>{`${value ? value : '-'} ${record.port ? '(' + record.port + ')' : ''}`}</span>
        </Tooltip>
      )
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      width: 110,
      className: 'cls-setting-status',
      render: (status: string) => <Status name={status} />
    },
    {
      title: t('created_by'),
      dataIndex: 'created_by',
      key: 'created_by',
      className: 'cls-setting-createdby',
      render: (_: string | number, data: DefaultRecordType) => (
        <Tooltip title={data.created_by}>
          <span>{data.created_by}</span>
        </Tooltip>
      )
    },
    {
      title: t('updated_by'),
      dataIndex: 'updated_by',
      key: 'updated_by',
      className: 'cls-setting-lastupdatedby',
      render: (_: string | number, data: DefaultRecordType) => (
        <Tooltip title={data.updated_by}>
          <span>{data.updated_by}</span>
        </Tooltip>
      )
    },
    // { title: 'Port', dataIndex: 'port' },
    {
      title: t('user_name'),
      dataIndex: 'user_name',
      key: 'user_name',
      className: 'cls-setting-username',
      render: (_: string | number, data: DefaultRecordType) => (
        <Tooltip title={data.user_name}>
          <span>{data.user_name}</span>
        </Tooltip>
      )
    },
    {
      title: 'Action',
      dataIndex: 'setting_id',
      key: 'setting_id',
      className: 'popover',
      render: (id: number, data: any) => <ActionMenu referId={id} data={data} />
    },
    // The followning method is used to responsive design expand icon click show details
    ...(isSmallScreen
      ? [
          { title: t('from_email_id'), dataIndex: 'from_email_id', key: 'from_email_id' },
          { title: t('mail_type'), dataIndex: 'setting_type_name', key: 'setting_type_name' },
          { title: t('project'), dataIndex: 'project_name', key: 'project_name' }
        ]
      : []),

    ...(isSmallScreen || isMediumScreen ? [{ title: t('end_point'), dataIndex: 'end_point', key: 'end_point' }] : [])
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

  // Initial time of closing the modal or navigate through modal to clear the specific store value to hide the Integration workflow modal.(Guide)
  useEffect(() => {
    if (isModelOpen == false) {
      dispath(clearGuideModalInfo({ value: 'settings' }));
    }
  }, [isModelOpen]);

  let tableData, totalCount;
  const { isSuccess, data } = getSettingsData;
  if (data?.responseCode === 1) {
    const errorKey: any = data?.response['errors'] ? Object.keys(data.response['errors'])[0] : undefined;
    message.error(errorKey ? errorKey + ' ' + (data as any).response['errors'][errorKey][0] : data.response['Message']);
    // message.error(
    //   (data as any)?.response && (data as any)?.response['errors'] && (data as any)?.response['errors']['project']
    //     ? 'Invalid url'
    //     : (data as any)?.response['Message']
    // );
  }
  if (isSuccess && data) {
    // let table = columns;
    if (data.responseCode === 0) {
      const results: any = (data?.response?.data as ListSettingResponse).results
        ? (data?.response?.data as ListSettingResponse).results
        : data?.response?.data;
      totalCount = (results as any).length;
      if (results && (results as any).length > 0) {
        tableData = results.map((item: any) => {
          return {
            setting_id: item.setting_id,
            setting_name: item.setting_name,
            setting_type: item.setting_type,
            setting_type_name: item.setting_type_name,
            project_name: item.project_name,
            end_point: item.end_point,
            from_email_id: item?.from_email_id === '' ? '-' : item?.from_email_id,
            port: item.port,
            user_name: item.user_name,
            status: item.status_name,
            created_at: dateFormat(item.created_at, 'dateTime'),
            created_by: item.created_by,
            updated_at: dateFormat(item.updated_at, 'dateTime'),
            updated_by: item?.updated_by == null || item?.updated_by === 'null' ? '-' : item?.updated_by
          };
        });
      }
    }
  }

  const createNewSettingsClick = () => {
    sessionStorage.removeItem('settingType');
    navigate(`${pathname}/create`);
  };

  const ActionMenu = ({ referId, data }: any) => {
    const actions = [
      {
        name: t('edit'),
        handler: async (settingId: any) => {
          sessionStorage.removeItem('settingType');
          // check /w balaji if this format is usable
          // navigate(`/setting/${settingId}/edit`);
          const setting_id = typeof settingId === 'number' ? settingId.toString() : settingId;
          dispath(setTemplateEditId({ setting_id }));
          navigate(`${pathname}/edit`);
        }
      },
      {
        name: t('delete'),
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
        name: `Mark as ${data.status === 'Active' ? 'Inactive' : 'active'}`,
        handler: async (id: number) => {
          changeStatus({ setting_id: id, status: data.status === 'Active' ? 2 : 1 });
        }
      }
    ];
    return <ActionDropDown referenceId={referId} actions={actions} />;
  };

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
        nextStep="Settings Created Succesfully, Now go to Variables page and Create their Variables."
        buttonLabel="Create Variables"
        navigateTo="/variables/add"
        additionButtonLabel="Go to Settings"
        additionNavigateTo=""
        pathName="settings"
      />
      <div className="Settings" data-testid="Settings">
        <Row justify="space-between" align="middle" gutter={[0, 24]} className="cls-setting-page">
          <Col flex="auto">
            <FormTitle title="title_settings" subTitle="subtitle_settings" clsName="normal" />
          </Col>
          <Col>
            {isSmallScreen ? (
              <>
                <Button
                  data-testid="new_setting_create_btn"
                  type="primary"
                  size="large"
                  icon={<PlusCircleFilled />}
                  onClick={createNewSettingsClick}
                  className="cls-setting-button"
                >
                  {t('create_settings')}
                </Button>
              </>
            ) : (
              <>
                <Button
                  data-testid="new_setting_create_btn"
                  type="primary"
                  size="large"
                  icon={<PlusCircleFilled />}
                  onClick={createNewSettingsClick}
                >
                  {t('create_settings')}
                </Button>
              </>
            )}
          </Col>
        </Row>
        <CustomFilter pathname="settings" filters={filterProps} />
        <Row>
          <Col span={24} className="cls-table">
            {getSettingsData?.isLoading || getSettingsData?.isFetching ? (
              <SkeletonElement />
            ) : (
              <Table
                data={tableData}
                columns={visibleColumn}
                pagination={{
                  pagination: { pageSize: 6, total: totalCount, current: pageNumber },
                  onChange: (config) => {
                    if (config.current) {
                      setFilterData((state) => {
                        return { ...state, page: config.current };
                      });
                      setPageNumber(config.current);
                    }
                  }
                }}
                initialColumns={columns}
                setVisibleColumn={setVisibleColumn}
                disabledSelected={['setting_name']}
                hideableColumns={['s_no', 'setting_id']}
                selected={[
                  's_no',
                  'setting_name',
                  'setting_type_name',
                  'from_email_id',
                  'end_point',
                  'status',
                  'setting_id',
                  'created_by',
                  'updated_by'
                ]}
              />
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Settings;
