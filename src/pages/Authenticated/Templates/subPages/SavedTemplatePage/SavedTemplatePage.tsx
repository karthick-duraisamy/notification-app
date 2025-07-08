import { useEffect, useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { Row, Button, Select, Pagination, Col, Modal, notification, Input, Form, message } from 'antd';
import {
  useLazyGetTemplateListQuery,
  useGetTemplateMasterQuery,
  useMoveTemplateMutation,
  useChangeTemplateStatusMutation,
  useDeleteTemplateMutation,
  useLazyExportTemplateQuery,
  useMoveAllTemplateMutation,
  useDeleteBulkMutation
} from '../../../../../services/templates/Templates';
import { useLazyGetFolderQuery, useCreateFolderMutation } from '../../../../../services/folder/Folder';
import GridViewCard from './GridViewCard/GridViewCard';
import FolderViewCard from './FolderViewCard/FolderViewCard';
import ListView from './ListView/ListView';
import './SavedTemplatePage.scss';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import type { DefaultRecordType } from 'rc-table/lib/interface';
import { useAppSelector, useAppDispatch } from '../../../../../hooks/App.hook';
import {
  clearSavedTemplate,
  setFolderId,
  setback,
  setTemplateView,
  clearTemplateFolder,
  selectAllTemplates,
  clearSelectedTemplates,
  clearSelectAllTemplates,
  setTemplatePage,
  setTemplateSearchValue,
  setHtml,
  setCurrentBackPage
} from '@/stores/Template.store';
import ThumbnailViewCard from './ThumbnailViewCard/ThumbnailViewCard';
import type { Result as ITemplateResponse } from '../../../../../services/templates/TemplatesTypes';
import {
  CloseCircleOutlined,
  LoadingOutlined,
  ExclamationCircleOutlined,
  FolderOpenFilled,
  CloseOutlined,
  CheckOutlined
} from '@ant-design/icons';
import CustomFilter from '@/components/CustomFilter/CustomFilter';
import NoTemplates from './NoTemplates/NoTemplates';
import { ActionDropDown } from '@/components/PopoverMenu/PopoverMenu';
import type { GetFolder } from '../../../../../services/folder/FolderTypes';
import {
  FolderElementLoader,
  SkeletonElement,
  TemplateSkeletonElement
} from '@/components/SkeletonElement/SkeletonElement';
import { AddPlus } from '@/components/Icons/Icons';

interface ITemplateActions {
  data: ITemplateResponse | DefaultRecordType;
}
interface IFilterData {
  folder: null | string;
  status: number | undefined;
  page: number | string | undefined;
  search: string | undefined;
}
const SavedTemplatePage = () => {
  const projectId = localStorage.getItem('project');
  const { project } = useAppSelector((state) => state.TemplateProjectReducer);
  const { templateFolder, templateMaster, selectedTemplates, folderId, isBack, pageNumber, templateSearchValue } =
    useAppSelector((state) => state.TemplateReducer);
  const { view } = useParams<{ view?: string; page?: string }>();
  const [moveFolderService, moveFolderServiceData] = useMoveTemplateMutation();
  const [moveAllService] = useMoveAllTemplateMutation();
  const [deleteAllService] = useDeleteBulkMutation();
  const [isMoveVisible, setIsMoveVisible] = useState(false);
  const [moveFolder, setMoveFolder] = useState<number | undefined>();
  const dispatch = useAppDispatch();
  let [folderService, folderServiceData] = useLazyGetFolderQuery();
  const [getTemplateList, getTemplateListStaus] = useLazyGetTemplateListQuery();
  const navigate = useNavigate();
  let initialFilterData = {
    folder: folderId.id,
    status: undefined,
    page: pageNumber,
    search: templateSearchValue
  };
  const [filterData, setFilterData] = useState<IFilterData>(initialFilterData);
  const filterProps = [
    {
      label: 'Search template',
      labelKey: 'search',
      data: [],
      value: templateSearchValue,
      handler: (value: string) => {
        setFilterData((state) => ({ ...state, search: value, folder: folderId.id, page: undefined }));
        dispatch(setTemplatePage(undefined));
      },
      handleButtonPress: (value: string) => {
        dispatch(setTemplateSearchValue(value === '' ? undefined : value));
        if (value === '') {
          dispatch(setTemplatePage(undefined));
          setFilterData((state) => {
            return { ...state, search: undefined, page: undefined };
          });
        }
      }
    },
    {
      label: 'Status',
      // unique key
      labelKey: 'status',
      data: templateMaster.status.length > 0 ? templateMaster.status : [],
      handler: (id: number) => {
        dispatch(setTemplatePage(undefined));
        setFilterData((state) => {
          return { ...state, status: id === -1 ? undefined : id, folder: folderId.id, page: undefined };
        });
      }
    },
    {
      label: 'Folders',
      // unique key
      labelKey: 'folder',
      data: templateFolder.folders.length > 0 ? templateFolder.folders : [],
      handler: (id: string) => {
        dispatch(setTemplatePage(undefined));
        dispatch(setTemplateSearchValue(undefined));
        navigate({
          search: `${id === 'all' ? '' : '?folder=' + id}`
        });
        setFilterData((state) => {
          return { ...state, folder: id === 'all' ? null : id, search: undefined, page: undefined };
        });
        // new Promise((resolve,reject) =>{
        //   navigate({
        //     search: `${id === 'all' ? '' : '?folder=' + id}`,
        //   });
        // }).then(() => {
        //   setFilterData((state) => {
        //     return { ...state, folder: id === 'all' ? undefined : id };
        //   });
        // })
      }
    }
  ];
  const serviceData: GetFolder = { pathname: 'template', project: projectId };
  useEffect(() => {
    if (!isBack) navigate('/templates/saved/default');
    dispatch(setback(false));
  }, [project]);

  useEffect(() => {
    if (view === 'default') setFilterData(initialFilterData);
    // eslint-disable-next-line
  }, [view]);
  useEffect(() => {
    // setSearchParam({folder: filterData.folder ? filterData.folder : ''});
    if (filterData.folder && filterData.folder !== '') getTemplateList(filterData);
    // eslint-disable-next-line
  }, [filterData]);
  useEffect(() => {
    dispatch(clearTemplateFolder());
    folderService(serviceData);
    setFilterData(initialFilterData);
    // eslint-disable-next-line
  }, [project]);
  const moveToHandler = () => {
    setIsMoveVisible(false);
    if (moveFolder) {
      if (selectedTemplates.all) {
        moveAllService({
          select_template_all: 'Y',
          selected_folder_id: folderId.id,
          target_folder_id: moveFolder
        })
          .then(() => {
            dispatch(clearSelectedTemplates());
            dispatch(clearSelectAllTemplates());
            folderService(serviceData);
          })
          .catch((err: any) => {
            // Error handling for moveAllService
            const errorKey: any = err?.data?.response['errors']
              ? Object.keys(err.data.response['errors'])[0]
              : undefined;
            message.error(
              errorKey ? errorKey + ' ' + err.data.response['errors'][errorKey][0] : err.data.response['Message']
            );
          });
      } else {
        const project_id = localStorage.getItem('project');
        moveFolderService({
          target_folder_id: moveFolder,
          selected_template: selectedTemplates.templates,
          project: project_id
        })
          .then(() => {
            dispatch(clearSelectedTemplates());
            dispatch(clearSelectAllTemplates());
            folderService(serviceData);
          })
          .catch((err: any) => {
            // Error handling for moveFolder
            const errorKey: any = err?.data?.response['errors']
              ? Object.keys(err.data.response['errors'])[0]
              : undefined;
            message.error(
              errorKey ? errorKey + ' ' + err.data.response['errors'][errorKey][0] : err.data.response['Message']
            );
          });
      }
    }
  };

  //This function is used to show the move folder/file error
  useEffect(() => {
    const errors =
      moveFolderServiceData?.error &&
      'data' in moveFolderServiceData.error &&
      (moveFolderServiceData.error.data as any)?.response?.errors;

    const displayErrors = (obj: any, parentKey = '') => {
      Object.entries(obj).forEach(([key, value]) => {
        const fullKey = parentKey ? `${parentKey} - ${key}` : key;

        if (Array.isArray(value)) {
          value.forEach((msg) => {
            message.error(`${fullKey} : ${msg}`);
          });
        } else if (typeof value === 'object' && value !== null) {
          displayErrors(value, fullKey);
        } else {
          message.error(`${fullKey} : ${value}`);
        }
      });
    };
    // Here only we wanna check the response and call the error format.
    if (errors && typeof errors === 'object') {
      displayErrors(errors);
    }
    //Success message for template moved
    if (moveFolderServiceData?.data?.responseCode === 0) {
      notification.success({ message: 'Template Moved Succesfully' });
    }
  }, [moveFolderServiceData]);

  const deleteTemplates = () => {
    let deleteType = selectedTemplates.all
      ? { folder_id: folderId.id }
      : { selected_template: selectedTemplates.templates };
    deleteAllService({ body: deleteType })
      .then(() => {
        notification['success']({
          message: 'Templates deleted!',
          description: 'All templates were deleted!',
          duration: 2
        });
      })
      .catch((err: any) => {
        notification['error']({
          message: err.response.errors.error_msg,
          description: `Mapped templates: ${err.response.errors.mapped_templates.join()}`,
          duration: 2
        });
        // if (err.response.errors.error_msg) {
        //   Modal.confirm({
        //     title: err.response.errors.error_msg,
        //     icon: <ExclamationCircleOutlined />,
        //     content: `Mapped templates: ${err.response.errors.mapped_templates.join()}`,
        //     onOk() {
        //       deleteAllService({ body: deleteType, params: { target: 'all' } });
        //     },
        //     onCancel() {
        //     },
        //   });
        // }
      });
  };
  const handleSelectAll = (_e: ChangeEvent<HTMLInputElement>) => {
    dispatch(clearSelectedTemplates());
    dispatch(selectAllTemplates());
  };
  const backToFolders = () => {
    dispatch(setTemplatePage(undefined));
    dispatch(setTemplateSearchValue(undefined));
    dispatch(clearSelectedTemplates());
    // setFilterData(initialFilterData);
    navigate('/templates/saved/default');
  };
  useGetTemplateMasterQuery({});
  const { Option } = Select;
  return (
    <div className="SavedTemplatePage">
      {view !== 'default' && <CustomFilter pathname="template" filters={filterProps} />}
      {view !== 'default' && (selectedTemplates.templates.length > 0 || selectedTemplates.all) && (
        <div className="delete-template">
          <Button className="mr-2" onClick={deleteTemplates} danger>
            Delete
          </Button>
          <Select
            placeholder="Move to"
            onFocus={() => {
              setIsMoveVisible(true);
            }}
            open={isMoveVisible}
            value={moveFolder}
            onChange={(value: any) => {
              setMoveFolder(value);
            }}
            dropdownRender={(menu) => (
              <>
                {menu}
                <div className="flex-container px-2 mt-2">
                  <Button
                    style={{ width: '49%' }}
                    type="primary"
                    onClick={() => {
                      moveToHandler();
                    }}
                    disabled={moveFolder === -1}
                  >
                    Apply
                  </Button>
                  <Button
                    type="default"
                    style={{ width: '49%' }}
                    onClick={() => {
                      setIsMoveVisible(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
            style={{ minWidth: 200, maxWidth: 200 }}
          >
            {templateFolder.folders.length > 0 &&
              templateFolder.folders.map((f: any) =>
                f.folder_id !== folderId.id ? (
                  <Option value={f.folder_id} key={f.folder_id}>
                    {f.folder_name}
                  </Option>
                ) : (
                  <></>
                )
              )}
          </Select>
          <Button
            type="link"
            onClick={() => {
              dispatch(clearSelectedTemplates());
            }}
          >
            Clear
          </Button>
        </div>
      )}
      {view !== 'default' && (
        <div className="flex-container my-3">
          <div className="select-all valign-center">
            {folderId.id !== '' && (
              <>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  className="template-check"
                  name="selectAll"
                  id="selectAll"
                  checked={selectedTemplates.all}
                />{' '}
                <label htmlFor="selectAll" className="fs-16 ml-2 cls-template-select">
                  Select all templates
                </label>
              </>
            )}
          </div>
          <Button type="link" onClick={backToFolders}>
            ← Go to folders
          </Button>
          {/* <Link to={'/templates/saved/default'}>← Go to folders</Link> */}
        </div>
      )}
      {folderServiceData.isFetching ? (
        <FolderElementLoader type="folder" />
      ) : (
        <TemplateSwitch filters={filterData} setFilters={setFilterData} isLoader={getTemplateListStaus.isFetching} />
      )}
    </div>
  );
};

const TemplateSwitch = ({
  filters,
  setFilters,
  isLoader
}: {
  filters: IFilterData;
  setFilters: Function;
  isLoader?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const { search } = useLocation();
  let queryParam = new URLSearchParams(search);
  let folderParam = queryParam.get('folder');
  const [getTemplateList, getTemplateListData] = useLazyGetTemplateListQuery();
  const { view } = useParams<{ view?: string; page?: string }>();
  const { savedTemplate, templateFolder, folderId, pageNumber, templateSearchValue } = useAppSelector(
    (state) => state.TemplateReducer
  );
  // let allFolder = { folder_id: '0', folder_name: 'All', count: savedTemplate.totalCount };
  useEffect(() => {
    if (folderParam != null) {
      dispatch(clearSavedTemplate());
      dispatch(setFolderId(folderParam));
      if (view) {
        dispatch(setTemplateView(view));
      }
      if (!filters.status && folderParam !== '')
        getTemplateList({ folder: folderParam, page: pageNumber, search: templateSearchValue });
    } else {
      dispatch(setFolderId(''));
      if (view !== 'default' && folderId.id !== '')
        getTemplateList({ folder: folderId.id, page: pageNumber, search: templateSearchValue });
    }
    // eslint-disable-next-line
  }, [search]);

  // Error handling for template list url
  useEffect(() => {
    if ((getTemplateListData as any)?.data?.responseCode === 1) {
      const errorKey: any = (getTemplateListData as any)?.data?.response['errors']
        ? Object.keys((getTemplateListData as any).data.response['errors'])[0]
        : undefined;
      message.error(
        errorKey
          ? errorKey + ' ' + (getTemplateListData as any).data.response['errors'][errorKey][0]
          : (getTemplateListData as any).data.response['Message']
      );
    }
  }, [getTemplateListData]);

  const SwitchComp = () => {
    switch (view) {
      case 'default':
        // to clear selected templates on exit
        return templateFolder.folders.length > -1 ? (
          <Row gutter={[20, 40]} className="px-2 cls-templates">
            <AddFolder />
            {/* <FolderViewCard key={'0'} {...allFolder} /> */}
            {templateFolder.folders.map((folder: any) => (
              <FolderViewCard key={folder.folder_id} {...folder} />
            ))}
          </Row>
        ) : (
          <h3>No folders</h3>
        );
      case 'thumbnail':
        return (
          <Row gutter={[20, 40]} className={`px-2`}>
            {isLoader ? (
              <Col span={24}>
                <FolderElementLoader />
              </Col>
            ) : (
              <>
                {savedTemplate.count > 0 &&
                  !getTemplateListData.isFetching &&
                  savedTemplate.list.map((tempData: any) => (
                    <ThumbnailViewCard key={tempData.template_id.toString()} data={tempData} />
                  ))}
              </>
            )}
            {/* {getTemplateListData.isFetching && (
              <Col span={24}>
                <h3 className="text-center">
                  <LoadingOutlined /> Loading...
                </h3>
              </Col>
            )}
            {savedTemplate.count > 0 &&
              !getTemplateListData.isFetching &&
              savedTemplate.list.map((tempData) => (
                <ThumbnailViewCard key={tempData.template_id.toString()} data={tempData} />
              ))} */}
            {savedTemplate.count < 1 &&
              !isLoader &&
              getTemplateListData.isSuccess &&
              !getTemplateListData.isFetching && (
                <Col span={24}>
                  <NoTemplates />
                </Col>
              )}
          </Row>
        );
      case 'grid':
        return (
          <Row>
            {isLoader ? (
              <Col span={24}>
                <TemplateSkeletonElement />
              </Col>
            ) : (
              <>
                {savedTemplate.count > 0 &&
                  !getTemplateListData.isFetching &&
                  !isLoader &&
                  savedTemplate.list.map((templateData: any) => (
                    <GridViewCard key={templateData.template_id} {...templateData} />
                  ))}
                {savedTemplate.count < 1 && getTemplateListData.isSuccess && !getTemplateListData.isFetching && (
                  <Col span={24}>
                    <NoTemplates />
                  </Col>
                )}
              </>
            )}
          </Row>
        );
      case 'list':
        return (
          <>{isLoader ? <SkeletonElement /> : <ListView listData={savedTemplate.list} count={savedTemplate.count} />}</>
        );
      // return ({ isLoader ? <SkeletonElement /> : <ListView listData={savedTemplate.list} count={savedTemplate.count} />});
      default:
        return <></>;
    }
  };

  return (
    <Row>
      <Col span={24}>
        <SwitchComp />
      </Col>
      {view !== 'default' && (
        <Col
          xs={24}
          sm={24}
          md={18}
          lg={18}
          xl={18}
          xxl={18}
          className={`mt-3 cls-saved-pagination ${getTemplateListData.isFetching ? 'hide' : 'show'}`}
          offset={6}
        >
          <Pagination
            className="text-right"
            style={{ justifyContent: 'flex-end' }}
            pageSize={6}
            current={pageNumber ? Number(pageNumber) : 1}
            total={savedTemplate.count}
            onChange={(nextPage) => {
              dispatch(setTemplatePage(nextPage));
              setFilters((state: any) => {
                return { ...state, page: nextPage, folder: folderId.id };
              });
              // getTemplateList({ page: nextPage.toString(), folder: folderParam ? folderParam : '' });
            }}
          />
        </Col>
      )}
    </Row>
  );
};

/* common component for TemplateActions */
export const TemplateActions = ({ data }: ITemplateActions) => {
  const [deleteTemplate] = useDeleteTemplateMutation();
  const [changeStatus] = useChangeTemplateStatusMutation({});
  const navigate = useNavigate();
  const { project } = useAppSelector((state) => state.TemplateProjectReducer);
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  let apiDocs = JSON.stringify(JSON.parse(data.request_format), null, 4);
  const [exportTemplate] = useLazyExportTemplateQuery();
  const [downloadData, setDownloadData] = useState('');
  const html = useAppSelector((state) => state.TemplateReducer.getHtml);
  const downloadLink = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (downloadLink.current && downloadData) {
      downloadLink.current.click();
      setDownloadData('');
    }
  }, [downloadData]);
  let { status } = data;
  const actions = [
    {
      name: 'Edit',
      handler: async (template_id: number) => {
        dispatch(setCurrentBackPage(undefined));
        navigate(`/editor/${template_id}`);
        if (html !== '') dispatch(setHtml(''));
      }
    },
    {
      name: 'Delete',
      handler: async (template_id: number) => {
        deleteTemplate({ template_id })
          .unwrap()
          .then(() => {
            notification['success']({
              message: 'Template deleted!',
              description: 'Template deleted successfully!',
              duration: 2
            });
          })
          .catch((err: any) => {
            if (err.data.response.errors.pk) {
              Modal.confirm({
                title: 'Warning!',
                icon: <ExclamationCircleOutlined />,
                content: err.data.response.errors.pk[0] + 'Delete?',
                onOk() {
                  deleteTemplate({ template_id, params: { target: 'all' } });
                },
                onCancel() {}
              });
            }
          });
      }
    },
    // {
    //   name: 'Rename',
    //   handler: async (template_id: number) => {},
    // },
    {
      name: 'Clone',
      handler: async (template_id: number) => {
        navigate(`/editor/clone/${template_id}`);
      }
    },
    {
      name: 'Export',
      handler: async (template_id: number) => {
        exportTemplate({ template_id: template_id, project: project ? project : localStorage.getItem('project') })
          .unwrap()
          .then((res: any) => {
            exportHandler(res.responseCode === 0 ? res.response.data.template_content_value : '');
          })
          .catch((err: any) => {
            // Error handling for exportTemplate
            const errorKey: any = err?.data?.response['errors']
              ? Object.keys(err.data.response['errors'])[0]
              : undefined;
            message.error(
              errorKey ? errorKey + ' ' + err.data.response['errors'][errorKey][0] : err.data.response['Message']
            );
          });
      }
    },
    {
      name: 'API docs',
      handler: async (_template_id: number) => {
        setIsModalVisible(true);
      }
    },
    {
      name: `Mark as ${status === '1' ? 'In-Active' : 'Active'}`,
      handler: async (template_id: number) => {
        changeStatus({ template_id, status: status === '1' ? 2 : 1 });
      }
    }
  ];
  const copyHandler = () => {
    navigator.clipboard.writeText(apiDocs);
    notification['success']({
      message: 'Copied!',
      description: 'Api docs copied successfully!',
      duration: 2
    });
  };
  const exportHandler = (htmlData: string) => {
    let blob = new Blob([htmlData], { type: 'text/html' });
    let fileURL = URL.createObjectURL(blob);
    setDownloadData(fileURL);
  };
  return (
    <>
      <ActionDropDown
        referenceId={data.template_id}
        actions={actions}
        menuName="template"
        message="Are you sure want to delete created template?"
      />
      <a style={{ display: 'none' }} ref={downloadLink} href={downloadData} download={data.template_name}>
        export
      </a>
      <Modal
        title="Api docs"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        closeIcon={<CloseCircleOutlined style={{ fontSize: 22, color: '#FF4646' }} />}
        footer={null}
        width="70%"
      >
        <div className="text-right">
          <Button type="default" onClick={copyHandler}>
            Click here to copy
          </Button>
        </div>
        <pre>{apiDocs}</pre>
      </Modal>
    </>
  );
};

const AddFolder = () => {
  const project = localStorage.getItem('project');
  const [createFolder, createFolderData] = useCreateFolderMutation();
  const [isAdd, setIsAdd] = useState(false);
  const [cloneForm] = Form.useForm();
  const addFolder = (value: any) => {
    value['project'] = project;
    createFolder({ add_folder: value, pathname: '/template' })
      .unwrap()
      .then((res: any) => {
        if (res.responseCode === 0) {
          setIsAdd(false);
          notification['success']({
            message: 'Folder created!',
            description: `Folder ${res.response.data.folder_name} created successfully!`,
            duration: 2
          });
        }
      })
      .catch((err: any) => {
        setIsAdd(false);
        if (err.status === 400) {
          notification['error']({
            message: 'Error',
            description: `Folder already exists`,
            duration: 2
          });
        }
      });
  };
  return (
    <Col xs={24} sm={24} md={8} lg={4} xl={4} xxl={3} className="gutter-row">
      <div
        className="FolderViewCard add-folder text-center"
        onClick={() => {
          if (!isAdd) setIsAdd(true);
        }}
      >
        {!createFolderData.isLoading && !isAdd && (
          <>
            <span className="mt-4 d-block cls-add-icon">
              <AddPlus />
            </span>
            <label className="mt-2 d-block text-ellipsis">Add folder</label>
          </>
        )}
        {isAdd && !createFolderData.isLoading && (
          <div className="cls-add-newfolder">
            <FolderOpenFilled className="thumb-icon mt-4" />
            <Form form={cloneForm} onFinish={addFolder}>
              <Form.Item
                className="mb-2 cls-add-form"
                name="folder_name"
                rules={[{ required: true, message: 'Enter valid name' }]}
              >
                <Input
                  className="thumb-input"
                  placeholder="Name"
                  autoComplete="off"
                  addonAfter={
                    <>
                      <Button icon={<CloseOutlined />} onClick={() => setIsAdd(false)}></Button>
                      <Button
                        className="cls-submit"
                        icon={<CheckOutlined />}
                        onClick={() => {
                          cloneForm.submit();
                        }}
                      ></Button>
                    </>
                  }
                />
              </Form.Item>
            </Form>
          </div>
        )}
        {createFolderData.isLoading && <LoadingOutlined className="thumb-icon mt-4" />}
      </div>
    </Col>
  );
};

export default SavedTemplatePage;
