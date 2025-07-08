import { useState } from 'react';
import type { ReactNode, FC } from 'react';
import {
  Button,
  Table as AntdTable,
  Row,
  Col,
  Divider,
  Input,
  notification
} from 'antd';
import type {
  TableProps as AntdTableProps,
  TablePaginationConfig
} from 'antd';
import './Table.scss';
import styled from 'styled-components';
import type { DefaultRecordType } from 'rc-table/lib/interface';
import CFG from '../../config/config.json';
import { useTranslation } from 'react-i18next';
import { decodeBase64ToBinary, handleAttachmentDownload, handleImageDownload } from '../../Utils/user';
import { useGetDownloadInfoMutation } from '../../services/initializer/initializer';
import CustomTableColumn from '../CustomTableColumn/CustomTableColumn';
import { DownOutlined, UpOutlined, CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useResize } from '../../Utils/resize';
import React from 'react';

interface TableProps {
  data: AntdTableProps<DefaultRecordType>['dataSource'];
  columns: any;
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
  selection?: {
    type: any;
    handler: (selectedRowKeys: any) => void;
  };
  page?: ReactNode;
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
    .ant-pagination-options-quick-jumper
    {
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

  tr.ant-table-row-level-0.ant-table-row-expanded {
    & > td {
      background-color: #e7e7e7 !important;
      color: #666 !important;
    }
    
    &:hover > td {
      background-color: #ffffff !important;
    }
  }
`;

const Table = ({
  data,
  columns,
  pagination,
  pathname,
  initialColumns,
  setVisibleColumn,
  disabledSelected,
  hideableColumns,
  selected,
  selection,
  page
}: TableProps) => {
  const { t } = useTranslation();
  const [quickPageValue, setQuickPageValue] = useState<string | undefined>(undefined);
  const [attachmentsInfo] = useGetDownloadInfoMutation();
  const { isExtraSmallScreen, isTabletScreen } = useResize();
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  let visibleColumns: any,
    expandColumns: AntdTableProps<DefaultRecordType>['columns'];
  //if the list is empty
  if (!data || !columns) {
    return (
      <GrmTable
        dataSource={data}
        columns={columns}
        pagination={pagination?.pagination}
        onChange={pagination?.onChange}
      />
    );
  }

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

  let popMenu = columns?.filter((c:any) => c.className?.includes('popover'));
  columns = columns?.filter((c:any) => !c.className?.includes('popover'));
  let expandColspan = isExtraSmallScreen ? 3 : isTabletScreen ? 4 : pathname === "group" ? 9 : CFG.list_display_columns;

  if (columns && columns?.length > expandColspan) {
    visibleColumns = columns?.slice(0, expandColspan);
    expandColumns = columns?.slice(expandColspan);
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

  // const RowRenderder: FC = (props: any) => {
  //   const [expand, setExpand] = useState(false);
  //   // Get the value of isSmallScreen and isMediumScreen from the custom hook
  //   const { isSmallScreen } = useResize();
  //   const minLength = page === "Campaign" ? 9 : 7;

  //   console.log(props.children);
    

  //   // Get the current row's key
  //   const rowKey = props['data-row-key'];

  //   // Check if this is expanded (for both custom and AntD expandable rows)
  //   const isExpanded = expand || expandedRowKeys.includes(rowKey);

  //   return (
  //     <>
  //       {pathname === 'tracking' ? (
  //         <>
  //           {props.children.map((item: any, index: number) => {
  //             if (item?.props?.dataIndex?.toLowerCase() === 'status') {
  //               return (
  //                 <span
  //                   className={
  //                     item?.props?.record?.notification_type === 'Email'
  //                       ? 'cls-notification-email'
  //                       : 'cls-notification-whatapp'
  //                   }
  //                 >
  //                   {item.props.record.notification_type}
  //                 </span>
  //               );
  //             }
  //           })}
  //         </>
  //       ) : (
  //         <></>
  //       )}
  //       <tr
  //         key="main-row"
  //         className={`ant-table-row ant-table-row-level-0 ${isExpanded ? 'ant-table-row-expanded' : ''}`}
  //         onClick={() => {
  //           if (props.children.length > minLength && !isSmallScreen) {
  //             setExpand(!expand);
  //           }
  //         }}
  //         style={{
  //           cursor: props.children.length > minLength ? 'pointer' : ''
  //         }}
  //       >
  //         {props.children.map((item: any) => {
  //           if (item.props.className?.toLowerCase() === 'expand') {
  //             return (
  //               <td key="action" className="ant-table-cell action" onClick={() => setExpand(!expand)}>
  //                 <Button type="link" className="cls-expand-icon">
  //                   {expand ? <UpOutlined /> : <DownOutlined />}
  //                 </Button>
  //               </td>
  //             );
  //           }
  //           return { ...item };
  //         })}
  //       </tr>
  //       {expand ? (
  //         <tr key="expander" className="expand-row">
  //           <Expander props={props} />
  //         </tr>
  //       ) : null}
  //       <tr key="placeholderrow" style={{ height: '10px', lineHeight: '0' }}></tr>
  //     </>
  //   );
  // };

  const RowRenderer: FC = (props: any) => {
    const [expand, setExpand] = useState(false);
    const { isSmallScreen } = useResize();
    const minLength = page === "Campaign" ? 9 : 7;
    
    // Convert children to array (works for both v4 and v5)
    const childrenArray = React.Children.toArray(props.children);
    
    const rowKey = props['data-row-key'];
    const isExpanded = expand || expandedRowKeys.includes(rowKey);
  
    return (
      <>
        {pathname === 'tracking' ? (
          <>
            {childrenArray.map((item: any) => {
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
          className={`ant-table-row ant-table-row-level-0 ${isExpanded ? 'ant-table-row-expanded' : ''}`}
          onClick={() => {
            if (childrenArray.length > minLength && !isSmallScreen) {
              setExpand(!expand);
            }
          }}
          style={{
            cursor: childrenArray.length > minLength ? 'pointer' : ''
          }}
        >
          {childrenArray.map((item: any) => {
            if (item.props.className?.toLowerCase() === 'expand') {
              return (
                <td key="action" className="ant-table-cell action" onClick={() => setExpand(!expand)}>
                  <Button type="link" className="cls-expand-icon">
                    {expand ? <UpOutlined /> : <DownOutlined />}
                  </Button>
                </td>
              );
            }
            return { ...item };
          })}
        </tr>
        {expand ? (
          <tr key="expander" className="expand-row">
            <Expander props={props} />
          </tr>
        ) : null}
        <tr key="placeholderrow" style={{ height: '10px', lineHeight: '0' }}></tr>
      </>
    );
  };

  const Expander = (props: any) => {
    let expanderData:any = data[props.props['data-row-key']];
    return (
      <td key="expander" colSpan={pathname === 'tracking' ? 9 : expandColspan + 2}>
        <Divider style={{ marginTop: '0px' }} />
        <Row justify="start" style={{ textAlign: 'left' }}>
          {expanderData &&
            expandColumns &&
            expandColumns?.map((column:any, i:number) => {
              // let Comp:any = column.render;
              return (
                <>
                  {column?.title === 'Attachment' && expanderData?.attachmentInfo?.length > 0 ? (
                    <Col key={i.toString()} xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
                      <p style={{ opacity: '0.7' }} className="cls-title">
                        {column?.title}
                      </p>
                      {column?.key && expanderData?.[column?.key]
                        ? expanderData?.[column?.key].map((item: any, index: any) =>
                          item?.includes('.pdf') ||
                            item?.includes('.jpeg') ||
                            item?.includes('.png') ||
                            item?.includes('.csv') ||
                            item?.includes('.xlsx') ? (
                            <>
                              <span className="cls-download-ele" onClick={() => handlePdfDownload(item)}>
                                {item.split('/')[item.split('/').length - 1]}
                              </span>
                              <br />
                            </>
                          ) : item?.includes('.PNG') ||
                            item?.includes('.png') ||
                            item?.includes('.jpg') ||
                            item?.includes('.JPG') ? (
                            <>
                              <span
                                key={index}
                                onClick={() =>
                                  handleImageDownload(
                                    expanderData[(column as any)?.key][index],
                                    expanderData[(column as any)?.key][index]?.split('/')[
                                    expanderData[(column as any)?.key][index]?.split('/')?.length - 1
                                    ]
                                  )
                                }
                                style={{ cursor: 'pointer', color: 'blue' }}
                              >
                                {item.split('/')[item.split('/').length - 1]}
                              </span>
                              <br />
                            </>
                          ) : (
                            <>
                              <span className="cls-download-ele" onClick={() => handleAttachmentDownload(item)}>
                                {item.split('/')[item.split('/').length - 1]}
                              </span>
                              <br />
                            </>
                          )
                        )
                        : '-'}
                    </Col>
                  ) : (
                    <Col key={i.toString()} xs={24} sm={12} md={12} lg={6} xl={6} xxl={6} className="cls-details">
                      <p style={{ opacity: '0.7' }} className="cls-title">
                        {column.title as String}
                      </p>
                      {/* {
                    Comp ? <Comp {...column.render?.arguments} /> : <></>
                  } */}
                      <p style={{ wordBreak: 'break-word' }} className="cls-value">
                        {column?.key ? expanderData?.[column?.key] : '-'}
                      </p>
                    </Col>
                  )}
                </>
              );
            })}
        </Row>
      </td>
    );
  };
  if (!data || !columns) {
    console.info('table data & table column, can not be empty, not rendering table');
    return null;
  }

  // The following method is used for validate the enter page number.
  // const handleKeyPress = (
  //   event: React.KeyboardEvent<HTMLInputElement>,
  //   totalPage: number
  // ) => {
  //   if (event.key === 'Enter') {
  //     const value = Number(quickPageValue);
  //     if (!isNaN(value) && value >= 1 && value <= totalPage) {
  //       pagination?.quickPage?.(value.toString());
  //     } else {
  //       notification.warning({
  //         message: t('Invalid Page Number'),
  //         description: t(`Please enter a page number between 1 and ${totalPage}`),
  //       });
  //     }
  //   }
  // };

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
          series_no: `${parentSeriesNo}.${childIndex + 1}`,
        }))
        : undefined;

      return {
        ...parent,
        key: parentKey,
        series_no: parentSeriesNo.toString(),
        children,
        is_parent: hasChildren, // Only set is_parent to true if there are children
      };
    });

  // To fix the Warning: Each child in a list should have a unique "key" prop.
  // conditional setting the table data
  let tableData = page === "Campaign" ? transformData(data) :
    data.map((value, index) => {
      if (data[index].key === undefined) return { ...value, key: index };
      return value;
    });

  // To maintain the expand and collapse of the child objects
  const onExpand = (expanded: any, record: any) => {
    // const row = record as { key: React.Key };
    if (expanded) {
      setExpandedRowKeys(prev => [...prev, record.key]);
    } else {
      setExpandedRowKeys(prev => prev.filter(key => key !== record.key));
    }
  };


  return (
    <Row>
      <Col
        span={24}
        className={
          (pagination as any)?.pagination?.total > (pagination as any)?.pagination?.pageSize &&
            window.location.href.includes('tracking')
            ? 'cls-custom-table'
            : ''
        }
      >
        <GrmTable
          dataSource={tableData}
          components={{
            body: {
              row: RowRenderer,
            },
          }}
          columns={visibleColumns}
          pagination={pagination?.pagination
            ? {
              ...pagination?.pagination,
              showQuickJumper: isManageGroup,
              pageSizeOptions: ['6', '10', '20', '50', '100'],
              showSizeChanger: isManageGroup
            }
            : false
          }
          onChange={pagination?.onChange}
          rowSelection={selection}
          expandable={page === "Campaign" ? {
            expandIcon: ({ expanded, onExpand, record }: { expanded: boolean; onExpand: Function; record: any }) =>
              record.is_parent && record.child_campaigns?.length > 0 ? (
                expanded ? (
                  <CaretDownOutlined onClick={(e) => {
                    e.stopPropagation();
                    onExpand(record, e);
                  }} />
                ) : (
                  <CaretRightOutlined onClick={(e) => {
                    e.stopPropagation();
                    onExpand(record, e);
                  }} />
                )
              ) : (
                <span style={{ paddingRight: "20px" }} />
              ),
            expandedRowKeys,
            onExpand: (expanded, record) => {
              onExpand(expanded, record);
            },
            rowExpandable: (record: any) => record.is_parent && record.child_campaigns?.length > 0,
          } : undefined}
        />
        <div className="cls-custom-column-filter">
          <CustomTableColumn
            initialColumns={initialColumns}
            setVisibleColumn={setVisibleColumn}
            disabledSelected={disabledSelected}
            hideableColumns={hideableColumns}
            selected={selected}
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

export default Table;
