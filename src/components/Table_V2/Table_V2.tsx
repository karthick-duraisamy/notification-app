import { FC, ReactNode, useState } from 'react';
import {
  Button,
  Table as AntdTable,
  Row,
  Col,
  TableProps as AntdTableProps,
  TablePaginationConfig,
  Input,
  notification
} from 'antd';
import './Table_V2.scss';
import styled from 'styled-components';
import { DefaultRecordType } from 'rc-table/lib/interface';
import CFG from '../../config/config.json';
import { useTranslation } from 'react-i18next';
// import { useGetDownloadInfoMutation } from '../../services/initializer/initializer';
import CustomTableColumn from '../CustomTableColumn_V2/CustomTableColumn';
import { CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useResize } from '../../Utils/resize';
import { handleTableSort } from '../../Utils/commonFunction';
import { AsecndingIcon, DeasecndingIcon } from '@/components/Icons/Icons';

interface TableProps {
  data: AntdTableProps<DefaultRecordType>['dataSource'];
  columns: AntdTableProps<DefaultRecordType>['columns'];
  pagination?: {
    pagination: false | any;
    onChange: (pagination: TablePaginationConfig) => void;
    quickPage?: (page: string | undefined) => any;
  };
  pathname?: string;
  initialColumns: any[];
  setVisibleColumn: (visibleColumn: any) => void;
  selected?: string[];
  hideableColumns?: string[];
  disabledSelected?: string[];
  selection?:
    | {
        type: 'checkbox';
        selectedRowKeys: React.Key[];
        onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => void;
        getCheckboxProps?: (record: any) => any;
      }
    | {
        type: any;
        handler: (selectedRowKeys: any) => void;
      };
  page?: ReactNode;
  sorting?: {
    sortedInfo: any;
    handleSorting: (sorter: any) => void;
  };
  enableSorting: boolean | any;
  enableSelection: boolean | any;
  onSelectionChange?: (selectedRowKeys: React.Key[], selectedRows: any[]) => void;
  sortableColumns?: string[] | any;
  showColumnsCount?: number;
}

const GrmTable = styled(AntdTable)`
  .ant-table {
    background: transparent;
  }

  .ant-table-thead .ant-table-cell {
    background: transparent;
    color: #8c8d8e;
    padding: 1rem 0.5rem;

    &:first-letter {
      text-transform: uppercase;
    }
  }

  .ant-table-tbody > tr > td {
    border-bottom: unset;
    word-wrap: break-word;
    padding: 1rem 0.5rem;
  }

  .anticon svg {
    transition: transform 0.1s ease;
  }

  th.ant-table-cell {
    &::before {
      content: unset !important;
    }
  }
  tr.ant-table-row {
    background-color: var(--theme-header-background);
    td {
      color: var(--theme-login-input-text-color);
      background-color: var(--theme-header-background);
    }
    td:first-child {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      svg path {
        fill: var(--theme-login-input-text-color);
      }
    }
    td:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      svg path {
        fill: var(--theme-login-input-text-color);
      }
    }
  }

  .ant-pagination {
    .ant-pagination-item-link {
      svg path {
        fill: var(--theme-login-input-text-color);
      }
    }
    .ant-pagination-options {
      display: inline-block;
    }
    .ant-pagination-options-quick-jumper {
      display: inline-block;
      height: 32px;
      margin-inline-start: 8px;
      line-height: 32px;
      vertical-align: top;
    }
  }
  tr.ant-table-row-level-0:hover > td {
    background: unset;
  }

  .action .ant-btn-link {
    color: var(--hover-bg);
  }
  .action {
    .ant-btn-link {
      padding: 4px 0;
    }
  }
  .expand-row {
    background: var(--theme-header-background);
    color: var(--theme-login-input-text-color);
    td {
      border-radius: 0 0 4px 4px;
    }
  }
  .head,
  .sub-head {
    display: block;
  }
  .head {
    font-family: var(--font-semibold);
  }
  .sub-head {
    color: #4c5475;
    // color: var(--theme-table-subhead);
    font-size: 11px;
  }
`;

