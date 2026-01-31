// notificationNode.js

import BaseNode from './BaseNode';

const NotificationNode = ({ id, data, useStore }) => {
  // Define the configuration for this specific node type
  const notificationData = {
    ...data,
    label: 'Notification',
    inputs: [{ id: `${id}-trigger`, type: 'target', position: 'left' }, { id: `${id}-message`, type: 'target', position: 'left' }],
    outputs: [{ id: `${id}-delivered`, type: 'source', position: 'right' }],
    fields: [
      {
        name: 'notificationType',
        label: 'Type',
        type: 'select',
        defaultValue: data?.notificationType || 'push',
        options: [
          { value: 'push', label: 'Push Notification' },
          { value: 'sms', label: 'SMS' },
          { value: 'email', label: 'Email' },
          { value: 'inApp', label: 'In-App Message' }
        ]
      },
      {
        name: 'title',
        label: 'Title',
        type: 'text',
        defaultValue: data?.title || 'New Notification'
      },
      {
        name: 'message',
        label: 'Message',
        type: 'textarea',
        defaultValue: data?.message || 'Default notification message',
        rows: 3
      },
      {
        name: 'priority',
        label: 'Priority',
        type: 'select',
        defaultValue: data?.priority || 'normal',
        options: [
          { value: 'low', label: 'Low' },
          { value: 'normal', label: 'Normal' },
          { value: 'high', label: 'High' },
          { value: 'urgent', label: 'Urgent' }
        ]
      }
    ],
    width: 320,
    height: 280,
    className: 'notification-node'
  };

  return <BaseNode id={id} data={notificationData} updateNodeField={useStore?.getState().updateNodeField} />;
};

export { NotificationNode };