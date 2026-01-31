// emailNode.js

import BaseNode from './BaseNode';

const EmailNode = ({ id, data, useStore }) => {
  // Define the configuration for this specific node type
  const emailData = {
    ...data,
    label: 'Email',
    inputs: [{ id: `${id}-to`, type: 'target', position: 'left' }, { id: `${id}-subject`, type: 'target', position: 'left' }, { id: `${id}-body`, type: 'target', position: 'left' }],
    outputs: [{ id: `${id}-sent`, type: 'source', position: 'right' }],
    fields: [
      {
        name: 'emailTo',
        label: 'To',
        type: 'text',
        defaultValue: data?.emailTo || 'recipient@example.com'
      },
      {
        name: 'emailSubject',
        label: 'Subject',
        type: 'text',
        defaultValue: data?.emailSubject || 'Default Subject'
      },
      {
        name: 'emailBody',
        label: 'Body',
        type: 'textarea',
        defaultValue: data?.emailBody || 'Default email body content',
        rows: 4
      }
    ],
    width: 250,
    height: 200,
    className: 'email-node',
    type: 'email'
  };

  return <BaseNode id={id} data={emailData} updateNodeField={useStore?.getState().updateNodeField} />;
};

export { EmailNode };