const CustomTable = ({
  data,
  columns,
  pagination,
  pathname,
  initialColumns,
  setVisibleColumn,
  disabledSelected,
  hideableColumns,
  selected,
  page,
  enableSorting,
  enableSelection,
  onSelectionChange,
  sortableColumns,
  showColumnsCount
}: TableProps) => {
  const { t } = useTranslation();
  const [quickPageValue, setQuickPageValue] = useState<string | undefined>(undefined);
  // const [attachmentsInfo] = useGetDownloadInfoMutation();
  const { isExtraSmallScreen, isTabletScreen } = useResize();
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  const [sortedInfo, setSortedInfo] = useState<any>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [sortedData, setSortedData] = useState<any | undefined>();

  // Custom hook to handle table sorting
  const handleSorting = (sorter: any) => {
    setSortedInfo(sorter);
    const sortedData = handleTableSort(Array.from(data || []), sorter, false);
    return Array.isArray(sortedData) ? sortedData : [];
  };

  const rowSelection = enableSelection
    ? {
        selectedRowKeys,
        type: 'checkbox' as const,
        onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
          setSelectedRowKeys(selectedRowKeys);
          if (onSelectionChange) {
            onSelectionChange(selectedRowKeys, selectedRows);
          }
        },
        getCheckboxProps: (record: any) => ({
          disabled: record.disabled,
          name: record.name
        })
      }
    : undefined;

  // To given the custom render for the pagination
  const itemRender = (
    _: number,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    originalElement: React.ReactNode
  ) => {
    if (type === 'prev') {
      return <span>Previous</span>;
    }
    if (type === 'next') {
      return <span>Next</span>;
    }
    return originalElement;
  };

  let visibleColumns: AntdTableProps<DefaultRecordType>['columns'];
  // expandColumns: AntdTableProps<DefaultRecordType>['columns'];
  //if the list is empty
  if (!data || !columns) {
    return (
      <GrmTable
        dataSource={data}
        columns={columns as any}
        pagination={pagination?.pagination}
        onChange={pagination?.onChange}
      />
    );
  }

  // The following method is used for handling the PDF download
  // const handlePdfDownload = async (url: string) => {
  //   // As per Bothraj feedback of v2 is not used on notification app, the following changes are made
  //   // let url = path.replace('secureserve/v1', 'secureserve/v2');
  //   let fileName = url.split('/')[url.split('/').length - 1];
  //   let fileType = fileName.split('.')[fileName.split('.').length - 1].toLowerCase();
  //   try {
  //     const response: any = await attachmentsInfo({ url }).unwrap();
  //     if (response?.response?.data) {
  //       const decodedData = decodeBase64ToBinary(response.response?.data);
  //       // Determine the MIME type based on the fileType
  //       let mimeType = '';
  //       switch (fileType) {
  //         case 'pdf':
  //           mimeType = 'application/pdf';
  //           break;
  //         case 'csv':
  //           mimeType = 'text/csv';
  //           break;
  //         case 'xlsx':
  //           mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  //           break;
  //         case 'png':
  //           mimeType = 'image/png';
  //           break;
  //         case 'jpeg':
  //           mimeType = 'image/jpeg';
  //           break;
  //         default:
  //           throw new Error('Unsupported file type');
  //       }
  //       const blob = new Blob([decodedData], { type: mimeType });
  //       const url = URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.href = url;
  //       a.download = fileName;
  //       a.addEventListener('click', (e) => {
  //         e.stopPropagation();
  //       });
  //       a.click();
  //       URL.revokeObjectURL(url);
  //     }
  //   } catch (err: any) {
  //     if (err.data?.response?.errors?.non_field_errors) {
  //       // Handle specific error here
  //     } else {
  //       console.error('Download failed:', err);
  //     }
  //   }
  // };

  let popMenu = columns?.filter((c) => c.className?.includes('popover'));
  columns = columns?.filter((c) => !c.className?.includes('popover'));
  let expandColspan = isExtraSmallScreen
    ? 3
    : isTabletScreen
    ? 4
    : pathname === 'group'
    ? 9
    : showColumnsCount || CFG.list_display_columns;

  if (columns && columns?.length > expandColspan) {
    visibleColumns = columns?.slice(0, expandColspan);
    // expandColumns = columns?.slice(expandColspan);
    if (popMenu && popMenu.length !== 0) {
      if (!page) {
        popMenu[0]['title'] = '';
      }
      visibleColumns.push({ ...popMenu[0], title: t('action') });
      visibleColumns.push({ ...popMenu[1], title: '', className: 'expand' });
    } else {
      visibleColumns.unshift({ title: '', className: 'expand' });
    }
  } else {
    visibleColumns = columns;
    if (popMenu && popMenu.length !== 0) {
      visibleColumns?.push(popMenu[0]);
    }
  }

  const RowRenderder: FC = (props: any) => {
    const [expand, setExpand] = useState(false);
    // Get the value of isSmallScreen and isMediumScreen from the custom hook
    const { isSmallScreen } = useResize();
    const minLength = page === 'Campaign' ? 9 : 7;

    // Get the current row's key
    const rowKey = props['data-row-key'];

    // Check if this is expanded (for both custom and AntD expandable rows)
    const isExpanded = expand || expandedRowKeys.includes(rowKey);

    return (
      <>
        {pathname === 'tracking' ? (
          <>
            {props.children.map((item: any, _index: number) => {
              if (item?.props?.dataIndex?.toLowerCase() === 'status') {
                return (
                  <span
                    className={
                      item?.props?.record?.notification_type === 'Email'
                        ? 'cls-notification-email'
                        : 'cls-notification-whatapp'
                    }
                  >
                    {item.props.record.notification_type}
                  </span>
                );
              }
            })}
          </>
        ) : (
          <></>
        )}
        <tr
          key="main-row"
          className={`cls-hovering-actions ant-table-row ant-table-row-level-0 ${
            isExpanded ? 'ant-table-row-expanded' : ''
          }`}
          onClick={() => {
            if (props.children.length > minLength && !isSmallScreen) {
              setExpand(!expand);
            }
          }}
          style={{
            cursor: props.children.length > minLength ? 'pointer' : ''
          }}
        >
          {props.children.map((item: any, _index: number) => {
            // if (item.props.className?.toLowerCase() === 'expand') {
            //   return (
            //     // <td key="action" className="ant-table-cell action" onClick={() => setExpand(!expand)}>
            //     //   <Button type="link" className="cls-expand-icon">
            //     //     {expand ? <UpOutlined /> : <DownOutlined />}
            //     //   </Button>
            //     // </td>
            //     <></>
            //   );
            // }
            return { ...item };
          })}
        </tr>
        {/* {expand ? (
          <tr key="expander" className="expand-row">
            <Expander props={props} />
          </tr>
        ) : null} */}
        {/* <tr key="placeholderrow" style={{ height: '10px', lineHeight: '0' }}></tr> */}
      </>
    );
  };

  // const Expander = (props: any) => {
  //   let expanderData = data[props.props['data-row-key']];
  //   return (
  //     <td key="expander" colSpan={pathname === 'tracking' ? 9 : expandColspan + 2}>
  //       <Divider style={{ marginTop: '0px' }} />
  //       <Row justify="start" style={{ textAlign: 'left' }}>
  //         {expanderData &&
  //           expandColumns &&
  //           expandColumns?.map((column, i) => {
  //             // let Comp:any = column.render;
  //             return (
  //               <>
  //                 {column?.title === 'Attachment' && expanderData?.attachmentInfo?.length > 0 ? (
  //                   <Col key={i.toString()} xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
  //                     <p style={{ opacity: '0.7' }} className="cls-title">
  //                       {column?.title}
  //                     </p>
  //                     {column?.key && expanderData[String(column?.key)]
  //                       ? expanderData[String(column?.key)].map((item: any, index: any) =>
  //                         item?.includes('.pdf') ||
  //                           item?.includes('.jpeg') ||
  //                           item?.includes('.png') ||
  //                           item?.includes('.csv') ||
  //                           item?.includes('.xlsx') ? (
  //                           <>
  //                             <span className="cls-download-ele" onClick={() => handlePdfDownload(item)}>
  //                               {item.split('/')[item.split('/').length - 1]}
  //                             </span>
  //                             <br />
  //                           </>
  //                         ) : item?.includes('.PNG') ||
  //                           item?.includes('.png') ||
  //                           item?.includes('.jpg') ||
  //                           item?.includes('.JPG') ? (
  //                           <>
  //                             <span
  //                               key={index}
  //                               onClick={() =>
  //                                 handleImageDownload(
  //                                   expanderData[(column as any)?.key][index],
  //                                   expanderData[(column as any)?.key][index]?.split('/')[
  //                                   expanderData[(column as any)?.key][index]?.split('/')?.length - 1
  //                                   ]
  //                                 )
  //                               }
  //                               style={{ cursor: 'pointer', color: 'blue' }}
  //                             >
  //                               {item.split('/')[item.split('/').length - 1]}
  //                             </span>
  //                             <br />
  //                           </>
  //                         ) : (
  //                           <>
  //                             <span className="cls-download-ele" onClick={() => handleAttachmentDownload(item)}>
  //                               {item.split('/')[item.split('/').length - 1]}
  //                             </span>
  //                             <br />
  //                           </>
  //                         )
  //                       )
  //                       : '-'}
  //                   </Col>
  //                 ) : (
  //                   <Col key={i.toString()} xs={24} sm={12} md={12} lg={6} xl={6} xxl={6} className="cls-details">
  //                     <p style={{ opacity: '0.7' }} className="cls-title">
  //                       {column.title as String}
  //                     </p>
  //                     {/* {
  //                   Comp ? <Comp {...column.render?.arguments} /> : <></>
  //                 } */}
  //                     <p style={{ wordBreak: 'break-word' }} className="cls-value">
  //                       {column?.key ? expanderData[String(column.key)] : '-'}
  //                     </p>
  //                   </Col>
  //                 )}
  //               </>
  //             );
  //           })}
  //       </Row>
  //     </td>
  //   );
  // };

  if (!data || !columns) {
    console.info('table data & table column, can not be empty, not rendering table');
    return null;
  }

  // The following method is used for validate the enter page number.
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>, totalPage: number) => {
    if (
      event.key === '0' &&
      quickPageValue &&
      Number(quickPageValue) > 0 &&
      Number(quickPageValue + event.key) < totalPage
    )
      return;
    else {
      if (!Number(event.key) || Number(quickPageValue + event.key) > Math.ceil(totalPage)) {
        event.preventDefault();
      }
    }
  };

  // For Customizsed Pagination Options.
  const isManageGroup = window.location.href.includes('manageGroup');

  // Transform the parent and child data for the table
  const transformData = (data: any) =>
    data.map((parent: any, parentIndex: any) => {
      const parentKey = `parent-${parentIndex}`;
      const parentSeriesNo = parentIndex + 1;
      const hasChildren = Array.isArray(parent.child_campaigns) && parent.child_campaigns.length > 0;

      const children = hasChildren
        ? parent.child_campaigns.map((child: any, childIndex: any) => ({
            ...child,
            key: `child-${parentIndex}-${childIndex}`,
            series_no: `${parentSeriesNo}.${childIndex + 1}`
          }))
        : undefined;

      return {
        ...parent,
        key: parentKey,
        series_no: parentSeriesNo.toString(),
        children,
        is_parent: hasChildren // Only set is_parent to true if there are children
      };
    });

  // To fix the Warning: Each child in a list should have a unique "key" prop.
  // conditional setting the table data
  let tableData =
    page === 'Campaign'
      ? transformData(data)
      : data.map((value, index) => {
          if (data[index].key === undefined) return { ...value, key: index };
          return value;
        });

  // To maintain the expand and collapse of the child objects
  const onExpand = (expanded: any, record: any) => {
    // const row = record as { key: React.Key };
    if (expanded) {
      setExpandedRowKeys((prev) => [...prev, record.key]);
    } else {
      setExpandedRowKeys((prev) => prev.filter((key) => key !== record.key));
    }
  };

  // Add sorting configuration to columns when pathname is campaignContact
  const getSortedColumns = () => {
    if (enableSorting) {
      return visibleColumns?.map((column) => ({
        ...column,
        sorter: sortableColumns ? sortableColumns.includes(column.key as string) : false,
        sortOrder: sortedInfo.columnKey === column.key ? sortedInfo.order : null,
        showSorterTooltip: false, // Disable the sort tooltip
        sortIcon: ({ sortOrder }: { sortOrder: 'ascend' | 'descend' | undefined }) => {
          if (sortOrder === 'ascend') {
            return <AsecndingIcon />;
          }
          if (sortOrder === 'descend') {
            return <DeasecndingIcon />;
          }
          return null;
        }
      }));
    }
    return visibleColumns;
  };

  return (
    <Row>
      <Col
        span={24}
        className={
          (pagination as any)?.pagination?.total > (pagination as any)?.pagination?.pageSize &&
          window.location.href.includes('tracking')
            ? 'cls-custom-table'
            : 'cls-common-custom-table'
        }
      >
        <GrmTable
          dataSource={sortedData || tableData}
          components={{
            body: {
              row: RowRenderder
            }
          }}
          columns={getSortedColumns() as any}
          pagination={
            pagination?.pagination
              ? {
                  ...pagination?.pagination,
                  showQuickJumper: isManageGroup,
                  pageSizeOptions: ['6', '10', '20', '50', '100'],
                  showSizeChanger: isManageGroup,
                  itemRender: itemRender
                }
              : false
          }
          onChange={(paginationValue, _filters, sorter, { action }) => {
            // if (action === 'sort' && pathname === 'campaignContact' && sorting?.handleSorting) {
            //   console.log(sorter)
            //   sorting.handleSorting(sorter);
            // }
            // // Keep existing pagination handler
            // if (action === 'paginate' && pagination?.onChange) {
            //   pagination.onChange(paginationValue);
            // }
            if (action === 'sort' && enableSorting) {
              const newSorter = Array.isArray(sorter) ? sorter[0] : sorter;
              setSortedInfo(newSorter);
              const sortedData = handleSorting(newSorter);
              setSortedData(sortedData);
            }
            if (pagination && typeof pagination?.onChange === 'function' && action === 'paginate') {
              pagination.onChange(paginationValue);
            }
          }}
          // rowSelection={pathname === 'campaignContact' ? {
          //   type: 'checkbox',
          //   ...selection,
          //   columnWidth: 48,
          //   fixed: true,
          //   renderCell: (checked: boolean, record: any, index: number, originNode: React.ReactNode) => {
          //     return (
          //       <div className="custom-checkbox-wrapper">
          //         {originNode}
          //       </div>
          //     );
          //   }
          // } : selection}
          rowSelection={rowSelection}
          expandable={
            page === 'Campaign'
              ? {
                  expandIcon: ({
                    expanded,
                    onExpand,
                    record
                  }: {
                    expanded: boolean;
                    onExpand: Function;
                    record: any;
                  }) =>
                    record.is_parent && record.child_campaigns?.length > 0 ? (
                      expanded ? (
                        <CaretDownOutlined
                          onClick={(e) => {
                            e.stopPropagation();
                            onExpand(record, e);
                          }}
                        />
                      ) : (
                        <CaretRightOutlined
                          onClick={(e) => {
                            e.stopPropagation();
                            onExpand(record, e);
                          }}
                        />
                      )
                    ) : (
                      <span style={{ paddingRight: '20px' }} />
                    ),
                  expandedRowKeys,
                  onExpand: (expanded, record) => {
                    onExpand(expanded, record);
                  },
                  rowExpandable: (record: any) => record.is_parent && record.child_campaigns?.length > 0
                }
              : undefined
          }
        />
        <div className="cls-custom-column-filter">
          <CustomTableColumn
            initialColumns={initialColumns}
            setVisibleColumn={setVisibleColumn}
            disabledSelected={disabledSelected}
            hideableColumns={hideableColumns}
            selected={selected}
            pathname={pathname || ''}
          />
        </div>
        {(pagination as any)?.pagination?.total > (pagination as any)?.pagination?.pageSize &&
        window.location.href.includes('tracking') ? (
          <Row>
            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} offset={18}>
              <Row className="cls-quick-page">
                <Col span={10}>Go to page</Col>
                <Col span={6} offset={1} className="cls-page-serach">
                  <Input
                    allowClear
                    onKeyPress={(e) => handleKeyPress(e, (pagination as any)?.pagination?.totalPage)}
                    onChange={(event) => {
                      if (event?.target?.value === '') setQuickPageValue(undefined);
                      let totalPage = Math.round((pagination as any)?.pagination?.totalPage);
                      if (Number(event.target.value) <= totalPage && Number(event.target.value) > 0)
                        setQuickPageValue(event.target.value);
                      else {
                        if (event.target.value === '0')
                          notification.error({ message: 'Pagination value should not be zero' });
                        else if (Number(event.target.value) < 0)
                          notification.error({ message: 'Pagination value should not be negative' });
                        else if (Number(event.target.value) > totalPage) {
                          notification.error({ message: 'Pagination value should be greater than excepted value' });
                        }
                      }
                    }}
                  />
                </Col>
                <Col xs={2} sm={1} md={6} lg={6} xl={6} xxl={6} offset={1}>
                  <Button
                    className="cls-btn-go"
                    type="primary"
                    onClick={() => {
                      if (quickPageValue !== undefined) {
                        (pagination as any)?.quickPage(quickPageValue);
                        setQuickPageValue(undefined);
                      }
                    }}
                  >
                    Go
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <></>
        )}
      </Col>
    </Row>
  );
};

export default CustomTable;
