import React from 'react';
import { Card, Col, Radio, Row } from 'antd';
import './ContactGroupCard.scss';
import { dateFormat } from '../../Utils/date';
import { GroupContact } from '../Icons/Icons';
import { Status } from '../Status/Status';

interface ContactGroupCardProps {
  group: any;
  selectedGroupId: string | null;
  onSelect: (groupId: string) => void;
  setSelectedContactView: (groupId: string) => void;
}

const ContactGroupCard: React.FC<ContactGroupCardProps> = ({ group, selectedGroupId, onSelect, setSelectedContactView }) => {
  const setContactview = (group_id: any) => {
    setSelectedContactView(group_id);
  }
  return (
    <Card className="cls-custom-group" onClick={() => onSelect(group)}>
      <Row>
        <Col span={3}>
          <GroupContact />
        </Col>
        <Col span={15}>
          <h3>{group?.group_name}</h3>
          <p>Contact Count: {group?.contact_count}</p>
        </Col>
        <Col span={6} className="cls-view-contact">
          <Row>
            <Radio
              value={group.group_id}
              checked={selectedGroupId === group.group_id}
              onChange={() => onSelect(group)}
              style={{ fontSize: '1em', color: '#007bff' }}
            />
          </Row>
          <Row onClick={() => setContactview(group.group_id)}>
            <p>View contact</p>
          </Row>
        </Col>
      </Row>
      <Row className="cls-row-custom">
        <Col span={24}>
          <span className={group.status_name === 'Active' ? 'cls-active' : 'cls-in-active'}>
            <Status name={group.status_name} />
          </span>{' '}
          <span className='cls-seperator'>| </span><span>Created by {group?.created_by ?? dateFormat(group?.created_by, 'date')}</span>
        </Col>
      </Row>
    </Card>
  );
};

export default ContactGroupCard;
