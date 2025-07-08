import React from 'react';
import { Avatar, Tooltip } from 'antd';
import { CloseCircleFilled, UserOutlined } from '@ant-design/icons';
import './ContactAvatars.scss';
import { Avatar1, Avatar2, Avatar3 } from '../Icons/Icons';

const AVATAR_COMPONENTS = [Avatar1, Avatar2, Avatar3];

const AVATAR_COLORS = [
    'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
    'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
    'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)',
    'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
];

interface ContactAvatarsProps {
    count: number;
    maxAvatars?: number;
}

const ContactAvatars: React.FC<ContactAvatarsProps> = ({
    count,
    maxAvatars = 3
}) => {
    const getAvatarByIndex = (index: number) => {
        const AvatarComponent = AVATAR_COMPONENTS[index % AVATAR_COMPONENTS.length];
        return <AvatarComponent />;
    };

    return (
        <div className="contact-avatars-wrapper">
            {count === 0 ? (
                <Tooltip title="No contacts">
                    <Avatar
                        className='cls-no-contact'
                        icon={<UserOutlined />}
                    >
                    </Avatar>
                    <CloseCircleFilled className="overlay-icon" />
                </Tooltip>
            ) : (
                <>
                    {[...Array(Math.min(maxAvatars, count))].map((_, index) => (
                        <Tooltip key={index} title={`Contact ${index + 1}`}>
                            <Avatar
                                className="custom-avatar"
                                style={{
                                    background: AVATAR_COLORS[index % AVATAR_COLORS.length],
                                    marginLeft: index > 0 ? -8 : 0,
                                    zIndex: maxAvatars - index
                                }}
                                icon={getAvatarByIndex(index)}
                            />
                        </Tooltip>
                    ))}
                    {count > maxAvatars && (
                        <Tooltip title={`+${count - maxAvatars} more contacts`}>
                            <Avatar
                                className="custom-avatar remainder"
                                style={{
                                    marginLeft: -8,
                                    zIndex: 0
                                }}
                            >
                                +{count - maxAvatars}
                            </Avatar>
                        </Tooltip>
                    )}
                </>
            )}
        </div>
    );
};

export default ContactAvatars;