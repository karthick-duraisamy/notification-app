import { Button, Popconfirm, Popover } from 'antd';
import { useState } from 'react';
import './PopoverMenu.scss';
import { PopoverDots } from '../Icons/Icons';

interface iActions {
  name: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  handler: Function;
}

interface iActionDropDown {
  referenceId: string | number;
  actions: Array<iActions>;
  menuName?: string;
  message?: string;
}

const ActionDropDown = ({ referenceId, actions, menuName, message }: iActionDropDown) => {
  const [visible, setVisible] = useState(false);

  return (
    <Popover
      placement="bottomRight"
      title={null}
      trigger="hover"
      onOpenChange={() => setVisible(!visible)}
      open={visible}
      overlayClassName="PopoverMenu"
      content={
        <>
          {actions.map((item: any, index: any) => {
            if (menuName == 'template' && item.name == 'Delete') {
              return (
                <Popconfirm
                  title={message}
                  // description="Are you sure to delete this task?"
                  okText="Yes"
                  cancelText="No"
                  key={index}
                  onConfirm={() => {
                    item.handler(referenceId);
                    setVisible(false);
                  }}
                >
                  <Button block type="text" key={item.name} className='cls-flex-start'>
                    {item.name}
                  </Button>
                </Popconfirm>
              );
            } else {
              // Return null or any other fallback component if the condition is not met
              return (
                <Button
                  block
                  onClick={() => {
                    item.handler(referenceId);
                    setVisible(false);
                  }}
                  type="text"
                  key={item.name}
                  className='cls-flex-start'
                >
                  {item.name}
                </Button>
              );
            }
          })}
        </>
      }
    >
      <Button type="link">
        <PopoverDots />
      </Button>
    </Popover>
  );
};

export { ActionDropDown };
