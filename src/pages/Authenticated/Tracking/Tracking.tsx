import { useState, useEffect, useRef } from 'react';
import type { TableProps } from 'antd';
import { Modal, notification, Space, Input, message, Tooltip, Button, Col, Row, Popconfirm, Popover } from 'antd';
import { CloseCircleOutlined, LoadingOutlined, UnorderedListOutlined, FilterOutlined } from '@ant-design/icons';
import type { DefaultRecordType } from 'rc-table/lib/interface';
import Table from '@/components/Table/Table';

import TrackingModal from './TrackingModal';
import {
  useResendMailMutation,
  useLazyGetTrackingInfoQuery,
  useLazyGetTrackingListQuery,
  useLazyGetMasterInfoQuery
} from '../../../services/Tracking/Tracking';
import CustomFilter from '@/components/CustomFilter/CustomFilter';
import './Tracking.scss';
import {
  formatDateTime,
  getLastSaturday,
  getLastSunday,
  getMonthEndDate,
  getMonthStartDate,
  getThisSunday
} from '../../../Utils/date';
import { useAppSelector } from '../../../hooks/App.hook';
import { useDispatch } from 'react-redux';
import { useGetProjectSelection } from '../../../hooks/Selection.hook';
import TrackingPopover from './TrackingPopover';
import { useGetDownloadInfoMutation } from '../../../services/initializer/initializer';
import { useResize } from '../../../Utils/resize';
import { SkeletonElement } from '@/components/SkeletonElement/SkeletonElement';
import { FormTitle } from '@/components/Title/Title';
import { decodeBase64ToBinary, handleAttachmentDownload, handleImageDownload } from '../../../Utils/user';
import type { PreviewDataRequest, Result } from '../../../services/Tracking/TrackingTypes';
import { ActionDropDown } from '@/components/PopoverMenu/PopoverMenu';
import { Status } from '@/components/Status/Status';
import { setTemplateProjectId } from '@/stores/TemplateProject.store';
import { setDynamicFilterInfo } from '@/stores/DynamicFilter.store';
import { useTheming } from '../../../hooks/Theme.hook';
import { UTCConvertion } from '@/Utils/commonFunction';

