// webhookNode.js

import BaseNode from './BaseNode';

const WebhookNode = ({ id, data, useStore }) => {
  // Define the configuration for this specific node type
  const webhookData = {
    ...data,
    label: 'Webhook',
    inputs: [{ id: `${id}-payload`, type: 'target', position: 'left' }],
    outputs: [{ id: `${id}-response`, type: 'source', position: 'right' }],
    fields: [
      {
        name: 'url',
        label: 'URL',
        type: 'text',
        defaultValue: data?.url || 'https://api.example.com/webhook'
      },
      {
        name: 'method',
        label: 'Method',
        type: 'select',
        defaultValue: data?.method || 'POST',
        options: [
          { value: 'GET', label: 'GET' },
          { value: 'POST', label: 'POST' },
          { value: 'PUT', label: 'PUT' },
          { value: 'DELETE', label: 'DELETE' }
        ]
      },
      {
        name: 'headers',
        label: 'Headers (JSON)',
        type: 'textarea',
        defaultValue: data?.headers || '{\n  "Content-Type": "application/json"\n}',
        rows: 4
      }
    ],
    width: 300,
    height: 220,
    className: 'webhook-node'
  };

  return <BaseNode id={id} data={webhookData} updateNodeField={useStore?.getState().updateNodeField} />;
};

export { WebhookNode };