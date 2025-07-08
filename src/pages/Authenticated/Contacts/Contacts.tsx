import { Button, Col, message, Row, Tooltip } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import {
  useDeleteContactMutation,
  useLazyGetContactsQuery,
  useGetMasterInfoQuery
} from '../../../services/contacts/Contact';
import Table from '@/components/Table/Table';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CustomFilter from '@/components/CustomFilter/CustomFilter';
import { dateFormat } from '../../../Utils/date';
import type { DefaultRecordType } from 'rc-table/lib/interface';
import { useAppSelector } from '../../../hooks/App.hook';
import './Contacts.scss';
import { FormTitle } from '@/components/Title/Title';
import type { MailApiResponse } from '../../../services/Service';
import type { ListContactResponse } from '../../../services/contacts/ContactTypes';
import { DeleteNotification } from '@/components/DeleteNotification/DeleteNotification';
import { ActionDropDown } from '@/components/PopoverMenu/PopoverMenu';
import { Status } from '@/components/Status/Status';
import { useResize } from '../../../Utils/resize';
import { SkeletonElement } from '@/components/SkeletonElement/SkeletonElement';

interface IFilterData {
  status: number | undefined;
  project: string | undefined | number;
}
const Contacts = () => {
  const { project } = useAppSelector((state) => state.TemplateProjectReducer);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // Get the value of isSmallScreen from the custom hook
  const { isSmallScreen, isMediumScreen } = useResize();
  const [getContacts, getContactsData] = useLazyGetContactsQuery();
  //eslint-disable-next-line
  const { isSuccess: _masterSuccess, data: masterData } = useGetMasterInfoQuery({});
  const [pageNumber, setPageNumber] = useState<number | undefined>(1);
  const [filterData, setFilterData] = useState<IFilterData>({
    status: undefined,
    project: Number(project)
  });
  useEffect(() => {
    setFilterData((state) => {
      return { ...state, project: project };
    });
  }, [project]);
  useEffect(() => {
    if (getContactsData?.data?.responseCode === 1) {
      message.error(getContactsData?.data?.response.Message);
    }
  }, [getContactsData.data]);
  useEffect(() => {
    if (project != undefined) {
      getContacts(filterData);
    }
    //eslint-disable-next-line
  }, [filterData, project]);
  const filterProps = [
    {
      label: 'Status',
      labelKey: 'status',
      data: masterData && masterData.responseCode === 0 ? masterData.response.data.status : [],
      handler: (id: number) => {
        setFilterData((state) => {
          return { ...state, status: id === -1 ? undefined : id };
        });
      }
    }
  ];

  const buildTableDataFromAPI = (
    isSuccess: boolean,
    data: MailApiResponse<ListContactResponse> | undefined,
    _routing: {
      navigate: ReturnType<typeof useNavigate>;
      pathname: string;
    },
    isSmallScreen: boolean,
    isMediumScreen: boolean,
    // Checks if the screen size is small or medium
    _deleteService: ReturnType<typeof useDeleteContactMutation>[0]
  ) => {
    let columns,
      tableData,
      size = 0;
    // const { navigate, pathname } = routing;
    // row
    if (isSuccess && data) {
      if (data.responseCode === 0 && data.response.data.results.length > 0) {
        const { results, count } = data.response.data;
        count && (size = count);
        tableData = results.map((item) => {
          return {
            ...item,
            name: `${item.first_name}${item.last_name ? ' ' + item.last_name : ''}`,
            userType: 'User',
            created_at: dateFormat(item.created_at, 'date'),
            updated_by: item?.updated_by === null || item?.updated_by === 'null' ? '-' : item?.updated_by,
            updated_at: dateFormat(item.updated_at as string | Date, 'date')
          };
        });
      }
    }

    // columns
    // must add key, we use key for show more details
    columns = [
      {
        title: 'S.No',
        key: 's_no',
        render: (_text: any, _record: any, index: any) => {
          // Calculate the serial number based on the current page and page size
          const serialNo = ((pageNumber as number) - 1) * 6 + (index + 1);
          return serialNo;
        }
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        className: 'cls-contact-name',
        render: (_contactId: string | number, data: DefaultRecordType) => (
          <>
            <span>{data.name}</span>
          </>
        )
      },
      {
        title: 'Email id',
        dataIndex: 'email_id',
        key: 'email_id',
        className: 'cls-contacts',
        render: (_contactId: string | number, data: DefaultRecordType) => (
          <>
            <span>{data.email_id}</span>
          </>
        )
      },
      {
        title: 'Phone no',
        dataIndex: 'phone_number',
        key: 'phone_number',
        className: 'cls-contacts',
        render: (_contactId: string | number, data: DefaultRecordType) => (
          <>
            <span>{data.phone_number}</span>
          </>
        )
      },
      {
        title: 'Created by',
        dataIndex: 'created_by',
        key: 'created_by',
        className: 'cls-contact-create',
        render: (_contactId: string | number, data: DefaultRecordType) => (
          <Tooltip title={data.created_by}>
            <span>{data.created_by}</span>
          </Tooltip>
        )
      },
      {
        title: 'Status',
        dataIndex: 'status_name',
        key: 'status_name',
        width: 110,
        className: 'cls-contact-status',
        render: (status: string) => <Status name={status} />
      },
      {
        title: 'updated by',
        dataIndex: 'updated_by',
        key: 'updated_by',
        className: 'cls-contact-update',
        render: (_contactId: string | number, data: DefaultRecordType) => (
          <Tooltip title={data.updated_by}>
            <span>{data.updated_by}</span>
          </Tooltip>
        )
      },
      {
        title: 'Action',
        dataIndex: 'sno',
        key: 'sno',
        className: 'popover',
        render: (_id: number, data: any) => <ActionMenu id={data?.contact_id} />
      },

      // The followning method is used to responsive design expand icon click show details
      ...(isSmallScreen
        ? [
            { title: 'Contact', dataIndex: 'email_id', key: 'email_id' },
            { title: 'Status', dataIndex: 'status_name', key: 'status_name' }
          ]
        : []),

      ...(isSmallScreen || isMediumScreen
        ? [
            { title: 'Created by', dataIndex: 'created_by', key: 'created_by' },
            { title: 'updated by', dataIndex: 'updated_by', key: 'updated_by' }
          ]
        : [])
    ];

    return {
      columns,
      tableData,
      size
    };
  };

  const { isSuccess, data, isFetching, isLoading } = getContactsData;
  const { tableData, columns, size } = buildTableDataFromAPI(
    isSuccess,
    data,
    { navigate, pathname },
    isSmallScreen,
    isMediumScreen,
    // Checks if the screen size is small or medium
    useDeleteContactMutation()[0]
  );

  /* Table custom column functionality */
  const [visibleColumn, setVisibleColumn] = useState(columns);

  // Update only the serialNo column dynamically when pageNumber changes
  useEffect(() => {
    setVisibleColumn((prevColumns: any) =>
      prevColumns.map((column: { key: string }) =>
        column.key === 's_no'
          ? {
              ...column,
              render: (_text: any, _record: any, index: number) => ((pageNumber as number) - 1) * 6 + (index + 1)
            }
          : column
      )
    );
  }, [pageNumber]);

  const createContactClick = () => {
    navigate(`${pathname}/create/new`);
  };

  return (
    <div className="Contacts">
      <Row justify="space-between" align="middle" gutter={[0, 24]} className="cls-contact">
        <Col flex="auto">
          <FormTitle title="Contact details" subTitle="To manage the contacts of the notifications" clsName="normal" />
        </Col>
        <Col>
          {isSmallScreen ? (
            <>
              <Button
                data-testid="create_contacts_btn"
                type="primary"
                size="large"
                icon={<PlusCircleFilled />}
                onClick={createContactClick}
                className="cls-contact-detail"
              >
                New contact
              </Button>
            </>
          ) : (
            <>
              <Button
                data-testid="create_contacts_btn"
                type="primary"
                size="large"
                icon={<PlusCircleFilled />}
                onClick={createContactClick}
                className="cls-contact-detail"
              >
                Create new contact
              </Button>
            </>
          )}
        </Col>
      </Row>
      <CustomFilter pathname="contact" filters={filterProps} />
      <Row style={{ marginTop: '5px' }}>
        <Col span={24} className="cls-table">
          {isFetching || isLoading ? (
            <SkeletonElement />
          ) : (
            <Table
              data={tableData || []}
              columns={visibleColumn}
              pagination={{
                pagination: { pageSize: 6, total: size, current: pageNumber },
                onChange: (config) => {
                  setPageNumber(config.current);
                  if (config.current) {
                    setFilterData((state) => ({ ...state, page: config.current }));
                  }
                }
              }}
              setVisibleColumn={setVisibleColumn}
              hideableColumns={['s_no', 'sno']}
              disabledSelected={['name']}
              initialColumns={columns}
              selected={['s_no', 'name', 'email_id', 'status_name', 'sno', 'phone_number', 'created_by']}
            />
          )}{' '}
        </Col>
      </Row>
    </div>
  );
};

const ActionMenu = ({ id }: any) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [deleteService] = useDeleteContactMutation();
  const deleteServiceMethod = (id: string | number) => {
    deleteService({ id });
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
      handler: async (id: number) => {
        const props = {
          serviceMethod: deleteServiceMethod,
          id: id
        };
        DeleteNotification(props);
      }
    }
  ];
  return <ActionDropDown referenceId={id} actions={actions} />;
};

export default Contacts;
