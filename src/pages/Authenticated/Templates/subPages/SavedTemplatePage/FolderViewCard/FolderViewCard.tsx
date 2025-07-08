import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/App.hook';
import { setTemplatePage, setTemplateSearchValue, setTemplateView } from '@/stores/Template.store';
// import { useLazyGetTemplateListQuery } from '../../../../../../services/templates/Templates';
import { Col, Button, Form, Input, Modal, notification } from 'antd';
import { CheckOutlined, ExclamationCircleOutlined, LoadingOutlined, CloseOutlined } from '@ant-design/icons';
import {
  useDeleteFolderMutation,
  useUpdateFolderMutation,
  useDeleteFolderForcefullyMutation,
  useCloneFolderMutation
} from '../../../../../../services/folder/Folder';
import './FolderViewCard.scss';
import { useResize } from '../../../../../../Utils/resize';
import { FolderIcon } from '@/components/Icons/Icons';
import { ActionDropDown } from '@/components/PopoverMenu/PopoverMenu';

interface IFolderViewCard {
  folder_id: string;
  folder_name: string;
  count: string | number;
}

const FolderViewCard = ({ folder_name, folder_id, count }: IFolderViewCard) => {
  const [isRename, setIsRename] = useState(false);
  const [isClone, setIsClone] = useState(false);
  const navigate = useNavigate();
  const { project } = useAppSelector((state) => state.TemplateProjectReducer);
  const dispatch = useAppDispatch();

  // const [getList, listData] = useLazyGetTemplateListQuery();

  const [deleteFolderService] = useDeleteFolderMutation();
  const [updateFolderService] = useUpdateFolderMutation({});
  const [forceDeleteService] = useDeleteFolderForcefullyMutation();
  const [cloneService, cloneServiceData] = useCloneFolderMutation();
  const [upadteForm] = Form.useForm();
  const [cloneForm] = Form.useForm();
  // Get the value of isSmallScreen from the custom hook
  const { isSmallScreen, isMediumScreen } = useResize();

  const actions = [
    {
      name: 'Clone',
      handler: async (_folderId: string) => {
        setIsClone(true);
        // append old folder name with clone number like folder(2)
        // regex for getting folder clone number
        // let folderNumber = /\(([^)]+)\)/.exec(folder_name);
        // let cloneNumber = folderNumber ? parseInt(folderNumber[1]) + 1 : 2;
        // let newName = folder_name.split('(', 1)[0];
        // let cloneData = {
        //   clone_folder_id: folderId,
        //   clone_template_all: 'Y',
        //   new_folder_name: `${newName}(${cloneNumber})`,
        // };
        // cloneService({ cloneData, pathname: '/template' })
        //   .unwrap()
        //   .catch((err) => {
        //     Modal.error({
        //       title: 'Problem while cloning',
        //       content: 'Kindly rename the folder and check again',
        //     });
        //   });
      }
    },
    {
      name: 'Delete',
      handler: async (_folderId: string) => {
        deleteFolderService({ folder_id, pathname: '/template' })
          .unwrap()
          .then(() => {
            notification['success']({
              message: 'Deleted!',
              description: 'Folder deleted successfully!',
              duration: 2
            });
          })
          .catch((err: any) => {
            if (err.data.response.errors.non_field_errors) {
              Modal.confirm({
                title: 'Warning!',
                icon: <ExclamationCircleOutlined />,
                content: err.data.response.errors.non_field_errors,
                onOk() {
                  forceDeleteService({ folder_id, pathname: '/template' });
                },
                onCancel() {}
              });
            }
          });
      }
    },
    {
      name: 'Rename',
      handler: async (_folderId: string) => {
        setIsRename(true);
      }
    }
  ];
  const cardClickHandler = () => {
    dispatch(setTemplatePage(undefined));
    dispatch(setTemplateSearchValue(undefined));
    if (!isRename) {
      dispatch(setTemplateView('grid'));
      navigate({
        pathname: '/templates/saved/grid',
        search: `${folder_id === '0' ? '' : '?folder=' + folder_id}`
      });
    }
  };
  const saveNameHandler = (value: any) => {
    value['project'] = localStorage.getItem('project')?.toString();
    updateFolderService({
      folder_id: folder_id,
      update_folder: value,
      pathname: '/template'
    });
    setIsRename(false);
  };
  const cloneHandler = ({ folder_name }: any) => {
    let cloneData = {
      selected_folder_id: folder_id,
      select_template_all: 'Y',
      new_folder_name: folder_name,
      project: project
    };
    cloneService({ cloneData, pathname: '/template' })
      .unwrap()
      .then(() => setIsClone(false))
      .catch(() => {
        Modal.error({
          title: 'Problem while cloning',
          content: 'Try with a new name'
        });
      });
  };
  return (
    <>
      <Col
        xs={24}
        sm={12}
        md={8}
        lg={4}
        xl={4}
        xxl={3}
        data-testid="template_folder_list"
        className="gutter-row"
        onDoubleClick={isSmallScreen || isMediumScreen ? undefined : cardClickHandler}
      >
        <div className="FolderViewCard no-selection mb-1">
          <div className="icon-and-action">
            <div className="mt-3 cls-folder" onClick={isSmallScreen || isMediumScreen ? cardClickHandler : undefined}>
              <FolderIcon />
            </div>
            {folder_id === '0' ? (
              <></>
            ) : (
              <ActionDropDown
                referenceId={folder_id}
                actions={actions}
                menuName={Number(count) > 0 ? undefined : 'template'}
                message="Are you sure want to delete the created folder?"
              />
            )}
          </div>
          <div className="mt-3 cls-folders" onClick={isSmallScreen || isMediumScreen ? cardClickHandler : undefined}>
            {isRename ? (
              <Form initialValues={{ folder_name: folder_name }} form={upadteForm} onFinish={saveNameHandler}>
                <Form.Item
                  className="mb-1"
                  name="folder_name"
                  rules={[{ required: true, message: 'Enter valid name' }]}
                >
                  <Input
                    className="thumb-input"
                    placeholder="Name"
                    autoComplete="off"
                    addonAfter={
                      <>
                        <Button icon={<CloseOutlined />} onClick={() => setIsRename(false)}></Button>
                        <Button
                          className="cls-submit"
                          icon={<CheckOutlined />}
                          onClick={() => {
                            upadteForm.submit();
                          }}
                        ></Button>
                      </>
                    }
                  />
                </Form.Item>
              </Form>
            ) : (
              <>
                <label className="d-block text-ellipsis f-sbold">{folder_name}</label>
                <span className="count">No.of templates : {count}</span>
              </>
            )}
          </div>
        </div>
      </Col>
      {isClone && (
        <Col xs={24} sm={12} md={8} lg={4} xl={4} xxl={3} className="gutter-row" onDoubleClick={cardClickHandler}>
          {cloneServiceData.isLoading ? (
            <div className="text-center mt-4">
              <LoadingOutlined style={{ fontSize: 100 }} />
            </div>
          ) : (
            <div className="FolderViewCard no-selection mb-1 text-center">
              <div className="text-right">
                <p>&nbsp;</p>
              </div>
              <div className="cls-clone-folder">
                <FolderIcon />
              </div>
              <Form initialValues={{ folder_name: folder_name }} form={cloneForm} onFinish={cloneHandler}>
                <Form.Item
                  className="mb-2"
                  name="folder_name"
                  rules={[{ required: true, message: 'Enter valid name' }]}
                >
                  <Input
                    className="thumb-input"
                    placeholder="Name"
                    autoComplete="off"
                    addonAfter={
                      <>
                        <Button icon={<CloseOutlined />} onClick={() => setIsClone(false)}></Button>
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
        </Col>
      )}
    </>
  );
};
export default FolderViewCard;