const Tracking = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dashboardCount, setDashboardCount] = useState(true);
  // const [searchValue, setSearchValue] = useState('');
  const [getList, listResponse] = useLazyGetTrackingListQuery();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [getMaster, masterResponse] = useLazyGetMasterInfoQuery();
  const [getInfo, infoResponse] = useLazyGetTrackingInfoQuery();
  const [attachmentsInfo] = useGetDownloadInfoMutation();
  const [resendMail, resendInfo] = useResendMailMutation();
  // const [resendAllMail] = useResendAllMailMutation();
  const [waiting, setWaiting] = useState<number[]>([]);
  const [isResend, setIsResend] = useState<boolean>(false);
  const [isCustomDateFilter, setIsCustomDateFilter] = useState<boolean>(false);
  const [isCreatedDateFilter, setIsCreatedDateFilter] = useState<boolean>(false);

  // Get the value of isSmallScreen and isMediumScreen from the custom hook
  const { isSmallScreen } = useResize();
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [showColumn] = useState(sessionStorage?.getItem('iframe_token'));
  let isLoader: boolean = true;
  const { filterOption } = useAppSelector((state: any) => state.DynamicFilterReducer);
  const [filterElement, setFilterElement] = useState<any[]>([]);
  const dispath = useDispatch();
  let { project, isTimezoneConversion, dashboardTrackingInfo, isTrackingModule } = useAppSelector(
    (state: any) => state.TemplateProjectReducer
  );
  const [isServiceCall, setIsServiceCall] = useState<boolean>(true);
  const { selectProject } = useGetProjectSelection();

  // The following useState is used for maintain the current filter value.
  // In case of, if user, type any value on input or any filter option but they did not click the apply filter button.
  // When user change the pagination, previously applied filter value is triggered in api request or query.
  const initialFilterValue = {
    searchInputValue: undefined,
    searchToMailValue: undefined,
    searchFilters: [],
    apiRequestValue: undefined,
    settingIdValue: undefined,
    actionNameValue: undefined,
    templateNameValue: undefined,
    languageId: undefined,
    attachmentInfo: undefined,
    status: null,
    dateRange: dashboardTrackingInfo !== undefined ? dashboardTrackingInfo : 'today',
    createStartDate: undefined,
    createEndDate: undefined,
    createdOn: undefined,
    settingType: undefined,
    type: undefined,
    environment: undefined,
    api_response_id: undefined
  };
  const [currentfilterInfo, setCurrentfilterInfo] = useState(initialFilterValue);
  const [filteredInfo, setfilteredInfo] = useState(initialFilterValue);
  const { changeTheme } = useTheming();
  const [isClearData, setIsClearData] = useState<boolean>(false);
  const [filterDataInfo, setFilterDataInfo] = useState<string[]>(filterOption);
  const [projectData, setProjectData] = useState<any>();

  // The following method is triggered when changes is made on date select box.
  const handleDateRangeChange = (value: any, type?: string) => {
    setCurrentfilterInfo((prevState: any) => ({
      ...prevState,
      dateRange: value
    }));
    let data: boolean = value === 'custom' ? true : false;
    setIsCustomDateFilter(data);
    let isCreateddata: boolean = value === 'created_at' ? true : false;
    setIsCreatedDateFilter(isCreateddata);
    if (value !== 'custom') {
      let startingDate: any = '';
      let endingDate: any = '';
      let singleDate: any | undefined;
      if (value === 'today' || value === 'yesterday' || value === 'created_at') {
        switch (value) {
          case 'today':
          case 'created_at':
            singleDate = isTimezoneConversion ? new Date() : new Date().toLocaleDateString('en-CA');
            break;
          case 'yesterday':
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            singleDate = isTimezoneConversion
              ? yesterday
              : new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString('en-CA');
            break;
        }
        setPageNumber(1);
        setCurrentfilterInfo((prevState: any) => ({
          ...prevState,
          createStartDate: isTimezoneConversion ? UTCConvertion(singleDate, 'start') : undefined,
          createEndDate: isTimezoneConversion ? UTCConvertion(singleDate, 'end') : undefined,
          createdOn: isTimezoneConversion ? undefined : singleDate
        }));
        switch (type) {
          case 'start':
            return UTCConvertion(singleDate, 'start');
          case 'end':
            return UTCConvertion(singleDate, 'end');
          case 'singleDate':
            return singleDate;
        }
      } else {
        // On initial time loading from another tab that value setted as undefined so its get all data.
        let dateValue = new Date().toLocaleDateString('en-CA');
        switch (value) {
          case 'this_week':
            startingDate = isTimezoneConversion ? getThisSunday(true) : getThisSunday();
            endingDate = isTimezoneConversion ? new Date() : new Date().toLocaleDateString('en-CA');
            dateValue = '';
            break;
          case 'last_week':
            startingDate = isTimezoneConversion ? getLastSunday(true) : getLastSunday();
            endingDate = isTimezoneConversion ? getLastSaturday(true) : getLastSaturday();
            dateValue = '';
            break;
          case 'this_month':
            startingDate = isTimezoneConversion ? getMonthStartDate(undefined, undefined, true) : getMonthStartDate();
            endingDate = isTimezoneConversion ? new Date() : new Date().toLocaleDateString('en-CA');
            dateValue = '';
            break;
          case 'last_month':
            startingDate = isTimezoneConversion
              ? getMonthStartDate(new Date().getMonth(), new Date().getFullYear(), true)
              : getMonthStartDate(new Date().getMonth(), new Date().getFullYear());
            endingDate = isTimezoneConversion ? getMonthEndDate(undefined, undefined, true) : getMonthEndDate();
            dateValue = '';
            break;
        }
        switch (type) {
          case 'start':
            return isTimezoneConversion ? UTCConvertion(startingDate, 'start') : startingDate;
          case 'end':
            return isTimezoneConversion ? UTCConvertion(endingDate, 'end') : endingDate;
        }
        setPageNumber(1);
        setCurrentfilterInfo((prevState: any) => ({
          ...prevState,
          createStartDate: isTimezoneConversion ? UTCConvertion(startingDate, 'start') : startingDate,
          createEndDate: isTimezoneConversion ? UTCConvertion(endingDate, 'end') : endingDate,
          createdOn: dateValue
        }));
      }
    }
  };

  useEffect(() => {
    if (masterResponse?.isSuccess && sessionStorage.getItem('isDashboardTracking') === '1')
      setCurrentfilterInfo((prevState: any) => ({
        ...prevState,
        status: handleFailureRequest((masterResponse?.data?.response as any)?.data?.status, 'failure')
      }));
  }, [masterResponse?.isSuccess]);

  useEffect(() => {
    if (selectProject?.length > 0) {
      let project_Info = Number(localStorage.getItem('project'));
      let projectData = selectProject.filter((projectInfo: any) => projectInfo.id === project_Info);
      setProjectData(projectData);
      const projectCode = projectData[0]?.code?.toLocaleLowerCase() || '';
      if (
        ['xy', '6e', 'qr'].some((code) => projectCode.includes(code)) &&
        sessionStorage.getItem('iframe_token') !== null
      ) {
        changeTheme(
          projectCode?.includes('xy')
            ? 'XY'
            : projectCode?.includes('6e')
            ? 'Indigo'
            : projectCode.includes('qr')
            ? 'QR'
            : 'light'
        );
      }
    }
  }, [selectProject]);

  useEffect(() => {
    if (isClearData && filterOption.length === 0) {
      const timer = setTimeout(() => {
        setIsClearData(false);
        dispath(setDynamicFilterInfo(filterDataInfo));
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isClearData, filterOption]);

  useEffect(() => {
    if (!isClearData) setFilterDataInfo(filterOption);
  }, [filterOption]);

  // The following method is triggered when use click 'Apply filter' button. The value assigned to service is get from state value.
  const applyFilter = (type?: string | undefined, pageVal?: number | undefined) => {
    if (
      (currentfilterInfo?.searchToMailValue as any)?.length > 0 &&
      currentfilterInfo?.searchFilters.length === 0 &&
      !showColumn &&
      type != 'page'
    ) {
      notification['error']({
        message: 'Error!',
        description: 'Select any of the search parameters, such as To, like that',
        duration: 2
      });
      setPageNumber(1);
    } else if (
      (currentfilterInfo?.searchToMailValue as any)?.length === 0 &&
      currentfilterInfo?.searchFilters.length > 0 &&
      !showColumn &&
      type != 'page'
    ) {
      notification['error']({
        message: 'Error!',
        description: 'Enter the search value',
        duration: 2
      });
      setPageNumber(1);
    } else {
      if (pageVal === undefined) setPageNumber(1);
      if (type !== 'page') setfilteredInfo({ ...currentfilterInfo });
      let filterValue =
        type !== 'page' || (dashboardCount && dashboardTrackingInfo) ? { ...currentfilterInfo } : { ...filteredInfo };
      if (type === 'page') setDashboardCount(false);
      getList({
        project: Number(sessionStorage.getItem('project_id'))
          ? Number(sessionStorage.getItem('project_id'))
          : project
          ? Number(project)
          : Number(localStorage.getItem('project')),
        status: (filterValue as any)?.status,
        searchSubject: filterValue?.searchInputValue,
        searchMailId: filterValue?.searchToMailValue,
        page: type === 'page' ? pageVal : 1,
        search_fields: filterValue?.searchFilters,
        filter_fields: filterValue?.attachmentInfo,
        created_at: isTimezoneConversion
          ? undefined
          : (!filterValue?.createStartDate || !filterValue?.createEndDate) && !filterValue?.createdOn
          ? new Date().toLocaleDateString('en-CA')
          : filterValue?.createdOn,
        api_request: filterValue?.apiRequestValue,
        type: filterValue?.type,
        environment: filterValue?.environment,
        apiResponseId: filterValue?.api_response_id,
        settingType: filterValue.settingType,
        setting_id: Number(sessionStorage.getItem('setting_id'))
          ? Number(sessionStorage.getItem('setting_id'))
          : filterValue?.settingIdValue,
        template_name: filterValue?.templateNameValue,
        action_name: filterValue?.actionNameValue,
        created_start_date: filterValue?.createStartDate,
        created_end_date: filterValue?.createEndDate,
        language: filterValue?.languageId,
        trackingModule: isTrackingModule ? isTrackingModule : undefined
      });
    }
    setPopoverVisible(false);
  };

  const handleFailureRequest = (listData: any, type: string): any => {
    const foundObject = listData?.find((item: any) => item.label.toLocaleLowerCase() === type);
    return foundObject ? foundObject.value : undefined;
  };

  useEffect(() => {
    setIsResend(resendInfo.isLoading);
  }, [resendInfo.isLoading]);

  useEffect(() => {
    if (!listResponse?.isFetching && !isLoader) setIsServiceCall(true);
  }, [listResponse?.isFetching, isLoader]);

  // Following method is triggered when user click the clear filter button. At that time we update the filters state value as undefined.
  const clearFilter = (type?: string) => {
    if (
      currentfilterInfo?.status ||
      (currentfilterInfo?.searchInputValue as any)?.length > 0 ||
      (currentfilterInfo?.searchToMailValue as any)?.length > 0 ||
      currentfilterInfo?.searchFilters.length > 0 ||
      currentfilterInfo?.attachmentInfo ||
      currentfilterInfo?.createdOn ||
      currentfilterInfo?.apiRequestValue ||
      currentfilterInfo?.apiRequestValue ||
      currentfilterInfo?.type ||
      currentfilterInfo?.settingType ||
      currentfilterInfo?.environment ||
      currentfilterInfo?.templateNameValue ||
      currentfilterInfo?.actionNameValue ||
      currentfilterInfo?.languageId ||
      currentfilterInfo?.createStartDate ||
      currentfilterInfo?.createEndDate
    ) {
      let requestData: any = {
        project: Number(sessionStorage.getItem('project_id'))
          ? Number(sessionStorage.getItem('project_id'))
          : Number(project),
        trackingModule: isTrackingModule ? isTrackingModule : undefined
      };
      if (isTimezoneConversion) {
        requestData['created_start_date'] = UTCConvertion(new Date(), 'start');
        requestData['created_end_date'] = UTCConvertion(new Date(), 'end');
      } else requestData['created_at'] = new Date().toLocaleDateString('en-CA');
      if (showColumn) {
        requestData['setting_id'] = Number(sessionStorage.getItem('setting_id'))
          ? Number(sessionStorage.getItem('setting_id'))
          : currentfilterInfo?.settingIdValue;
      }
      setCurrentfilterInfo((prevState: any) => ({
        ...prevState,
        dateRange: 'today',
        searchInputValue: '',
        searchToMailValue: '',
        searchFilters: [],
        apiRequestValue: undefined,
        settingIdValue: undefined,
        actionNameValue: undefined,
        templateNameValue: undefined,
        languageId: undefined,
        attachmentInfo: undefined,
        status: undefined,
        type: undefined,
        environment: undefined,
        api_response_id: undefined,
        settingType: undefined,
        createStartDate: isTimezoneConversion ? UTCConvertion(new Date(), 'start') : undefined,
        createEndDate: isTimezoneConversion ? UTCConvertion(new Date(), 'end') : undefined,
        createdOn: isTimezoneConversion ? undefined : new Date().toLocaleDateString('en-CA')
      }));
      dispath(setDynamicFilterInfo(['Date range']));
      if (type === 'data') setIsClearData(true);
      setIsCustomDateFilter(false);
      getList(requestData);
      setPageNumber(1);
    } else if (type === undefined) {
      dispath(setDynamicFilterInfo(['Date range']));
    }
    setPopoverVisible(false);
  };

  // When modifications are made to the global project, the following useEffect is used to update the value of the tracking list.
  useEffect(() => {
    if (project != undefined) {
      if (sessionStorage.getItem('iframe_token')) {
      } else {
        getList({
          project: Number(project),
          created_at: isTimezoneConversion ? undefined : currentfilterInfo?.createdOn,
          created_start_date: dashboardTrackingInfo
            ? handleDateRangeChange(dashboardTrackingInfo, 'start')
            : isTimezoneConversion
            ? UTCConvertion(new Date(), 'start')
            : undefined,
          created_end_date: dashboardTrackingInfo
            ? handleDateRangeChange(dashboardTrackingInfo, 'end')
            : isTimezoneConversion
            ? UTCConvertion(new Date(), 'end')
            : undefined,
          status:
            sessionStorage.getItem('isDashboardTracking') === '1'
              ? handleFailureRequest((masterResponse?.data?.response as any)?.data?.status, 'failure')
              : undefined,
          trackingModule: isTrackingModule ? isTrackingModule : undefined
        });
        // When project id changes means filter option value is set as undefined so that when project is change any filter options is not made.
        setPageNumber(1);
        setIsCreatedDateFilter(false);
        setIsCustomDateFilter(false);
        setCurrentfilterInfo((prevState: any) => ({
          ...prevState,
          searchInputValue: undefined,
          searchToMailValue: undefined,
          searchFilters: [],
          apiRequestValue: undefined,
          type: undefined,
          settingType: undefined,
          environment: undefined,
          api_response_id: undefined,
          settingIdValue: undefined,
          actionNameValue: undefined,
          templateNameValue: undefined,
          languageId: undefined,
          attachmentInfo: undefined,
          status: undefined,
          dateRange: 'today',
          createStartDate: dashboardTrackingInfo
            ? handleDateRangeChange(dashboardTrackingInfo, 'start')
            : isTimezoneConversion
            ? UTCConvertion(new Date(), 'start')
            : undefined,
          createEndDate: dashboardTrackingInfo
            ? handleDateRangeChange(dashboardTrackingInfo, 'end')
            : isTimezoneConversion
            ? UTCConvertion(new Date(), 'end')
            : undefined,
          createdOn: dashboardTrackingInfo?.includes('_')
            ? undefined
            : isTimezoneConversion
            ? undefined
            : new Date().toLocaleDateString('en-CA')
        }));
      }
    } else if (sessionStorage.getItem('iframe_token')) {
      const setting_id = Number(sessionStorage.getItem('setting_id'));
      getList({
        project: Number(sessionStorage.getItem('project_id')),
        setting_id: setting_id,
        created_at: isTimezoneConversion ? undefined : currentfilterInfo?.createdOn,
        created_start_date: isTimezoneConversion ? UTCConvertion(new Date(), 'start') : undefined,
        created_end_date: isTimezoneConversion ? UTCConvertion(new Date(), 'end') : undefined,
        trackingModule: isTrackingModule ? isTrackingModule : undefined
      });
    }
  }, [project, isTimezoneConversion, showColumn, masterResponse?.isSuccess]);

  useEffect(() => {
    getMaster({});
  }, []);

  // The following useEffect is call when tracking render on Iframe.
  useEffect(() => {
    if (sessionStorage.getItem('iframe_token') !== null) {
      let value: string | number = Number(sessionStorage.getItem('project_id')?.toString());
      dispath(setTemplateProjectId({ value }));
    }
  }, [
    sessionStorage.getItem('project_id'),
    sessionStorage.getItem('project_id') !== undefined && sessionStorage.getItem('project_id') !== 'NaN'
  ]);

  // Error handling for TrackingList
  useEffect(() => {
    const error = (listResponse?.error as any)?.data;
    if (typeof error !== 'string' && error) {
      const errorResponse = error?.response?.errors ? error?.response?.errors : error.detail;
      message.error(
        errorResponse['project'] && errorResponse['project'][0]?.message
          ? errorResponse['project'][0].message
          : errorResponse
      );
    }
  }, [listResponse]);

  // Error Handling for TrackingIdData
  const handleError = (err: any) => {
    message.error(err?.data?.response['Message']);
  };

  //@ts-ignore
  const searchInput = useRef<Input>(null);
  useEffect(() => {
    if (project !== undefined) {
      // Update the currentfilterInfo state
      handleDateRangeChange(dashboardTrackingInfo);

      // Fetch the list with updated values
      getList({
        project: Number(sessionStorage.getItem('project_id'))
          ? Number(sessionStorage.getItem('project_id'))
          : Number(project),
        created_at: isTimezoneConversion ? undefined : currentfilterInfo?.createdOn,
        created_start_date: dashboardTrackingInfo
          ? handleDateRangeChange(dashboardTrackingInfo, 'start')
          : isTimezoneConversion
          ? UTCConvertion(new Date(), 'start')
          : undefined,
        created_end_date: dashboardTrackingInfo
          ? handleDateRangeChange(dashboardTrackingInfo, 'end')
          : isTimezoneConversion
          ? UTCConvertion(new Date(), 'end')
          : undefined,
        status:
          sessionStorage.getItem('isDashboardTracking') === '1'
            ? handleFailureRequest((masterResponse?.data?.response as any)?.data?.status, 'failure')
            : undefined,
        trackingModule: isTrackingModule ? isTrackingModule : undefined
      });
    }
    // eslint-disable-next-line
  }, []);

  let trackingInfo: PreviewDataRequest = {
    project: Number(sessionStorage.getItem('project_id'))
      ? Number(sessionStorage.getItem('project_id'))
      : Number(project),
    tracking_id: undefined,
    trackingModule: isTrackingModule ? isTrackingModule : undefined
  };

  // Initial Subject field Width
  Array.from(document.getElementsByClassName('cls-subject')).forEach((el) => {
    (el as HTMLElement).style.width = '10%';
  });
  // Initial To field Width
  Array.from(document.getElementsByClassName('cls-to-details')).forEach((el) => {
    (el as HTMLElement).style.width = '5%';
  });

  const actions = [
    {
      name: 'Resend',
      handler: async (tracking_id: number) => {
        setWaiting((state) => [...state, tracking_id]);
        setIsServiceCall(false);
        resendMail({ tracking_id })
          .unwrap()
          .then(() => {
            setWaiting((state) => state.filter((id) => id !== tracking_id));
            notification['success']({
              message: 'Notification has been resent successfully.',
              duration: 2
            });
          })
          .catch((err: any) => {
            // Error handling for Resend mail
            message.error(
              err?.data?.response && err?.data?.response['errors'] && err?.data?.response['errors']['tracking_id'][0]
                ? err.data.response['errors']['tracking_id'][0]
                : err.data.response['Message']
            );
            notification['error']({
              message: 'Error!',
              description: 'Notification not sent!',
              duration: 2
            });
          });
      }
    },
    {
      name: 'Preview and resend',
      handler: async (tracking_id: number) => {
        setWaiting((state) => [...state, tracking_id]);
        trackingInfo.tracking_id = tracking_id;
        getInfo(trackingInfo)
          .unwrap()
          .then((res: any) => {
            if (res.responseCode === 0) {
              setIsModalVisible(true);
              setWaiting((state) => state.filter((id) => id !== tracking_id));
            }
          })
          .catch((err: any) => {
            handleError(err);
          });
      }
    }
  ];

  const columns: TableProps<DefaultRecordType>['columns'] = [
    {
      title: 'S.No',
      key: 's_no',
      className: 'cls-seriol-no',
      render: (_text: any, _record: any, index: any) => {
        // Calculate the serial number based on current page and page size
        const serialNo = (pageNumber - 1) * 6 + (index + 1);
        return serialNo;
      }
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      className: 'cls-subject',
      render: (_trackingId: string | number, data: DefaultRecordType) => {
        const subjectData = data.subject.replace(' - ', ' -\n');
        return (
          <>
            <span className="cls-subject-data">{subjectData}</span>
          </>
        );
      }
    },
    ...(!showColumn
      ? [
          {
            title: 'Template name',
            dataIndex: 'template_name',
            key: 'template_name',
            className: 'cls-template-name',
            render: (_trackingId: string | number, data: DefaultRecordType) => (
              <div className="cls-template-info">
                <span>{data.template_name}</span>
              </div>
            )
          }
        ]
      : []),
    ...(!showColumn && !isSmallScreen
      ? [
          {
            title: 'To',
            dataIndex: 'to',
            key: 'to',
            className: 'cls-to-details',
            render: (_trackingId: string | number, data: DefaultRecordType) => (
              <>
                <div className="cls-to-options">
                  <Tooltip
                    overlayInnerStyle={{
                      maxHeight: 100,
                      overflowY: 'scroll',
                      wordBreak: 'break-word',
                      whiteSpace: 'normal'
                    }}
                    title={
                      data.to.split(',').length > 1
                        ? data.to.split(',').map((action: string, index: number) => (
                            <div key={index}>
                              {action}
                              {index < data.to.split(',').length - 1 ? ', ' : ''}
                            </div>
                          ))
                        : null
                    }
                  >
                    <div className="cls-to-content">
                      <span>{data.to.split(',')[0]}</span>
                      {data.to.split(',').length > 1 && <span>&{data.to.split(',').length}more</span>}
                    </div>
                  </Tooltip>
                </div>
              </>
            )
          }
        ]
      : []),
    {
      title: 'Setting',
      dataIndex: 'setting_name',
      key: 'setting_name',
      className: 'cls-setting',
      render: (_trackingId: string | number, data: DefaultRecordType) => (
        <>{!showColumn ? <span className="cls-setting-data">{data.setting_name}</span> : ''}</>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      className: 'cls-status',
      render: (status: string) => <Status name={status} />
    },
    {
      title: `Created ${!showColumn ? 'by' : 'date'}`,
      dataIndex: 'created_by',
      key: 'created_by',
      className: 'cls-created-by',
      render: (_trackingId: string | number, data: DefaultRecordType) => (
        <>
          {!showColumn ? (
            <Tooltip title={data.created_by}>
              <span>{data.created_by}</span>
            </Tooltip>
          ) : (
            ''
          )}
        </>
      )
    },

    ...(!showColumn
      ? [
          {
            title: 'Cc',
            dataIndex: 'cc',
            key: 'cc',
            className: 'cls-mail-cc',
            render: (_trackingId: string | number, data: DefaultRecordType) => {
              const bccArray = data.bcc.split(',');
              // Specify the maximum number of values to display before showing the rest in the tooltip
              const maxVisibleValues = 1;
              return (
                <>
                  <span className="head">{data.cc === '' ? '-' : data.cc}</span>
                  <div className="cls-cc-information">
                    {bccArray.map((value: any, index: number) => {
                      if (index < maxVisibleValues) {
                        return (
                          <span key={index} className="cls-mail-detail">
                            <Tooltip title={<span>{`${value}`}</span>}>{`Bcc: ${value}`}</Tooltip>
                          </span>
                        );
                      }
                      return null;
                    })}
                    {bccArray.length > maxVisibleValues ? (
                      <Tooltip
                        getPopupContainer={() => document.body}
                        overlayInnerStyle={{
                          maxHeight: 130,
                          overflowY: 'auto'
                        }}
                        // Display the remaining values in the tooltip
                        title={bccArray.slice(maxVisibleValues).join(', ')}
                      >
                        <span className="cls-sub-head cls-bcc-data">+{bccArray.length - maxVisibleValues} more</span>
                      </Tooltip>
                    ) : null}
                  </div>
                </>
              );
            }
          }
        ]
      : []),
    {
      title: 'Attachment',
      dataIndex: 'attachmentInfo',
      key: 'attachmentInfo',
      className: 'cls-attachment',
      render: (attachmentNames: any) => (
        <>
          {attachmentNames.map((Items: string, index: string) => {
            return (
              <div className="cls-attachment-info">
                {Items?.toLocaleLowerCase()?.includes('.pdf') ||
                Items?.toLocaleLowerCase()?.includes('.jpeg') ||
                Items?.toLocaleLowerCase()?.includes('.png') ||
                Items?.toLocaleLowerCase()?.includes('.csv') ||
                Items?.toLocaleLowerCase()?.includes('.xlsx') ? (
                  <>
                    <span className="cls-download-ele" onClick={() => handlePdfDownload(Items)}>
                      <Tooltip title={Items.split('/')[Items.split('/').length - 1]}>
                        {Items.split('/')[Items.split('/').length - 1]}
                      </Tooltip>
                    </span>
                  </>
                ) : Items?.toLocaleLowerCase()?.includes('.png') || Items?.toLocaleLowerCase()?.includes('.jpg') ? (
                  <>
                    <span
                      key={index}
                      onClick={() => handleImageDownload(Items, Items?.split('/')[Items?.split('/')?.length - 1])}
                      style={{ cursor: 'pointer', color: 'blue' }}
                    >
                      {Items.split('/')[Items.split('/').length - 1]}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="cls-download-ele" onClick={() => handleAttachmentDownload(Items)}>
                      {Items.split('/')[Items.split('/').length - 1]}
                    </span>
                    <br />
                  </>
                )}
                <br></br>
              </div>
            );
          })}
        </>
      )
    },
    ...(!showColumn
      ? [
          {
            title: 'Last attempt',
            dataIndex: 'last_attempt',
            key: 'last_attempt',
            className: 'cls-last-attempt',
            render: (_trackingId: string | number, data: DefaultRecordType) => (
              <>
                <Tooltip title={data.last_attempt}>
                  <span className="cls-last-attempt-data">{data.last_attempt}</span>
                </Tooltip>
              </>
            )
          }
        ]
      : []),
    {
      title: 'Action',
      dataIndex: 'tracking_id',
      key: 'tracking_id',
      width: 30,
      className: 'popover',
      render: (id: number) =>
        (isResend || infoResponse.isFetching) && waiting.includes(id) ? (
          <LoadingOutlined style={{ fontSize: 18 }} />
        ) : (
          <ActionDropDown referenceId={id} actions={actions} />
        )
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      key: 'remarks',
      width: 100
    },
    {
      title: 'API response ID',
      dataIndex: 'api_response_id',
      key: 'api_response_id',
      width: 100
    }
  ];

  /* Table custom column functionality */
  const [visibleColumn, setVisibleColumn] = useState(columns);

  // Update only the serialNo column dynamically when pageNumber changes
  useEffect(() => {
    setVisibleColumn((prevColumns: any) =>
      prevColumns.map((column: any) =>
        column.key === 's_no'
          ? {
              ...column,
              render: (_text: any, _record: any, index: number) => ((pageNumber as number) - 1) * 6 + (index + 1)
            }
          : column
      )
    );
  }, [pageNumber]);

  let filterProps: any[] = [];
  // The following useEffect is used to render the filter options dynamically.
  useEffect(() => {
    if (filterOption) {
      if (
        (isSmallScreen && filterOption.filter((value: any) => value === 'Attachments').length === 0) ||
        (!isSmallScreen && filterOption.filter((value: any) => value === 'Attachments').length > 0)
      )
        filterProps.push({
          label: 'Attachments',
          labelKey: 'Attachments',
          data: [
            { label: 'Yes', value: 1 },
            { label: 'No', value: 2 }
          ],
          handler: (id: number) => {
            setPageNumber(1);
            setCurrentfilterInfo((prevState: any) => ({
              ...prevState,
              attachmentInfo: id
            }));
          }
        });
      if (
        (isSmallScreen && filterOption.filter((value: any) => value === 'Notification').length === 0) ||
        (!isSmallScreen && filterOption.filter((value: any) => value === 'Notification').length > 0)
      )
        filterProps.push({
          label: 'Notification',
          labelKey: 'Notification',
          data:
            masterResponse.data && masterResponse.data.responseCode === 0
              ? masterResponse.data.response.data.notification_type
              : [],
          handler: (id: number) => {
            setCurrentfilterInfo((prevState: any) => ({
              ...prevState,
              type: id === -1 ? undefined : id
            }));
          }
        });
      if (
        (isSmallScreen && filterOption.filter((value: any) => value === 'Setting type').length === 0) ||
        (!isSmallScreen && filterOption.filter((value: any) => value === 'Setting type').length > 0)
      )
        filterProps.push({
          label: 'Setting type',
          labelKey: 'Setting type',
          data:
            masterResponse.data && masterResponse.data.responseCode === 0
              ? masterResponse.data.response.data.setting_type
              : [],
          handler: (id: number) => {
            setCurrentfilterInfo((prevState: any) => ({
              ...prevState,
              settingType: id === -1 ? undefined : id
            }));
          }
        });

      if (
        (isSmallScreen && filterOption.filter((value: any) => value === 'Status').length === 0) ||
        (!isSmallScreen && filterOption.filter((value: any) => value === 'Status').length > 0)
      )
        filterProps.push({
          label: 'Status',
          labelKey: 'status',
          data:
            masterResponse.data && masterResponse.data.responseCode === 0
              ? masterResponse.data.response.data.status
              : [],
          handler: (id: number | undefined) => {
            sessionStorage.removeItem('isDashboardTracking');
            id = id === -1 ? undefined : id;
            setPageNumber(1);
            setCurrentfilterInfo((prevState: any) => ({
              ...prevState,
              status: id
            }));
          }
        });
      if (isCreatedDateFilter) {
        filterProps.push({
          label: 'Created date',
          labelKey: 'date',
          data: [],
          handler: (id: string | undefined) => {
            setPageNumber(1);
            setCurrentfilterInfo((prevState: any) => ({
              ...prevState,
              createStartDate: isTimezoneConversion ? UTCConvertion(id, 'start') : undefined,
              createEndDate: isTimezoneConversion ? UTCConvertion(id, 'end') : undefined,
              createdOn: id === '' || isTimezoneConversion ? undefined : (id as any).toLocaleDateString('en-CA')
            }));
          }
        });
      }
      if (filterOption.filter((value: any) => value === 'Date range').length > 0) {
        filterProps.push({
          label: 'Date range',
          labelKey: 'dateRange',
          defaultValue: currentfilterInfo?.dateRange,
          data: [
            { label: 'Today', value: 'today' },
            { label: 'Yesterday', value: 'yesterday' },
            { label: 'This week', value: 'this_week' },
            { label: 'Last week', value: 'last_week' },
            { label: 'This month', value: 'this_month' },
            { label: 'Last month', value: 'last_month' },
            { label: 'Created on', value: 'created_at' },
            { label: 'Custom', value: 'custom' }
          ],
          handler: handleDateRangeChange
        });
      }

      if (isCustomDateFilter && filterOption.filter((value: any) => value === 'Date range').length > 0) {
        filterProps.push({
          label: 'Date range',
          labelKey: 'rangePicker',
          data: [],
          handler: (startingDate?: any, endingDate?: any) => {
            setPageNumber(1);
            setCurrentfilterInfo((prevState: any) => ({
              ...prevState,
              createStartDate: isTimezoneConversion
                ? UTCConvertion(startingDate, 'start')
                : startingDate.toLocaleDateString('en-CA'),
              createEndDate: isTimezoneConversion
                ? UTCConvertion(endingDate, 'end')
                : endingDate.toLocaleDateString('en-CA'),
              createdOn: undefined
            }));
          }
        });
      }
      if (filterOption.filter((value: any) => value === 'Date range').length == 0 && isCustomDateFilter)
        setIsCustomDateFilter(false);
    }
    setFilterElement(filterProps);
  }, [
    filterOption,
    isCustomDateFilter,
    isCreatedDateFilter,
    currentfilterInfo.dateRange,
    isTimezoneConversion,
    showColumn,
    isSmallScreen
  ]);

  const handlingAttachmentInfo = (_items: any) => {
    // return items[0].attachment[0];
  };

  useEffect(() => {}, [filterElement]);
  let tableData, totalCount;
  if (listResponse.isSuccess && listResponse.data) {
    isLoader = false;
    if (listResponse.data.responseCode === 0) {
      totalCount = listResponse.data.response.data.count;
      const { results } = listResponse.data.response.data;
      if (results && results.length > 0) {
        tableData = results.map((item: Result) => {
          return {
            tracking_id: item.tracking_id,
            subject: item.subject,
            setting_name: item.setting,
            to: item.to,
            cc: item?.cc === '' ? '-' : item?.cc,
            bcc: item.bcc,
            status: item.status_name,
            create_date: formatDateTime(item.created_at),
            created_by: item.created_by,
            template_name: item.template_info.template_name,
            remarks: item?.remarks === '' ? '-' : item?.remarks,
            api_response_id: item?.api_response_id === null ? '-' : item?.api_response_id,
            notification_type: item.notification_type,
            last_attempt: formatDateTime(item.last_attempt),
            attachmentInfo: item?.attachments.length > 0 ? item?.attachments[0].attachment : ['-'],
            attachments: item?.attachments?.length > 0 ? handlingAttachmentInfo(item?.attachments) : ''
          };
        });
      }
    }
  }

  // The following method is used to get the search input filter options
  const handleChange = (event: any, value: string) => {
    let filterInfo: any[] = JSON.parse(JSON.stringify(currentfilterInfo?.searchFilters));
    if (event?.target?.checked) filterInfo.push(value);
    else if (!event?.target?.checked) {
      let index = filterInfo.indexOf(value);
      filterInfo.splice(index, 1);
    }
    setCurrentfilterInfo((prevState: any) => ({
      ...prevState,
      searchFilters: filterInfo
    }));
  };

  const handleSearchEvent = (event: any, type: string) => {
    if (type === 'sub') {
      setCurrentfilterInfo((prevState: any) => ({
        ...prevState,
        searchInputValue: event.target.value
      }));
    } else if (type === 'to') {
      setCurrentfilterInfo((prevState: any) => ({
        ...prevState,
        searchToMailValue: event.target.value
      }));
    }
  };

  // The following method is used to handle the content of Flynas for flynas project
  const handleFlynasContent = () => {
    if (projectData[0]?.code?.toLocaleLowerCase()?.includes('xy')) {
      if ((currentfilterInfo?.searchInputValue as any)?.length > 0) {
        setCurrentfilterInfo((prevState: any) => ({
          ...prevState,
          searchInputValue: (currentfilterInfo?.searchInputValue as any)?.replace(/flynas/gi, 'flynas'),
          searchToMailValue: (currentfilterInfo?.searchToMailValue as any)?.replace(/flynas/gi, 'flynas'),
          apiRequestValue: (currentfilterInfo?.apiRequestValue as any)?.replace(/flynas/gi, 'flynas'),
          settingIdValue: (currentfilterInfo?.settingIdValue as any)?.replace(/flynas/gi, 'flynas'),
          actionNameValue: (currentfilterInfo?.actionNameValue as any)?.replace(/flynas/gi, 'flynas'),
          templateNameValue: (currentfilterInfo?.templateNameValue as any)?.replace(/flynas/gi, 'flynas'),
          type: (currentfilterInfo?.type as any)?.replace(/flynas/gi, 'flynas'),
          environment: (currentfilterInfo?.environment as any)?.replace(/flynas/gi, 'flynas')
        }));
      }
    }
  };

  // The following method is triggered when user, type the text for making the filter of api request, template name and action name.
  const handleApiRequest = (event: any, optionName: string) => {
    const value = event?.target?.value ? event?.target?.value : event;
    setCurrentfilterInfo((prevState: any) => ({
      ...prevState,
      ...(optionName === 'api_request' && { apiRequestValue: value }),
      ...(optionName === 'setting_id' && { settingIdValue: value }),
      ...(optionName === 'template_name' && { templateNameValue: value }),
      ...(optionName === 'language' && { languageId: value }),
      ...(optionName === 'action_name' && { actionNameValue: value }),
      ...(optionName === 'type' && { type: value }),
      ...(optionName === 'environment' && { environment: value }),
      ...(optionName === 'api_response_id' && { api_response_id: value }),
      ...(optionName === 'attachmentInfo' && { attachmentInfo: value }),
      ...(optionName === 'status' && { status: value }),
      ...(optionName === 'setting_type' && { settingType: value })
    }));
  };

  // The following method is used for handling the PDF download
  const handlePdfDownload = async (url: string) => {
    // As per Bothraj feedback of v2 is not used on notification app, the following changes are made
    // let url = path.replace('secureserve/v1', 'secureserve/v2');
    let fileName = url.split('/')[url.split('/').length - 1];
    let fileType = fileName.split('.')[fileName.split('.').length - 1].toLowerCase();
    try {
      const response: any = await attachmentsInfo({ url }).unwrap();
      if (response?.response?.data) {
        const decodedData = decodeBase64ToBinary(response.response?.data);
        // Determine the MIME type based on the fileType
        let mimeType = '';
        switch (fileType) {
          case 'pdf':
            mimeType = 'application/pdf';
            break;
          case 'csv':
            mimeType = 'text/csv';
            break;
          case 'xlsx':
            mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            break;
          case 'png':
            mimeType = 'image/png';
            break;
          case 'jpeg':
            mimeType = 'image/jpeg';
            break;
          default:
            throw new Error('Unsupported file type');
        }
        const blob = new Blob([decodedData], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.addEventListener('click', (e) => {
          e.stopPropagation();
        });
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err: any) {
      if (err.data?.response?.errors?.non_field_errors) {
        // Handle specific error here
      } else {
        console.error('Download failed:', err);
      }
    }
  };

  return (
    <div className="Tracking">
      <FormTitle title="Tracking" subTitle="To view the status of Notification sent" clsName="normal" />
      {/* filter starts */}
      <Col>
        <Row className="cls-tracking-filter">
          {!isSmallScreen ? (
            <>
              <Col span={1}>
                {/* <DynamicFilter options={filterOptions} /> */}
                <Col className="cls-popup-filter-type">
                  <Popover
                    content={
                      <div className="cls-tracking-filter-list">
                        <TrackingPopover
                          applyFilter={applyFilter}
                          clearFilter={clearFilter}
                          handleApiRequest={handleApiRequest}
                          handleFlynasContent={handleFlynasContent}
                          masterInfo={(masterResponse as any)?.data?.response?.data}
                        />
                      </div>
                    }
                    placement="bottomRight"
                    title=""
                    trigger="click"
                    open={popoverVisible}
                    onOpenChange={(open) => setPopoverVisible(open)}
                  >
                    <Button className="cls-filter-button" icon={<FilterOutlined />} />
                  </Popover>
                </Col>
              </Col>
              <Col span={16}>
                <Space size={25} align="start" className="mr-2">
                  <div className="search">
                    <Col>
                      <Row>
                        <label className="cls-filter-label">Search email ID</label>
                      </Row>
                      <Row>
                        <Input
                          data-testid="tracking_input_searchbox"
                          placeholder={!showColumn ? 'Search mail ID' : "Search 'To' address"}
                          value={currentfilterInfo?.searchToMailValue}
                          allowClear
                          onBlur={handleFlynasContent}
                          onChange={(e) => handleSearchEvent(e, 'to')}
                          onPressEnter={() => applyFilter()}
                        />
                      </Row>
                    </Col>

                    <Space className="mt-2" size={10}>
                      {!showColumn ? (
                        <label>
                          <input
                            data-testid="Tracking_checkbox_4"
                            type="checkbox"
                            checked={
                              currentfilterInfo?.searchFilters?.filter((item: any) => item === 'to').length > 0
                                ? true
                                : false
                            }
                            onChange={(value) => {
                              handleChange(value, 'to');
                            }}
                          />{' '}
                          To
                        </label>
                      ) : (
                        <></>
                      )}
                      {!showColumn ? (
                        <label>
                          <input
                            data-testid="Tracking_checkbox_2"
                            type="checkbox"
                            checked={
                              currentfilterInfo?.searchFilters?.filter((item: any) => item === 'cc').length > 0
                                ? true
                                : false
                            }
                            onChange={(value) => {
                              handleChange(value, 'cc');
                            }}
                          />{' '}
                          Cc
                        </label>
                      ) : (
                        ''
                      )}
                      {!showColumn ? (
                        <label>
                          <input
                            data-testid="Tracking_checkbox_3"
                            type="checkbox"
                            checked={
                              currentfilterInfo?.searchFilters?.filter((item: any) => item === 'bcc').length > 0
                                ? true
                                : false
                            }
                            onChange={(value) => {
                              handleChange(value, 'bcc');
                            }}
                          />{' '}
                          Bcc
                        </label>
                      ) : (
                        ''
                      )}
                    </Space>
                  </div>
                </Space>
                <Space size={25} align="start" className="mr-2">
                  <div className="search">
                    <Col>
                      <Row>
                        <label className="cls-filter-label">Search subject</label>
                      </Row>
                      <Row>
                        <Input
                          data-testid="tracking_input_searchbox"
                          placeholder="Search subject"
                          value={currentfilterInfo?.searchInputValue}
                          onBlur={handleFlynasContent}
                          allowClear
                          onChange={(e) => handleSearchEvent(e, 'sub')}
                          onPressEnter={() => applyFilter()}
                        />
                      </Row>
                    </Col>
                  </div>
                </Space>
                {filterOption?.filter((item: any) => item === 'Api request').length > 0 ? (
                  <Space size={10} align="start" className="mr-2">
                    <div className="requestId">
                      <Col>
                        <Row>
                          <label className="cls-filter-label">Request id</label>
                        </Row>
                        <Row>
                          <Input
                            placeholder="ID"
                            onPressEnter={() => applyFilter()}
                            allowClear
                            onBlur={handleFlynasContent}
                            value={currentfilterInfo?.apiRequestValue}
                            onChange={(event) => handleApiRequest(event, 'api_request')}
                          />
                        </Row>
                      </Col>
                    </div>
                  </Space>
                ) : (
                  <></>
                )}
                {filterOption?.filter((item: any) => item === 'Environment').length > 0 ? (
                  <Space size={10} align="start" className="mr-2">
                    <div className="requestId">
                      <Col>
                        <Row>
                          <label className="cls-filter-label">Environment</label>
                        </Row>
                        <Row>
                          <Input
                            placeholder="Environment"
                            onPressEnter={() => applyFilter()}
                            allowClear
                            onBlur={handleFlynasContent}
                            value={currentfilterInfo?.apiRequestValue}
                            onChange={(event) => handleApiRequest(event, 'environment')}
                          />
                        </Row>
                      </Col>
                    </div>
                  </Space>
                ) : (
                  <></>
                )}

                {filterOption?.filter((item: any) => item === 'Api response id').length > 0 ? (
                  <Space size={10} align="start" className="mr-2">
                    <div className="search">
                      <Col>
                        <Row>
                          <label className="cls-filter-label">Api Response id</label>
                        </Row>
                        <Row>
                          <Input
                            placeholder="Api response id"
                            onPressEnter={() => applyFilter()}
                            allowClear
                            onBlur={handleFlynasContent}
                            value={currentfilterInfo?.apiRequestValue}
                            onChange={(event) => handleApiRequest(event, 'api_response_id')}
                          />
                        </Row>
                      </Col>
                    </div>
                  </Space>
                ) : (
                  <></>
                )}
                {filterOption?.filter((item: any) => item === 'Setting Id').length > 0 ? (
                  <Space size={10} align="start" className="mr-2">
                    <div className="requestId">
                      <Col>
                        <Row>
                          <label className="cls-filter-label">Setting Id</label>
                        </Row>
                        <Row>
                          <Input
                            onPressEnter={() => applyFilter()}
                            placeholder="Setting Id"
                            allowClear
                            value={currentfilterInfo?.settingIdValue}
                            onBlur={handleFlynasContent}
                            onChange={(event) => handleApiRequest(event, 'setting_id')}
                          />
                        </Row>
                      </Col>
                    </div>
                  </Space>
                ) : (
                  <></>
                )}
                {filterOption?.filter((item: any) => item === 'Action name').length > 0 ? (
                  <Space size={10} align="start" className="mr-2">
                    <div className="cls-action-name">
                      <Col>
                        <Row>
                          <label className="cls-filter-label">Action Name</label>
                        </Row>
                        <Row>
                          <Input
                            onPressEnter={() => applyFilter()}
                            placeholder="Action Name"
                            allowClear
                            value={currentfilterInfo?.actionNameValue}
                            onBlur={handleFlynasContent}
                            onChange={(event) => handleApiRequest(event, 'action_name')}
                          />
                        </Row>
                      </Col>
                    </div>
                  </Space>
                ) : (
                  <></>
                )}
                {filterOption?.filter((item: any) => item === 'Template name').length > 0 ? (
                  <Space size={10} align="start" className="mr-2">
                    <div className="cls-templates-name">
                      <Col>
                        <Row>
                          <label className="cls-filter-label">Template name</label>
                        </Row>
                        <Row>
                          <Input
                            onPressEnter={() => applyFilter()}
                            placeholder="Template name"
                            allowClear
                            value={currentfilterInfo?.templateNameValue}
                            onBlur={handleFlynasContent}
                            onChange={(event) => handleApiRequest(event, 'template_name')}
                          />
                        </Row>
                      </Col>
                    </div>
                  </Space>
                ) : (
                  <></>
                )}
                {filterOption?.filter((item: any) => item === 'Language code').length > 0 ? (
                  <Space size={10} align="start" className="mr-2">
                    <div className="cls-language-id">
                      <Col>
                        <Row>
                          <label className="cls-filter-label">Language code</label>
                        </Row>
                        <Row>
                          <Input
                            onPressEnter={() => applyFilter()}
                            width="100"
                            placeholder="Eg., EN"
                            allowClear
                            onChange={(event) => handleApiRequest(event, 'language')}
                          />
                        </Row>
                      </Col>
                    </div>
                  </Space>
                ) : (
                  <></>
                )}
                {/* filter ends */}
                <CustomFilter pathname="tracking" filters={filterElement} />
              </Col>
              <Col span={7} className="cls-btn-section">
                {/* <Col>
                  <Button type="primary" onClick={handleResendAll} disabled={selectedRowKeys.length === 0}>
                    Resend all
                  </Button>
                </Col> */}
                <Button className="cls-tracking-btn" onClick={() => applyFilter()}>
                  Apply Filter
                </Button>
                {filterOption.length > 1 ? (
                  <Popconfirm
                    placement="topRight"
                    title="Are you sure you want to clear the filter?"
                    onConfirm={() => clearFilter()}
                    onCancel={() => clearFilter('data')}
                    okText="Clear filter option"
                    cancelText="Clear filter data"
                  >
                    <Button className="cls-tracking-btn">Clear Filter</Button>
                  </Popconfirm>
                ) : (
                  <Button className="cls-tracking-btn" onClick={() => clearFilter()}>
                    Clear Filter
                  </Button>
                )}
              </Col>
            </>
          ) : (
            <>
              <Row>
                <Col className="cls-filter-type">
                  <Popover
                    content={
                      <div className="cls-tracking-list">
                        <CustomFilter pathname="tracking" filters={filterElement} />
                        <TrackingPopover
                          applyFilter={applyFilter}
                          clearFilter={clearFilter}
                          handleApiRequest={handleApiRequest}
                          handleFlynasContent={handleFlynasContent}
                        />
                      </div>
                    }
                    title=""
                    trigger="click"
                    open={popoverVisible}
                    onOpenChange={(open) => setPopoverVisible(open)}
                  >
                    <Button className="cls-filter-button" icon={<UnorderedListOutlined />} />
                  </Popover>
                </Col>
                <Col xs={11} sm={11}>
                  <div className="search">
                    <Col>
                      <Row className="cls-filter-options">
                        <Col xs={24}>
                          <label className="cls-filter-label">Search email ID</label>
                        </Col>
                        <Col xs={24}>
                          <Input
                            data-testid="tracking_input_searchbox"
                            placeholder={!showColumn ? 'Search mail ID' : "Search 'To' address"}
                            value={currentfilterInfo?.searchToMailValue}
                            allowClear
                            onBlur={handleFlynasContent}
                            onChange={(e) => handleSearchEvent(e, 'to')}
                            onPressEnter={() => applyFilter()}
                          />
                        </Col>
                      </Row>
                    </Col>

                    <div className="mt-2">
                      <Row>
                        <Col xs={24} sm={24}>
                          <Space className="mt-2" size={4}>
                            {!showColumn ? (
                              <label>
                                <input
                                  data-testid="Tracking_checkbox_4"
                                  type="checkbox"
                                  checked={
                                    currentfilterInfo?.searchFilters?.filter((item: any) => item === 'to').length > 0
                                      ? true
                                      : false
                                  }
                                  onChange={(value) => {
                                    handleChange(value, 'to');
                                  }}
                                />{' '}
                                To
                              </label>
                            ) : (
                              <></>
                            )}
                            {!showColumn ? (
                              <label>
                                <input
                                  data-testid="Tracking_checkbox_2"
                                  type="checkbox"
                                  checked={
                                    currentfilterInfo?.searchFilters?.filter((item: any) => item === 'cc').length > 0
                                      ? true
                                      : false
                                  }
                                  onChange={(value) => {
                                    handleChange(value, 'cc');
                                  }}
                                />{' '}
                                Cc
                              </label>
                            ) : (
                              ''
                            )}
                            {!showColumn ? (
                              <label>
                                <input
                                  data-testid="Tracking_checkbox_3"
                                  type="checkbox"
                                  checked={
                                    currentfilterInfo?.searchFilters?.filter((item: any) => item === 'bcc').length > 0
                                      ? true
                                      : false
                                  }
                                  onChange={(value) => {
                                    handleChange(value, 'bcc');
                                  }}
                                />{' '}
                                Bcc
                              </label>
                            ) : (
                              ''
                            )}
                          </Space>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
                <Col xs={10} sm={11}>
                  <div className="search">
                    <Col>
                      <Row className="cls-filter-options">
                        <Col xs={24}>
                          <label className="cls-filter-label">Search subject</label>
                        </Col>
                        <Col xs={24}>
                          <Input
                            data-testid="tracking_input_searchbox"
                            placeholder="Search subject"
                            value={currentfilterInfo?.searchInputValue}
                            onBlur={handleFlynasContent}
                            allowClear
                            onChange={(e) => handleSearchEvent(e, 'sub')}
                            onPressEnter={() => applyFilter()}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </div>
                </Col>
              </Row>
              <Col span={24} className="cls-btn-section">
                <Row>
                  <Col span={12}></Col>
                  <Col span={12}></Col>
                </Row>
                <Button className="cls-tracking-btn" onClick={() => applyFilter()}>
                  Apply Filter
                </Button>
                {filterOption.length > 1 ? (
                  <Popconfirm
                    placement="topRight"
                    title="Are you sure you want to clear the filter?"
                    onConfirm={() => clearFilter()}
                    onCancel={() => clearFilter('data')}
                    okText="Clear filter option"
                    cancelText="Clear filter data"
                  >
                    <Button className="cls-tracking-btn">Clear Filter</Button>
                  </Popconfirm>
                ) : (
                  <Button className="cls-tracking-btn cls-clear-button" onClick={() => clearFilter()}>
                    Clear Filter
                  </Button>
                )}
              </Col>
            </>
          )}
        </Row>
      </Col>
      <div className="cls-table-ele">
        <div className="cls-table">
          {(listResponse?.isFetching || isLoader) && isServiceCall ? (
            <SkeletonElement />
          ) : (
            <Table
              // selection={{ ...rowSelection }}
              data={tableData || []}
              columns={visibleColumn}
              pathname="tracking"
              pagination={{
                pagination: {
                  pageSize: 6,
                  total: totalCount,
                  current: pageNumber,
                  totalPage: (totalCount as number) / 6
                },
                onChange: (config) => {
                  if (config.current) {
                    setPageNumber(config.current);
                    applyFilter('page', config.current);
                  }
                },
                quickPage: (page) => {
                  setPageNumber(Number(page));
                  applyFilter('page', Number(page));
                }
              }}
              setVisibleColumn={setVisibleColumn}
              initialColumns={columns}
              hideableColumns={['s_no', 'tracking_id']}
              disabledSelected={['subject', 'template_name']}
            />
          )}
        </div>
      </div>
      {/* </div> */}
      {isModalVisible && (
        <Modal
          title="Preview and resend"
          className="TrackingModal"
          closeIcon={<CloseCircleOutlined style={{ fontSize: 22, color: '#FF4646' }} />}
          width="90%"
          onCancel={() => {
            setIsModalVisible(false);
          }}
          open={isModalVisible}
          footer={null}
        >
          {infoResponse.data?.responseCode === 0 && (
            <TrackingModal data={infoResponse.data.response.data} mode={'tracking'} />
          )}
        </Modal>
      )}
    </div>
  );
};
export default Tracking;
